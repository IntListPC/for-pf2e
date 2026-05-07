const SUPABASE_URL = 'https://jgrhmzbzojxsybghirrt.supabase.co';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = SUPABASE_URL + url.pathname + url.search;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body
    });

    const headers = new Headers(response.headers);
    Object.entries(corsHeaders()).forEach(([key, value]) => headers.set(key, value));

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'apikey, authorization, content-type, prefer',
    'Access-Control-Max-Age': '86400'
  };
}
