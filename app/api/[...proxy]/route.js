export async function GET(request, { params }) {
  return handleRequest(request, params, 'GET');
}
 
export async function POST(request, { params }) {
  return handleRequest(request, params, 'POST');
}
 
export async function PUT(request, { params }) {
  return handleRequest(request, params, 'PUT');
}
 
export async function DELETE(request, { params }) {
  return handleRequest(request, params, 'DELETE');
}
 
export async function PATCH(request, { params }) {
  return handleRequest(request, params, 'PATCH');
}
 
export async function OPTIONS(request, { params }) {
  return handleRequest(request, params, 'OPTIONS');
}
 
async function handleRequest(request, params, method) {
 const { proxy } = await params;
  const path = Array.isArray(proxy) ? proxy.join('/') : proxy || '';
  const originalApiUrl = process.env.MONTHLOG_API_GATEWAY;
  const targetUrl = `${originalApiUrl}/${path}`;
  try {
    const fetchOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')
        }),
        ...(request.headers.get('cookie') && {
          'Cookie': request.headers.get('cookie')
        }),
      },
    };
 
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        const body = await request.text();
        if (body) {
          fetchOptions.body = body;
        }
      } catch (e) {
        // Ignore if no body
      }
    }
 
    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.json();
    const responseHeaders = new Headers({
      'Content-Type': 'application/json',
    });
 
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      responseHeaders.set('Set-Cookie', setCookie);
    }
 
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Proxy failed', 
        message: error.message 
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}