import './App.css';
import { useState, useEffect } from 'react';
import DreamForm from './components/DreamForm';
import DreamHistory from './components/DreamHistory';
import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function App() {
  const [dreams, setDreams] = useState([]);

  const handleSave = async(entry) => {
    try {
      await addDoc(collection(db, 'dreams'), entry);
      setDreams([entry, ...dreams]);
    } catch (e) {
      console.error('Save error', e);
    }
  };

 const loadDreams = async () => {
    const snapshot = await getDocs(collection(db, 'dreams'));
    const entries = snapshot.docs.map(doc => doc.data()).reverse();
    setDreams(entries);
  };

  useEffect(() => {
    loadDreams();
  }, []);

  
  return (
    <div className="container">
      <h1>I See Dreams</h1>
      <p>Record your dreams, uncover their meaning, and receive a daily phrase to guide your day. </p>
      <p>Dive deep into your inner world.</p>
      <DreamForm onSave={handleSave} />
      <DreamHistory dreams={dreams} />    
    </div>
  );
}

export default App;
