import type { APIRoute } from 'astro';

const APPS_SCRIPT_URL = import.meta.env.APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbxm7pfnoxX68LEnTmbJ8E_6beSerBnMWivgBa2zc-5iSrCWehuu2clMm5sMv8d5wKETew/exec";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body),
      redirect: 'follow'
    });

    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch {
      console.error('Apps Script response:', text.slice(0, 500));
      return new Response(JSON.stringify({ 
        status: 'error', 
        message: 'Apps Script devolvió HTML. Verifica permisos y despliegue.',
        debug: text.slice(0, 200)
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Error desconocido' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
