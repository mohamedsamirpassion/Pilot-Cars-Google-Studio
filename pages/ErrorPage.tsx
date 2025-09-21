import React from 'react';
import { useRouteError, Link, isRouteErrorResponse } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let heading = "Oops!";
  let message = "Sorry, an unexpected error has occurred.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      heading = "404 - Page Not Found";
      message = "The page you are looking for does not exist. It might have been moved or deleted.";
    } else {
      heading = `${error.status} - ${error.statusText}`;
      message = error.data || "Something went wrong with this request.";
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 text-slate-800">
      <div className="text-center p-8 bg-white shadow-lg rounded-xl max-w-lg mx-4">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {heading}
        </h1>
        <p className="mt-6 text-base leading-7 text-slate-600">
            {message}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
