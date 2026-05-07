const BUCKET = 'intlistpc-cloud';

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

module.exports.handler = async function (event, context) {
    const headers = corsHeaders();

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    try {
        const nickname = normalizeNickname(event.queryStringParameters?.nickname);

        if (!nickname) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'nickname required' }) };
        }

        const key = `account_backups/${nickname}.json`;

        if (event.httpMethod === 'GET') {
            const getResult = await context.aws.sdk.storage.getObject({ Bucket: BUCKET, Key: key }).promise();
            return { statusCode: 200, headers, body: getResult.Body.toString('utf8') };
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

            await context.aws.sdk.storage.putObject({
                Bucket: BUCKET,
                Key: key,
                Body: JSON.stringify(backup),
                ContentType: 'application/json; charset=utf-8'
            }).promise();

            return { statusCode: 200, headers, body: JSON.stringify({ ok: true, ...backup }) };
        }

        return { statusCode: 405, headers, body: JSON.stringify({ error: 'method not allowed' }) };
    } catch (error) {
        if (error && (error.code === 'NoSuchKey' || error.statusCode === 404)) {
            return { statusCode: 404, headers, body: JSON.stringify({ error: 'not found' }) };
        }
        return { statusCode: 500, headers, body: JSON.stringify({ error: error.message || String(error) }) };
    }
};
