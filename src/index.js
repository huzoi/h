export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    let count = await env.VIEW_COUNTER.get('total_views');
    count = count ? parseInt(count) : 0;
    count++;
    await env.VIEW_COUNTER.put('total_views', count.toString());

    return new Response(
      JSON.stringify({ views: count, success: true }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

