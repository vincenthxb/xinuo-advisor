
import React, { useState } from 'react';
import { searchSavedPosts } from '../services/geminiService';
import type { XiaohongshuPost as XiaohongshuPostType } from '../types';
import type { Translations } from '../translations';
import { CloseIcon } from './icons/CloseIcon';
import { SearchIcon } from './icons/SearchIcon';
import { XiaohongshuPost } from './XiaohongshuPost';
import { LoadingSpinner } from './LoadingSpinner';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    savedPosts: XiaohongshuPostType[];
    language: 'en' | 'zh';
    t: Translations['en'];
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, savedPosts, language, t }) => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<XiaohongshuPostType | null | 'not_found'>(null);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const foundPost = await searchSavedPosts(query, savedPosts, language);
            setResult(foundPost || 'not_found');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setQuery('');
        setResult(null);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={handleClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700 p-6 md:p-8 relative"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={handleClose} 
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold text-slate-100 mb-4">{t.aiSearch}</h2>
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="flex-grow bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        disabled={isLoading || !query.trim()}
                        className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-14"
                    >
                       {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <SearchIcon className="w-5 h-5" />}
                    </button>
                </div>
                
                <div className="min-h-[300px] flex items-center justify-center">
                    {isLoading && <LoadingSpinner t={t} />}
                    {error && (
                         <div className="text-center p-4 bg-red-900/20 border border-red-500 rounded-lg">
                            <h3 className="text-lg font-bold text-red-400 mb-1">{t.errorTitle}</h3>
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}
                    {result === 'not_found' && (
                        <div className="text-center p-8 text-slate-400">
                            <p>{t.noResults}</p>
                        </div>
                    )}
                    {result && typeof result === 'object' && (
                         <div className="animate-fade-in w-full">
                           <XiaohongshuPost post={result} />
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};