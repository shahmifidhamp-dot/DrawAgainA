import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';

const GOAL_OPTIONS = [
    { count: 1, label: "1 Drawing", subtitle: "Just begin gently", color: "bg-teal-50 border-teal-200 text-teal-700" },
    { count: 2, label: "2 Drawings", subtitle: "A calm start", color: "bg-lavender-50 border-lavender-200 text-lavender-700" },
    { count: 3, label: "3 Drawings", subtitle: "Building momentum", color: "bg-peach-50 border-peach-200 text-peach-700" },
    { count: 5, label: "5 Drawings", subtitle: "Creative flow", color: "bg-purple-50 border-purple-200 text-purple-700" },
    { count: 'custom', label: "Custom Goal", subtitle: "Set your own number", color: "bg-slate-50 border-slate-200 text-slate-700" }
];

export default function GoalSelection() {
    const navigate = useNavigate();
    const { setWeeklyGoal, state } = useApp();
    const [selected, setSelected] = useState(state.weeklyGoal || 2);
    const [customValue, setCustomValue] = useState(state.weeklyGoal > 5 ? state.weeklyGoal : '');

    const handleSelect = (option) => {
        if (option.count === 'custom') {
            setSelected('custom');
        } else {
            setSelected(option.count);
        }
    };

    const handleCustomChange = (e) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val > 0 && val <= 14) {
            setCustomValue(val);
        } else if (e.target.value === '') {
            setCustomValue('');
        }
    };

    const confirmGoal = () => {
        const goal = selected === 'custom' ? (customValue || 1) : selected;
        setWeeklyGoal(parseInt(goal));
        navigate('/planner');
    };

    return (
        <div className="flex flex-col items-center animate-in slide-in-from-right duration-500 w-full">
            <Card className="w-full space-y-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Your Weekly Goal</h2>
                    <p className="text-slate-500">Choose what feels easy. You can change this later.</p>
                </div>

                <div className="grid gap-3">
                    {GOAL_OPTIONS.map((option) => (
                        <div key={option.count} className="w-full">
                            <button
                                onClick={() => handleSelect(option)}
                                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left flex items-center justify-between group
                                    ${(selected === option.count)
                                        ? `${option.color} shadow-sm scale-[1.02]`
                                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full transition-colors duration-300 
                                        ${selected === option.count ? 'bg-current opacity-60' : 'bg-slate-200 group-hover:bg-slate-300'}`}
                                    />
                                    <div>
                                        <span className={`block text-lg font-semibold ${selected === option.count ? 'text-slate-900' : 'text-slate-700'}`}>
                                            {option.label}
                                        </span>
                                        <span className={`text-sm ${selected === option.count ? 'opacity-80' : 'text-slate-400'}`}>
                                            {option.subtitle}
                                        </span>
                                    </div>
                                </div>
                                {selected === option.count && (
                                    <div className="animate-in fade-in zoom-in duration-300">
                                        <Check className="w-5 h-5 opacity-50" />
                                    </div>
                                )}
                            </button>

                            {/* Custom Input Expand */}
                            {option.count === 'custom' && selected === 'custom' && (
                                <div className="mt-2 animate-in slide-in-from-top-2 fade-in duration-300 pl-4 pr-1">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="number"
                                            min="1"
                                            max="14"
                                            value={customValue}
                                            onChange={handleCustomChange}
                                            placeholder="#"
                                            className="w-20 p-3 rounded-xl border-2 border-slate-200 text-center font-bold text-lg text-slate-800 focus:border-slate-400 focus:outline-none"
                                            autoFocus
                                        />
                                        <span className="text-sm text-slate-500 font-medium">drawings per week</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="pt-4 space-y-4">
                    <Button
                        onClick={confirmGoal}
                        disabled={selected === 'custom' && !customValue}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white shadow-lg h-14 text-lg rounded-full"
                    >
                        Set Goal <ChevronRight className="w-5 h-5 ml-1 opacity-60" />
                    </Button>

                    <p className="text-xs text-center text-slate-400 font-medium">
                        This is not a commitment. You can adjust anytime.
                    </p>

                    <div className="border-t border-slate-50 pt-2">
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/')}
                            className="w-full text-slate-400 hover:text-slate-600 h-10 text-sm"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
