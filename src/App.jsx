import TypingBox from "./components/typingbox.jsx";
import Leaderboard from "./components/leaderboard.jsx";

function App() {
  return (
    <div className="min-h-screen bg-white p-4 overflow-y-hidden">
      <div className="text-center bg-black rounded-xl py-6 drop-shadow-xl drop-shadow-indigo-500/75">
        <h1 className="text-7xl text-white font-medium drop-shadow-md drop-shadow-purple-500/90">TYPING CHALLENGE</h1><br/>
        <p className="text-md text-white font-light">Know your Typing speed with a fun game and try to be among the Top 10 LeaderBoard , More the Green Lesser Inaccuracy</p>
        <hr/>
      </div>
      <div className="flex flex-wrap">
        <TypingBox />
        <Leaderboard />
      </div>
    </div>
  );
}
 
export default App;
