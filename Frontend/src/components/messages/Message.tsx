import { useAuthStore } from "../../zustand/useAuthStore";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }: any) => {
  const { authUser } = useAuthStore();
  const { selectedConversation } = useConversation();

  // Cek apakah ini pesan dari Anda atau teman Anda
  const fromMe = message.senderId === authUser._id;

  // Atur gaya gelembung berdasarkan pengirim
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-maroon-primary text-pure-white" : "bg-pure-white text-text-dark border border-gray-200";

  // Format jam tayang pesan
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full border border-gray-300">
          <img src={profilePic} alt="Profil" />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} shadow-sm text-sm`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center mt-1">{formattedTime}</div>
    </div>
  );
};

export default Message;
