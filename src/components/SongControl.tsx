import React, { Component } from 'react';
import moment from 'moment';
import './SongControls.css';

interface SongControlsProps {
  timeElapsed: number;
  songPlaying: boolean;
  songPaused: boolean;
  songName: string;
  artistName: string;
  stopSong: () => void;
  resumeSong: () => void;
  increaseSongTime: (time: number) => void;
  pauseSong: () => void;
  songs: Array<{ track: string }>; // Adjust the type as per the actual song object structure
  songDetails: { track: string }; // Adjust the type as necessary
  audioControl: (song: { track: string }) => void; // Adjust type as necessary
}

interface SongControlsState {
  timeElapsed: number;
  intervalId?: NodeJS.Timeout; // NodeJS.Timeout is the type for setInterval
}

class SongControls extends Component<SongControlsProps, SongControlsState> {
  state: SongControlsState = {
    timeElapsed: this.props.timeElapsed,
  };

  componentDidUpdate(prevProps: SongControlsProps) {
    if (!this.props.songPlaying) {
      clearInterval(this.state.intervalId);
    }

    if (this.props.songPlaying && this.props.timeElapsed === 0 && prevProps.timeElapsed === 0) {
      clearInterval(this.state.intervalId);
      this.calculateTime();
    }

    this.setState({
      timeElapsed: this.props.timeElapsed,
    });
  }

  calculateTime() {
    const intervalId = setInterval(() => {
      if (this.state.timeElapsed >= 30) {
        clearInterval(this.state.intervalId);
        this.props.stopSong();
      } else if (!this.props.songPaused) {
        this.props.increaseSongTime(this.state.timeElapsed + 1);
      }
    }, 1000);

    this.setState({
      intervalId: intervalId as unknown as NodeJS.Timeout, // Typing hack to satisfy TypeScript
    });
  }

  getSongIndex = (): number | undefined => {
    const { songs, songDetails } = this.props;
    return songs.findIndex((song) => song.track === songDetails.track);
  };

  nextSong = () => {
    const { songs, audioControl } = this.props;
    const currentIndex = this.getSongIndex();
    if (currentIndex !== undefined) {
      audioControl(songs[(currentIndex + 1) % songs.length]);
    }
  };

  prevSong = () => {
    const { songs, audioControl } = this.props;
    const currentIndex = this.getSongIndex();
    if (currentIndex !== undefined) {
      audioControl(songs[(currentIndex - 1 + songs.length) % songs.length]);
    }
  };

  render() {
    const showPlay = this.props.songPaused ? 'fa fa-play-circle-o play-btn' : 'fa fa-pause-circle-o pause-btn';

    return (
      <div className='song-player-container'>
        <div className='song-details'>
          <p className='song-name'>{this.props.songName}</p>
          <p className='artist-name'>{this.props.artistName}</p>
        </div>
        <div className='song-controls'>
          <div onClick={this.prevSong} className='reverse-song'>
            <i className="fa fa-step-backward reverse" aria-hidden="true" />
          </div>
          <div className='play-btn'>
            <i onClick={!this.props.songPaused ? this.props.pauseSong : this.props.resumeSong} className={`fa play-btn ${showPlay}`} aria-hidden="true" />
          </div>
          <div onClick={this.nextSong} className='next-song'>
            <i className="fa fa-step-forward forward" aria-hidden="true" />
          </div>
        </div>
        <div className='song-progress-container'>
          <p className='timer-start'>{moment().minutes(0).second(this.state.timeElapsed).format('m:ss')}</p>
          <div className='song-progress'>
            <div style={{ width: this.state.timeElapsed * 16.5 }} className='song-expired' />
          </div>
          <p className='timer-end'>{moment().minutes(0).second(30 - this.state.timeElapsed).format('m:ss')}</p>
        </div>
      </div>
    );
  }
}

export default SongControls;