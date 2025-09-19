import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { SoundProvider } from './contexts/SoundContext';
import { QuizProvider } from './contexts/QuizContext';
import { LocalizationProvider } from './contexts/LocalizationContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SoundProvider>
        <LocalizationProvider>
          <QuizProvider>
            <App />
          </QuizProvider>
        </LocalizationProvider>
      </SoundProvider>
    </AuthProvider>
  </React.StrictMode>
);
