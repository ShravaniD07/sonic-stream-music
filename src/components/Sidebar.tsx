import React from 'react';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active }: SidebarItemProps) => (
  <div className={cn(
    "flex items-center gap-4 px-4 py-2 cursor-pointer transition-colors group",
    active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
  )}>
    <Icon size={24} className={cn("transition-transform group-hover:scale-110")} />
    <span className="font-semibold text-sm">{label}</span>
  </div>
);

export const Sidebar = () => {
  return (
    <div className="w-64 bg-[var(--bg-sidebar)] h-full flex flex-col gap-2 transition-colors duration-300">
      <div className="flex flex-col gap-2 bg-[var(--bg-card)] rounded-lg py-2 shadow-sm border border-[var(--border-color)]">
        <SidebarItem icon={Home} label="Home" active />
        <SidebarItem icon={Search} label="Search" />
      </div>

      <div className="flex-1 bg-[var(--bg-card)] rounded-lg flex flex-col overflow-hidden shadow-sm border border-[var(--border-color)]">
        <div className="px-4 py-4 flex items-center justify-between text-[var(--text-secondary)]">
          <div className="flex items-center gap-2 hover:text-[var(--text-primary)] cursor-pointer transition-colors">
            <Library size={24} />
            <span className="font-semibold text-sm">Your Library</span>
          </div>
          <PlusSquare size={20} className="hover:text-[var(--text-primary)] cursor-pointer" />
        </div>

        <div className="flex flex-col gap-2 px-2 overflow-y-auto">
          <div className="flex items-center gap-3 p-2 hover:bg-[var(--bg-card-hover)] rounded-md cursor-pointer group transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-700 to-blue-300 rounded flex items-center justify-center shadow-md">
              <Heart size={20} fill="white" className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[var(--text-primary)] text-sm font-medium">Liked Songs</span>
              <span className="text-[var(--text-secondary)] text-xs">Playlist • 42 songs</span>
            </div>
          </div>
          
          {/* Mock Playlists */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2 hover:bg-[var(--bg-card-hover)] rounded-md cursor-pointer group transition-colors">
              <img 
                src={`https://picsum.photos/seed/playlist-${i}/48/48`} 
                alt="Playlist" 
                className="w-12 h-12 rounded object-cover shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="text-[var(--text-primary)] text-sm font-medium truncate">My Playlist #{i + 1}</span>
                <span className="text-[var(--text-secondary)] text-xs">Playlist • User</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
