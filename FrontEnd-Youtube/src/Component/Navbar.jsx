import { GrMenu } from "react-icons/gr";
import { IoLogoYoutube } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdClose, MdVideoCall } from "react-icons/md";
import { BsBellFill } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";


import "../style/SpecialFont.css";
import { useContext, useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import Login from "./Login";
import { SidebarContext } from "./SidebarContext";
// props ko catch kiya gya hai memu handle kaerne ke liye
function Navbar() {
  const { sideNavbar,setSideNavbar } = useContext(SidebarContext);

  const Navigate = useNavigate();
  const [query, setQuery] = useState(""); //search ka state
  const [showModal, setShowModal] = useState(false); //mobile screen me search ka state

  // user profile setup
  const [userPic, setUserPic] = useState(null);

  const [token, setToken] = useState(null);

  //  drop down
  const [NavbarModal, setNavbarModel] = useState(false);
  //   ==========
  const [login, setLogin] = useState(false);
  // =============
  const[userId,setUserid]=useState(null)

  function handleDropDown() {
    setNavbarModel(!NavbarModal);
  }
  //   -------
  // menu par click karne par side close open hoga
  function handleSideBar() {
    setSideNavbar(!sideNavbar);
  }
  //   =====================
  
  // =====================
  function onClickUpOption(button) {
    setNavbarModel(false);
    if (button === "login") {
      setLogin(true);
    } else if (button === "logout") {
      //  Remove token and profile from localStorage
      localStorage.clear();
      setTimeout(() => {
        Navigate("/");
        window.location.reload();
      }, 1000);
    }
  }

  function closeLoginModel() {
    setLogin(false);
  }

  // login ke profile show karega
  useEffect(() => {
    const userInfo = localStorage.getItem("profile")?.replace(/['"]+/g, "");
    const userId = localStorage.getItem("userId");
    setUserid(userId)
    // console.log(userInfo, "navbar user info");

    setUserPic(userInfo); //  Now only the image URL goes to img src

    const localToken = localStorage.getItem("token");
    setToken(localToken);
    setNavbarModel(false);
  }, [login]);

  //search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowModal(false);
    Navigate(`/search?q=${query}`);
  };

  return (
    <>
      <div className=" h-14  p-0 md:p-2  flex w-full bg-black justify-between z-10 fixed top-0 md:px-[20px]">
        {/* <div className=" h-14 px-2.5 py-4 flex w-full bg-black justify-between z-10 fixed top-0 md:pl-[250px]"> */}
        {/* menu btn */}
        <div className="flex gap-2.5 justify-center w-fit  items-center">
          <div
            onClick={handleSideBar}
            className="text-white cursor-pointer w-10 h-10 flex text-2xl justify-center items-center  "
          >
            <GrMenu />
          </div>
          {/* youtube icon   */}

          <Link
            to="/"
            className=" flex justify-center items-center text-white "
          >
            {/* <span className="text-3xl text-[#FF0000]">
              <IoLogoYoutube />
            </span> */}
            <div className=" text-[23px] whitespace-normal  lora font-normal">
              {/* YouTube */}
              <img className="w-40 h-12" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVsAAACRCAMAAABaFeu5AAAAwFBMVEX////NIB8AAADKAADMGBbNHBvWV1b239/LCAXknZwNDQ2srKzi4uLwx8fxzMx5eXnQMTDMEA47OzvuwMCWlpZubm7egoLprq7jl5eBgYFnZ2fnqKjLDQu1tbX67Ozhj4/abm7019fAwMD99vbceHfruLj56eny09PVUlHOJiXWXV3u7u7Ozs6hoaHV1dXSQ0KLi4tSUlLp6enPLy7YZmXSQ0Pdfn7WW1ojIyM4ODhHR0cvLy8YGBhaWlonJyfROjlcLpmwAAAONUlEQVR4nO2da3vaOBOGobIDtCHBpQuksBzCmTabtEDS7WH5///qtcHYeqSRbAPGFi/Ph16NbYx9I8uj0cyoULg4DYfd7mRSKg0Gg+n0rlqtuxp7anpq77T9/3art7tavZtOp4NBqTSZdLvd4TDre8hSw0lpcFcdu6Ravcaov1rM1pvl3GJxVHYV5zhrvtw8zxar/qjRa1XazXH1blCaXCL37qDerPRe+zfrORDodBzHsSzL9lQ8pbZndM/snr/TgV+j+HzTH/UqzfpgkjWWYzVo92u7FtdxPIgnJXgYdZe4j3vZr0yzBnSo7kbuDTjZ81TJtlzG/WrWmA5Qc55nroEcZrezRpVQ9SIzAOxWNrPGWeNKoOHCGLKebDYzxoSYMidrXAllMUO63aZRjXYnmxnR61ZY1qAOEutlDS5ahqI1AW7dVLQu3JybC0MD+9pALN/j4DfTLARe1jprfDpVze0RPLF61gA12hjcI7iy51kDVMvwZpvr19nMyhrOkbI3WSNUaWJ6s3Ub7iBriAr1OlmjOVpOI2uICuVgXuFY2SxriLQG5ncJbqdwlzVGUtAlePOAcZXk3m3+gyk8J/tO4R3ok3y3H/CIlNnyxq311oivBHDtTS/8XC8Fc9ou7m7mBcj9lO/2MxzwOV20Xb5LYM0En0zQl1hv/AcXKdh8vlPhn6hmifv/PoZctMADlsjVnITtDf/BtzTY+q3iPbB7FK85kv1JBY+2uWyd0e7c2Ck8iNf8BLu/HUUuWtD5mct23+Fiw/whXvM32P3hKHIJCZnLtsj8OV986L8I16zfe2KVLoatb+E+6F5WX2HnxyPZRWl8MWz9lxni+wsvGXvjpyPZRalShgs0l21nPyepswT+hX23x6GLFI4ADGa7NxQKf6n5DfUvulNrBfdpMFtr5p/9Uf3c4y5iRHxaPcP402C24cQOAPzDfzG+5/45El2kLGSb1pg3fbbFwM34R9nh/tZ0xSkIATmN6R0njGQbVu9AB7O9SYftPqjxbyD4Nfze77BDGrOdWl0BkIPZHXBsSUj9SHDfZ2G7DwHBNxbXqyqhp6OSlpDI9uD7PgvbIAviJ4+QGyCgBZEy2UJB/2CbxTaIAEH/dxj/DJuFUUUKGl8Q2+A9jP1q4Ge8pTenpvblsC23gi/4Rb6z0L+YNtlCoaWdPzeKLTeP/omH+Hu/FfyLYPemI/2kl1ls+8EX4NP/3d8KG1OezfHU197mGdieLm/VWoTf8J7AiA4yynU7/H57+53YfqD0TShltnaZsXmtyPT5QdY21XT7T0f3O9jP4TeAL9G3CKCjkGaAv74Eltu3T/Ro+OlzqD/hq/D7H247P3Gsn87WsLUVw4gOvzlgRrG12bxS2v49HTHVT2x32LpS3Y0KJtXWRvMz8JGiOLOz2wb+RcF1i6+5d+9+ULM99/wR4QHYAXHHzw9ka9dgV7AH41sC5zDBls25iOTuulyk1GGtLnzRpKGmy18t3O/Wz4ijNXj0H98Rkm20OGzfU1BOxRZcEGq2tphesyIMFpsRIXTDleqa+asFDk8SwF9KZqHuDWVry/Fbz1K3YDl05OdYkfjCuAxUILmdKgf/Iu+6RbeZ+LHD2Q6zYes4cmqN6DUqOhtVtm6Jhsv47gMoeRvAv8jNRihaLQE3IVvphs7CdsawE91JCAO2asQxviYkXMiFgrivr8I4mCMgxN6hXo5hGxEynhLbNZkQhs+Q7ehyzKfUdbMSd8TfAiPxb19fdGiFqYmEbCNM1pTYlgqkIAQvIsqeSpGFj4BZ8K/gXwyRYVijJIhgSMg2Iq45JbYKNXkzOSrInjDM8f0I3oMvcv8rc6HEO9ATso2YlzkvW76DioyxJ64cvxs60kcAEFpXODlJiHfpJGQbkVl2XraFcEjbiU4ulxsupkfCy+sBSQcHCSTvn55E2twZE7KNSD9Pke20NWqIk8phhyukP5cqr+7R+HJrSpcuZPDxTtxf0K8Gh6D7xvcFKAPKErLVTzukx7ZaY2XHYQ7aYoEVxrtdXI0Yc5wOY1AWTDYfBbbgmyEYiocE7hv4HbjRmRlsR759aiHDoCmWK/zm/dyIzaDlPoudghBcoXxPhU0R3nfBeALsst/hCY1g2w8PB0sr6P2xhQbhKQyQSymHYuCKii19xH/hZhgFh79nQrZyp3UOtmFcDTbQ4AsYuTUM+dpKeleIbBVGQDiShQbKhYKAxzG0hQ1jy83DFMIuFE/OMVQw3+8VgtnwTUVQAS8v59F95LeHRoVhbLEl7ke9Vp/fyk1FY4crXntZDBSk2YazOcCQ84bDjxIyN4wtfRq0brnoa/TxiPmVEluMo/HFDWPB6OWMLWAb+h5MY2tTp8GHu6ViK44eJLbQLuV2iP3qB8Xnwn7YNLYWyRYMVS6EAtmK86gSW7JT4Fy3YN6qYvJCA/cy2MLgVcl2FcmWmFLg7NV4bMO4sctgCydRshVjK2S2GBS6Fe/u/r9kC85CNVthxldmS3i+eW/3le0RbAsfJbb83ivbY9iKMR0YiH9l2+MWigDXYwy2kr8GAvGvbJWKwbbwQ2ALO69slYrDFhN4hUD8K1ul4rAV6nxgkNeVrVJx2Gozp69slYrFFq0w3HeJbG+ubK9sr2yD76YSvbNjm81c5JXtle3ls62/KupBigEKZGXs7NhmE7OUjG2LKeqYSrEfV7aJ2cYtK00uRZAd22xiRNNiSy24lR1bMrbdWLbUKzA7ttnEjafFllr+NDu22eQ7pMWWSpHIjm02OVCHs3U6nCQ7gcpR0bEF5+7J2WaUu3coW6fRC9WS7Fsqay07tpnl8x7GFmPtxPgE3OvryhZPE3OeV4yrIXN7sutvhZKBeWEbL67mtGxV8bcHx4MdXJsiXbYHxYMJMZG+dGxVcYwQI3pwHGPE8lrpsy1Sp0HHgDL+Vrh2eqEtHVt49lXxt2FfkZSt+Fydmy15Goy/VbIV7ASMQd9Lx/YxTrsNtyvYqjLcC6MDa1idiK3Awz8Nxo1zflBkuxTYrgqEdGyhxaneZZH5DhB9zrPVr12WmK2QAhbJFnNJ9qdBSpw/SZvv4LwWCOnYQq46VyEJbLOoPB0Mi+LZYin3o9kK7pJItpgDtR/J4Nqa3PgGr0dgS+cA69gqktOx5GC4mWYL5wC2+slIDdsldZuYXKeu+xHm7YJ7JUhEx/YZ/BTYysW6GnQ9by1byC4NXmYQi8Ol9EG+2p4tVt4HtvpEdA1bXLZ1t4eJT6WCbXVfDkwwEwKvHBphQaeADgPx0unFTrVs6WKu//EbuaBSqqCbgBbY6p2MGrYd2HXjvhItedV3VT5vqbalawve7GAWROg6X7fpv2LZK9E/Rs9gatliMdff2wDSW+gR+AgyTL72DpZj/nm2+oI1mrp2crnsjXxv6hz/8dqrhidMwgRZenYZdzSL7tFzoV2Kwx7SDaZnKza7358/a4JKhbJBv36+k8Wz1TvCdGwFx8iEckLpalMMS9InwqKm0tRXdyI6YuSUU+oKItgSySYoPs78Mepgga3eWaNjS9ZKEpSw7kf4jhOS/ylJ1WXpMix6tsJScrL4cqORxW1EtkudQ0HHlpr4E5WQLUtwesmrbzvkcRFsFfnUe+HSJYpjlGy1RVo1bMuCubW/5Ti1LhXi36uCBSFrJTZbe00eF8FWV9ZOKNsoLizn6wkSrYCtdtCrYctX8uVkxxnzjgqkYIzY6dMH+ZIDgughbyRbIk0qlFCAWMr68Vqt2lejn+nT1RYmu7dNPH8C3YoRlzgO0VzKVopluyPZ4igMJK7BRaQCPmn8YPqBmZatbKoPN04stgtGNfqWMPzWrJs0KROV1+jfIpot/ai7BplcNvtFPMYby6nZaiNrdGyFkZmr7tyK5wdbWGXZHyg3RXks4mtAlbokI5ZisaUrMpFra6D1+37bsNVstQautt54WXgIq94dx2RbdIqCpT8kZpfYjDRZK9FVREPhE08e4pUMF8l+pEuOf+Hh+ravsia2XD0jNtsia/F7d3WpYtXE9mqsCSPYgUPZK+4wWpq7rW7o1qCoMvjywEkqxRzoFhwx9+qlzYI2fr8vq/3lnv8KOFi3CgGr1jm1RX8ke9s3vmHLLwPeaXEfqAZGiL3mzlRdb39OrpZ4aaQoxewe1K9yeEuVueJIXBX8EN1+ePj88+efh6eINeO+Pr28PMVbREq76gsUw5ddvRZb95rjZmsW7qPr5GNZfZ+O3WGb10q7MqrpFiFwGKv1e5V2u9W4KTPiJbZTuRV9q2fXEas27Pgw1jl4nRHbcXHpeqXdUVan7H6Lo5vwJwPtMpfqcTRLkUVdM5GYkmGkFMPErBURl2+GEi0iej5FxDKaITLOLgfSx38YoXg+zAwUURjbBNHzkHlQpBGUd9n5tBI8UYslGKUYpd+zkvFvs7y+yTy1zIYbudBGpjK6x7Xz3GwNHz/k10jYaWQu3A49CZkjrU31KujWOcuLNmbCdZa57mx9zUzsFjrKhQ/zpVfzPLks933tXtWyNkI/d7I0IQz5U4PFTajPXjabxYmlzI+6DaZcPztXsliNDvbItcYLb3Yxz12v7TC2ildDLH+qtt68+duydmb1/LJty1sijhVHYzOsA5WGg3Gl8RZEKJQ7jmO5ss9F23ZJWo7jeNPn+7iGzWLUak7N5sprOBlM6+N2pdUY9RezdQ2iOLjAEK/KybYkmrWTHcpHxck/xmPnlUkpl+UTWsvn2aI/arQqzXH9bkDmU1ykhsPupFQaTO+q1fp43Gy3K5VWr9doNEaj/mq1WLzNZuvNprZczovuc1z2m71dnM+Xy9pm87ye3SwWq1W/P3ptNHq9VqXddgnWq3fTQanUHV5Oy7wc/Q9IkHZdEFmizwAAAABJRU5ErkJggg==" />
            </div>
          </Link>
        </div>
        {/* ----------- search video field------------ */}
        <div className=" flex gap-2.5 md:w-[40%] justify-center items-center">
          <form
            onSubmit={handleSearch}
            className="w-full flex justify-center items-center relative"
          >
            <div className="w-full flex justify-end">
              {/* Input */}
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search"
                className=" search_box  h-10 rounded-tl-[20px] rounded-bl-[20px] text-white pl-8 focus:outline-none border border-[#e6e5e560] bg-[#121212] w-full"
              />

              {/* Search Icon */}
              <div
                
                className="search_icon2 text-white flex justify-center items-center md:bg-[#414141] cursor-pointer md:rounded-tr-[20px] md:rounded-br-[20px] md:px-4 h-12 w-12 md:h-auto px-7"
              >
                <button type="submit" className="text-2xl">
                    <IoSearchSharp />
                  </button>
              </div>
            </div>
          </form>

          {/* Modal Popup for search */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center  z-50">
              <div className=" p-6 rounded-xl w-[90%] max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white text-xl">Search</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white text-2xl"
                  >
                    <MdClose />
                  </button>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Type to search..."
                    className="w-full px-4 py-2 rounded bg-[#121212] border border-gray-600 text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#494747] text-white rounded font-semibold"
                  >
                    <IoSearchSharp />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* profile video  icons*/}
        <div className=" flex text-white justify-center items-center md:gap-5 gap-2 relative ">
          <div
            onClick={() => {
              if (window.innerWidth < 768) setShowModal(true);
            }}
            className="search_icon text-white  md:bg-[#414141] cursor-pointer md:rounded-tr-[20px] md:rounded-br-[20px]"
          >
            <span className="text-2xl">
              <IoSearchSharp />
            </span>
          </div>
          <Link to={`/${userId}/upload`}>
            <span className="text-2xl cursor-pointer">
              <MdVideoCall />
            </span>
          </Link>
          <span className="text-[20px] cursor-pointer">
            <BsBellFill />
          </span>
          <div
            onClick={handleDropDown}
            className="cursor-pointer flex justify-end"
          >
            {token ? (
              <img src={userPic} alt="user" className="rounded-full w-7 h-7" />
            ) : (
             
             
             <div
  onClick={() => onClickUpOption("login")}
  className="flex items-center gap-2 p-1 md:px-2 rounded hover:bg-[red] hover:text-white transition-all duration-300 cursor-pointer text-sm font-medium"
>
  <FaRegUserCircle className="text-lg" />
  Sign In
</div>
            )}
          </div>

          {/* drop down  */}
          {NavbarModal && (
            <div className="absolute top-9 w-full z-40 text-white ">
              {/* Show only if logged in */}
              {token && (
                <>
                  
                  <div
                    className=" cursor-pointer bg-[red] p-2 hover:bg-[#f8f4f4] hover:text-black"
                    onClick={() => onClickUpOption("logout")}
                  >
                    Logout
                  </div>
                </>
              )}

            </div>
          )}
        </div>
        {/* login ka modal open hoga  */}
        {login && <Login closeLoginModel={closeLoginModel} />}
      </div>
    </>
  );
}

export default Navbar;
