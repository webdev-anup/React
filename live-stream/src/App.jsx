import React, { useState } from "react";
import JoinForm from "./components/JoinForm";
import LiveStream from "./components/LiveStream";

function App() {
  const [joined, setJoined] = useState(false);
  const [roomData, setRoomData] = useState({});

  const handleJoin = ({ roomID, userID }) => {
    setRoomData({ roomID, userID });
    setJoined(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="w-full h-full flex items-center justify-center">
        {joined ? (
          <LiveStream roomID={roomData.roomID} userID={roomData.userID} />
        ) : (
          <JoinForm onJoin={handleJoin} />
        )}
      </div>
    </div>
  );
}

export default App;