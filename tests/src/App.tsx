import React from 'react';
import { Navbar } from './components/Navbar';
import { TaskManager } from './components/TaskManager';
import { Footer } from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <TaskManager />
      <Footer />
    </div>
  );
}

export default App;
