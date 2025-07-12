import React from 'react';

export default function CourseFilter({ categories, selectedCategory, onCategoryChange }) {
    return (
        <div className="flex flex-wrap gap-3 items-center">
            <label className="text-sm font-semibold text-gray-700">Filter by Category:</label>
            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >

                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category
                            .split('_')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join(' ')}
                    </option>
                ))}
            </select>
        </div>
    );
}
