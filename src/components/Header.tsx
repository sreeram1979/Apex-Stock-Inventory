import { BookOpen } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-[#8B5CF6]" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">APEX EDUTECH SOLUTIONS</h1>
            <p className="text-sm text-gray-500">Inventory Management System</p>
          </div>
        </div>
      </div>
    </header>
  );
};