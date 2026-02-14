import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Palette, Check } from 'lucide-react';

export default function Planner() {
    const navigate = useNavigate();
    const { state, progress, remaining, addDrawing } = useApp();

    return (
        <div className="flex flex-col items-center animate-in fade-in duration-500 w-full">
            <Card className="w-full space-y-8">

                {/* Header */}
                <div className="space-y-2 text-center relative">
                    <h2 className="text-2xl font-bold text-slate-800">Your Week</h2>
                    <p className="text-slate-500">Gentle progress. No pressure.</p>
                </div>

                {/* Progress Display */}
                <div className="p-6 bg-cream-50 rounded-2xl border border-slate-100 space-y-4 text-center">

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
            </Card>
        </div>
    );
}
