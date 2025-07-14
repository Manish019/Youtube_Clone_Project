import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
import { SidebarContext } from "./SidebarContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function SearchResults() {
  const { sideNavbar, sidebarFun } = useContext(SidebarContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [duration, setDuration] = useState(""); 

  useEffect(() => {
    if (!query) return;
    axios
      .get(`http://localhost:5050/search?query=${query}`)
      .then((res) => {
        setResults(res.data.results || []);
        console.log(res, "video serach");
      })
      .catch((err) => {
        console.error("Search error:", err);
      });
  }, [query]);

  return (
    <>
      <Navbar sideNavbar={sideNavbar} sidebarFun={sidebarFun} />
      <SideNavbar sideNavbar={sideNavbar} />
      <div
        className={`${
          sideNavbar
            ? " text-white  bg-black p-5  md:ml-[270px] h-screen flex justify-start"
            : "ml-0  text-white"
        }`}
      >
       
        {results.length === 0 ? (
          <p className="text-white mt-10 w-full flex justify-center items-center font-bold">
            No results found.
          </p>
        ) : (
          <div className="  grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-[57px] p-2">
            {results.map((video) => (
              <Link
                to={`/watch/${video._id}`}
                key={video._id}
                className="  p-1 rounded-md shadow-md  cursor-pointer transition h-[316px] w-full"
              >
                <div className="relative">
                  <div className="">
                    <img
                      src={video.thumbnail}
                      alt="thumbnail"
                      className="w-full h-[200px] object-cover rounded-t-md "
                    />
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

                            //store explanation
                            setDuration((prev) => ({
                              ...prev,
                              [video._id]: formattedDuration,
                            }));
                          };
                        }
                      }}
                      style={{ display: "none" }}
                    ></video>
                  </div>
                  {duration && (
                    <div className="absolute right-1.5 bottom-0 text-white bg-black bg-opacity-80 rounded px-1 text-sm">
                      {duration[video._id] || "00:00"}
                    </div>
                  )}
                </div>
                <div className="p-2 text-black ">
                  <div className="flex  justify-start gap-3 ">
                    <img
                      src={video.user?.profileUrl} 
                      alt=""
                      className=" h-11 w-11 rounded-full"
                    />
                    <div className="w-full">
                      <h2 className="font-semibold text-[18px] text-white line-clamp-2">
                        {video.title.split(" ").slice(0, 10).join(" ")}
                        {video.title.split(" ").length > 10 && "..."}
                      </h2>
                      <div className="flex gap-6 justify-between ">
                        <div><p className="text-gray-700 text-md">
                          {video?.user?.channelName}
                        </p></div>

                        <div className="">
                          <p className="text-gray-500 text-md">
                            {dayjs(results.createdAt).fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResults;
