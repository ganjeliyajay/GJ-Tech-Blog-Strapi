export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="text-xl font-bold tracking-tight">
          GJ<span className="text-blue-600">Blog</span>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="/" className="transition hover:text-blue-600">
            Home
          </a>

          <a href="/blog" className="transition hover:text-blue-600">
            Blog
          </a>

          <a href="#about" className="transition hover:text-blue-600">
            About
          </a>
        </nav>

        <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100">
          EN
          <span className="ml-2">⌄</span>
        </button>
      </div>
    </header>
  );
}