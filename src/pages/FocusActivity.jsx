import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Play, Check, X, Pause, RotateCcw, Timer, Wind, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TIME_OPTIONS = [
    { mins: 1, label: "1 Min", subtitle: "Just start" },
    { mins: 3, label: "3 Mins", subtitle: "Warm up" },
    { mins: 5, label: "5 Mins", subtitle: "Gentle focus" },
    { mins: 10, label: "10 Mins", subtitle: "Deep flow" },
    { mins: 15, label: "15 Mins", subtitle: "Creative immersion" },
    { mins: 'custom', label: "Custom", subtitle: "Set your own" }
];

const MODES = [
    { id: 'focus', label: "Focus", icon: Timer, color: "text-slate-600", bg: "bg-slate-100" },
    { id: 'flow', label: "Flow", icon: Sparkles, color: "text-peach-600", bg: "bg-peach-50" },
    { id: 'calm', label: "Calm", icon: Wind, color: "text-lavender-600", bg: "bg-lavender-50" }
];

const MESSAGES = [
    "Just keep moving your pencil.",
    "No erasing. No judging.",
    "Breathe.",
    "Let the lines be imperfect.",
    "Focus on the feeling of drawing.",
    "You are doing enough.",
    "Stay with the line.",
    "Soft hands, easy mind."
];

