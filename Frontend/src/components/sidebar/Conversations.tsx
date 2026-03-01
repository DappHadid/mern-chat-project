import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto h-full">
      {/* Melakukan perulangan (map) pada data pengguna yang didapat */}
      {conversations.map((conversation: any, idx) => (
        <Conversation key={conversation._id} conversation={conversation} lastIdx={idx === conversations.length - 1} />
      ))}

      {/* Tampilkan animasi loading jika data masih ditarik */}
      {loading ? <span className="loading loading-spinner mx-auto mt-4 text-maroon-primary"></span> : null}
    </div>
  );
};

export default Conversations;
