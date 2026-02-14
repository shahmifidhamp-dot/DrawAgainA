import React from 'react';

export default function Layout({ children }) {
    return (
        <div className="w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 md:px-8 lg:px-12 transition-all duration-300">
            {children}
        </div>
    );
}
