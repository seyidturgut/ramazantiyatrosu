'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PodcastCard from '@/components/PodcastCard';

const episodes = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `${i + 1}. Bölüm`,
  description: `Ramazan 2025 podcast serisi ${i + 1}. bölüm`,
  audioUrl: `/audios/episode-${i + 1}.mp3`, // Örnek ses dosyası yolu
  coverImage: `/images/episode-${i + 1}.jpg` // Varsayılan cover resmi
}));

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Ramazan 2025 Podcast Serisi
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <PodcastCard key={episode.id} episode={episode} />
          ))}
        </div>
      </motion.div>
    </main>
  );
}
