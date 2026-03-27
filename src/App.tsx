/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { MainContent } from './components/MainContent';
import { MOCK_PLAYLISTS, MOCK_TRACKS } from './data/mockData';
import { Track } from './types';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayTrack = useCallback((track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  }, [currentTrack, isPlaying]);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleSkipNext = useCallback(() => {
    const currentIndex = MOCK_TRACKS.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % MOCK_TRACKS.length;
    setCurrentTrack(MOCK_TRACKS[nextIndex]);
    setIsPlaying(true);
  }, [currentTrack]);

  const handleSkipBack = useCallback(() => {
    const currentIndex = MOCK_TRACKS.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = (currentIndex - 1 + MOCK_TRACKS.length) % MOCK_TRACKS.length;
    setCurrentTrack(MOCK_TRACKS[prevIndex]);
    setIsPlaying(true);
  }, [currentTrack]);

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-secondary)] font-sans selection:bg-green-500/30 transition-colors duration-300">
        <div className="flex-1 flex overflow-hidden p-2 gap-2">
          <Sidebar />
          <MainContent 
            playlists={MOCK_PLAYLISTS} 
            onPlayTrack={handlePlayTrack}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
          />
        </div>
        <Player 
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onSkipNext={handleSkipNext}
          onSkipBack={handleSkipBack}
        />
      </div>
    </ThemeProvider>
  );
}
