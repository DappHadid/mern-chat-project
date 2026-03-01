import { createContext, useState, useEffect, useContext } from "react";
import { useAuthStore } from "../zustand/useAuthStore";
import io from "socket.io-client";

const SocketContext = createContext<any>(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      // Hubungkan ke server backend (port 5000)
      const socket = io("http://localhost:5000", {
        query: { userId: authUser._id },
      });

      setSocket(socket);

      // Dengarkan siapa saja yang sedang online
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
