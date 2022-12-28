
import './App.css';
import { io } from "socket.io-client";
import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EnterPage } from './pages/EnterPage';
import { ChatRoom } from './pages/ChatRoom';
import { Footer } from './components/Footer';

function App() {




    



  return (
      <BrowserRouter>
         <Routes>
              <Route path="/" element={<EnterPage />} />
              <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>

      


  );
}

export default App;
