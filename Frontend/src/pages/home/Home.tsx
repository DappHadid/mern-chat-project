import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-cream-base p-4">
      <div className="flex h-[85vh] w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-pure-white">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
