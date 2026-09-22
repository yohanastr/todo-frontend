import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variantSize?: 'sm' | 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({
  variantSize = 'md',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3.5 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base',
  };

  return (
    <input
      className={`w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-70 ${sizeStyles[variantSize]} ${className}`}
      {...props}
    />
  );
};

export default Input;