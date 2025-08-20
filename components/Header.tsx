
import React from 'react';
import { LeafIcon } from './icons/LeafIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import type { Translations } from '../translations';

interface HeaderProps {
    setLanguage: (lang: 'en' | 'zh') => void;
    t: Translations['en']; // Use one language as the shape for props
}


export const Header: React.FC<HeaderProps> = ({ setLanguage, t }) => {
    return (
        <header className="text-center relative">
            <div className="flex justify-center items-center gap-4">
                <LeafIcon className="w-10 h-10 text-brand-primary" />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                   {t.headerTitle}
                </h1>
                <SparklesIcon className="w-10 h-10 text-brand-primary" />
            </div>
            <p className="mt-4 text-lg md:text-xl text-slate-400">
                {t.headerSubtitle}
            </p>
             <div className="absolute top-0 right-0">
                <button onClick={() => setLanguage('en')} className="px-3 py-1 text-sm font-semibold text-slate-300 hover:text-white transition-colors">EN</button>
                <span className="text-slate-500">|</span>
                <button onClick={() => setLanguage('zh')} className="px-3 py-1 text-sm font-semibold text-slate-300 hover:text-white transition-colors">中文</button>
            </div>
        </header>
    );
};