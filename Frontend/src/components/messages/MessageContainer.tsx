import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthStore } from "../../zustand/useAuthStore";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // Bersihkan pilihan obrolan setiap kali pengguna keluar (logout)
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-2/3 flex flex-col bg-cream-base relative">
      {/* Jika belum ada yang dipilih, tampilkan layar sambutan */}
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        /* Jika sudah ada yang dipilih, tampilkan area obrolan */
        <>
          <div className="bg-pure-white px-6 py-4 border-b border-gray-200 shadow-sm z-10 flex items-center gap-2">
            <span className="text-gray-500 text-sm">Kepada: </span>
            <span className="text-text-dark font-bold text-lg">{selectedConversation.fullName}</span>
          </div>

          <div className="flex-1 overflow-auto p-2 flex flex-col bg-cream-base shadow-inner rounded-md mx-4 mt-4 mb-2">
            <Messages />
          </div>
          <MessageInput />
        </>
      )}
    </div>
  );
};

// Komponen layar sambutan
const NoChatSelected = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-maroon-primary mb-2">Selamat Datang, {authUser?.fullName}!</h3>
        <p className="text-gray-500 font-medium">Pilih obrolan di samping untuk mulai mengirim pesan</p>
      </div>
    </div>
  );
};

export default MessageContainer;
