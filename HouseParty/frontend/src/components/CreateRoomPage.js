import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
} from "@mui/material";
import { Alert } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";

const CreateRoomPage = ({
  votesToSkip: defaultVotes = 2,
  guestCanPause: defaultGuestCanPause = true,
  update = false,
  roomCode = null,
  updateCallBack = () => {},
}) => {
  const [guestCanPause, setGuestCanPause] = useState(defaultGuestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSucessMsg] = useState("");
  const navigate = useNavigate();

  const handleVotesChanged = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPause = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  const handleCreateButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        navigate(`/room/${data.code}`);
      })
      .catch((error) => {
        console.error("Error creating room:", error);
      });
  };

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: roomCode,
      }),
    };

    fetch("/api/update-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          setSucessMsg("Room updated successfully!");
        } else {
          setErrorMsg("Error updating room...");
        }
        updateCallBack();
      })
      .catch((error) => {
        console.error("Error updating room:", error);
      });
  };

  const renderCreateButtons = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderUpdateButtons = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg != "" || successMsg != ""}>
          {successMsg != "" ? (
            <Alert
              severity="success"
              onClose={() => {
                setSucessMsg("");
              }}
            >
              {successMsg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => {
                setErrorMsg("");
              }}
            >
              {errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {update ? "Update Room" : "Create a Room"}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback state</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause.toString()}
            onChange={handleGuestCanPause}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={handleVotesChanged}
              defaultValue={votesToSkip}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      {update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
  );
};

export default CreateRoomPage;
