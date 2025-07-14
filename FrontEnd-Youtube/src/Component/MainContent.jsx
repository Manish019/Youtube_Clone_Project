import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { SidebarContext } from "./SidebarContext";
dayjs.extend(relativeTime);

function MainContent() {
   const { sideNavbar, setSideNavbar } = useContext(SidebarContext);
  const [videos, setVideos] = useState([]);
  const [options, setOptions] = useState(["All"]); // All by default
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredVideos, setFilteredVideos] = useState([]);
  console.log("video",videos);
  

  // const videoRef = useRef(null);
  const [duration, setDuration] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5050/allvideo")
      .then((res) => {
        console.log("allvideo", res?.data?.videos);
        setVideos(res?.data?.videos);
        //  Extract all categories
        const categories = res?.data?.videos.map(
          (video) => video.videoCategory
        );

        //: Remove duplicates
        const uniqueCategories = Array.from(new Set(categories));

        //  Add to options array
        setOptions(["All", ...uniqueCategories]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fillter category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(
        (video) => video.videoCategory === selectedCategory
      );
      setFilteredVideos(filtered);
    }
  }, [selectedCategory, videos]);

  

  return (
    // sidebar false hone par full with me content set ho jayega
    <div
      className={`${
        sideNavbar ? "flex flex-col md:ml-[270px] min-h-[100vh]" : " ml-0"
      }`}
    >
      <div className="fixed top-[55px] z-5 h-auto w-full bg-black overflow-x-scroll overflow-y-hidden pl-3 hide-scrollbar flex gap-1">
        {options.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(item)} //use item, not category
            className={`my-2 mr-2 min-h-8 py-1 px-3 rounded flex items-center justify-center cursor-pointer font-semibold whitespace-nowrap 
      ${
        selectedCategory === item
          ? "bg-white text-black"
          : "bg-[#2c2b2b] text-white"
      }`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* ====== all video show here======== */}

      <div className="w-full bg-black h-screen">
        <div
          className={`grid gap-4 p-4 mt-[34px]  bg-black  ${
            sideNavbar
              ? "md:grid-cols-3 sm:grid-cols-2 "
              : "md:grid-cols-3 sm:grid-cols-2 "
          }`}
        >
          {filteredVideos?.map((video, index) => {
            return (
              <Link
                key={index}
                to={`/watch/${video._id}`}
                className="rounded-md shadow-md cursor-pointer transition h-[316px] w-full"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt="thumbnail"
                    className="w-full h-[200px] object-cover rounded-t-md"
                  />

                  {/* Hidden video tag to get metadata */}
                  <video
                    src={video.videoUrl}
                    ref={(el) => {
                      if (el) {
                        el.onloadedmetadata = () => {
                          const totalSeconds = el.duration;
                          const minutes = Math.floor(totalSeconds / 60);
                          const seconds = Math.floor(totalSeconds % 60);
                          const formattedDuration = `${minutes}:${String(
                            seconds
                          ).padStart(2, "0")}`;

                          // Store this in state (explained below)
                          setDuration((prev) => ({
                            ...prev,
                            [video._id]: formattedDuration,
                          }));
                        };
                      }
                    }}
                    style={{ display: "none" }} // invisible video tag
                  ></video>

                  {duration && (
                    <div className="absolute right-1.5 bottom-0 text-white bg-black bg-opacity-80 rounded px-1 text-sm">
                      {duration[video._id] || "00:00"}
                    </div>
                  )}
                </div>

                <div className="p-2 text-black">
                  <div className="flex justify-start gap-3">
                    <img
                      src={video.user?.profileUrl}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div className="flex flex-col">
                      <h2 className="font-semibold text-[18px] text-white line-clamp-2">
                        {/* {video.title} */}

                        {video.title.split(" ").slice(0, 10).join(" ")}
                        {video.title.split(" ").length > 10 && "..."}
                      </h2>
                      <p className="text-gray-300 text-md">
                        {video.user?.channelName}
                      </p>
                      <div className="flex gap-3">
                        <p className="text-gray-600 text-md">
                          {`${video.views} views` || "0 views"}
                        </p>
                        <p className="text-gray-600 text-md">
                          {dayjs(video.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default MainContent;
