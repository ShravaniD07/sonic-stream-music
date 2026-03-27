import React from 'react';
import { Play, Heart, Clock, Sun, Moon } from 'lucide-react';
import { Track } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface MainContentProps {
  playlists: any[];
  onPlayTrack: (track: Track) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
}

export const MainContent = ({ playlists, onPlayTrack, currentTrack, isPlaying }: MainContentProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex-1 bg-gradient-to-b from-[var(--header-gradient-from)] to-[var(--bg-main)] overflow-y-auto relative transition-colors duration-300">
      <header className="sticky top-0 h-16 bg-transparent z-10 flex items-center px-8 justify-between">
        <div className="flex gap-4">
          <button className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-[var(--text-primary)] hover:bg-black/40 transition-colors">
            &lt;
          </button>
          <button className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-[var(--text-primary)] hover:bg-black/40 transition-colors">
            &gt;
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] hover:scale-105 transition-all shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="bg-[var(--text-primary)] text-[var(--bg-main)] font-bold py-2 px-4 rounded-full text-sm hover:scale-105 transition-all shadow-md">
            Explore Premium
          </button>
          <div className="w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] text-xs font-bold shadow-sm">
            SD
          </div>
        </div>
      </header>

      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Good afternoon</h1>
        
        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {playlists.slice(0, 6).map((playlist) => (
            <motion.div 
              key={playlist.id}
              whileHover={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}
              className="bg-[var(--bg-card)]/40 rounded-md flex items-center gap-4 group cursor-pointer overflow-hidden border border-[var(--border-color)]/50"
            >
              <img 
                src={playlist.coverUrl} 
                alt={playlist.name} 
                className="w-20 h-20 object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <span className="text-[var(--text-primary)] font-bold truncate flex-1">{playlist.name}</span>
              <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 mr-4">
                <Play fill="black" className="text-black ml-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Sections */}
        <Section title="Made For You" playlists={playlists} />
        <Section title="Recently Played" playlists={playlists.slice().reverse()} />
        
        {/* Track List Example */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Recommended Tracks</h2>
          <div className="flex flex-col">
            <div className="grid grid-cols-[16px_1fr_1fr_40px] gap-4 px-4 py-2 text-[var(--text-secondary)] text-sm border-b border-[var(--border-color)] mb-2">
              <span>#</span>
              <span>Title</span>
              <span>Album</span>
              <Clock size={16} />
            </div>
            {playlists[0].tracks.map((track: Track, i: number) => (
              <TrackRow 
                key={track.id} 
                track={track} 
                index={i + 1} 
                onPlay={() => onPlayTrack(track)}
                isActive={currentTrack?.id === track.id}
                isPlaying={isPlaying && currentTrack?.id === track.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, playlists }: { title: string, playlists: any[] }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] hover:underline cursor-pointer">{title}</h2>
      <span className="text-[var(--text-secondary)] text-sm font-bold hover:underline cursor-pointer">Show all</span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {playlists.map((playlist) => (
        <motion.div 
          key={playlist.id}
          whileHover={{ backgroundColor: 'var(--bg-card-hover)' }}
          className="bg-[var(--bg-card)]/40 p-4 rounded-lg cursor-pointer group transition-colors border border-[var(--border-color)]/30"
        >
          <div className="relative mb-4">
            <img 
              src={playlist.coverUrl} 
              alt={playlist.name} 
              className="w-full aspect-square object-cover rounded-md shadow-lg"
              referrerPolicy="no-referrer"
            />
            <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <Play fill="black" className="text-black ml-1" />
            </button>
          </div>
          <h3 className="text-[var(--text-primary)] font-bold mb-1 truncate">{playlist.name}</h3>
          <p className="text-[var(--text-secondary)] text-sm line-clamp-2">{playlist.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const TrackRow = ({ track, index, onPlay, isActive, isPlaying }: { 
  track: Track, 
  index: number, 
  onPlay: () => void,
  isActive: boolean,
  isPlaying: boolean
}) => (
  <div 
    onClick={onPlay}
    className={cn(
      "grid grid-cols-[16px_1fr_1fr_40px] gap-4 px-4 py-2 rounded-md hover:bg-[var(--bg-card-hover)] group cursor-pointer transition-colors items-center",
      isActive ? "text-green-500" : "text-[var(--text-secondary)]"
    )}
  >
    <div className="flex items-center justify-center">
      {isPlaying ? (
        <div className="flex items-end gap-0.5 h-3">
          <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-green-500" />
          <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-green-500" />
          <motion.div animate={{ height: [12, 8, 12] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-0.5 bg-green-500" />
        </div>
      ) : (
        <span className="group-hover:hidden">{index}</span>
      )}
      <Play size={12} fill="currentColor" className="hidden group-hover:block" />
    </div>
    <div className="flex items-center gap-3 overflow-hidden">
      <img src={track.coverUrl} alt="" className="w-10 h-10 rounded shadow-sm" referrerPolicy="no-referrer" />
      <div className="flex flex-col overflow-hidden">
        <span className={cn("text-sm font-medium truncate", isActive ? "text-green-500" : "text-[var(--text-primary)]")}>
          {track.title}
        </span>
        <span className="text-xs truncate group-hover:text-[var(--text-primary)] transition-colors">{track.artist}</span>
      </div>
    </div>
    <span className="text-sm truncate">{track.album}</span>
    <div className="flex items-center gap-4">
      <Heart size={16} className="opacity-0 group-hover:opacity-100 hover:text-[var(--text-primary)]" />
      <span className="text-sm">{track.duration}</span>
    </div>
  </div>
);
