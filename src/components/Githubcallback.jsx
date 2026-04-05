import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./css/githubcallback.css";

function GithubCallback() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      toast.error("No GitHub code found ❌");
      navigate("/login");
      return;
    }

    axios.post(`${API}/api/github-login/`, { code })
      .then(res => {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        toast.success("GitHub login successful ✅");

        navigate("/");
      })
      .catch(err => {
        console.log(err);
        toast.error("GitHub login failed ❌");
        navigate("/login");
      });

  }, []);

  return (
    <div className="main-box">
      <div className="box">
        <h2>Logging in with GitHub...</h2>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default GithubCallback;