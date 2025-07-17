import './App.css';
import { useState, useEffect } from 'react';
import DreamForm from './components/DreamForm';
import DreamHistory from './components/DreamHistory';
import AuthForm from './components/AuthForm';
import { db } from './firebase';
import { auth } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [dreams, setDreams] = useState([]);

  const handleSave = async(entry) => {
    try {
      await addDoc(collection(db, 'dreams'), { ...entry, userId: user.uid });
      setDreams([entry, ...dreams]);
    } catch (e) {
      console.error('Save error', e);
    }
  };

 const loadDreams = async () => {
    const q = query(collection(db, 'dreams'), where('userId', '==', user.uid));
    const snapshot = await getDocs(q);
    const entries = snapshot.docs.map(doc => doc.data()).reverse();
    setDreams(entries);
  };

  useEffect(() => {
    if (user) {
      loadDreams(user.uid);
    }
  }, [user]);

  if (!user) {
    return <AuthForm onLogin={setUser} />;
  }
  

  return (
    <div className="container">
      <div className="top-bar">
        <h1>I See Dreams</h1>
        <button onClick={() => { signOut(auth); setUser(null); }}>Log out</button>
        <p>Record your dreams, uncover their meaning, and receive a daily phrase to guide your day. </p>
        <p>Dive deep into your inner world.</p>
      </div>
      <DreamForm onSave={handleSave} />
      <DreamHistory dreams={dreams} />    
    </div>
  );
}

export default App;
