import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [state, setState] = useState(() => {
        const saved = localStorage.getItem('drawagain-state');
        return saved ? JSON.parse(saved) : {
            weeklyGoal: 2,
            completedDrawings: [], // array of ISO strings
            lastVisit: new Date().toISOString()
        };
    });

    useEffect(() => {
        localStorage.setItem('drawagain-state', JSON.stringify(state));
    }, [state]);

    const setWeeklyGoal = (goal) => {
        setState(prev => ({ ...prev, weeklyGoal: goal }));
    };

    const addDrawing = () => {
        setState(prev => ({
            ...prev,
            completedDrawings: [...prev.completedDrawings, new Date().toISOString()]
        }));
    };

    const getProgress = () => {
        // Filter drawings for current week if we were doing real date math, 
        // but for this simple version, let's just count total or maybe reset manualy?
        // "Store weekly goal and progress". 
        // Let's assume progress is for the current "session" or week. 
        // For simplicity, let's just keep strict count for now, maybe add a reset logic later or just filter by week.
        // Let's filter by current week (starting Sunday or Monday).

        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        startOfWeek.setHours(0, 0, 0, 0);

        const validDrawings = state.completedDrawings.filter(d => new Date(d) >= startOfWeek);
        return validDrawings.length;
    };

    const remaining = Math.max(0, state.weeklyGoal - getProgress());

    return (
        <AppContext.Provider value={{
            state,
            setWeeklyGoal,
            addDrawing,
            progress: getProgress(),
            remaining
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}
