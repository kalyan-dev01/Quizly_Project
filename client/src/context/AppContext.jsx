import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);
  const [title,setTitle] = useState()

  const values = { isLogin, setisLogin,title,setTitle };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setisLogin(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/users/verifyToken",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setisLogin(true);
        } else {
          setisLogin(false);
          navigate("/login");
        }
      } catch (error) {
        setisLogin(false);
        navigate("/login");
      }
    };

    verifyToken();
  }, []);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
