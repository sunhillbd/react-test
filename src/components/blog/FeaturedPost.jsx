import Image from "next/image";
import Link from "next/link";

export default function FeaturedPost({ post }) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Öne Çıkan Yazı
        </h2>
        <Link 
          href={`/blog/${post.slug}`}
          className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm 
          hover:shadow-md transition-all duration-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-64 lg:h-[400px]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm 
              font-medium mb-4">
                {post.category}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 
              group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {post.publishDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }