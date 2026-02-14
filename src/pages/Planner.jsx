import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Palette, Check, RotateCcw, AlertTriangle } from 'lucide-react';

export default function Planner() {
    const navigate = useNavigate();
    const { state, progress, remaining, addDrawing, resetWeek } = useApp();
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [showResetSuccess, setShowResetSuccess] = useState(false);

    const handleReset = () => {
        resetWeek();
        setShowResetConfirm(false);
        setShowResetSuccess(true);
        setTimeout(() => setShowResetSuccess(false), 3000);
    };

    return (
        <div className="flex flex-col items-center animate-in fade-in duration-500 w-full">
            <Card className="w-full space-y-8 relative overflow-hidden">

                {/* Header */}
                <div className="space-y-2 text-center relative">
                    <h2 className="text-2xl font-bold text-slate-800">Your Week</h2>
                    <p className="text-slate-500">Gentle progress. No pressure.</p>
                </div>

                {/* Progress Display */}
                <div className="p-6 bg-cream-50 rounded-2xl border border-slate-100 space-y-4 text-center relative">

                    {showResetSuccess && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300 rounded-2xl z-10">
                            <p className="text-teal-600 font-bold flex items-center gap-2">
                                <Check className="w-5 h-5" /> Week reset successfully ✨
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-1">
                        <span className="text-5xl font-bold text-slate-800">{remaining}</span>
                        <span className="text-slate-500 font-medium text-sm uppercase tracking-wide">Drawings Remaining</span>
                    </div>

                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-peach-300 transition-all duration-1000 ease-out rounded-full"
                            style={{ width: `${(progress / state.weeklyGoal) * 100}%` }}
                        />
                    </div>

                    <p className="text-xs text-slate-400">
                        {progress} completed of {state.weeklyGoal} goal
                    </p>
                </div>

                {/* Reset Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setShowResetConfirm(true)}
                        className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors px-3 py-1 rounded-full hover:bg-red-50"
                    >
                        <RotateCcw className="w-3 h-3" /> Reset Week
                    </button>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <Button
                        onClick={addDrawing}
                        className="w-full bg-lavender-200 hover:bg-lavender-100 text-slate-800 shadow-soft h-14 text-lg font-medium"
                    >
                        <Check className="w-5 h-5 mr-2" />
                        I Drew Today
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/focus')}
                            className="h-auto py-4 flex flex-col gap-1 items-center justify-center hover:bg-white hover:border-peach-200"
                        >
                            <Calendar className="w-5 h-5 text-peach-300" />
                            <span className="text-sm font-medium text-slate-600">Focus Timer</span>
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => navigate('/prompts')}
                            className="h-auto py-4 flex flex-col gap-1 items-center justify-center hover:bg-white hover:border-lavender-200"
                        >
                            <Palette className="w-5 h-5 text-lavender-300" />
                            <span className="text-sm font-medium text-slate-600">Get Prompt</span>
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => navigate('/gallery')}
                            className="col-span-1 md:col-span-2 h-auto py-3 flex flex-row gap-2 items-center justify-center hover:bg-white hover:border-slate-200 mt-2"
                        >
                            <span className="text-sm font-medium text-slate-500">View My Gallery</span>
                        </Button>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-50">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/goal')}
                        className="w-full text-slate-400 hover:text-slate-600"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Goal
                    </Button>
                </div>

                {/* Reset Confirmation Modal */}
                {showResetConfirm && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur z-20 flex flex-col items-center justify-center p-6 space-y-6 text-center animate-in fade-in duration-200">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-400">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-800">Reset this week?</h3>
                            <p className="text-sm text-slate-500 max-w-xs mx-auto">This will clear your current progress. You can start fresh.</p>
                        </div>
                        <div className="flex gap-3 w-full max-w-xs">
                            <Button
                                variant="outline"
                                onClick={() => setShowResetConfirm(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleReset}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                            >
                                Yes, Reset
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
