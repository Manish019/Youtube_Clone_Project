// Profile.jsx
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "./SidebarContext.jsx";
import Navbar from "./Navbar.jsx";
import SideNavbar from "./SideNavbar.jsx";
import { AiFillCaretRight } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";
import BannerEdit from "./BannerEdit.jsx";
import { toast, ToastContainer } from "react-toastify";

function Profile() {
  const { sideNavbar, sidebarFun } = useContext(SidebarContext);
  const [duration, setDuration] = useState("");
  const [videos, setVideos] = useState([]);
  const [loggedInUserId, setloggedInUserId] = useState("");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [userLogout, setUserlogout] = useState(null);

  // const [userVideo, setUserVideo] = useState(null);
  const [banner, setBanner] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    title: "",
    desc: "",
    thumbnail: "",
    videoUrl: "",
  });

  // console.log(sideNavbar, sidebarFun);
  let { id } = useParams();
  console.log("profile id", id);

  // =====================================
  // logout ke baad bhi user ka profile show hoga
  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${id}`) //
      .then((res) => {
        // console.log("logoutUser",res?.data?.user);
        setUserlogout(res?.data?.user);

        // setProfileInfo(res.data.user); // channelName, profileUrl
      })
      .catch((err) => {
        console.log(err, "logout message");
      });
  }, []);

  // get all video user profile
  useEffect(() => {
    axios
      .get(`http://localhost:5050/${id}/channel`)
      .then((res) => {
        console.log("Videos:", res.data.Allvideo);
        setVideos(res.data.Allvideo);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
      });
  }, []);

  // ===========================================
  // banner
  // This runs when Profile component loads
  useEffect(() => {
    axios
      .get(`http://localhost:5050/user/${id}`)
      .then((res) => {
        const user = res?.data?.user;

        //  Banner fallback logic for logout view
        const bannerToUse = user?.banner?.trim()
          ? user.banner
          : "https://miro.medium.com/v2/resize:fit:532/1*69aTahESxdQG3uHV8Y6Row.png";

        setUserlogout({ ...user, banner: bannerToUse });

        // If it's your own profile, set banner separately too
        if (user?._id === loggedInUserId) {
          setBanner(user.banner || bannerToUse);
        }
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  }, [id, loggedInUserId]);

  useEffect(() => {
    const loggedInUserId = localStorage
      .getItem("userId")
      ?.replace(/['"]+/g, "");
    setloggedInUserId(loggedInUserId);
  }, []);

  // ===============================
  // delete video with verify user

  const handleDelete = async (videoId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.delete(
        `http://localhost:5050/delet/video/${videoId}`,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      toast.success("Video edit successfully");

      setVideos((prev) => prev.filter((v) => v._id !== videoId));
    } catch (err) {
      toast.error(
        err?.res?.data?.message || "Only loggin User Delete own video"
      );
      console.log(err);
    }
  };
  // ====================================================
  // editvideo
  const handleEdit = (videoId) => {
    const videoToEdit = videos.find((v) => v._id === videoId);
    if (videoToEdit) {
      setEditData(videoToEdit);
      setEditModalOpen(true);
    }
  };
  const handleUpdateSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5050/update/video/${editData._id}`,
        {
          title: editData.title,
          desc: editData.desc,
          thumbnail: editData.thumbnail,
          videoUrl: editData.videoUrl,
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );

      // toast.success(res?.data?.message);

      toast.success("Video updated successfully");
      setVideos((prev) =>
        prev.map((v) => (v._id === editData._id ? { ...v, ...editData } : v))
      );
      setEditModalOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Only loggin User update own video");
    }
  };

  return (
    <div className=" w-full py-2.5  bg-black text-white h-screen ">
      <div>
        <Navbar sideNavbar={sideNavbar} sidebarFun={sidebarFun} />
        <SideNavbar sideNavbar={sideNavbar} />
      </div>

      <div
        className={`${
          sideNavbar
            ? "flex  flex-col overflow-x-hidden mt-[56px] justify-center items-center ml-[270px] px-4 bg-black"
            : "mt-[56px] bg-black px-4"
        }`}
      >
        <div className="w-full">
          {loggedInUserId === id ? (
            <BannerEdit
              userId={id}
              currentBanner={banner}
              setCurrentBanner={setBanner}
            />
          ) : (
            <div className="w-full h-68 mb-4">
              <img
                src={userLogout?.banner}
                // src={videos[0]?.user?.profileUrl}
                alt="Banner"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          )}
        </div>

        <div className=" pb-5 w-full mt-5 md:flex">
          <div className="h-38 w-38">
            <img
              className=" w-full h-full  rounded-full"
              src={userLogout?.profileUrl}
              alt=""
            />
          </div>

          {/*  */}

          <div className="flex  md:flex-col sm:flex-col flex-col   gap-2 px-5 ">
            <div className="text-4xl ">{userLogout?.channelName} </div>
            <div className="text-gray-400">
              {userLogout?.userName}{" "}
              
              <span className="text-white "> &nbsp; {videos.length} video</span>
            </div>
            
            <div className=" ">
              <button className="hover:bg-black hover:text-white transition-all duration-400 cursor-pointer px-5 py-3 border-1 rounded-full bg-white text-black md:font-semibold">
                subscribers
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="profile-video w-full ml-4  ">
          <div className="flex items-center text-2xl pb-2.5 font-medium border-b">
            Video &nbsp;
            <AiFillCaretRight />
          </div>
        </div>
        {/* all video show here */}
        <div className="  grid   md:grid-cols-3 gap-4  mt-5 sm:grid-cols-2 items-start w-full   relative   ">
          {videos.map((item, index) => {
            return (
              <div key={index} className="cursor-pointer w-full">
                {/* Only Thumbnail wrapped in Link */}
                <Link to={`/watch/${item?._id}`}>
                  <div className="thumnail w-full h-[200px] relative">
                    <img
                      className="w-full h-full rounded"
                      src={item.thumbnail}
                      alt=""
                    />
                    <video
                      src={item.videoUrl}
                      ref={(el) => {
                        if (el) {
                          el.onloadedmetadata = () => {
                            const totalSeconds = el.duration;
                            const minutes = Math.floor(totalSeconds / 60);
                            const seconds = Math.floor(totalSeconds % 60);
                            const formattedDuration = `${minutes}:${String(
                              seconds
                            ).padStart(2, "0")}`;

                            setDuration((prev) => ({
                              ...prev,
                              [item._id]: formattedDuration,
                            }));
                          };
                        }
                      }}
                      style={{ display: "none" }}
                    ></video>
                    {duration && (
                      <div className="absolute bottom-1 right-1 bg-black text-white text-[12px] px-1 rounded">
                        {duration[item._id] || "00:00"}
                      </div>
                    )}
                  </div>
                </Link>

                {/* Title and Details not inside Link */}
                <div className="video-details flex flex-col w-full mt-2 relative overflow-y-hidden h-24">
                  <div className="text-[16px] font-semibold text-white">
                    {item.title.split(" ").slice(0, 6).join(" ")}
                    {item.title.split(" ").length > 6 && "..."}
                  </div>

                  <div className="text-[gray] text-[13px] flex justify-between items-center   ">
                    <div>{`${item.views} views`}</div>

                    <div className="text-2xl cursor-pointer">
                      <span
                        onClick={() =>
                          setOpenMenuIndex(
                            openMenuIndex === index ? null : index
                          )
                        }
                      >
                        <HiDotsVertical />
                      </span>

                      {/* Dropdown menu */}
                      {openMenuIndex === index && (
                        <div className="absolute right-5  top-5 z-10 bg-[#2c2b2b] text-white text-sm rounded shadow-md  w-[80px]">
                          <button
                            className="w-full px-1 py-0 hover:bg-gray-700 text-left"
                            onClick={() => handleEdit(item._id)}
                          >
                            Edit
                          </button>
                          {editModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                              <div className="bg-[#222] p-5 rounded-lg w-[90%] max-w-md text-white">
                                <h2 className="text-xl mb-4">Edit Video</h2>

                                <input
                                  className="w-full p-2 mb-2 rounded bg-[#333] text-white"
                                  type="text"
                                  placeholder="Title"
                                  value={editData.title}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      title: e.target.value,
                                    })
                                  }
                                />
                                <textarea
                                  className="w-full p-2 mb-2 rounded bg-[#333] text-white"
                                  placeholder="Description"
                                  value={editData.desc}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      desc: e.target.value,
                                    })
                                  }
                                />
                                <input
                                  className="w-full p-2 mb-2 rounded bg-[#333] text-white"
                                  type="text"
                                  placeholder="Thumbnail URL"
                                  value={editData.thumbnail}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      thumbnail: e.target.value,
                                    })
                                  }
                                />
                                <input
                                  className="w-full p-2 mb-4 rounded bg-[#333] text-white"
                                  type="text"
                                  placeholder="Video URL"
                                  value={editData.videoUrl}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      videoUrl: e.target.value,
                                    })
                                  }
                                />

                                <div className="flex justify-end gap-3">
                                  <button
                                    className="bg-gray-600 px-3 py-1 rounded"
                                    onClick={() => setEditModalOpen(false)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="bg-blue-600 px-3 py-1 rounded"
                                    onClick={handleUpdateSubmit}
                                  >
                                    Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          <button
                            className="w-full px-1 py-0 hover:bg-gray-700 text-left"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
