import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Quiz = () => {
  const { title } = useContext(AppContext);
  const [quizdata, setQuizdata] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quiztaken, setquizTaken] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // <-- for validation message

  const fetchData = async () => {
    if (title) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/api/quiz/findQuiz",
          { title }
        );
        setQuizdata(response.data.response);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!quizdata || !quizdata.questions || quizdata.questions.length === 0) {
    return <p>Loading or no quiz data available.</p>;
  }

  const currentQuestion = quizdata.questions[currentQIndex];

  const handleNext = () => {
    if (!selectedOption) {
      setErrorMsg("Please select an option before proceeding.");
      return;
    }

    setErrorMsg(""); // clear error

    const correctAnswers = currentQuestion.answers;
    if (correctAnswers.includes(selectedOption)) {
      setScore((prev) => prev + 1);
    }

    if (currentQIndex < quizdata.questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption("");
    } else {
      setquizTaken(true);
    }
  };

  return (
    <div className="max-w-4xl px-6 mt-10 mx-auto flex flex-col justify-center">
      <h1 className="text-3xl font-semibold text-center mb-2">
        {quizdata.title}
      </h1>
      <p className="text-center text-gray-600 mb-6">{quizdata.description}</p>

      <div>
        <h2 className="text-2xl font-medium mb-4">
          Q{currentQIndex + 1}: {currentQuestion.question}
        </h2>
        <div className="flex flex-col space-y-4">
          {currentQuestion.options.map((option, idx) => (
            <label key={idx} className="flex items-center space-x-3">
              <input
                type="radio"
                name={`question-${currentQIndex}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="scale-125 accent-blue-600"
              />
              <span className="text-lg">{option}</span>
            </label>
          ))}
        </div>

        {/* Show error message here */}
        {errorMsg && (
          <p className="text-red-600 mt-2 font-medium">{errorMsg}</p>
        )}

        <button
          onClick={handleNext}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          {currentQIndex < quizdata.questions.length - 1 ? "Next" : "Finish"}
        </button>

        {/* Show final score message after quiz taken */}
        {quiztaken && (
          <p className="mt-4 text-green-700 font-semibold text-center">
            Quiz completed! Your total score is: {score}
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
