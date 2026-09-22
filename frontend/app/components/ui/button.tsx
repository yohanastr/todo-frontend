import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xs';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  // Mapping style variant
  const variantStyles = {
    default: 'bg-primary-70 text-white hover:bg-primary-80',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  };

  // Mapping style size
  const sizeStyles = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`rounded-lg font-medium transition-colors disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;