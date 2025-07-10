import React from 'react';
import classNames from 'classnames';

export function Progress({ value = 0 }) {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={classNames(
          "h-full bg-indigo-600 transition-all duration-300 ease-in-out"
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
