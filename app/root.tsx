import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "~/styles/tailwind.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

export const loader = () => {
  return json({
    baseUrl: process.env.NODE_ENV === "production" ? "/crypto-portfolio" : "",
  });
};

export default function App() {
  const { baseUrl } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}