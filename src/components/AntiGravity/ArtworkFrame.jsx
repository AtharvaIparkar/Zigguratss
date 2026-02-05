import React from 'react';
import { motion } from 'framer-motion';

export const ArtworkFrame = ({ children, material = 'elegant', className = '' }) => {
    const materials = {
        elegant: {
            outer: 'bg-gradient-to-br from-zinc-100 via-white to-zinc-50',
            inner: 'bg-gradient-to-br from-zinc-50 to-white',
            accent: 'bg-gradient-to-r from-amber-100/50 via-amber-50/30 to-amber-100/50',
            shadow: 'shadow-[0_8px_30px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]'
        },
        modern: {
            outer: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
            inner: 'bg-gradient-to-br from-slate-800 to-slate-700',
            accent: 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20',
            shadow: 'shadow-[0_8px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]'
        },
        gold: {
            outer: 'bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300',
            inner: 'bg-gradient-to-br from-yellow-50 to-amber-100',
            accent: 'bg-gradient-to-r from-amber-400/40 via-yellow-200/40 to-amber-400/40',
            shadow: 'shadow-[0_8px_30px_rgba(217,119,6,0.2),inset_0_1px_0_rgba(255,255,255,0.9)]'
        }
    };

    const style = materials[material] || materials.elegant;

    return (
        <div className={`relative ${className}`}>
            {/* Outer frame layer */}
            <div className={`absolute inset-0 ${style.outer} ${style.shadow} rounded-lg`}>
                {/* Accent line */}
                <div className={`absolute inset-[6px] ${style.accent} rounded-md`} />

                {/* Inner frame layer */}
                <div className={`absolute inset-[8px] ${style.inner} rounded-md shadow-inner`} />

                {/* Content area */}
                <div className="absolute inset-[12px] bg-white rounded-sm overflow-hidden">
                    {children}
                </div>
            </div>

            {/* Spacer for layout */}
            <div className="invisible">{children}</div>
        </div>
    );
};
