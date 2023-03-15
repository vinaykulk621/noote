export async function GET(request, { params }) {
  console.log(params);
  console.log(params.slug);
  const id = params.slug.join("_");
  console.log(id);
  return new Response("Hello, Next.js!");
}
