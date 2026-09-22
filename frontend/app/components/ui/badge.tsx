import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'blue' | 'green' | 'yellow';
  size?: 'default' | 'sm';
}

export function Badge({ children, variant = 'purple', size = 'default' }: BadgeProps) {
  const variantStyles = {
    purple: 'bg-purple-50 text-purple-600 border-purple-100', // Warna super soft
    blue: 'bg-sky-50 text-sky-600 border-sky-100',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    yellow: 'bg-amber-50 text-amber-700 border-amber-100',
  };

  const sizeStyles = {
    default: 'px-2.5 py-0.5 text-xs font-medium',
    sm: 'px-2 py-0.5 text-[10px] font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
}