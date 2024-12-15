import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm 
      hover:shadow-md transition-all duration-200"
    >
      <div className="relative pt-[60%]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full 
        text-sm font-medium mb-3">
          {post.category}
        </span>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 
        line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-6">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium text-gray-900 dark:text-white">
              {post.author.name}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {post.publishDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}