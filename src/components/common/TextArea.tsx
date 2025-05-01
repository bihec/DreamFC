import React, { TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  fullWidth = true,
  className,
  ...props
}) => {
  return (
    <div className={cn(fullWidth ? 'w-full' : '', 'mb-4')}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={props.id}>
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'px-4 py-2 rounded-lg border border-gray-300 focus:outline-none',
          'focus:ring-2 focus:ring-pastel-teal-light focus:border-transparent',
          'w-full transition-all duration-200',
          error && 'border-fiery-red focus:ring-fiery-red-light',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-fiery-red">{error}</p>}
    </div>
  );
};

export default TextArea;