import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-9xl font-extrabold text-red-600">404</h1>
            <p className="text-2xl md:text-3xl font-semibold mt-4 mb-2 text-gray-700">
                Oops! Page Not Found
            </p>
            <p className="text-gray-500 mb-6 max-w-md text-center">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
