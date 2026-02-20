import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;
let connected = false;
const listeners = [];

export const connectSocket = (onMessage) => {
  if (onMessage) listeners.push(onMessage);

  if (connected) {
    console.log("⚠️ WebSocket already connected");
    return;
  }

  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS("http://localhost:8080/ws-alerts"),

    reconnectDelay: 5000,
    debug: (str) => console.log("STOMP:", str),

    onConnect: () => {
      console.log("✅ WebSocket CONNECTED");
      connected = true;

      stompClient.subscribe("/topic/alerts", (msg) => {
        const data = JSON.parse(msg.body);
        listeners.forEach((cb) => cb(data));
      });
    },

    onWebSocketClose: () => {
      console.warn("🔌 WebSocket closed");
      connected = false;
    },

    onStompError: (frame) => {
      console.error("❌ STOMP error", frame.body);
    },
  });

  stompClient.activate();
};

export const disconnectSocket = () => {
  // ❌ DO NOT deactivate globally in React
  // Let app lifecycle control it
};
