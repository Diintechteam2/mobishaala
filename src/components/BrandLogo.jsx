import React from 'react';

export default function BrandLogo({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-10 md:h-12 w-auto flex items-center">
        <img src="/moboshaalanewlogo.png" alt="Mobishaala" className="h-full w-auto object-contain" />
      </div>
    </div>
  );
}


