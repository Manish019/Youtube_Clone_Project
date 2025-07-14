import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { IoLogoYoutube } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function VideoUpload() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
   const [isChecked, setIsChecked] = useState(false);
    
  const closeModalHandler = () => {
    navigate("/"); 
  };

  
  // if user not login user not upload video
  useEffect(() => {
    const isLogin = localStorage.getItem("userId");
    if (!isLogin) {
      navigate("/");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  //video upload from handle
  const [inputVideo, setinputVideo] = useState({
    title: "",
    desc: "",
    thumbnail: "",
    videoUrl: "",
    videoCategory: "",
  });
  // console.log(inputVideo);


  if (isAuthenticated === null) {
    return <div className="text-white mt-50">Loading...</div>;
  }
  function handleVideoFiled(e) {
    const { name, value } = e.target;
    // console.log(name,value);

    setinputVideo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  // upload video with login user
  async function handleVideoUpload() {
    const token = localStorage.getItem("token");
    await axios
      .post("http://localhost:5050/video", inputVideo, {
        headers: {
          Authorization: `JWT ${token}`, 
        },
      })
      .then((response) => {
        console.log("upload video", response);
        toast.success(response?.data?.message);
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("All field required");
        }
        console.log(err, "error");
      });
  }

  return (
    <>
      <Navbar />

      <div className="bg-black text-white mt-[56px] h-[calc(100vh-56px)] flex justify-center items-center overflow-y-auto px-2">
  <div className="w-full max-w-[500px] bg-black p-6 rounded-xl border shadow-[1px_0px_10px_white]">
<div className="flex justify-end">
  <button
    onClick={closeModalHandler} // your close function
    className="text-white text-2xl hover:text-red-500 transition cursor-pointer"
  >
    <IoMdClose />
  </button>

</div>
    {/* Header */}
    <div className="text-red-500 flex items-center justify-center gap-2 mb-6">
      <IoLogoYoutube className="text-4xl" />
      <span className="text-white font-bold text-2xl">New Video Uploaded</span>
    </div>

    {/* Input Fields */}
    <div className="flex flex-col gap-5">
      <input
        value={inputVideo.title}
        onChange={handleVideoFiled}
        name="title"
        type="text"
        placeholder="Enter Title Of Video"
        className="h-11 px-4 text-white bg-[#6b6969e5] rounded-sm outline-none"
      />
      <input
        value={inputVideo.desc}
        onChange={handleVideoFiled}
        name="desc"
        type="text"
        placeholder="Enter Description Of Video"
        className="h-11 px-4 text-white bg-[#6b6969e5] rounded-sm outline-none"
      />
      <input
        value={inputVideo.videoCategory}
        onChange={handleVideoFiled}
        name="videoCategory"
        type="text"
        placeholder="Enter Category Of Video"
        className="h-11 px-4 text-white bg-[#6b6969e5] rounded-sm outline-none"
      />
      <input
        name="thumbnail"
        value={inputVideo.thumbnail}
        onChange={handleVideoFiled}
        type="text"
        placeholder="Enter Thumbnail Of Video "
        className="h-11 px-4 text-white bg-[#6b6969e5] rounded-sm outline-none"
      />
      <input
        name="videoUrl"
        value={inputVideo.videoUrl}
        onChange={handleVideoFiled}
        type="text"
        placeholder="Enter Video Url Link"
        className="h-11 px-4 text-white bg-[#6b6969e5] rounded-sm outline-none"
      />
    </div>

    {/* Buttons */}
  <div className="flex flex-col items-center gap-4 mt-6">
  {/* ✅ Checkbox Row */}
  <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
    <input
      type="checkbox"
      className="form-checkbox accent-red-600 w-4 h-4"
      checked={isChecked} // your checkbox state
      onChange={(e) => setIsChecked(e.target.checked)} // handle state update
    />
    I agree to the <span className="text-red-400 underline"><Link to="/">terms and conditions </Link></span>
  </label>
      <button
        onClick={handleVideoUpload}
className="px-6 py-2 rounded border border-black bg-red-600 text-white hover:bg-white hover:text-red-600 transition duration-300 cursor-pointer"
      >
        UPLOAD
      </button>
    </div>
    
  </div>
</div>

      <ToastContainer />

    </>
  );
}

export default VideoUpload;
