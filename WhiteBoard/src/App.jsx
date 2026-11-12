import { useEffect } from "react";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import Tools from "./Tools";

const appID = 370515669;
const userID = "anup@patwa";
const roomID = "8597";
const userName = "Anup Patwa";
const token = import.meta.env.VITE_ZEGO_TOKEN;
const server = "wss://webliveroom370515669-api.coolzcloud.com/ws";

function App() {
  useEffect(() => {
    let cancelled = false;
    const zg = new ZegoExpressEngine(appID, server);
    const zegoSuperBoard = ZegoSuperBoardManager.getInstance();

    const initBoard = async () => {
      try {
        await zegoSuperBoard.init(zg, {
          parentDomID: "parentDomID",
          appID,
          userID,
          token,
        });
        await zg.loginRoom(
          roomID,
          token,
          { userID, userName },
          { userUpdate: true }
        );
        if (cancelled) return;
        await zegoSuperBoard.createWhiteboardView({
          name: "Excali Draw",
          perPageWidth: 1600,
          perPageHeight: 900,
          pageCount: 1,
        });
      } catch (err) {
        console.error("Whiteboard init failed:", err);
      }
    };

    initBoard();

    return () => {
      cancelled = true;
      zg.logoutRoom(roomID);
      zegoSuperBoard.destroy?.();
    };
  }, []);

  return (
  <div className="h-[100vh] bg-black w-full flex">
    <Tools />
    <div id="parentDomID" className="flex-1 h-full"></div>
  </div>
);
}

export default App;