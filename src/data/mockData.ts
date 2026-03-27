import { Track, Playlist } from './types';

export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    duration: '4:03',
    coverUrl: 'https://picsum.photos/seed/m83/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    duration: '3:50',
    coverUrl: 'https://picsum.photos/seed/weeknd/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    coverUrl: 'https://picsum.photos/seed/afterhours/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: '3:23',
    coverUrl: 'https://picsum.photos/seed/dualipa/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: '5',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: '3:58',
    coverUrl: 'https://picsum.photos/seed/glassanimals/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: '6',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'F*CK LOVE 3: OVER YOU',
    duration: '2:21',
    coverUrl: 'https://picsum.photos/seed/stay/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Today\'s Top Hits',
    description: 'The hottest tracks right now.',
    coverUrl: 'https://picsum.photos/seed/tophits/400/400',
    tracks: MOCK_TRACKS.slice(0, 4)
  },
  {
    id: 'p2',
    name: 'Chill Vibes',
    description: 'Relax and unwind with these smooth tunes.',
    coverUrl: 'https://picsum.photos/seed/chill/400/400',
    tracks: MOCK_TRACKS.slice(2, 6)
  },
  {
    id: 'p3',
    name: 'Workout Energy',
    description: 'Get your heart rate up.',
    coverUrl: 'https://picsum.photos/seed/workout/400/400',
    tracks: [MOCK_TRACKS[0], MOCK_TRACKS[3], MOCK_TRACKS[5]]
  }
];
