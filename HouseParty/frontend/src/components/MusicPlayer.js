import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
  Box,
  responsiveFontSizes,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";

function MusicPlayer({
  title,
  artist,
  duration,
  time,
  image_url,
  is_playing,
  votes,
  id,
}) {
  const pauseSong = () => {
    const requestOptions = {
      method: "PUT",
      header: { "Content-type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions).then((response) => {
      if (!response.ok) {
        console.log("could not pause the song");
      }
    });
  };

  const playSong = () => {
    const requestOptions = {
      method: "PUT",
      header: { "Content-type": "application/json" },
    };
    fetch("/spotify/play", requestOptions).then((response) => {
      if (!response.ok) {
        console.log("could not play the song");
      }
    });
  };

  const songProgress = (time / duration) * 100;

  return (
    <Card>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <img
            src={image_url}
            alt={title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover", // Bild wird skaliert und behält das Seitenverhältnis
            }}
          />
        </Grid>

        {/* Text rechts (Titel und Künstler) */}
        <Grid item xs={8}>
          {/* Titel */}
          <Typography variant="h5" component="h5" align="center">
            {title}
          </Typography>
          {/* Künstler */}
          <Typography color="textSecondary" variant="subtitle1" align="center">
            {artist}
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton
              onClick={() => {
                is_playing ? pauseSong() : playSong();
              }}
            >
              {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton>
              <SkipNextIcon />
            </IconButton>
          </Box>

          <LinearProgress
            variant="determinate"
            value={songProgress}
            style={{ width: "100%", marginTop: 10 }}
          />

          <Typography variant="body2" align="center" style={{ marginTop: 10 }}>
            Votes: {votes}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default MusicPlayer;
