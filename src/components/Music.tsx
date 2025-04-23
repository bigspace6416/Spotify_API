"use client";

import { CgPlayPauseO, CgPlayButtonO } from "react-icons/cg"; // Combine imports
import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
// import SongControl from "@/components/SongControl";

interface MusicProps {
  title: string;
  artist: string;
  album?: string;
  previewUrl?: string;
  imgurl?: string; // Add previewUrl prop
  states: boolean;
}

const Music: React.FC<MusicProps> = ({
  title,
  artist,
  album,
  previewUrl,
  imgurl,
  states,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Create a ref for the audio element

  const playSong = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const pauseSong = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Effect to handle audio playback based on isPlaying state
  useEffect(() => {
    if (isPlaying) {
      playSong();
    } else {
      pauseSong();
    }
  }, [isPlaying, playSong, pauseSong]);

  return (
    <div className="flex items-center">
      {isPlaying ? (
        <CgPlayPauseO
          onClick={() => setIsPlaying(false)}
          size={60}
          aria-label="Pause"
        />
      ) : (
        <CgPlayButtonO
          onClick={() => setIsPlaying(true)}
          size={60}
          aria-label="Play"
        />
      )}
      <div className="flex  ml-[25px]  shadow-[0px_4px_30px_rgba(0,0,0,0.1)]">
        <Image
          src={imgurl || "/music.png"} // Ensure image exists at this path
          alt="Artist Image"
          className="rounded-[10px]"
          width={100}
          height={80}
        />
      </div>
      <div className="flex flex-col ml-[20px] w-full  rounded-[10px] p-[10px] shadow-[0px_4px_30px_rgba(0,0,0,0.1)]">
        <div className="text-2xl">{title}</div>
        <div>
          Artist: {artist} {album ? `Album: ${album}` : ""}
        </div>
      </div>
      <audio
        ref={audioRef}
        src={previewUrl}
        onEnded={() => setIsPlaying(false)}
      />
      {/* <SongControl /> */}
    </div>
  );
};

export default Music;
