import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    const { roomCode } = this.state;

    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              roomCode ? (
                <Navigate replace to={`/room/${roomCode}`} />
              ) : (
                this.renderHomePage()
              )
            }
          />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route
            path="/room/:roomCode"
            element={<Room leaveRoomCallback={this.clearRoomCode} />}
          />
        </Routes>
      </Router>
    );
  }
}
