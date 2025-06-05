import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets, featuredQuizzes } from "../assets/assets";
import { toast } from "react-toastify";

const Featured = () => {
  const navigate = useNavigate();
  const { title, setTitle, isLogin } = useContext(AppContext);

  const handleQuizStart = (item) => {
    if (isLogin) {
      setTitle(item.title);
      navigate("/start_quiz");
    } else {
      toast.error("Please log in to start the quiz");
      navigate("/login");
    }
  };

  return (
    <div>
      <h2 className="text-2xl md:ml-5 font-bold py-6">Featured quiz</h2>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="space-y-5">
          {featuredQuizzes.map((item, index) => (
            <div key={index} className="flex space-y-4">
              <div className="w-2/3">
                <h1 className="mb-0.5 font-medium">{item.title}</h1>
                <p className="text-sm text-[#A1824A]">{item.description}</p>
                <div className="flex">
                  <button
                    onClick={() => handleQuizStart(item)}
                    className="mt-3 bg-[#F5F0E5] px-3 py-1 rounded-3xl"
                  >
                    Take ➙
                  </button>
                </div>
              </div>
              <div>
                <img className="w-50" src={item.image} alt={item.title} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view */}
      <div className="space-y-8">
        {featuredQuizzes.map((item, index) => (
          <div key={index} className="md:flex hidden">
            <img src={item.image} alt={item.title} />
            <div className="ml-3">
              <h2 className="font-bold text-xl">{item.title}</h2>
              <p className="text-[#929699]">{item.description}</p>
              <button
                onClick={() => handleQuizStart(item)}
                className="mt-2 cursor-pointer bg-blue-400 text-white px-2 py-1 rounded-lg"
              >
                Take quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
