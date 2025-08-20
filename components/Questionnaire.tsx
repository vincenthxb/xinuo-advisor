
import React from 'react';
import type { Question, Answers } from '../types';
import type { Translations } from '../translations';

interface QuestionnaireProps {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    questions: Question[];
    answers: Answers;
    onAnswer: (questionId: string, value: string) => void;
    onSubmit: () => void;
    t: Translations['en'];
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ step, setStep, questions, answers, onAnswer, onSubmit, t }) => {
    const currentQuestion = questions[step];
    const isLastStep = step === questions.length - 1;

    return (
        <div className="w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-10 animate-fade-in">
            <div className="mb-8">
                <p className="text-sm font-medium text-brand-primary mb-2">{t.question} {step + 1} / {questions.length}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100">{currentQuestion.text}</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map(option => {
                    const isSelected = answers[currentQuestion.id] === option;
                    return (
                        <button
                            key={option}
                            onClick={() => {
                                onAnswer(currentQuestion.id, option);
                                if (isLastStep) onSubmit();
                            }}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-primary ${
                                isSelected 
                                ? 'bg-brand-primary border-brand-primary font-bold shadow-lg' 
                                : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500'
                            }`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
             <div className="flex justify-between items-center mt-8">
                <button 
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="py-2 px-4 rounded-md text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {t.back}
                </button>
                {/* On the last step, button is hidden as clicking an option submits */}
                {!isLastStep && (
                    <button 
                        onClick={() => setStep(s => Math.min(questions.length - 1, s + 1))}
                        disabled={!answers[currentQuestion.id]}
                        className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t.next}
                    </button>
                )}
            </div>
        </div>
    );
};