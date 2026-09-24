interface BlogCardProps {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export default function BlogCard({
  category,
  title,
  excerpt,
  date,
  readTime,
}: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Placeholder */}
      <div className="flex h-52 items-center justify-center bg-gray-100">
        <span className="text-sm font-medium text-gray-400">
          Blog Image
        </span>
      </div>

      <div className="p-6">
        <span className="text-sm font-semibold text-blue-600">
          {category}
        </span>

        <h2 className="mt-3 text-xl font-bold leading-7 text-gray-900 transition group-hover:text-blue-600">
          {title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
          <span>{date}</span>
          <span>{readTime}</span>
        </div>

        <button className="mt-5 text-sm font-semibold text-gray-900 transition hover:text-blue-600">
          Read More →
        </button>
      </div>
    </article>
  );
}