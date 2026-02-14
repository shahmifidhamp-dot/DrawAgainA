import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, RefreshCw, PenTool, Lightbulb, Sparkles } from 'lucide-react';

const MAIN_PROMPTS = [
    "Draw your favorite beverage.",
    "Draw a plant from memory.",
    "Draw lines that represent your current mood.",
    "Draw an object on your desk.",
    "Draw a cloud formation.",
    "Draw a memory from childhood.",
    "Draw the view from a window.",
    "Draw simple shapes overlapping.",
    "Draw something that makes you feel safe."
];

const SUPPORTING_IDEAS = [
    "Try drawing it without erasing.",
    "Focus on the negative space.",
    "Use only one continuous line.",
    "Draw it as a simple geometric shape first.",
    "Focus on shadows and light.",
    "Don't lift your pencil.",
    "Draw with your non-dominant hand.",
    "Zoom in on one detail.",
    "Add a surreal element."
];

const STYLES = [
    "Soft & Calm",
    "Loose Sketch",
    "Minimalist",
    "Cartoon Style",
    "Abstract",
    "Detailed",
    "Rough & Quick"
];

export default function Prompts() {
    const navigate = useNavigate();
    const [promptData, setPromptData] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const getNewPrompt = () => {
        setIsAnimating(true);
        setTimeout(() => {
            const main = MAIN_PROMPTS[Math.floor(Math.random() * MAIN_PROMPTS.length)];
            const idea = SUPPORTING_IDEAS[Math.floor(Math.random() * SUPPORTING_IDEAS.length)];
            const style = STYLES[Math.floor(Math.random() * STYLES.length)];

            setPromptData({ main, idea, style });
            setIsAnimating(false);
        }, 400);
    };

    return (
        <div className="flex flex-col items-center animate-in fade-in duration-500 w-full">
            <Card className="w-full text-center space-y-8 flex flex-col min-h-[500px] justify-between">

                {/* Header */}
                <div className="flex flex-col items-center justify-center relative z-10 space-y-2 pt-2">
                    <div className="text-xs font-semibold bg-lavender-50 text-lavender-600 px-3 py-1 rounded-full uppercase tracking-wider">
                        Prompt Generator
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center space-y-8 relative z-10 w-full max-w-2xl mx-auto">
                    {promptData ? (
                        <div className="space-y-10 animate-in zoom-in duration-500">

                            {/* Style Pill */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-peach-50 text-peach-600 text-sm font-medium border border-peach-100 mx-auto shadow-sm">
                                <Sparkles className="w-4 h-4" />
                                {promptData.style}
                            </div>

                            {/* Main Prompt */}
                            <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                                    {promptData.main}
                                </h2>
                            </div>

                            {/* Supporting Idea */}
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Creative Spark</p>
                                <p className="text-lg text-slate-600 flex items-center justify-center gap-2 font-medium">
                                    <Lightbulb className="w-5 h-5 text-lavender-400" />
                                    {promptData.idea}
                                </p>
                            </div>

                            <div className="pt-4 max-w-xs mx-auto">
                                <Button variant="outline" onClick={getNewPrompt} disabled={isAnimating} className="w-full h-14 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 text-lg">
                                    <RefreshCw className={`w-5 h-5 mr-3 ${isAnimating ? 'animate-spin' : ''}`} />
                                    New Theme
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 py-8">
                            <div className="w-24 h-24 bg-lavender-50 rounded-full flex items-center justify-center mx-auto text-lavender-400 border border-lavender-100 shadow-sm">
                                <PenTool className="w-10 h-10 opacity-75" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold text-slate-800">Need inspiration?</h2>
                                <p className="text-lg text-slate-500 max-w-md mx-auto">Get a drawing prompt along with gentle creative helpers to spark your flow.</p>
                            </div>
                            <div className="max-w-xs mx-auto pt-4">
                                <Button onClick={getNewPrompt} size="lg" className="w-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg h-16 text-xl rounded-full">
                                    Give me a theme
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-6 border-t border-slate-50 w-full">
                    <Button variant="ghost" onClick={() => navigate('/planner')} className="text-slate-400 hover:text-slate-600">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Planner
                    </Button>
                </div>

            </Card>
        </div>
    );
}