export default function FocusActivity() {
    const navigate = useNavigate();
    const { addDrawing } = useApp();

    // State
    const [step, setStep] = useState('select'); // select, timer, complete
    const [selectedTime, setSelectedTime] = useState(3);
    const [customTime, setCustomTime] = useState('');
    const [mode, setMode] = useState('focus');

    // Timer State
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [message, setMessage] = useState(MESSAGES[0]);
    const timerRef = useRef(null);

    // Timer Logic
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && step === 'timer' && isActive) {
            setIsActive(false);
            setStep('complete');
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft, step]);

    // Message Cycling
    useEffect(() => {
        if (isActive && timeLeft % 30 === 0 && timeLeft > 0) {
            setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
        }
    }, [timeLeft, isActive]);

    const handleStart = () => {
        const mins = selectedTime === 'custom' ? (parseInt(customTime) || 1) : selectedTime;
        setTimeLeft(mins * 60);
        setIsActive(true);
        setStep('timer');
    };

    const handleReset = () => {
        setIsActive(false);
        setStep('select');
        clearInterval(timerRef.current);
    };

    const togglePause = () => {
        setIsActive(!isActive);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate progress for circle (simplified visual)
    const totalTime = (selectedTime === 'custom' ? (parseInt(customTime) || 1) : selectedTime) * 60;
    const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

    if (step === 'select') {
        return (
            <div className="flex flex-col items-center animate-in fade-in duration-500 w-full">
                <Card className="w-full space-y-8 py-8 md:py-12">
                    <div className="space-y-3 text-center">
                        <h2 className="text-3xl font-bold text-slate-800">Focus Session</h2>
                        <p className="text-slate-500 font-medium">This is not about finishing. It’s about starting.</p>
                    </div>

                    {/* Mode Selection */}
                    <div className="flex justify-center gap-4">
                        {MODES.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMode(m.id)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 w-24
                                    ${mode === m.id ? `${m.bg} ring-2 ring-offset-2 ring-slate-200 scale-105` : 'hover:bg-slate-50 opacity-60 hover:opacity-100'}
                                `}
                            >
                                <m.icon className={`w-6 h-6 ${m.color}`} />
                                <span className={`text-xs font-bold uppercase tracking-wider ${mode === m.id ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {m.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Time Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {TIME_OPTIONS.map((opt) => (
                            <button
                                key={opt.mins}
                                onClick={() => setSelectedTime(opt.mins)}
                                className={`p-4 rounded-2xl border-2 text-left transition-all duration-200
                                    ${selectedTime === opt.mins
                                        ? 'border-slate-800 bg-slate-50 shadow-md transform scale-[1.02]'
                                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                                    }
                                `}
                            >
                                <span className={`block text-lg font-bold ${selectedTime === opt.mins ? 'text-slate-900' : 'text-slate-700'}`}>
                                    {opt.label}
                                </span>
                                <span className="text-xs text-slate-400 font-medium">{opt.subtitle}</span>
                            </button>
                        ))}
                    </div>

                    {/* Custom Input */}
                    {selectedTime === 'custom' && (
                        <div className="animate-in fade-in slide-in-from-top-2">
                            <div className="flex items-center justify-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <span className="text-sm font-bold text-slate-500 uppercase">Duration:</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    placeholder="Min"
                                    value={customTime}
                                    onChange={(e) => setCustomTime(e.target.value)}
                                    className="w-20 p-2 text-center text-xl font-bold bg-white border-b-2 border-slate-200 focus:border-slate-800 focus:outline-none"
                                    autoFocus
                                />
                                <span className="text-sm font-bold text-slate-500 uppercase">Minutes</span>
                            </div>
                        </div>
                    )}

                    <div className="pt-4 border-t border-slate-50 space-y-4">
                        <Button
                            onClick={handleStart}
                            disabled={selectedTime === 'custom' && !customTime}
                            className="w-full h-14 text-lg rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg"
                        >
                            Start Session
                        </Button>
                        <Button variant="ghost" onClick={() => navigate('/planner')} className="w-full text-slate-400 hover:text-slate-600">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Planner
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    if (step === 'timer') {
        return (
            <div className={`flex flex-col items-center animate-in zoom-in duration-700 w-full transition-colors duration-1000
                ${mode === 'flow' ? 'bg-peach-50/10' : ''}
                ${mode === 'calm' ? 'bg-lavender-50/10' : ''}
            `}>
                <Card className="w-full flex flex-col items-center text-center space-y-12 py-16 relative overflow-hidden">

                    {/* Background Ambience */}
                    {mode === 'flow' && (
                        <div className="absolute inset-0 pointer-events-none opacity-30">
                            <div className="absolute top-10 left-10 w-64 h-64 bg-peach-200 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
                            <div className="absolute bottom-10 right-10 w-64 h-64 bg-lavender-200 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                        </div>
                    )}
                    {mode === 'calm' && (
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
                            <div className={`w-96 h-96 bg-lavender-200 rounded-full filter blur-3xl transition-transform duration-[4000ms] ease-in-out ${isActive ? 'scale-125' : 'scale-100'}`} />
                        </div>
                    )}

                    <div className="relative z-10 space-y-8 w-full">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                                {isActive ? (mode === 'calm' ? 'Breathe' : 'Focusing') : 'Paused'}
                            </h3>
                            <div className="text-8xl md:text-9xl font-bold text-slate-800 tabular-nums tracking-tighter">
                                {formatTime(timeLeft)}
                            </div>
                        </div>

                        <div className="h-16 flex items-center justify-center">
                            <p className="text-xl md:text-2xl text-slate-600 font-medium italic animate-pulse duration-[3000ms] max-w-lg leading-relaxed px-6">
                                "{message}"
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-6 pt-8">
                            <Button
                                onClick={togglePause}
                                variant="outline"
                                className="w-16 h-16 rounded-full border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center"
                            >
                                {isActive ? <Pause className="w-6 h-6 text-slate-600" /> : <Play className="w-6 h-6 text-slate-600 ml-1" />}
                            </Button>
                            <Button
                                onClick={handleReset}
                                variant="ghost"
                                className="text-slate-400 hover:text-red-400"
                            >
                                Stop
                            </Button>
                        </div>
                    </div>

                    {/* Progress Bar (Bottom) */}
                    <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full">
                        <div
                            className="h-full bg-slate-800 transition-all duration-1000 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </Card>
            </div>
        );
    }

    if (step === 'complete') {
        return (
            <div className="flex flex-col items-center animate-in zoom-in duration-500 w-full">
                <Card className="max-w-xl w-full text-center space-y-10 py-16">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 border border-green-100 shadow-sm animate-bounce-short">
                        <Check className="w-12 h-12" />
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-4xl font-bold text-slate-800">Session complete ✨</h2>
                        <p className="text-xl text-slate-500">You showed up for yourself today.</p>
                    </div>

                    <div className="grid gap-4 pt-8 max-w-xs mx-auto w-full">
                        <Button
                            onClick={() => { addDrawing(); navigate('/planner'); }}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg h-14 text-lg rounded-full"
                        >
                            Mark as Done
                        </Button>
                        <Button variant="ghost" onClick={() => navigate('/planner')} className="w-full text-slate-500">
                            Back to Planner
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return null;
}
