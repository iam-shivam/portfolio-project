// import React from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
// import Blogs from "./pages/Blogs";
// import BlogDetails from "./pages/BlogDetails";
// import BlogStats from "./pages/BlogStats";
// import Projects from "./pages/Projects";
// import ProjectDetails from "./pages/ProjectDetails";
// import Skills from "./pages/Skills";
import "./index.css";
import { StrictMode } from "react";
import Portfolio from "./App";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
)

// createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />}>
//           {/* if App serves as layout, otherwise define top-level routes */}
//         </Route>
//         <Route path="/blogs" element={<Blogs />} />
//         <Route path="/blogs/:slug" element={<BlogDetails />} />
//         <Route path="/blogs/stats" element={<BlogStats />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/projects/:id" element={<ProjectDetails />} />
//         <Route path="/skills" element={<Skills />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );
