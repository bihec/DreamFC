import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className,
  disabled,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-pastel-teal hover:bg-pastel-teal-dark text-white',
    secondary: 'bg-pastel-orange hover:bg-pastel-orange-dark text-white',
    success: 'bg-pistachio hover:bg-pistachio-dark text-white',
    danger: 'bg-fiery-red hover:bg-fiery-red-dark text-white',
    outline: 'bg-transparent border border-pastel-teal text-pastel-teal hover:bg-pastel-teal-light hover:bg-opacity-10',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-full',
    md: 'text-sm px-4 py-2 rounded-full',
    lg: 'text-base px-6 py-3 rounded-full',
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'font-medium transition-all duration-200 flex items-center justify-center gap-2',
        'focus:outline-none focus:ring-2 focus:ring-opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && 'opacity-60 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon}
      {children}
    </button>
  );
};

export default Button;