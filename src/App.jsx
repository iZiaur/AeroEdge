import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import ChatInterface from './components/ChatInterface'
import EdgePerformance from './components/EdgePerformance'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer';
import DefectDetection from './components/DefectDetection';
import EngineHealth from './components/EngineHealth';
import ActivityStream from './components/ActivityStream';
import WorkOrders from './components/WorkOrders';
import ToastContainer from './components/Toast';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
function App() {
  const [currentView, setCurrentView] = useState('landing');

  const startTour = () => {
    const changeView = (view) => {
      setCurrentView(view);
    };

    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      onNextClick: (element, step, { state }) => {
        const nextIndex = state.activeIndex + 1;
        
        if (nextIndex === 4) {
          changeView('defect-detection');
          setTimeout(() => driverObj.moveNext(), 400);
        } else if (nextIndex === 5) {
          changeView('engine-health');
          setTimeout(() => driverObj.moveNext(), 400);
        } else if (nextIndex === 6) {
          changeView('activity-stream');
          setTimeout(() => driverObj.moveNext(), 400);
        } else if (nextIndex === 7) {
          changeView('work-orders');
          setTimeout(() => driverObj.moveNext(), 400);
        } else if (nextIndex === 8) {
          changeView('chat');
          setTimeout(() => driverObj.moveNext(), 400);
        } else if (nextIndex === 9) {
          changeView('landing');
          setTimeout(() => driverObj.moveNext(), 400);
        } else {
          driverObj.moveNext();
        }
      },
      steps: [
        { element: '.hero-heading-bold', popover: { title: 'Welcome to AeroEdge', description: 'This is the Multi-Agent Edge AI Platform designed for next-gen aircraft maintenance.', side: 'bottom', align: 'start' }},
        { element: '.hero-3d-wrapper', popover: { title: 'Live 3D Digital Twin', description: 'This 3D model is connected to live fleet telemetry. Try rotating it! The red engine indicates an anomaly detected in real-time.', side: 'left', align: 'start' }},
        { element: '.hero-stats', popover: { title: 'Edge Computing Benchmark', description: 'Unlike cloud AI, AeroEdge runs directly on the aircraft hardware. This results in sub-50ms latency for critical defect detection.', side: 'top', align: 'start' }},
        { element: '.navbar-links', popover: { title: 'The AI Suite', description: 'Next, we will head over to the Vision Agent tab to see how it detects defects. Click Next to travel there automatically!', side: 'bottom', align: 'start' }},
        { element: '.defect-container', popover: { title: 'Automated Image Analysis', description: 'The Vision AI scans uploaded images to instantly identify corrosion, cracks, and structural wear with 95%+ accuracy. Let us move to the Engine Health tab.', side: 'left', align: 'center' }},
        { element: '.eh-container', popover: { title: 'RUL Prediction', description: 'The Remaining Useful Life agent uses telemetry to predict exactly how many flight cycles an engine has left before failure. Next is the Agent Stream.', side: 'top', align: 'start' }},
        { element: '.stream-container', popover: { title: 'Agent Activity Stream', description: 'Watch the agents talk to each other! The Vision agent alerts the RUL agent, who then alerts the Work Order agent in a live chain reaction.', side: 'left', align: 'start' }},
        { element: '.wo-container', popover: { title: 'Work Order Matrix', description: 'Finally, the AI drafts a complete repair plan, calculates parts costs, and cross-references FAA/EASA compliance rules automatically.', side: 'top', align: 'center' }},
        { element: '.chat-container', popover: { title: 'Fleet Intelligence', description: 'You can query the entire system using Natural Language powered by an Open-Source LLM (e.g., Llama 3). Ask it anything!', side: 'left', align: 'start' }},
        { popover: { title: 'Tour Complete', description: 'You have seen the entire AeroEdge platform. Feel free to explore on your own!' } }
      ]
    });
    driverObj.drive(0);
  };

  useEffect(() => {
    const handleTourView = (e) => setCurrentView(e.detail);
    window.addEventListener('tour-change-view', handleTourView);
    window.addEventListener('start-global-tour', startTour);
    return () => {
      window.removeEventListener('tour-change-view', handleTourView);
      window.removeEventListener('start-global-tour', startTour);
    };
  }, []);

  return (
    <>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main>
        {currentView === 'landing' ? (
          <>
            <Hero setCurrentView={setCurrentView} />
            <Features />
            <ChatInterface />
            <EdgePerformance />
            <CallToAction />
          </>
        ) : currentView === 'defect-detection' ? (
          <DefectDetection />
        ) : currentView === 'engine-health' ? (
          <EngineHealth />
        ) : currentView === 'activity-stream' ? (
          <ActivityStream />
        ) : currentView === 'work-orders' ? (
          <WorkOrders />
        ) : currentView === 'chat' ? (
          <div style={{ padding: '60px 0', background: '#f5f5f7', minHeight: '80vh' }}>
             <ChatInterface />
          </div>
        ) : (
          <div style={{ padding: 120, textAlign: 'center', color: '#1a1a2e', minHeight: '80vh', background: '#f5f5f7' }}>
            <h2>Module Under Development</h2>
            <p>This section is coming in a future stage.</p>
          </div>
        )}
      </main>
      
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App
