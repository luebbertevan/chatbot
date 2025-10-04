import { createContext, useContext, useRef } from "react";

type MusicContextType = {
  play: () => void;
  pause: () => void;
  setTrack: (src: string) => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used within MusicProvider");
  return context;
};

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => audioRef.current?.play();
  const pause = () => audioRef.current?.pause();
  const setTrack = (src: string) => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.play();
    }
  };

  return (
    <MusicContext.Provider value={{ play, pause, setTrack }}>
      {children}
      <audio ref={audioRef} loop />
    </MusicContext.Provider>
  );
}
