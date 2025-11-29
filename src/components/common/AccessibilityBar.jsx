'use client';

export default function AccessibilityBar() {
  return (
    <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex justify-between items-center text-sm">
      <div className="flex space-x-4">
        <button 
          className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
          aria-label="Toggle high contrast mode"
        >
          🎨 High Contrast
        </button>
        <button 
          className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
          aria-label="Increase text size"
        >
          🔍 Text Size
        </button>
        <button 
          className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded"
          aria-label="Enable screen reader mode"
        >
          🔊 Screen Reader
        </button>
      </div>
      <div className="text-gray-600 text-xs">
        ♿ Accessibility Tools
      </div>
    </div>
  );
}
