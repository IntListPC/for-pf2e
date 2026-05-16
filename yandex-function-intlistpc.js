const https = require('https');
const crypto = require('crypto');

const BUCKET = 'intlistpc-cloud';
const REGION = 'ru-central1';
const HOST = 'storage.yandexcloud.net';

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json; charset=utf-8'
    };
}

function normalizeNickname(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-zа-яё0-9_-]/gi, '_')
        .slice(0, 64);
}

function hash(value) {
    return crypto.createHash('sha256').update(value || '').digest('hex');
}

function hmac(key, value, encoding) {
    return crypto.createHmac('sha256', key).update(value).digest(encoding);
}

function getSignatureKey(secretKey, dateStamp, regionName, serviceName) {
    const kDate = hmac('AWS4' + secretKey, dateStamp);
    const kRegion = hmac(kDate, regionName);
    const kService = hmac(kRegion, serviceName);
    return hmac(kService, 'aws4_request');
}

function signRequest(method, path, body = '') {
    const accessKey = process.env.ACCESS_KEY_ID;
    const secretKey = process.env.SECRET_ACCESS_KEY;

    if (!accessKey || !secretKey) {
        throw new Error('ACCESS_KEY_ID or SECRET_ACCESS_KEY is missing');
    }

    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);
    const payloadHash = hash(body);

    const canonicalHeaders =
        `host:${HOST}\n` +
        `x-amz-content-sha256:${payloadHash}\n` +
        `x-amz-date:${amzDate}\n`;

    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

    const canonicalRequest = [
        method,
        path,
        '',
        canonicalHeaders,
        signedHeaders,
        payloadHash
    ].join('\n');

    const credentialScope = `${dateStamp}/${REGION}/s3/aws4_request`;

    const stringToSign = [
        'AWS4-HMAC-SHA256',
        amzDate,
        credentialScope,
        hash(canonicalRequest)
    ].join('\n');

    const signingKey = getSignatureKey(secretKey, dateStamp, REGION, 's3');
    const signature = hmac(signingKey, stringToSign, 'hex');

    return {
        Authorization:
            `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
        'x-amz-date': amzDate,
        'x-amz-content-sha256': payloadHash,
        Host: HOST
    };
}

async function storageRequest(method, key, body = '') {
    const path = `/${BUCKET}/${key}`;
    const signedHeaders = signRequest(method, path, body);

    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: HOST,
            path,
            method,
            headers: {
                ...signedHeaders,
                ...(method === 'PUT'
                    ? {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Content-Length': Buffer.byteLength(body)
                    }
                    : {})
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    body: data
                });
            });
        });

        req.on('error', reject);

        if (body) req.write(body);
        req.end();
    });
}

module.exports.handler = async function (event) {
    const headers = corsHeaders();

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    try {
        const nickname = normalizeNickname(event.queryStringParameters?.nickname);

        if (!nickname) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'nickname required' })
            };
        }

        const key = `account_backups/${nickname}.json`;

        if (event.httpMethod === 'GET') {
            const response = await storageRequest('GET', key);

            if (response.status === 404) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'not found' })
                };
            }

            if (response.status < 200 || response.status >= 300) {
                return {
                    statusCode: response.status,
                    headers,
                    body: JSON.stringify({
                        error: response.body || 'storage get failed'
                    })
                };
            }

            return {
                statusCode: 200,
                headers,
                body: response.body
            };
        }

        if (event.httpMethod === 'POST') {
            const body = JSON.parse(event.body || '{}');

            const backup = {
                nickname: String(body.nickname || nickname),
                nickname_key: nickname,
                data: body.data || {},
                profile_avatar: body.profile_avatar || '',
                updated_at: body.updated_at || new Date().toISOString()
            };

            const json = JSON.stringify(backup);
            const response = await storageRequest('PUT', key, json);

            if (response.status < 200 || response.status >= 300) {
                return {
                    statusCode: response.status,
                    headers,
                    body: JSON.stringify({
                        error: response.body || 'storage put failed'
                    })
                };
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ ok: true, ...backup })
            };
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'method not allowed' })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.message || String(error)
            })
        };
    }
};
