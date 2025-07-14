import axios from "axios";
import { useState } from "react";
import { IoLogoYoutube, IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login({ closeLoginModel }) {
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState({ userName: "", password: "" });

  function handleOnchnageInput(e) {
    const { name, value } = e.target;
    setLoginField((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleLogin() {
    axios
      .post(`http://localhost:5050/login`, loginField)
      .then((response) => {
        console.log("login", response);
        navigate("/");
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("userId", JSON.stringify(response?.data.user?._id));
        localStorage.setItem("profile", JSON.stringify(response?.data.user?.profileUrl));
        setLoginField({ userName: "", password: "" });
        toast.success(response?.data?.message);
        closeLoginModel();
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Invalid Password");
        }
        console.log(err, "error");
      });
  }

  return (
    <>
<div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4 sm:px-6">
  <div className="w-75 sm:w-[90%] lg:w-[500px] bg-black text-white p-6 sm:p-8 rounded-xl shadow-[0_0_10px_white] relative">

    {/* Close Icon */}
    <button
      onClick={closeLoginModel}
      className="absolute top-4 right-4 text-white text-2xl hover:text-red-500 transition cursor-pointer"
    >
      <IoClose />
    </button>

    {/* Logo & Heading */}
    <div className="text-red-500 flex items-center justify-center gap-2 mb-6">
      <IoLogoYoutube className="text-4xl" />
      <span className="text-white font-bold text-2xl">Login</span>
    </div>

    {/* Input Fields */}
    <div className="flex flex-col gap-5 items-center">
      <input
        onChange={handleOnchnageInput}
        value={loginField.userName}
        type="text"
        name="userName"
        placeholder="User Name"
        className="w-full px-4 py-2 rounded-sm bg-[#222] text-white outline-none"
      />
      <input
        onChange={handleOnchnageInput}
        value={loginField.password}
        name="password"
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 rounded-sm bg-[#222] text-white outline-none"
      />
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
      <button
        onClick={handleLogin}
        className="w-full px-6 py-2 rounded border border-white bg-red-600 text-white hover:bg-white hover:text-red-600 transition duration-300"
      >
        Login
      </button>

      <Link to="/signup" className="w-full">
        <button className="w-full px-6 py-2 rounded border border-white bg-white text-black hover:bg-red-600 hover:text-white transition duration-300">
          SignUp
        </button>
      </Link>
    </div>
  </div>
</div>



      <ToastContainer />
    </>
  );
}

export default Login;
