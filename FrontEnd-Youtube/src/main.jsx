import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Video from "./Component/Video.jsx";
import Profile from "./Component/Profile.jsx";
import { SidebarProvider } from "./Component/SidebarContext.jsx";
import VideoUpload from "./Component/VideoUpload.jsx";
import SignUp from "./Component/SignUp.jsx";
import SearchResults from "./Component/SearchResults.jsx";
import PageNotFound from "./Component/PageNotFound.jsx";

const appRouter= createBrowserRouter([
  
  { path: "/", element: <App />,
    errorElement: <PageNotFound />
   },
  { path: "/watch/:id", element: <Video  /> }, 
  { path: "/user/:id", element: <Profile /> }, 
  { path: "/:id/upload", element: <VideoUpload /> }, 
  { path: "/signup", element: <SignUp /> }, 
  { path: "/search", element: <SearchResults /> }, 
  


]);
createRoot(document.getElementById("root")).render(
  <SidebarProvider>
      <RouterProvider router={appRouter} />
    </SidebarProvider>
);
