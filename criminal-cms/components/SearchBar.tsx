"use client";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  filters?: string[];
  selectedFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export default function SearchBar({
  placeholder = "Search cases...",
  onSearch,
  filters,
  selectedFilter,
  onFilterChange,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 flex-1 max-w-xl">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
        />
      </div>
      {filters && filters.length > 0 && (
        <select
          value={selectedFilter}
          onChange={(e) => onFilterChange?.(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
        >
          <option value="">All Types</option>
          {filters.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      )}
    </div>
  );
}
