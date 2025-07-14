import { useState } from "react";
import Navbar from "./Navbar";
import { IoLogoYoutube } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function SignUp() {
  const navigate =useNavigate()
   const [isChecked, setIsChecked] = useState(false);


  const [signUpField, setSignupField] = useState({
    channelName: "",
    userName: "",
    password: "",
    profileUrl: "",
  });
  console.log(signUpField);

  function handleSignUpFiled(e) {
    const { name, value } = e.target;
    // console.log(name,value);

    setSignupField((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // signup this funcation post the data base
  async function handleSignUp() {
    axios
      .post(`http://localhost:5050/signup`, signUpField)
      .then((respose) => {
        // console.log("res", respose);
        toast.success(respose?.data?.message);
        setSignupField({
          channelName: "",
          userName: "",
          password: "",
          profileUrl: "",
        });
       navigate('/'); //after signup navigate home page
      })
      .catch((err) => {

        if (err.response && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Signup failed!");
        }
        console.log(err, "error");
      });
  }

  return (
    <>
      <Navbar />
      <div className="bg-black text-white mt-[56px] flex flex-col items-center min-h-[92vh] font-normal px-4">
  <div className="w-75 sm:w-[90%] md:w-[75%] lg:w-[45%] mt-5 p-6 rounded-xl border shadow-[1px_0px_10px_white]">

    {/* Logo + Heading */}
    <div className="text-red-500 flex items-center justify-center gap-2 mb-6">
      <span className="text-4xl">
        <IoLogoYoutube />
      </span>
      <span className="text-white font-bold text-2xl">User SignUp</span>
    </div>

    {/* Input Fields */}
    <div className="flex flex-col gap-4 items-center">
      <input
        onChange={(e) => handleSignUpFiled(e)}
        name="channelName"
        value={signUpField.channelName}
        type="text"
        placeholder="Channel Name"
        className="w-full sm:w-[75%] h-11 px-5 text-white bg-[#3f3f3f] rounded-sm focus:outline-none"
      />
      <input
        onChange={(e) => handleSignUpFiled(e)}
        name="userName"
        value={signUpField.userName}
        type="text"
        placeholder="User Name"
        className="w-full sm:w-[75%] h-11 px-5 text-white bg-[#3f3f3f] rounded-sm focus:outline-none"
      />
      <input
        onChange={(e) => handleSignUpFiled(e)}
        name="password"
        value={signUpField.password}
        type="password"
        placeholder="Password"
        className="w-full sm:w-[75%] h-11 px-5 text-white bg-[#3f3f3f] rounded-sm focus:outline-none"
      />

      {/* Profile URL and Preview */}
     {/* Profile URL and Preview */}
<div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-[75%] mt-4">
  {/* Profile URL input */}
  <input
    type="text"
    name="profileUrl"
    placeholder="Profile Image URL"
    onChange={(e) => handleSignUpFiled(e)}
    value={signUpField.profileUrl}
    className="bg-[#3f3f3f] text-white p-3 rounded w-full sm:flex-1 focus:outline-none"
  />

  {/* Image preview */}
  <div className="h-12 w-12 flex-shrink-0">
    <img
      src={
        signUpField.profileUrl
          ? signUpField.profileUrl
          : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      }
      alt="Profile Preview"
      className="w-full h-full object-cover rounded-full border border-white"
    />
  </div>
</div>
    </div>

    {/* Terms & Conditions + Buttons */}
    <div className="flex flex-col items-center gap-4 mt-6">
      <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox accent-red-600 w-4 h-4"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        I agree to the{" "}
        <span className="text-red-400 underline">
          <Link to="/">terms and conditions</Link>
        </span>
      </label>

      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
        <button
          onClick={handleSignUp}
          className="w-full sm:w-[200px] px-5 py-2 rounded border border-black bg-red-600 text-white hover:bg-white hover:text-red-600 transition duration-300"
        >
          SignUp
        </button>

        <Link to="/" className="w-full sm:w-[200px]">
          <button className="w-full px-5 py-2 rounded border border-black bg-white text-black hover:bg-red-600 hover:text-white transition duration-300">
            Login
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>

      <ToastContainer />
    </>
  );
}

export default SignUp;
