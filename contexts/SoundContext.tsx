import React, { createContext, useContext, ReactNode, useState, useRef, useEffect, useCallback } from 'react';

// The soundSources object is updated to reflect your new local file path.
// The other URLs are kept for consistency but should be updated with local paths as well for a production environment.
const soundSources = {
  correct: '/sounds/success.mp3', // Example path if you place it in a 'public/sounds' folder
  incorrect: '/sounds/failure.mp3', // Example path
  click: '/sounds/switch_on.mp3', // Example path
  complete: '/sounds/digital_watch_alarm_long.mp3', // Example path
  background: '/bg.mp3' // Corrected path to your file in the root directory
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

  // The `useEffect` hook has been simplified.
  // We will now rely on the `toggleMute` function to handle playback based on user interaction.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
    }
  }, []);

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
    setIsMuted(prev => {
      const newMutedState = !prev;
      if (audioRef.current) {
        if (newMutedState) {
          audioRef.current.pause();
        } else {
          // If not muted and audio is paused, play it.
          if (audioRef.current.paused) {
            audioRef.current.play().catch(e => console.warn("Background audio playback failed.", e));
          }
        }
      }
      return newMutedState;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {/* The 'loop' attribute is added here to make the audio repeat automatically. */}
      <audio ref={audioRef} src={soundSources.background} loop />
      {children}
    </SoundContext.Provider>
  );
};
