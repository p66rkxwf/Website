import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">工具導覽</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link 
          href="/lottery" 
          className="flex items-center justify-center p-8 border rounded-lg hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-xl font-semibold"
        >
          抽籤工具
        </Link>
        <Link 
          href="/password-generator" 
          className="flex items-center justify-center p-8 border rounded-lg hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-xl font-semibold"
        >
          密碼生成工具
        </Link>
      </div>
    </div>
  );
}