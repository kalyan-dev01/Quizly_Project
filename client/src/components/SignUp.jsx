import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { setisLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    number: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/signup",
        userData
      );

      if (!response.data.success) {
        toast.error(response.data.message || "Signup failed");
        return;
      }

      const token = response.data.token;
      localStorage.setItem("token", token);
      setisLogin(true);
      toast.success(response.data.message || "Signup successful");
      navigate("/");
    } catch (err) {
  if (err.response?.data?.message) {
    toast.error(err.response.data.message);
  } else {
    toast.error("Something went wrong. Please try again.");
  }
  console.error("Signup error:", err.response || err);
}
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="md:w-7xl md:px-48">
        <div className="flex items-center justify-center mt-8">
          <h1 className="font-bold md:text-2xl">
            Ready to test your brain? Let's get started
          </h1>
        </div>

        <div className="flex flex-col md:w-80 w-full space-y-6 mt-11">
          <input
            name="email"
            onChange={onChangeHandler}
            value={userData.email}
            className="py-2 px-1.5 outline-none bg-[#f5eddc] rounded-xl"
            type="email"
            placeholder="Email"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={userData.password}
            className="py-2 px-1.5 outline-none bg-[#f5eddc] rounded-xl"
            type="password"
            placeholder="Password"
          />
          <input
            name="firstname"
            onChange={onChangeHandler}
            value={userData.firstname}
            className="py-2 px-1.5 outline-none bg-[#f5eddc] rounded-xl"
            type="text"
            placeholder="First name"
          />
          <input
            name="lastname"
            onChange={onChangeHandler}
            value={userData.lastname}
            className="py-2 px-1.5 outline-none bg-[#f5eddc] rounded-xl"
            type="text"
            placeholder="Last name"
          />
          <input
            name="number"
            onChange={onChangeHandler}
            value={userData.number}
            className="py-2 px-1.5 outline-none bg-[#f5eddc] rounded-xl"
            type="text"
            placeholder="Number"
          />
          <button
            type="submit"
            className="bg-[#009963] text-white py-1.5 rounded-3xl border-none cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
