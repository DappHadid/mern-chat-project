import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    // Jangan lakukan apa-apa jika socket belum tersambung
    if (!socket) return;

    // Tangkap pesan baru
    socket.on("newMessage", (newMessage: any) => {
      setMessages([...messages, newMessage]);
    });

    // Bersihkan pendengar saat komponen ditutup
    return () => {
      socket.off("newMessage");
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
