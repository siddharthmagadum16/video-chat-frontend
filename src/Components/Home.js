import React, { Fragment, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Home.css";
import { BACKEND_URL, DEV } from "../constants";

function Home() {
  const roomRef = useRef();

  function createRoom() {
    console.log(`env:|${process.env.REACT_APP_ENV}|`);
    const url =
      process.env.REACT_APP_ENV !== DEV ? BACKEND_URL.PROD : BACKEND_URL.DEV;
    axios(url, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        sessionStorage.setItem("roomId", res.data);
        window.location.href = `/${res.data}`;
      })
      .catch((err) => console.log(err));
  }

  function joinRoom(roomId) {
    sessionStorage.setItem("roomId", roomId);
    window.location.href = `/${roomId}`;
  }
  return (
    <Fragment>
      <div id="home">
        <div id="home-container">
          <Button onClick={createRoom} variant="contained">
            Enter Room
          </Button>
          <div className="text">OR</div>
          <div className="text">
            Enter the room code provided in the existing room
          </div>

          <TextField
            id="filled-basic roomid-input"
            inputRef={roomRef}
            label="Enter room-id"
            variant="filled"
          />
          <br />
          <Button
            variant="contained"
            onClick={() => joinRoom(roomRef.current.value)}
          >
            Join Room
          </Button>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
