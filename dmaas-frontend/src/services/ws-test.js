import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const socket = new SockJS("http://localhost:8080/ws-alerts");

const client = new Client({
  webSocketFactory: () => socket,
  debug: (msg) => console.log("STOMP:", msg),
  onConnect: () => {
    console.log("✅ CONNECTED");
    client.subscribe("/topic/alerts", (msg) => {
      console.log("📡 RECEIVED:", msg.body);
    });
  },
  onStompError: (f) => console.error("❌ ERROR", f),
});

client.activate();
