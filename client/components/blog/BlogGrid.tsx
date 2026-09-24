
import { blogPosts } from "../../data/blog";
import BlogCard from "./BlogCard";

export default function BlogGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Latest Articles
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
          Explore Our Articles
        </h2>

        <p className="mt-3 max-w-2xl text-gray-600">
          Discover useful tutorials, development guides and practical
          programming knowledge.
        </p>
      </div>

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            category={post.category}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            readTime={post.readTime}
          />
        ))}
      </div>
    </section>
  );
}