import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Welcome from './pages/Welcome';
import GoalSelection from './pages/GoalSelection';
import Planner from './pages/Planner';
// Import other pages later
import FocusActivity from './pages/FocusActivity';
import Prompts from './pages/Prompts';
import Gallery from './pages/Gallery';

// Placeholder components until implemented
// const FocusActivity = () => <div>Focus Activity Placeholder</div>;
// const Prompts = () => <div>Prompts Placeholder</div>;


import Layout from './components/Layout';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center p-4 font-sans text-slate-700">
          <Layout>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/goal" element={<GoalSelection />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/focus" element={<FocusActivity />} />
              <Route path="/prompts" element={<Prompts />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
