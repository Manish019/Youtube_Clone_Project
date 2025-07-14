import Navbar from "./Component/Navbar";
import "./App.css";
import Home from "./Component/Home";
import { useEffect, useState } from "react";
import axios from 'axios'



function App() {
  // yaha se hame props send karna hai taki login hone par profile automatically aupdate ho jaye
   const [token, setToken] = useState(null);
  const [userPic, setUserPic] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const pic = localStorage.getItem("profile");

    setToken(t);
    setUserPic(pic);
  }, []);
  
 
  return (
    <div>
      {/* props send kar rhe hai  */}
      <Navbar   token={token}
        setToken={setToken}
        userPic={userPic}
        setUserPic={setUserPic} /> 
      <Home  />
      
    </div>
  );
}

export default App;
