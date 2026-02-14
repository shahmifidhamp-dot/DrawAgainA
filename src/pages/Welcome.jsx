import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight, PenTool } from 'lucide-react';

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col relative overflow-hidden">
            {/* Header / Logo */}
            <div className="w-full py-6 flex justify-center md:justify-start relative z-20">
                <div className="flex items-center gap-2.5 text-slate-800">
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                        <PenTool className="w-5 h-5 text-peach-400 transform -rotate-12" />
                    </div>
                    <span className="text-xl font-bold tracking-tight font-sans">
                        DrawAgain
                    </span>
                </div>
            </div>

            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-peach-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" />
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-lavender-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="w-full grid md:grid-cols-2 gap-12 items-center relative z-10 py-8">
                {/* Content Section */}
                <div className="space-y-8 text-center md:text-left">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-600 text-sm font-semibold tracking-wide shadow-sm border border-slate-100">
                            <Sparkles className="w-4 h-4 text-peach-400" />
                            <span>Creative Wellness Journey</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-slate-800 tracking-tight leading-tight">
                            Rediscover the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-peach-400 to-lavender-400">
                                joy of drawing
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
                            You don’t need motivation or perfect technique.
                            You just need a quiet place to start tailored to your pace.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start pt-4">
                        <Button
                            onClick={() => navigate('/goal')}
                            className="h-16 px-10 text-xl rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 md:w-auto w-full group"
                        >
                            Start Drawing
                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <p className="text-sm text-slate-400 font-medium pt-4">
                        Join 10,000+ others finding calm in creativity
                    </p>
                </div>

                {/* Visual/Card Section */}
                <div className="hidden md:flex justify-center">
                    <Card className="w-full max-w-md bg-white/90 backdrop-blur aspect-square flex flex-col items-center justify-center p-12 text-center space-y-6 rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl border-none">
                        <div className="w-24 h-24 rounded-full bg-cream-50 flex items-center justify-center border-4 border-white shadow-inner">
                            <Sparkles className="w-10 h-10 text-peach-300" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-slate-800">Daily Prompts</h3>
                            <p className="text-slate-500">Gentle ideas to get you moving without pressure.</p>
                        </div>
                        <div className="flex gap-2 pt-4">
                            <div className="w-12 h-1.5 rounded-full bg-slate-100"></div>
                            <div className="w-8 h-1.5 rounded-full bg-lavender-200"></div>
                            <div className="w-12 h-1.5 rounded-full bg-slate-100"></div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
