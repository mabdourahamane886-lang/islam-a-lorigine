const ORIGIN = "https://islam-a-lorigine-bickri-service-agency.vercel.app";

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    const target = new URL(incoming.pathname + incoming.search, ORIGIN);
    const headers = new Headers(request.headers);
    headers.set("x-forwarded-host", incoming.host);
    headers.set("x-forwarded-proto", "https");

    const upstreamRequest = new Request(target.toString(), {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
      redirect: "manual"
    });

    const response = await fetch(upstreamRequest);
    const output = new Response(response.body, response);
    output.headers.set("x-islam-origin-proxy", "cloudflare-workers");
    return output;
  }
};
