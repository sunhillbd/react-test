"use client";
import Link from 'next/link';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black-primary text-center">
      <Image
        src="/assets/404-illustration.svg"
        alt="404 Illustration"
        width={300}
        height={300}
        className="mb-8"
      />
      <h1 className="text-4xl font-bold text-black-primary dark:text-white mb-4">Oops! Page not found.</h1>
      <p className="text-lg text-grey dark:text-gray-300 mb-8">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link href="/" className="bg-primary text-white py-3 px-6 rounded-full hover:bg-primary/90 transition-colors">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
