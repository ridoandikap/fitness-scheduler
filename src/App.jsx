import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Play, 
  Home, 
  BarChart2, 
  Settings, 
  Zap,
  Info
} from 'lucide-react';

const WORKOUT_DATA = {
  "1": [
    { id: 'd1-1', title: 'Seated DB Overhead Press', stats: '4 sets x 10-12 reps x 3.4 kg', category: 'Shoulders' },
    { id: 'd1-2', title: 'Wide Grip Lat Pulldown', stats: '4 sets x 10-12 reps x 20 kg', category: 'Back' },
    { id: 'd1-3', title: 'Dumbbell Hip Thrust', stats: '3 sets x 10-12 reps x 10.2 kg', category: 'Glutes' },
    { id: 'd1-4', title: 'Smith Machine Lunge', stats: '3 sets x 8-10 reps x 11.3 kg', category: 'Legs' },
    { id: 'd1-5', title: 'Roman Chair Side Bend', stats: '3 sets x 10-12 reps x 3.4 kg', category: 'Core' },
    { id: 'd1-6', title: 'Dumbbell Upright Row', stats: '3 sets x 12-15 reps x 4.5 kg', category: 'Shoulders', superset: true },
  ],
  "2": [
    { id: 'd2-1', title: 'Machine Supported Pull Ups', stats: '4 sets x 8-10 reps x 40.8 kg', category: 'Back' },
    { id: 'd2-2', title: 'Push Up', stats: '4 sets x 3 reps', category: 'Chest' },
    { id: 'd2-3', title: 'Hip Thrust Machine', stats: '3 sets x 12-15 reps x 18.1 kg', category: 'Glutes' },
    { id: 'd2-4', title: 'Dumbbell Lunge', stats: '3 sets x 8-10 reps x 4.5 kg', category: 'Legs' },
    { id: 'd2-5', title: 'Seated Cable Russian Twist', stats: '3 sets x 8-10 reps x 4.5 kg', category: 'Core' },
    { id: 'd2-6', title: 'Standing DB Lateral Raise', stats: '3 sets x 12-15 reps x 2.2 kg', category: 'Shoulders', superset: true },
  ],
  "3": [
    { id: 'd3-1', title: 'Floor Back Extension', stats: '3 sets x 10 reps', category: 'Lower Back' },
    { id: 'd3-2', title: 'Leg Press Selector Machine', stats: '3 sets x 10-12 reps x 40 kg', category: 'Legs' },
    { id: 'd3-3', title: 'Incline Barbell Bench Press', stats: '3 sets x 8-10 reps x 22.6 kg', category: 'Chest' },
    { id: 'd3-4', title: 'Neutral Grip Lat Pulldown', stats: '3 sets x 10-12 reps x 22.6 kg', category: 'Back' },
    { id: 'd3-5', title: 'V Sit Ups', stats: '4 sets x 10 reps', category: 'Core' },
    { id: 'd3-6', title: 'Standing Cable Hip Extension', stats: '4 sets x 15-20 reps x 4.5 kg', category: 'Glutes', superset: true },
  ],
  "4": [
    { id: 'd4-1', title: 'Goblet Squat', stats: '4 sets x 8-10 reps x 9 kg', category: 'Legs' },
    { id: 'd4-2', title: 'Lying Leg Curl Machine', stats: '4 sets x 12-15 reps x 13.6 kg', category: 'Legs' },
    { id: 'd4-3', title: 'Underhand Grip Lat Pulldown', stats: '3 sets x 10-12 reps x 18.1 kg', category: 'Back' },
    { id: 'd4-4', title: 'Seated DB Overhead Press', stats: '3 sets x 10-12 reps x 3.4 kg', category: 'Shoulders' },
    { id: 'd4-5', title: 'Abduction Machine', stats: '3 sets x 10-12 reps x 31.7 kg', category: 'Glutes' },
    { id: 'd4-6', title: 'Lying Leg Raise', stats: '3 sets x 8 reps', category: 'Core', superset: true },
  ]
};

function App() {
  const [selectedDay, setSelectedDay] = useState("1");
  const [progress, setProgress] = useState({});

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fitSched_progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  const toggleExercise = (id) => {
    const newProgress = { ...progress, [id]: !progress[id] };
    setProgress(newProgress);
    localStorage.setItem('fitSched_progress', JSON.stringify(newProgress));
  };

  const currentWorkouts = WORKOUT_DATA[selectedDay];
  const totalInDay = currentWorkouts.length;
  const completedInDay = currentWorkouts.filter(ex => progress[ex.id]).length;
  const percentComplete = Math.round((completedInDay / totalInDay) * 100);

  const resetAll = () => {
    if (confirm('Reset seluruh progres minggu ini?')) {
      setProgress({});
      localStorage.removeItem('fitSched_progress');
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <p className="day-label">Training Plan</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="title">Full Body</h1>
          <button onClick={resetAll} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '12px' }}>Reset</button>
        </div>
      </header>

      {/* Progress Ring Area */}
      <div className="progress-ring-container" style={{ pointerEvents: 'none' }}>
        <svg width="180" height="180">
          <circle cx="90" cy="90" r="80" stroke="var(--border)" strokeWidth="12" fill="none" />
          <motion.circle 
            cx="90" cy="90" r="80" 
            stroke="var(--accent)" 
            strokeWidth="12" 
            fill="none" 
            strokeDasharray="502.4"
            initial={{ strokeDashoffset: 502.4 }}
            animate={{ strokeDashoffset: 502.4 - (502.4 * percentComplete / 100) }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="progress-info" style={{ pointerEvents: 'auto' }}>
          <h2>{percentComplete}%</h2>
          <p className="text-dim">Completed</p>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="tabs">
        {["1", "2", "3", "4"].map(num => (
          <button 
            key={num}
            className={`tab ${selectedDay === num ? 'active' : ''}`}
            onClick={() => {
              console.log("Switching to Day ", num);
              setSelectedDay(num);
            }}
          >
            Day {num}
          </button>
        ))}
      </div>

      {/* Workout List */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedDay}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          {currentWorkouts.map(ex => (
            <div 
              key={ex.id} 
              className={`workout-card ${progress[ex.id] ? 'completed' : ''}`}
              onClick={() => toggleExercise(ex.id)}
            >
              <div className="workout-image">
                <img src="/hero.png" alt={ex.title} style={{ opacity: 0.1 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={24} color={progress[ex.id] ? 'var(--success)' : 'var(--text-dim)'} />
                </div>
              </div>
              <div className="workout-details">
                <h3>{ex.title}</h3>
                <p className="workout-stats">{ex.stats}</p>
                {ex.superset && <span className="superset-badge">Superset</span>}
              </div>
              <div className={`check-btn ${progress[ex.id] ? 'active' : ''}`}>
                {progress[ex.id] && <Check size={18} color="white" />}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <button className="start-btn" onClick={() => alert('Feature coming soon: Active Timer!')}>
        START WORKOUT
      </button>

      {/* Bottom Nav */}
      <nav className="footer-nav">
        <div className="nav-link active">
          <Home size={24} />
          <span>HOME</span>
        </div>
        <div className="nav-link">
          <BarChart2 size={24} />
          <span>PROGRESS</span>
        </div>
        <div className="nav-link">
          <Info size={24} />
          <span>TIPS</span>
        </div>
        <div className="nav-link">
          <Settings size={24} />
          <span>SETTINGS</span>
        </div>
      </nav>
    </div>
  );
}

export default App;
