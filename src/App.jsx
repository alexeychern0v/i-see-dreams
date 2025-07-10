import './App.css';
import { useState } from 'react';
import DreamForm from './components/DreamForm';

function App() {
  const [dreams, setDreams] = useState([]);

  const handleSave = (entry) => {
    setDreams([entry, ...dreams]);
    // DB later
  };
  
  return (
    <div className="container">
      <h1>I See Dreams</h1>
      <p>Record your dreams, uncover their meaning, and receive a daily phrase to guide your day. </p>
      <p>Dive deep into your inner world.</p>
      <DreamForm onSave={handleSave} />
    </div>
  );
}

export default App;