import React from 'react';
import classNames from 'classnames';

export function Badge({ children, variant = 'secondary' }) {
  const base = 'px-2 py-0.5 text-xs font-semibold rounded-full';

  const variants = {
    success: 'bg-green-100 text-green-800',
    secondary: 'bg-gray-100 text-gray-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={classNames(base, variants[variant] || variants.secondary)}>
      {children}
    </span>
  );
}
