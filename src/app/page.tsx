'use client'
import React, { use, useEffect, useState } from "react";
import axios from "axios";

const qs = require('qs');


export default function MusicList() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSpotifyToken();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(accessToken)
  }, [accessToken]);

  const getSpotifyToken = async () => {
    console.log(process.env);
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID; 
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET; 
    let queryParam = qs.stringify({
      'grant_type': 'client_credentials',
      'client_id': clientId,
      'client_secret': clientSecret,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://accounts.spotify.com/api/token',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      data : queryParam
    };
    try {
      await axios.request(config)
      .then((response) => {
        setAccessToken(response.data.access_token);
        localStorage.setItem('accessToken', response.data.access_token);
      })
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <>
      <div className="flex flex-col">HomePage</div>
    </>
  );
}
