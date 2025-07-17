import './App.css';
import { useState, useEffect } from 'react';
import DreamForm from './components/DreamForm';
import DreamHistory from './components/DreamHistory';
import AuthForm from './components/AuthForm';
import { db } from './firebase';
import { auth } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  return () => unsubscribe();
  }, []);

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

  if (loading) return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;

  if (!user) {
    return <AuthForm onLogin={setUser} />;
  }
  

  return (
    <>
    <div className="top-right-controls">
      <div className="tooltip-wrapper">
        <button className="about-button">❔</button>
        <div className="tooltip-text">
          <strong>About</strong><br />
          Hi, it's Alexey Chernov.<br />
          I created this simple web site for my project in Holberton School based in Paris.<br />
          "I See Dreams" helps you to record your dreams, uncover their meaning, and receive a daily phrase to guide your day.<br />
          I will soon add more different fun tools and good design.<br />
          My Github @alexeychern0v<br />
        </div>
      </div>
      <button className="logout-button" onClick={() => { signOut(auth); setUser(null); }}>🚪➜</button>
    </div>

    <div className="container">
      <div className="top-bar">
        <h1>I See Dreams</h1>
        <p>Record your dreams, uncover their meaning, and receive a daily phrase to guide your day. </p>
        <p>Dive deep into your inner world.</p>
      </div>
      <DreamForm onSave={handleSave} />
      <DreamHistory dreams={dreams} />    
    </div>
  </>
  );
}

export default App;
