import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("hello from client");
    };

    newSocket.onmessage = (message) => {
      console.log("message => ", message.data);
      setLatestMessage(message.data);
    };

    setSocket(newSocket);

    // cleanup function
    return () => {
      newSocket.close();
    };
  }, []);

  if (!socket) {
    return <>Connecting...</>;
  }

  return (
    <>
      <b>{latestMessage}</b>
      <br />
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => socket.send(message)}>Send</button>
    </>
  );
}

export default App;
