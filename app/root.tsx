import {
  isRouteErrorResponse,
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";

import { LuTriangleAlert, LuHouse } from "react-icons/lu";
import type { Route } from "./+types/root";
import "./app.css";
import { useLoader } from "./stores/loaderStore";
import Loader from "./components/dashboard/loader";
import { GoogleOAuthProvider } from '@react-oauth/google'
import Alert from "./components/dashboard/alert";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Amiko:wght@400;600;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=KoHo:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.cdnfonts.com/css/general-sans",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.cdnfonts.com/css/segoe-ui-4",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/font-proxima-nova@1.0.1/style.min.css",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoader();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/ico" href="/favicon.ico" />
        <meta property="og:title" content="Frontlett Virtualting" />
        <meta property="og:description" content="Transform the Way You Work: Flexible Hiring, Maximum Impact." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://frontlett.com/" />
        <meta property="og:image" content="https://frontlett.com/images/loader.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Frontlett Virtualting" />
        <meta name="twitter:description" content="Transform the Way You Work: Flexible Hiring, Maximum Impact." />
        <meta name="twitter:image" content="https://yourdomain.com/images/loader.png" />
        <Meta />
        <Links />
      </head>
      <body>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          {children}
          <div id="portal-root"></div>
          <Loader show={isLoading} />
          <Alert />
        </GoogleOAuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  const { isLoading } = useLoader();
  return <Loader show={!isLoading} />
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-900 text-center p-4">
          <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-full mb-6">
            <LuTriangleAlert size={48} />
          </div>
          <h1 className="text-6xl font-bold text-gray-800 dark:text-neutral-200">{error.status}</h1>
          <p className="text-2xl font-semibold text-gray-700 dark:text-neutral-300 mt-2">{error.statusText}</p>
          <p className="text-lg text-gray-600 dark:text-neutral-400 mt-4 max-w-md">
            {error.status === 404 ? "Sorry, the page you are looking for does not exist." : "Sorry, something went wrong on our end."}
          </p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors">
            <LuHouse />
            Go back home
          </Link>
        </div>
      </Layout>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-900 text-center p-4">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-full mb-6">
          <LuTriangleAlert size={48} />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-neutral-200">Oops, something went wrong!</h1>
        <p className="text-lg text-gray-600 dark:text-neutral-400 mt-4 max-w-md">
          We encountered an unexpected error. Please try again later.
        </p>
        {import.meta.env.DEV && (
          <pre className="mt-6 text-left text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg overflow-auto max-w-2xl w-full">
            <code>{errorMessage}</code>
          </pre>
        )}
        <Link to="/" className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors">
          <LuHouse />
          Go back home
        </Link>
      </div>
    </Layout>
  );
}
