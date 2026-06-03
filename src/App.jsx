import React, { useState } from 'react';
import { Droplet } from 'lucide-react'; 

import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import OnboardingScreen from './components/OnboardingScreen';
import AquafyteDashboard from './components/Dashboard';
import Profile from './components/Profile';
import HistoryScreen from './components/HistoryScreen';
import StatisticsScreen from './components/StatisticsScreen';

export default function App() {
  const [currentView, setCurrentView] = useState('unlogged');
  const [userName, setUserName] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // ==========================================
  // ESTADO GLOBAL (Dados de Progresso)
  // ==========================================
  const [waterIntake, setWaterIntake] = useState(750);
  const [workoutDone, setWorkoutDone] = useState(false);
  
  // ==========================================
  // ESTADO GLOBAL (Preferências do Usuário) <-- NOVO AQUI
  // ==========================================
  const [waterGoal, setWaterGoal] = useState(2500);
  const [exercises, setExercises] = useState([
    { id: 1, name: 'Calistenia', selected: true, duration: 60 },
    { id: 2, name: 'Musculação', selected: false, duration: 45 },
    { id: 3, name: 'Corrida', selected: false, duration: 30 },
  ]);

  const [activities, setActivities] = useState([
    { id: 1, type: 'water', title: 'Copo d\'água', detail: '250ml', time: '10:30', dateGroup: 'Hoje' },
    { id: 2, type: 'water', title: 'Garrafa', detail: '500ml', time: '09:15', dateGroup: 'Hoje' },
    { id: 3, type: 'workout', title: 'Musculação', detail: '45 min', time: '18:30', dateGroup: 'Ontem' },
    { id: 4, type: 'water', title: 'Copo d\'água', detail: '250ml', time: '15:00', dateGroup: 'Ontem' },
  ]);

  const toggleHighContrast = () => setHighContrast(!highContrast);

  const simulateNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 6000);
  };

  const addWaterRecord = (amount) => {
    setWaterIntake(prev => prev + amount);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRecord = {
      id: Date.now(),
      type: 'water',
      title: amount >= 500 ? 'Garrafa' : 'Copo d\'água',
      detail: `${amount}ml`,
      time: timeString,
      dateGroup: 'Hoje'
    };
    setActivities(prev => [newRecord, ...prev]);
  };

  const addWorkoutRecord = (title, duration) => {
    setWorkoutDone(true);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRecord = {
      id: Date.now(),
      type: 'workout',
      title: title,
      detail: `${duration} min`,
      time: timeString,
      dateGroup: 'Hoje'
    };
    setActivities(prev => [newRecord, ...prev]);
  };

  const deleteRecord = (id) => {
    const recordToDelete = activities.find(a => a.id === id);
    if (recordToDelete) {
      if (recordToDelete.dateGroup === 'Hoje') {
        if (recordToDelete.type === 'water') {
          const amount = parseInt(recordToDelete.detail.replace('ml', ''));
          setWaterIntake(prev => Math.max(0, prev - amount));
        } else if (recordToDelete.type === 'workout') {
          setWorkoutDone(false);
        }
      }
      setActivities(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <main lang="pt-BR" className={`relative min-h-screen flex justify-center ${highContrast ? 'bg-black' : 'bg-gray-100'}`}>
      
      {showNotification && (
        <div className="fixed top-4 w-[95%] max-w-sm bg-white rounded-2xl shadow-2xl z-[9999] border-l-4 border-blue-500 overflow-hidden transform transition-all duration-500 ease-out animate-slide-down">
          <div className="bg-gray-50 px-4 py-2 flex justify-between items-center border-b border-gray-100">
            <span className="text-xs font-bold text-gray-500 flex items-center"><Droplet className="w-3 h-3 mr-1 text-blue-500" /> AQUAFYTE</span>
            <span className="text-xs text-gray-400">AGORA</span>
          </div>
          <div className="p-4 cursor-pointer" onClick={() => setShowNotification(false)}>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Hora de se hidratar! 💧</h4>
            <p className="text-sm text-gray-600 leading-tight">Ei, notei que faz um tempinho que você não bebe água. Que tal um copo agora para manter o corpo 100%?</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white shadow-xl relative overflow-hidden">
        {currentView === 'unlogged' && (
          <WelcomeScreen setCurrentView={setCurrentView} highContrast={highContrast} toggleHighContrast={toggleHighContrast} />
        )}
        {currentView === 'login' && (
          <LoginScreen setCurrentView={setCurrentView} highContrast={highContrast} />
        )}
        {currentView === 'register' && (
          <RegisterScreen setCurrentView={setCurrentView} userName={userName} setUserName={setUserName} highContrast={highContrast} />
        )}
        {currentView === 'onboarding' && (
          <OnboardingScreen setCurrentView={setCurrentView} userName={userName} highContrast={highContrast} />
        )}
        {currentView === 'dashboard' && (
          <AquafyteDashboard 
            setCurrentView={setCurrentView} userName={userName} highContrast={highContrast} toggleHighContrast={toggleHighContrast} simulateNotification={simulateNotification}
            waterIntake={waterIntake} workoutDone={workoutDone} addWaterRecord={addWaterRecord} addWorkoutRecord={addWorkoutRecord}
            waterGoal={waterGoal} exercises={exercises} // <-- Passando as preferências pro Dash
          />
        )}
        {currentView === 'history' && (
          <HistoryScreen 
            setCurrentView={setCurrentView} highContrast={highContrast} toggleHighContrast={toggleHighContrast}
            activities={activities} deleteRecord={deleteRecord}
          />
        )}
        {currentView === 'statistics' && (
          <StatisticsScreen 
            setCurrentView={setCurrentView} highContrast={highContrast} 
          />
        )}
        {currentView === 'profile' && (
          <Profile 
            setCurrentView={setCurrentView} userName={userName} highContrast={highContrast} toggleHighContrast={toggleHighContrast} 
            waterGoal={waterGoal} setWaterGoal={setWaterGoal} exercises={exercises} setExercises={setExercises} // <-- Passando pro Perfil editar
          />
        )}
      </div>
    </main>
  );
}