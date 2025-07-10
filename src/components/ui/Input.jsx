import React from 'react';
import classNames from 'classnames';

export const Input = React.forwardRef(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={classNames(
          'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
