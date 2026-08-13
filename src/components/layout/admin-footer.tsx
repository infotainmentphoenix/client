export function AdminFooter() {
  return (
    <footer className="mt-auto py-6 px-6 border-t border-gray-200/50 dark:border-white/5 bg-transparent">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
        <p>
          &copy; {new Date().getFullYear()} Phoenix Infotainment. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}
