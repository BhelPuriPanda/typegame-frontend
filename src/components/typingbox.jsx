import React, { useEffect, useState } from 'react';

const TypingBox = () => {
  const paragraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed is measured in words per minute.",
    "React makes building user interfaces a breeze.",
    "Practice daily to improve your typing accuracy.",
    "Tailwind CSS helps you style components quickly."
  ];

  const [targetText, setTargetText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [name, setName] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    setTargetText(paragraphs[randomIndex]);
  }, []);

  const handleTyping = (e) => {
    const value = e.target.value;

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value.length >= targetText.length) {
      setIsFinished(true);
    }

    setTypedText(value);

    const wordsTyped = value.trim().split(' ').length;
    const timeElapsed = (Date.now() - startTime) / 60000; 

    if (timeElapsed > 0) {
      setWpm(Math.round(wordsTyped / timeElapsed));
    }
  };
    const handleSubmitScore = async () => {
  if (!name.trim()) return;

  try {
    const res = await fetch('https://typegame-p1bu.onrender.com/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, wpm }),
    });

    if (res.ok) {
      setSubmitSuccess(true);
    }
     } catch (err) {
    console.error("Error submitting score:", err);
  }
};


  return (
    <div className="bg-gray-100 shadow-lg rounded-xl p-6 max-w-3xl w-full mx-auto mt-10 drop-shadow-xl drop-shadow-indigo-500/75"> 

      <div className=" text-gray-800 bg-gray-800 p-4 rounded mb-4 text-lg leading-relaxed">
        {targetText.split('').map((char, idx) => {
          let color;
          if (idx < typedText.length) {
            color = char === typedText[idx] ? 'text-green-500' : 'text-red-500';
          } else {
            color = 'text-white';
          }

          return (
            <span key={idx} className={color}>
              {char} 
            </span>
          );
        })}
      </div>

      <textarea
        className="w-full  border border-gray-500 rounded p-2 text-lg focus:outline-blue-500"
        rows="1"
        placeholder="Start typing here..."
        value={typedText}
        onChange={handleTyping}
        disabled={isFinished}
      ></textarea>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-medium">WPM: {wpm}</span>
        {isFinished && (
          <span className="text-green-600 font-semibold">✅ Done!</span>
        )}
      </div>
      {isFinished && (
  <div className="mt-6">
    <label className="block mb-2 text-lg font-medium">Enter your name:</label>
    <input
      type="text"
      className="w-full border border-gray-300 rounded p-2 text-lg mb-4"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <button
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={handleSubmitScore}
    >
      Submit Score
    </button>

    {submitSuccess && (
      <p className="mt-4 text-green-600 font-semibold">🎉 Score submitted!</p>
    )}
  </div>
)}

    </div>
  );
};

export default TypingBox;