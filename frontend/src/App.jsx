import { useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

function App() {
  useEffect(() => {
    const socket = io("http://127.0.0.1:7777", {
      withCredentials: true,
      transportOptions: {
        polling: {},
      },
    });

    socket.on("eventName", (data) => {
      console.log("socket response:");
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onClick = () => {
    fetch("http://127.0.0.1:8000/send-to-redis")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("fetch backend response:");
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onClick}>count is {0}</button>
      </div>
    </>
  );
}

export default App;
