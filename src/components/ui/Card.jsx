import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                'bg-white rounded-3xl shadow-soft p-6 md:p-8',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
