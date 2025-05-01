import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  className,
  icon,
  ...props
}) => {
  return (
    <div className={cn(fullWidth ? 'w-full' : '', 'mb-4')}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={props.id}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'px-4 py-2 rounded-lg border border-gray-300 focus:outline-none',
            'focus:ring-2 focus:ring-pastel-teal-light focus:border-transparent',
            'w-full transition-all duration-200',
            icon && 'pl-10',
            error && 'border-fiery-red focus:ring-fiery-red-light',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-fiery-red">{error}</p>}
    </div>
  );
};

export default Input;