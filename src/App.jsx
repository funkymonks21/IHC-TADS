import React, { useState, useEffect } from 'react';
import { Droplet, X, ChevronRight, ChevronLeft, Check } from 'lucide-react'; 

import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import OnboardingScreen from './components/OnboardingScreen';
import AquafyteDashboard from './components/Dashboard';
import Profile from './components/Profile';
import HistoryScreen from './components/HistoryScreen';
import StatisticsScreen from './components/StatisticsScreen';

// ==========================================
// ROTEIRO DO TUTORIAL (Passo a Passo)
// ==========================================
const TOUR_STEPS = [
  {
    id: 'tour-progress',
    view: 'dashboard',
    title: 'Acompanhe seu Dia',
    text: 'Aqui você visualiza instantaneamente o quão perto está de bater suas metas de água e exercícios do dia.',
  },
  {
    id: 'tour-quick-add',
    view: 'dashboard',
    title: 'Registro Rápido',
    text: 'Sem tempo? Use estes atalhos para registrar copos ou garrafas de água com apenas 1 clique.',
  },
  {
    id: 'tour-fab',
    view: 'dashboard',
    title: 'Adicionar Atividades',
    text: 'Clique neste botão central para registrar seus treinos ou quantidades personalizadas de água.',
  },
  {
    id: 'tour-nav',
    view: 'dashboard',
    title: 'Navegação',
    text: 'Use a barra inferior para acessar seu histórico de dias anteriores, gráficos detalhados e seu perfil.',
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState('unlogged');
  const [userName, setUserName] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // ==========================================
  // ESTADO GLOBAL DO SISTEMA
  // ==========================================
  const [waterIntake, setWaterIntake] = useState(750);
  const [workoutDone, setWorkoutDone] = useState(false);
  
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

  // ==========================================
  // ESTADOS DO TUTORIAL (TOUR)
  // ==========================================
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);

  // Iniciar Tour
  const startTour = () => {
    setCurrentTourStep(0);
    setCurrentView(TOUR_STEPS[0].view);
    setIsTourActive(true);
  };

  // Finalizar Tour
  const endTour = () => {
    setIsTourActive(false);
    setTargetRect(null);
  };

  // Efeito Spotlight: Procura o ID da tela e marca o retângulo para o foco
  useEffect(() => {
    if (isTourActive) {
      const step = TOUR_STEPS[currentTourStep];
      
      if (currentView !== step.view) {
        setCurrentView(step.view);
      }

      const timer = setTimeout(() => {
        const element = document.getElementById(step.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          setTargetRect(rect);
        } else {
          setTargetRect(null); 
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isTourActive, currentTourStep, currentView]);

  // ==========================================
  // FUNÇÕES DE AÇÃO GERAIS
  // ==========================================
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
      
      {/* ========================================== */}
      {/* SIMULADOR DE NOTIFICAÇÃO PUSH */}
      {/* ========================================== */}
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

      {/* ========================================== */}
      {/* OVERLAY DO TUTORIAL (Efeito Spotlight) */}
      {/* ========================================== */}
      {isTourActive && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden flex flex-col transition-all duration-500">
          
          {/* Foco (Buraco transparente no fundo escuro) */}
          {targetRect && (
            <div 
              className="absolute rounded-2xl transition-all duration-500 ease-in-out bg-transparent"
              style={{
                top: targetRect.top - 8,
                left: targetRect.left - 8,
                width: targetRect.width + 16,
                height: targetRect.height + 16,
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
              }}
            />
          )}
          {!targetRect && <div className="absolute inset-0 bg-black bg-opacity-75" />}

          {/* CAIXA DE DIÁLOGO DO TUTORIAL */}
          <div 
            className="absolute z-10 w-[90%] max-w-sm left-1/2 transform -translate-x-1/2 pointer-events-auto bg-white rounded-2xl shadow-2xl p-5 animate-slide-up"
            style={{
              top: targetRect ? (targetRect.top > window.innerHeight / 2 ? targetRect.top - 180 : targetRect.bottom + 20) : '40%',
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-blue-600 flex items-center">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs mr-2">
                  {currentTourStep + 1}/{TOUR_STEPS.length}
                </span>
                {TOUR_STEPS[currentTourStep].title}
              </h3>
              <button onClick={endTour} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">{TOUR_STEPS[currentTourStep].text}</p>
            
            <div className="flex justify-between items-center">
              <button onClick={endTour} className="text-sm font-bold text-gray-400 hover:text-gray-600">
                Pular tour
              </button>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentTourStep(prev => Math.max(0, prev - 1))}
                  disabled={currentTourStep === 0}
                  className={`p-2 rounded-full ${currentTourStep === 0 ? 'text-gray-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {currentTourStep === TOUR_STEPS.length - 1 ? (
                  <button onClick={endTour} className="flex items-center px-4 py-2 bg-blue-600 text-white font-bold rounded-xl active:scale-95">
                    <Check className="w-4 h-4 mr-1"/> Concluir
                  </button>
                ) : (
                  <button onClick={() => setCurrentTourStep(prev => Math.min(TOUR_STEPS.length - 1, prev + 1))} className="flex items-center px-4 py-2 bg-blue-600 text-white font-bold rounded-xl active:scale-95">
                    Avançar <ChevronRight className="w-4 h-4 ml-1"/>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* ROTEADOR DE TELAS DO APLICATIVO */}
      {/* ========================================== */}
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
          <OnboardingScreen setCurrentView={setCurrentView} userName={userName} highContrast={highContrast} startTour={startTour} />
        )}
        {currentView === 'dashboard' && (
          <AquafyteDashboard 
            setCurrentView={setCurrentView} userName={userName} highContrast={highContrast} toggleHighContrast={toggleHighContrast} simulateNotification={simulateNotification}
            waterIntake={waterIntake} workoutDone={workoutDone} addWaterRecord={addWaterRecord} addWorkoutRecord={addWorkoutRecord}
            waterGoal={waterGoal} exercises={exercises} 
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
            waterGoal={waterGoal} setWaterGoal={setWaterGoal} exercises={exercises} setExercises={setExercises}
            startTour={startTour}
          />
        )}
      </div>
    </main>
  );
}