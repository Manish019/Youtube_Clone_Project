import axios from "axios";
import { useState } from "react";

function BannerEdit({ userId,  currentBanner, setCurrentBanner }) {
  const [bannerUrl, setBannerUrl] = useState("");

  console.log("userId",userId);
  

 const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!bannerUrl.trim()) {
    alert("Please enter a valid banner URL");
    return;
  }

  try {
    const res = await axios.put(
      `http://localhost:5050/update-banner/${userId}`,
      { banner: bannerUrl },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );
    console.log("user id",res);
    
    alert("Banner updated!");
 setCurrentBanner(bannerUrl);
localStorage.setItem("banner", JSON.stringify(bannerUrl))
    setBannerUrl("")
  } catch (err) {
    console.error("Update error:", err.response?.data || err.message);
    alert("Failed to update banner");
  }
};


  return (
    <div className="w-full">
      <div className="w-full h-48 mb-4">
        <img
          src={currentBanner}
          alt="Banner"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Enter banner url"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          className="border px-3 py-1 rounded-lg text-white w-[150px]"
        />
        <button
          type="submit"
          className="  outline-1 hover:bg-white hover:text-black px-4 py-1 rounded-lg"
        >
          banner edit
        </button>
      </form>
    </div>
  );
}

export default BannerEdit;