import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

function Room({ leaveRoomCallback }) {
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState({});

  const getRoomDetails = () => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((response) => {
        if (!response.ok) {
          leaveRoomCallback();
          navigate("/");
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setRoomDetails({
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guest_can_pause,
            isHost: data.is_host,
          });
          if (data.is_host) {
            authenticateSpotify();
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
      });
  };

  const authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
    console.log(">> authenticateSpotify method finished");
  };

  const getCurrentSong = () => {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to fetch the current song");
          return {};
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.title && data.artist) {
          setSong(data);
        } else {
          setSong(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching current song:", error);
        setSong(null);
      });
  };

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then(() => {
      leaveRoomCallback();
      navigate("/");
    });
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
    getRoomDetails(); // Re-fetch room details when settings are closed
  };

  useEffect(() => {
    getRoomDetails();

    // Set up interval to fetch the current song every second
    const interval = setInterval(getCurrentSong, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [roomCode]); // Re-run if roomCode changes

  return showSettings ? (
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <CreateRoomPage
          update
          votesToSkip={roomDetails.votesToSkip}
          guestCanPause={roomDetails.guestCanPause}
          roomCode={roomCode}
          updateCallback={handleSettingsClose} // Use this callback to close settings and refresh room details
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSettingsClose}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <MusicPlayer {...song} />
      {roomDetails.isHost && (
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowSettings(true)}
          >
            Settings
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default Room;
