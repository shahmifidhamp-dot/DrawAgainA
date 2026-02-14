import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [state, setState] = useState(() => {
        const saved = localStorage.getItem('drawagain-state');
        const defaultState = {
            weeklyGoal: 2,
            completedDrawings: 0,
            weekStartDate: new Date().toISOString(),
            lastVisit: new Date().toISOString()
        };

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Ensure migration/structure
                return {
                    ...defaultState,
                    ...parsed,
                    // If previous version had array for completedDrawings, reset to 0 or length
                    completedDrawings: Array.isArray(parsed.completedDrawings) ? parsed.completedDrawings.length : (parsed.completedDrawings || 0)
                };
            } catch (e) {
                return defaultState;
            }
        }
        return defaultState;
    });

    // Auto-reset logic on load / mount
    useEffect(() => {
        const checkWeekReset = () => {
            const now = new Date();
            const start = new Date(state.weekStartDate);
            const diffTime = Math.abs(now - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 7) {
                setState(prev => ({
                    ...prev,
                    completedDrawings: 0,
                    weekStartDate: now.toISOString()
                }));
            }
        };

        checkWeekReset();
    }, []); // Run once on mount

    useEffect(() => {
        localStorage.setItem('drawagain-state', JSON.stringify(state));
    }, [state]);

    const setWeeklyGoal = (goal) => {
        // Requirement: Reset completed drawings when new goal is set
        setState(prev => ({
            ...prev,
            weeklyGoal: goal,
            completedDrawings: 0,
            weekStartDate: new Date().toISOString() // Optional: Resets week start too? Request implied "Start New Week" is separate, but "Reset completed drawings count to 0" on new goal usually implies a fresh start.
        }));
    };

    const addDrawing = () => {
        setState(prev => ({
            ...prev,
            completedDrawings: prev.completedDrawings + 1
        }));
    };

    const resetWeek = () => {
        setState(prev => ({
            ...prev,
            completedDrawings: 0,
            weekStartDate: new Date().toISOString()
        }));
    };

    const remaining = Math.max(0, state.weeklyGoal - state.completedDrawings);

    return (
        <AppContext.Provider value={{
            state,
            setWeeklyGoal,
            addDrawing,
            resetWeek,
            progress: state.completedDrawings,
            remaining
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}
