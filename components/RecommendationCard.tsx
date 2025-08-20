
import React from 'react';
import type { Recommendation } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import type { Translations } from '../translations';

interface RecommendationCardProps {
    recommendation: Recommendation;
    t: Translations['en'];
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, t }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg p-6 flex flex-col h-full transform transition-all duration-300 hover:border-brand-primary hover:-translate-y-1 animate-beat">
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-slate-100 mb-2">{recommendation.productName}</h3>
                <p className="text-slate-300 mb-4">{recommendation.reason}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-700">
                 <div className="flex items-center text-brand-primary">
                    <CheckCircleIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-300">
                        <span className="font-bold text-brand-primary">{t.usage}:</span> {recommendation.usage}
                    </p>
                </div>
            </div>
        </div>
    );
};