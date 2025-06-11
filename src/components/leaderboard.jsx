import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch('https://typegame-p1bu.onrender.com/api/scores');
        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 max-w-xl w-full mx-auto mt-10 drop-shadow-xl drop-shadow-indigo-500/75">
      <h2 className="text-2xl font-semibold mb-4">🏆 Leaderboard</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-black text-white font-normal">
            <th className="p-1.5 border text-left">#</th>
            <th className="p-1.5 border text-left">Name</th>
            <th className="p-1.5 border text-left">WPM</th>
            <th className="p-1.5 border text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score._id} className="hover:bg-gray-50">
              <td className="p-1.5 border">{index + 1}</td>
              <td className="p-1.5 border">{score.name}</td>
              <td className="p-1.5 border">{score.wpm}</td>
              <td className="p-1.5 border">{new Date(score.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
