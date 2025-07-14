import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="h-screen w-full bg-black flex flex-col justify-center items-center text-white px-4">
      <div className="text-[90px] mb-4">📺</div>

      <h1 className="text-5xl font-bold text-center text-red-600">
        404 - Page Not Found
      </h1>

      <p className="text-gray-400 mt-3 text-center text-lg max-w-md">
        The page you're looking for isn’t available. It might have been removed,
        renamed, or never existed.
      </p>

      <Link to="/" className="mt-6">
        <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white text-md transition">
          Go to Home
        </button>
      </Link>
    </div>
  );
}

export default PageNotFound;
