export default function Navbar({ user }) {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 shadow-lg">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="TalkPost Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            TalkPost
          </span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <a
            href="/login"
            className="inline-block text-sm font-semibold text-gray-300 transition-all duration-300 
                       hover:text-white hover:bg-blue-700 px-5 py-2 rounded-lg shadow-md ring-1 ring-blue-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}
