import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const apiURL = import.meta.env.VITE_API_URL;

const useRequireAuth = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const authtoken = Cookies.get("authtoken");
      const refreshtoken = Cookies.get("refreshtoken");
      if (authtoken && refreshtoken) {
        try {
          const response = await axios.post(`${apiURL}/verify`, {
            authtoken: authtoken,
            refreshtoken: refreshtoken,
          });
          if (response.status === 200) {
            navigate("/");
            return setLoggedIn(true);
          } else {
            navigate("/login");
            return setLoggedIn(false);
          }
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            try {
              const response = await axios.post(`${apiURL}/refresh`, {
                refreshtoken: refreshtoken,
              });
              if (response.status === 200) {
                Cookies.set("authtoken", response.data.authtoken);
                Cookies.set("refreshtoken", response.data.refreshtoken);
                navigate("/");
                return setLoggedIn(true);
              } else {
                navigate("/login");
                return setLoggedIn(false);
              };
            } catch (error) {
              console.error("Refresh token error:", error);
              navigate("/login");
              return setLoggedIn(false);
            };
          };
          console.error("Check logged in error:", error);
          navigate("/login");
          return setLoggedIn(false);
        };
      } else {
        navigate("/login");
        return setLoggedIn(false);
      };
    };
    checkLoggedIn();
  }, [navigate, loggedIn]);
};

export default useRequireAuth;
