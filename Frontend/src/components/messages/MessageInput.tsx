import { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return; // Cegah pengiriman pesan kosong

    await sendMessage(message);
    setMessage(""); // Kosongkan kolom input setelah terkirim
  };

  return (
    <form className="p-4 bg-pure-white border-t border-gray-200" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <input
          type="text"
          className="w-full input input-bordered h-12 bg-cream-base text-text-dark border-transparent focus:border-maroon-primary focus:ring-1 focus:ring-maroon-primary focus:outline-none transition-all pr-12"
          placeholder="Ketik pesan Anda..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-maroon-primary hover:text-maroon-hover transition-colors"
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner loading-sm"></span> : <IoSend size={24} />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
