import React from 'react';
import { cn } from '../../lib/utils';

export function Button({ className, variant = 'primary', size = 'default', children, ...props }) {
    const variants = {
        primary: 'bg-lavender-200 hover:bg-lavender-100 text-slate-800 shadow-soft hover:shadow-lg',
        secondary: 'bg-white border-2 border-lavender-100 text-slate-700 hover:bg-lavender-50',
        ghost: 'hover:bg-slate-100 text-slate-600',
        outline: 'border-2 border-slate-200 hover:border-slate-300 text-slate-600',
    };

    const sizes = {
        default: 'h-12 px-6 py-2 text-base rounded-2xl',
        sm: 'h-9 px-4 text-sm rounded-xl',
        lg: 'h-14 px-8 text-lg rounded-3xl',
        icon: 'h-10 w-10 p-2 rounded-full flex items-center justify-center',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
