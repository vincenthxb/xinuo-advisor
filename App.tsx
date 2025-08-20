
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Questionnaire } from './components/Questionnaire';
import { LoadingSpinner } from './components/LoadingSpinner';
import { RecommendationCard } from './components/RecommendationCard';
import { XiaohongshuPost } from './components/XiaohongshuPost';
import { getRecommendation } from './services/geminiService';
import { translations } from './translations';
import type { Answers, RecommendationResponse, XiaohongshuPost as XiaohongshuPostType } from './types';
import { BotIcon } from './components/icons/BotIcon';
import { SearchModal } from './components/SearchModal';
import { DatabaseIcon } from './components/icons/DatabaseIcon';

type Language = 'en' | 'zh';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [savedPosts, setSavedPosts] = useState<XiaohongshuPostType[]>([]);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    useEffect(() => {
        try {
            const storedPosts = localStorage.getItem('savedHealthPosts');
            if (storedPosts) {
                setSavedPosts(JSON.parse(storedPosts));
            }
        } catch (error) {
            console.error("Failed to load saved posts from local storage:", error);
            setSavedPosts([]);
        }
    }, []);

    const t = translations[language];
    const questions = t.questions;

    const handleAnswer = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
        if (step < questions.length - 1) {
            setStep(step + 1);
        }
    };

    const handleSubmit = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setRecommendation(null);
        try {
            const result = await getRecommendation(answers, language);
            setRecommendation(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [answers, language]);

    const handleReset = () => {
        setStep(0);
        setAnswers({});
        setRecommendation(null);
        setError(null);
        setIsLoading(false);
    };

    const handleSavePost = (postToSave: XiaohongshuPostType) => {
        const isAlreadySaved = savedPosts.some(p => p.title === postToSave.title && p.body === postToSave.body);
        if (isAlreadySaved) {
            return;
        }

        const newPost = { ...postToSave, id: Date.now() };
        const updatedPosts = [newPost, ...savedPosts];
        setSavedPosts(updatedPosts);

        try {
            localStorage.setItem('savedHealthPosts', JSON.stringify(updatedPosts));
        } catch (error) {
            console.error("Failed to save posts to local storage:", error);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <LoadingSpinner t={t} />;
        }
        if (error) {
            return (
                <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
                    <h3 className="text-xl font-bold text-red-400 mb-2">{t.errorTitle}</h3>
                    <p className="text-red-300">{error}</p>
                    <button onClick={handleReset} className="mt-6 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        {t.tryAgain}
                    </button>
                </div>
            );
        }
        if (recommendation) {
            const isCurrentPostSaved = savedPosts.some(
                p => p.title === recommendation.xiaohongshuPost.title && p.body === recommendation.xiaohongshuPost.body
            );
            return (
                <div className="w-full max-w-4xl mx-auto animate-fade-in">
                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 mb-8">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <BotIcon className="w-10 h-10 text-brand-primary" />
                            </div>
                            <div>
                               <h2 className="text-2xl font-bold text-slate-100 mb-2">{t.recommendationTitle}</h2>
                               <p className="text-slate-300">{recommendation.summary}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendation.recommendations.map((rec, index) => (
                            <RecommendationCard key={index} recommendation={rec} t={t} />
                        ))}
                    </div>

                    {recommendation.xiaohongshuPost && (
                        <div className="mt-16">
                             <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">{t.shareJourneyTitle}</h2>
                             <XiaohongshuPost
                                post={recommendation.xiaohongshuPost}
                                onSave={handleSavePost}
                                isSaved={isCurrentPostSaved}
                             />
                        </div>
                    )}

                     <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                         <button onClick={handleReset} className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg">
                            {t.startOver}
                        </button>
                        <button
                            onClick={() => setIsSearchModalOpen(true)}
                            disabled={savedPosts.length === 0}
                            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <DatabaseIcon className="w-5 h-5" />
                            {t.aiSearch}
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <Questionnaire
                step={step}
                setStep={setStep}
                questions={questions}
                answers={answers}
                onAnswer={handleAnswer}
                onSubmit={handleSubmit}
                t={t}
            />
        );
    };

    return (
        <div className="min-h-screen bg-slate-900 bg-grid-slate-700/[0.2] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 to-slate-900"></div>
            <div className="relative container mx-auto px-4 py-8 md:py-16">
                <Header setLanguage={setLanguage} t={t} />
                <main className="mt-12 md:mt-20">
                    {renderContent()}
                </main>
            </div>
            {isSearchModalOpen && (
                <SearchModal
                    isOpen={isSearchModalOpen}
                    onClose={() => setIsSearchModalOpen(false)}
                    savedPosts={savedPosts}
                    language={language}
                    t={t}
                />
            )}
        </div>
    );
};

export default App;