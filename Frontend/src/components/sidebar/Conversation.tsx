import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext"; // 1. Impor penarik status

const Conversation = ({ conversation, lastIdx }: any) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext(); // 2. Ambil daftar pengguna aktif

  // 3. Cek apakah ID teman ini ada di daftar pengguna aktif
  const isOnline = onlineUsers.includes(conversation._id);
  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-4 items-center p-3 py-2 rounded-lg cursor-pointer transition-colors
          ${isSelected ? "bg-maroon-primary" : "hover:bg-cream-base"}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        {/* 4. Terapkan kelas 'online' jika isOnline bernilai true */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className={`w-12 rounded-full border-2 ${isSelected ? "border-pure-white" : "border-maroon-primary"}`}>
            <img src={conversation.profilePic || "https://avatar.iran.liara.run/public"} alt="avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center gap-2">
            <p className={`font-bold ${isSelected ? "text-pure-white" : "text-text-dark"}`}>{conversation.fullName}</p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1 opacity-30" />}
    </>
  );
};

export default Conversation;
