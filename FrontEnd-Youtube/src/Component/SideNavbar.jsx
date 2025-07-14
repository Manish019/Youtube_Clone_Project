import { IoMdHome } from "react-icons/io";
import { MdOutlineVideoCall } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { MdPlaylistPlay } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "./SidebarContext";

function SideNavbar() {
  const { sideNavbar, setSideNavbar } = useContext(SidebarContext);
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

// On resize, detect mobile or desktop
useEffect(() => {
  const handleResize = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // Auto close on mobile
    if (mobile) {
      setSideNavbar(false);
    } else {
      setSideNavbar(true); // Auto open on desktop
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [setSideNavbar])
 const sidebarClass = sideNavbar ? "translate-x-0" : "-translate-x-full";

  return (
   
   <div
  className={`
    fixed top-14 left-0 z-50 w-[270px] h-[calc(100vh-56px)] bg-black text-white 
    overflow-y-auto border-r border-[#ffffff52] hide-scrollbar p-4 
    transition-transform duration-300 transform ${sidebarClass}
  `}
>
  <div className="flex flex-col">
    <Link
      to="/"
      className="flex items-center p-2 hover:bg-[#ffffff10] hover:text-white rounded-xl mb-3 bg-[gray] transition-colors duration-200"
    >
      <div className="flex cursor-pointer justify-center gap-3 items-center">
        <span className="text-2xl"><IoMdHome /></span>
        <div className="text-[15px]">Home</div>
      </div>
    </Link>

    {/* ---- Shorts ---- */}
    <div className="flex items-center p-2 hover:bg-[#ffffff10] hover:text-white rounded-xl mb-3 transition-colors duration-200">
      <div className="flex cursor-pointer justify-center gap-3 items-center">
        <span className="text-2xl"><MdOutlineVideoCall /></span>
        <div className="text-[15px]">Shorts</div>
      </div>
    </div>

    {/* ---- Subscriptions ---- */}
    <div className="flex items-center p-2 hover:bg-[#ffffff10] hover:text-white rounded-xl mb-3 transition-colors duration-200">
      <div className="flex cursor-pointer justify-center gap-3 items-center">
        <span className="text-2xl"><MdOutlineSubscriptions /></span>
        <div className="text-[15px]">Subscriptions</div>
      </div>
    </div>
  </div>

  <hr className="border-[#ffffff30]" />

  <div className="rounded-xl mt-2 py-2.5">
    {[
      { icon: <FaAngleRight />, label: "You" },
      { icon: <FaHistory />, label: "History" },
      { icon: <MdPlaylistPlay />, label: "Playlists" },
      { icon: <GoVideo />, label: "Your video" },
      { icon: <BiLike />, label: "Liked video" },
    ].map((item, i) => (
      <div
        key={i}
        className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[#ffffff10] hover:text-white transition-colors duration-200"
      >
        <span className="text-2xl">{item.icon}</span>
        <div className="text-[15px]">{item.label}</div>
      </div>
    ))}

    <hr className="border-[#ffffff30]" />
  </div>

  {/* ---- Subscriptions ---- */}
  <div className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[#ffffff10] hover:text-white transition-colors duration-200">
    <div className="text-[15px] font-bold">Subscriptions</div>
  </div>

  <div className="flex cursor-pointer px-2 gap-3 items-center mb-2 py-2 rounded-2xl hover:bg-[#ffffff10] hover:text-white transition-colors duration-200">
    <span className="text-2xl">
      <img
        src="https://yt3.ggpht.com/SxtxAT2eoNsERZyC-2Q9t3YhFC0IPhlaYOFA8rciY3BkhfoR9VPAx5n8A8L6QNG3vjFXSsB7rQ=s88-c-k-c0x00ffffff-no-rj"
        className="w-6 h-6 rounded-full"
        alt=""
      />
    </span>
    Great Stack
  </div>

  <hr className="border-[#ffffff30]" />
</div>

  );
}

export default SideNavbar;
