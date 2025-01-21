'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, ClockIcon } from '@heroicons/react/24/solid';
import ReactPlayer from 'react-player';

interface Episode {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  coverImage: string;
}

interface PodcastCardProps {
  episode: Episode;
}

export default function PodcastCard({ episode }: PodcastCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioExists, setAudioExists] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Ses dosyasının varlığını kontrol et
    fetch(episode.audioUrl)
      .then(response => {
        setAudioExists(response.ok);
      })
      .catch(() => {
        setAudioExists(false);
      });
  }, [episode.audioUrl]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-gray-700">
        {!imageError ? (
          <Image
            src={episode.coverImage}
            alt={`${episode.title} kapak resmi`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
            <span className="text-gray-400 text-lg">Resim Yükleniyor</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-purple-400">{episode.title}</h2>
        {audioExists ? (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors"
          >
            {isPlaying ? (
              <PauseIcon className="h-6 w-6 text-white" />
            ) : (
              <PlayIcon className="h-6 w-6 text-white" />
            )}
          </button>
        ) : (
          <div className="flex items-center text-gray-400">
            <ClockIcon className="h-5 w-5 mr-1" />
            <span className="text-sm">Yakında</span>
          </div>
        )}
      </div>

      <p className="text-gray-300 mb-4">{episode.description}</p>

      {audioExists && (
        <>
          <div className="hidden">
            <ReactPlayer
              url={episode.audioUrl}
              playing={isPlaying}
              controls
              width="100%"
              height="50px"
              onEnded={() => setIsPlaying(false)}
            />
          </div>

          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: isPlaying ? "100%" : "0%" }}
              transition={{ duration: 30, ease: "linear" }}
            />
          </div>
        </>
      )}
    </motion.div>
  );
} 