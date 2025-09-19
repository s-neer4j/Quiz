import React, { createContext, useContext, ReactNode, useState, useRef, useEffect, useCallback } from 'react';

const soundSources = {
  correct: 'https://storage.googleapis.com/interactive-canvas-tools/sounds/v1/positive/success.mp3',
  incorrect: 'https://storage.googleapis.com/interactive-canvas-tools/sounds/v1/negative/failure.mp3',
  click: 'https://storage.googleapis.com/interactive-canvas-tools/sounds/v1/ui/switch_on.mp3',
  complete: 'https://storage.googleapis.com/interactive-canvas-tools/sounds/v1/alarms/digital_watch_alarm_long.mp3',
  background: 'https://storage.googleapis.com/pedagogical-bucket/lofi-vibes.mp3'
};

export type SoundKey = keyof typeof soundSources;

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (key: SoundKey) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = 0.1;
        if (isMuted) {
            audioRef.current.pause();
        } else {
            if(audioRef.current.paused) {
                audioRef.current.play().catch(e => console.warn("Background audio playback failed.", e));
            }
        }
    }
  }, [isMuted]);

  const playSound = useCallback((key: SoundKey) => {
    if (isMuted) return;
    
    try {
      const audio = new Audio(soundSources[key]);
      audio.volume = key === 'complete' ? 0.4 : 0.3;
      audio.play().catch(e => console.warn(`Failed to play sound: ${key}`, e));
    } catch (e) {
      console.error(`Error playing sound for key ${key}:`, e);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      <audio ref={audioRef} src={soundSources.background} loop />
      {children}
    </SoundContext.Provider>
  );
};
