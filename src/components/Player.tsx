import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, 
  Volume2, VolumeX, Maximize2, ListMusic 
} from 'lucide-react';
import { Track } from '../types';
import { cn } from '../lib/utils';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSkipNext: () => void;
  onSkipBack: () => void;
}

export const Player = ({ currentTrack, isPlaying, onTogglePlay, onSkipNext, onSkipBack }: PlayerProps) => {
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
      setProgress(newProgress);
    }
  };

  if (!currentTrack) return (
    <div className="h-24 bg-[var(--bg-sidebar)] border-t border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] transition-colors duration-300">
      Select a track to start listening
    </div>
  );

  return (
    <div className="h-24 bg-[var(--bg-sidebar)] border-t border-[var(--border-color)] px-4 flex items-center justify-between gap-4 transition-colors duration-300">
      {/* Track Info */}
      <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
        <img 
          src={currentTrack.coverUrl} 
          alt={currentTrack.title} 
          className="w-14 h-14 rounded object-cover shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col overflow-hidden">
          <span className="text-[var(--text-primary)] text-sm font-medium truncate hover:underline cursor-pointer">
            {currentTrack.title}
          </span>
          <span className="text-[var(--text-secondary)] text-xs truncate hover:underline cursor-pointer">
            {currentTrack.artist}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-[600px]">
        <div className="flex items-center gap-6 text-[var(--text-secondary)]">
          <Shuffle size={18} className="hover:text-[var(--text-primary)] cursor-pointer transition-colors" />
          <SkipBack 
            size={24} 
            className="hover:text-[var(--text-primary)] cursor-pointer transition-colors" 
            onClick={onSkipBack}
          />
          <button 
            onClick={onTogglePlay}
            className="w-8 h-8 bg-[var(--text-primary)] rounded-full flex items-center justify-center text-[var(--bg-main)] hover:scale-105 transition-all shadow-md"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>
          <SkipForward 
            size={24} 
            className="hover:text-[var(--text-primary)] cursor-pointer transition-colors" 
            onClick={onSkipNext}
          />
          <Repeat size={18} className="hover:text-[var(--text-primary)] cursor-pointer transition-colors" />
        </div>
        
        <div className="flex items-center gap-2 w-full group">
          <span className="text-[10px] text-[var(--text-secondary)] min-w-[30px] text-right">
            {audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}
          </span>
          <div className="relative flex-1 h-1 flex items-center">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress || 0}
              onChange={handleProgressChange}
              className="absolute w-full h-1 bg-[var(--border-color)] rounded-full appearance-none cursor-pointer accent-[var(--text-primary)] group-hover:accent-green-500"
              style={{
                background: `linear-gradient(to right, var(--text-primary) ${progress}%, var(--border-color) ${progress}%)`
              }}
            />
          </div>
          <span className="text-[10px] text-[var(--text-secondary)] min-w-[30px]">
             {currentTrack.duration}
          </span>
        </div>
      </div>

      {/* Volume & Extra */}
      <div className="flex items-center justify-end gap-3 w-[30%] min-w-[180px] text-[var(--text-secondary)]">
        <ListMusic size={18} className="hover:text-[var(--text-primary)] cursor-pointer" />
        <div className="flex items-center gap-2 group w-32">
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-1 bg-[var(--border-color)] rounded-full appearance-none cursor-pointer accent-[var(--text-primary)] group-hover:accent-green-500"
          />
        </div>
        <Maximize2 size={18} className="hover:text-[var(--text-primary)] cursor-pointer" />
      </div>

      <audio 
        ref={audioRef} 
        src={currentTrack.audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={onSkipNext}
      />
    </div>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
