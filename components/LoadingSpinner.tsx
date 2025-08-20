
import React from 'react';
import type { Translations } from '../translations';

interface LoadingSpinnerProps {
    t: Translations['en'];
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ t }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
            <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent border-solid rounded-full animate-spin"></div>
            <h3 className="text-xl font-bold text-slate-100 mt-6">{t.loadingTitle}</h3>
            <p className="text-slate-400 mt-2">{t.loadingSubtitle}</p>
        </div>
    );
};