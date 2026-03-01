import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();

  // 1. Buat referensi (penanda) untuk elemen pesan terakhir
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // 2. Beri perintah untuk menggulir ke penanda setiap kali ada pesan baru
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto py-2">
      {loading &&
        [...Array(3)].map((_, idx) => (
          <div key={idx} className="flex flex-col gap-4 w-52 mb-4">
            <div className="skeleton h-10 w-full bg-gray-200"></div>
            <div className="skeleton h-4 w-28 bg-gray-200"></div>
          </div>
        ))}

      {!loading &&
        messages.length > 0 &&
        messages.map((message: any) => (
          // 3. Pasang penanda di pembungkus pesan
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {!loading && messages.length === 0 && <p className="text-center text-gray-500 mt-10">Kirim pesan untuk memulai percakapan</p>}
    </div>
  );
};

export default Messages;
