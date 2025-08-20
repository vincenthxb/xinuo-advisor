
import React from 'react';
import type { XiaohongshuPost as XiaohongshuPostType } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { CommentIcon } from './icons/CommentIcon';
import { SaveIcon } from './icons/SaveIcon';
import { ShareIcon } from './icons/ShareIcon';
import { LeafIcon } from './icons/LeafIcon';
import { DatabaseIcon } from './icons/DatabaseIcon';


interface XiaohongshuPostProps {
    post: XiaohongshuPostType;
    onSave?: (post: XiaohongshuPostType) => void;
    isSaved?: boolean;
}

export const XiaohongshuPost: React.FC<XiaohongshuPostProps> = ({ post, onSave, isSaved }) => {
    // Generate pseudo-random numbers for engagement stats for a more realistic look
    const likes = React.useMemo(() => Math.floor(Math.random() * 200) + 50, []);
    const comments = React.useMemo(() => Math.floor(Math.random() * 30) + 5, []);
    const saves = React.useMemo(() => Math.floor(Math.random() * 80) + 20, []);

    return (
        <div className="max-w-md mx-auto bg-white text-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center">
                        <LeafIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-3">
                        <p className="font-bold text-sm">Wellness Journey</p>
                        <p className="text-xs text-slate-500">Just now</p>
                    </div>
                </div>

                {/* Body */}
                <h3 className="font-bold text-lg mb-3">{post.title}</h3>
                <p className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed mb-4">{post.body}</p>

                {/* Tags */}
                <p className="text-brand-secondary font-medium text-sm">{post.tags}</p>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-around text-slate-500">
                     <div className="flex items-center space-x-1.5 cursor-pointer hover:text-red-500 transition-colors">
                        <HeartIcon className="w-5 h-5" />
                        <span className="text-sm font-semibold">{likes}</span>
                    </div>
                     <div className="flex items-center space-x-1.5 cursor-pointer hover:text-sky-500 transition-colors">
                        <CommentIcon className="w-5 h-5" />
                        <span className="text-sm font-semibold">{comments}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer hover:text-yellow-500 transition-colors">
                        <SaveIcon className="w-5 h-5" />
                        <span className="text-sm font-semibold">{saves}</span>
                    </div>
                     <div className="flex items-center space-x-1.5 cursor-pointer hover:text-slate-800 transition-colors">
                        <ShareIcon className="w-5 h-5" />
                    </div>
                    {onSave && (
                        <button
                            onClick={() => onSave(post)}
                            disabled={isSaved}
                            className="flex items-center space-x-1.5 cursor-pointer disabled:cursor-not-allowed disabled:text-brand-primary text-slate-500 hover:text-brand-primary transition-colors"
                            aria-label={isSaved ? "Post Saved" : "Save Post"}
                        >
                            <DatabaseIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold">{isSaved ? 'Saved' : 'Save'}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};