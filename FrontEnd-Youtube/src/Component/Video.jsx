import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import SideNavbar from "./SideNavbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { IoMdShareAlt } from "react-icons/io";
import { SidebarContext } from "./SidebarContext";
import { TfiDownload } from "react-icons/tfi";

function Video() {
  const [fetchData, setFetchData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [profile, setProfile] = useState("");
  const [comment, setComment] = useState([]); 
  const [loggedInUserId, setLoggedInUserId] = useState(""); 
  const [editedMessage, setEditedMessage] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { id } = useParams();
  const { sideNavbar, setSideNavbar } = useContext(SidebarContext);

  async function fetchVideoById() {
    axios
      .get(`http://localhost:5050/getVideoId/${id}`)
      .then((response) => {
        setFetchData(response?.data?.singleVideo);
        setVideoUrl(response?.data?.singleVideo?.videoUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // console.log(fetchData, "fetchdatcommenturl");

  async function getCommentByvideoId() {
    axios
      .get(`http://localhost:5050/comment/${id}`)
      .then((response) => {
        // console.log("comment", response.data.comments);
        setComment(response?.data?.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchVideoById(); //this funtion call single video with id
    getCommentByvideoId();
  }, [id]);
  const [message, setMessage] = useState("");

  //   console.log(sideNavbar,sidebarFun);
  // dynemic id fetch with useparams

  async function handleComment() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to comment");
      return;
    }

    const commentData = {
      video: id,
      message,
    };

    try {
      const response = await axios.post(
        "http://localhost:5050/comment",
        commentData,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      setMessage("");

      //  Use full comment from response (with populated user)
      setComment((prev) => [...prev, response.data.comment]);
    } catch (err) {
      console.error("Comment error", err);
      toast.error(
        err.response?.data?.message || "Failed to comment. Try again."
      );
    }
  }

  // =======================================================
  // user login option
  useEffect(() => {
    const userId = localStorage.getItem("userId")?.replace(/['"]+/g, "");
    setLoggedInUserId(userId);
    const profile = localStorage.getItem("profile")?.replace(/['"]+/g, "");
    setProfile(profile);
  }, []);

  // ==============================================================
  const handleDelete = async (commentId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5050/comment/${commentId}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

    
      setComment((prevComments) =>
        prevComments.filter(
          (comment) => comment._id.toString() !== commentId.toString()
        )
      );

      toast.success("Delete The Comment");
    } catch (error) {
      console.error("Delete failed", error);
      toast.error(error?.response?.data?.message || "Failed to delete comment");
    }
  };
  
  // edit comment logic
  const handleEdit = (comment) => {
    setEditCommentId(comment._id);
    setEditedMessage(comment.message);
  };
  const handleUpdate = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5050/edit-comment/${id}`,
        { message: editedMessage },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      toast.success("Comment updated successfully");

      setEditCommentId(null);
      // Refresh comments
      const updated = comment.map((c) =>
        c._id === id ? { ...c, message: editedMessage } : c
      );
      setComment(updated);
    } catch (err) {
      alert("Failed to update");
      console.log(err.response?.data || err.message);
    }
  };

  const suggestedVideos = [
    {
      id: 2,
      title: "Every Politician Ever: A Masterclass in Saying Nothing",
      thumbnail: "data:image/jpeg;base64,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",
      channel: "Indian Politics",
      views: "1.5M",
    },
    {
      id: 3,
      title: "Learn Php Full In Bigner",
      thumbnail: "data:image/jpeg;base64,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",
      channel: "Code With Harry",
      views: "5M",
    },
    {
      id: 4,
      title: "I Tried Cooking With My Eyes Closed",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy90ipmzUxhrPPheK_Pptgi3ryLqUjQ1jmfw&s",
       description:"Coding tutorials and tech reviews by John Doe.",
      channel: "Funny Ram",
      views: "2.8M",
    },
  ];
  // On resize, detect mobile or desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // open in mobile view
      if (mobile) {
        setSideNavbar(false);
      } else {
        setSideNavbar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSideNavbar]);
  return (
    <>
      <Navbar />

      <SideNavbar sideNavbar={sideNavbar} />
      <div className="mt-[55px]  sm:flex justify-center py-[30px] md:px-5 px-2 bg-black">
        <div className="w-full max-w-5xl flex flex-col">
          <div className="w-full  ">
            {/* fetch the data than video will play */}

            {fetchData && (
              <video
                className="w-full   border rounded-xl "
                controls
                autoPlay
                muted
              >
                <source src={`${videoUrl}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          {/* user  desc comment */}

          <div className="">
            <div className="text-white flex flex-col text-xl font-semibold mb-8">
              {fetchData?.title}
            </div>
            <div className="flex  justify-between gap-3 mt-2.5 flex-wrap">
              <div className="flex gap-3.5  items-center cursor-pointer">
                <Link
                  to={`/user/${fetchData?.user?._id}`}
                  className="flex gap-4"
                >
                  {/* profile image */}
                  <div>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={fetchData?.user?.profileUrl}
                      alt=""
                    />
                  </div>

                  <div className="">
                    {/* channel name */}
                    <div className="text-white font-bold">
                      {fetchData?.user?.channelName}
                    </div>
                    <div className="text-[gray]">{`1.5k Subcribers`}</div>
                  </div>
                </Link>

                <div className=" flex justify-center items-center ">
                  <div className=" bg-[white] text-black md:px-7 py-2 px-7 rounded-4xl font-semibold md:text-xx md:font-semibold  md:py-3  flex justify-center items-center md:rounded-4xl">
                    <button className="cursor-pointer">Subscribe</button>
                  </div>
                </div>
              </div>

              <div className="flex md:gap-6 gap-3 flex-wrap">
                <div className="flex gap-2.5 ">
                  <div className="cursor-pointer hover:text-black hover:bg-white transition-all duration-300 text-white border flex justify-center items-center px-6 py-2    rounded-full  ">
                    <span className="pr-1 text-2xl ">
                      <IoMdShareAlt />
                    </span>
                    Share
                  </div>
                  <div className="cursor-pointer hover:text-black hover:bg-white transition-all duration-300 text-white border flex justify-center items-center  px-6 py-2    rounded-full">
                    <span className="pr-1 text-2xl ">
                      <TfiDownload />
                    </span>
                    Download
                  </div>
                </div>
                <div className="text-white flex gap-x-2.5 md:text-xl justify-center items-center bg-[#a5a5a538] py-2  md:px-2 rounded-2xl">
                  <div className="flex items-center justify-center gap-2 px-2 cursor-pointer ">
                    <BiLike />
                    <div className="">{fetchData?.like}</div>
                  </div>

                  <div className="w-0 h-[20px]  border "></div>

                  <div className=" cursor-pointer flex justify-center items-center gap-2 px-2 ">
                    <div className="">{fetchData?.dislike}</div>
                    <div>
                      <BiDislike />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* description section */}
            <div className="flex flex-col w-full p-4  mt-5 rounded-xl text-white bg-[#a5a5a538]">
              <div className="font-medium">
                {fetchData?.createdAt.slice(0, 10)}
              </div>
              {/* description */}
              <div className="text-sm font-normal">{fetchData?.desc}</div>
            </div>
            {/* comment section */}
            <div className="flex flex-col w-full md:p-4  p-1  md:mt-5  rounded-xl text-white">
              <div className="font-medium">{`${comment.length}  Comments`}</div>
              <div className="flex mt-3 ">
                <img
                  className="h-10 w-10 rounded-full"
                  src={
                    profile
                      ? profile
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt=""
                />
                <div className=" w-full  bg-transparent">
                  <input
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className=" border-b w-full pb-3 focus:outline-none pl-4"
                    type="text"
                    placeholder="Add a comment…"
                  />
                  {/* cancle and submit button */}
                  <div className="flex justify-end mt-3 text-black gap-5">
                    <div className="text-white hover:bg-[white] hover:text-[black]  outline-1 px-4 py-1 rounded-3xl font-semibold">
                      <button>Cancel</button>
                    </div>
                    <div className=" text-white hover:bg-[white] hover:text-[black]  outline-1 px-4 py-1 rounded-3xl font-semibold">
                      <button onClick={handleComment}>Comment</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* user send massage show here */}

              {comment.map((comment, index) => (
                <div key={index} className="flex gap-4 mt-4">
                  <div className="w-[45px]">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        comment?.user?.profileUrl
                          ? comment.user.profileUrl
                          : "https://via.placeholder.com/40x40.png?text=User"
                      }
                      alt=""
                    />
                  </div>
                  <div className="w-[170px]">
                    <div className="flex gap-3 flex-wrap ">
                      <div className="text-sm text-[#aaaaaa]">
                        {comment?.user?.userName}
                      </div>
                      <div className="text-[14px] text-[#aaaaaa]">
                        {comment?.createdAt?.slice(0, 10)}
                      </div>
                    </div>

                    {/*  Show Edit/Delete if comment is by logged in user */}

                    <div className="mt-1  md:w-[230px]">{comment?.message}</div>
                  </div>
                  {comment?.user?._id === loggedInUserId && (
                    <div className="flex gap-2 mt-2 w-full justify-end items-center">
                      {editCommentId === comment._id ? (
                        <div className="flex flex-col gap-2">
                          <div className=" border-b-1">
                            <input
                              className="border px-2 py-1 text-white outline-none border-none 
                             rounded w-full"
                              value={editedMessage}
                              onChange={(e) => setEditedMessage(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdate(comment._id)}
                              className="text-green-500 hover:underline"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => setEditCommentId(null)}
                              className="text-gray-400 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <button
                            className="text-blue-400 hover:underline"
                            onClick={() => handleEdit(comment)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-400 hover:underline"
                            onClick={() => handleDelete(comment._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* video suggestions */}
        <div className="w-full max-w-[406px] flex flex-col py-2.5 px-4 gap-2.5">
          <div className=" text-white">
            <div className=" space-y-4">
              <h3 className="text-lg font-semibold mb-2">Suggested Videos</h3>
              {suggestedVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex gap-2 cursor-pointer hover:bg-gray-800 p-2 rounded"
                >
                  <img
                    src={video.thumbnail}
                    alt="thumbnail"
                    className="w-42 h-28 rounded-md object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-semibold">{video.title}</p>
                    <p className="text-gray-400">{video.channel}</p>
                    <p className="text-gray-400">{video.views}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Video;
