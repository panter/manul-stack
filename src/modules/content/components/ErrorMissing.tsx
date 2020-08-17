import { useServerContext } from "next-server-context";

// thx https://github.com/vercel/next.js/issues/4452#issuecomment-594329568
export default function ErrorMissing() {
  const serverContext = useServerContext();
  if (serverContext) serverContext.response.statusCode = 404;
  return (
    <section>
      <h1>Error 404</h1>
      <p>Something is missing.</p>
    </section>
  );
}
