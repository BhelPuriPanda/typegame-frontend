import TypingBox from "./components/typingbox.jsx";
import Leaderboard from "./components/leaderboard.jsx";

function App() {
  return (
    <div className="min-h-screen bg-black/90 p-4">
      <div className="text-center">
        <h1 className="text-7xl text-blue-50 font-medium drop-shadow-xl drop-shadow-cyan-500/50">TYPING CHALLENGE</h1><br/>
        <p className="text-md text-gray-300 font-light">Simple Aah... Project of mine just wanted to revise My backend topics</p>
      </div>
      <TypingBox />
      <Leaderboard />
    </div>
  );
}
 
export default App;
