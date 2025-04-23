"use client";
import React, { useEffect, useState } from "react";
import Music from "@/components/Music";
import { customGet } from "@/utils/customGet";

interface Track {
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
}

const ASOT: React.FC = () => {
  const [album, setAlbum] = useState<Track[]>([]); // Use an array since it's expected to be a list of tracks
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const Get_track = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Access token not found.");
        setLoading(false);
        return;
      }

      try {
        const fetchedTrack = await customGet(
          "https://api.spotify.com/v1/albums/1Q5t5Wx4BuQV4TxKkuJh5F/tracks?limit=50",
          token
        );

        setAlbum(fetchedTrack.items || []); // Adjust based on actual structure
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch track data");
      } finally {
        setLoading(false);
      }
    };

    Get_track();
  }, []); // Empty dependency array means this runs once when the component mounts.

  useEffect(() => {
    console.log("Fetched album data: ", album);
  }, [album]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (album.length === 0) {
    return <div>No track available.</div>;
  }
  console.log("--album------------",album);
  return (
    <div className="flex flex-col">
      <div>
        {album.map((item, index) => (
          <Music
            key={index} // Ensure each child has a unique key prop
            title={item.name || "Unknown Title"} // Fetch title correctly
            artist={item.artists?.[0]?.name || "Unknown Artist"} // Fetch artist correctly
            album={item.album?.name || "Unknown Album"} // Fetch album correctly
            previewUrl="https://p.scdn.co/mp3-preview/d65ee77cdbd021fd0bb23addad7b6b0a4640eef0?cid=230be2f46909426b8b80cac36446b52a"
            imgurl={item.album?.images[0]?.url || ""} // Uncomment and use if available
            states={true}
          />
        ))}
      </div>
    </div>
  );
};

export default ASOT;