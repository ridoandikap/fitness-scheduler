import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Activity, 
  Plus, 
  Clock, 
  Trophy, 
  Home, 
  User, 
  CheckCircle2
} from 'lucide-react';

const DAYS = [
  { id: 1, label: 'Mo', date: '16' },
  { id: 2, label: 'Tu', date: '17' },
  { id: 3, label: 'We', date: '18' },
  { id: 4, label: 'Th', date: '19' },
  { id: 5, label: 'Fr', date: '20' },
  { id: 6, label: 'Sa', date: '21' },
  { id: 7, label: 'Su', date: '22' },
];

const INITIAL_WORKOUTS = [
  { id: 1, day: 1, title: 'Morning Yoga', duration: '20 min', category: 'Flexibility', completed: true },
  { id: 2, day: 1, title: 'Upper Body Blast', duration: '45 min', category: 'Strength', completed: false },
  { id: 3, day: 2, title: 'HIIT Session', duration: '30 min', category: 'Cardio', completed: false },
  { id: 4, day: 3, title: 'Leg Day', duration: '50 min', category: 'Strength', completed: false },
];

function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [workouts, setWorkouts] = useState(INITIAL_WORKOUTS);

  const filteredWorkouts = workouts.filter(w => w.day === selectedDay);
  const completedCount = workouts.filter(w => w.completed).length;

  const toggleComplete = (id) => {
    setWorkouts(prev => prev.map(w => 
      w.id === id ? { ...w, completed: !w.completed } : w
    ));
  };

  return (
    <div className="app-container">
      <header style={{ marginBottom: '32px' }}>
        <p className="text-dim">Good Morning, Rido</p>
        <h1 className="h1">Today's Goals</h1>
      </header>

      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          minHeight: '160px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 style={{ fontSize: '32px', marginBottom: '4px' }}>{Math.round((completedCount / workouts.length) * 100)}%</h2>
            <p className="text-dim">Overall progress</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontWeight: 600 }}>{completedCount}/{workouts.length}</p>
            <p className="text-dim">Tasks done</p>
          </div>
        </div>
      </motion.div>

      <div className="day-selector">
        {DAYS.map(day => (
          <div 
            key={day.id}
            className={`day-item ${selectedDay === day.id ? 'active' : ''}`}
            onClick={() => setSelectedDay(day.id)}
          >
            <p style={{ fontSize: '12px', opacity: 0.8 }}>{day.label}</p>
            <p style={{ fontWeight: 800, fontSize: '18px' }}>{day.date}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 className="h2" style={{ marginBottom: 0 }}>Schedule</h2>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <motion.div 
              key={workout.id}
              className="workout-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
            >
              <div className="exercise-icon">
                {workout.category === 'Strength' ? <Activity size={24} /> : <Clock size={24} />}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{workout.title}</h3>
                <p className="text-dim">{workout.duration} • {workout.category}</p>
              </div>
              <div onClick={() => toggleComplete(workout.id)} style={{ cursor: 'pointer' }}>
                {workout.completed ? (
                  <CheckCircle2 color="#3b82f6" fill="#3b82f633" size={28} />
                ) : (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '40px 0' }}
          >
            <p className="text-dim">No workouts scheduled for today</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="glass-card add-btn" style={{ 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '12px',
        padding: '16px',
        background: 'rgba(59, 130, 246, 0.1)',
        color: '#3b82f6',
        border: '1px dashed rgba(59, 130, 246, 0.5)',
        marginTop: '12px',
        cursor: 'pointer'
      }}>
        <Plus size={20} />
        <span style={{ fontWeight: 600 }}>Add Exercise</span>
      </button>

      <nav className="bottom-nav">
        <div className="nav-item active"><Home size={24} /></div>
        <div className="nav-item"><Calendar size={24} /></div>
        <div className="nav-item"><Trophy size={24} /></div>
        <div className="nav-item"><User size={24} /></div>
      </nav>
    </div>
  );
}

export default App;
