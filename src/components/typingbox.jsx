import React, { useEffect, useState } from 'react';

const TypingBox = () => {
 const paragraphs = [
  "The quick brown fox jumps over the lazy dog near the calm river, where tall grass sways in the wind. Birds sing in the distance, and the sun sets slowly behind the hills, painting the sky orange and pink.",
  
  "Typing speed is measured in words per minute and depends on accuracy and consistency. Daily practice helps improve muscle memory and finger placement. Over time, your typing becomes smoother, faster, and more accurate, making you a more efficient computer user overall.",
  
  "React is a JavaScript library that helps developers build user interfaces by using components. Each component manages its own state, making apps modular and easier to maintain. With hooks and the virtual DOM, performance and development speed improve significantly in modern web projects.",
  
  "Practice typing every day to improve your speed and accuracy. Focus on proper finger placement and minimizing errors. As your muscle memory builds, you'll type faster without looking at the keyboard. Consistency and patience are key to becoming a confident, fluent typist.",
  
  "Tailwind CSS allows developers to style websites using utility classes. These classes make it easy to design responsive layouts without writing custom CSS. By combining small utilities, you build complex designs efficiently. It’s fast, flexible, and widely adopted in modern frontend development workflows."
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
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl w-full mx-auto mt-10 drop-shadow-xl drop-shadow-indigo-500/75"> 
      <h2 className="text-2xl font-semibold mb-4 text-center">Start Typing and Accept the Challenge</h2>
      <div className=" text-gray-800 bg-black p-4 rounded mb-4 text-lg leading-relaxed">
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
        rows="5"
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