export function AdminFooter() {
  return (
    <footer className="mt-auto py-8 px-6 border-t border-gray-200/60 dark:border-white/10 bg-transparent">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400 gap-6">
        <p className="font-medium">
          &copy; {new Date().getFullYear()} <span className="text-gray-900 dark:text-white font-semibold">Phoenix Infotainment</span>. All rights reserved.
        </p>
        <div className="flex gap-6 font-medium">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}
