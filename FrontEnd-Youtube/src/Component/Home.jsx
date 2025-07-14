


import MainContent from "./MainContent";
import SideNavbar from "./SideNavbar";

function Home() {
  return (
    <div className="w-full  pt-14 ">
      {/* sidebar call */}
      <SideNavbar />
      <MainContent  />
    </div>
  );
}

export default Home;
