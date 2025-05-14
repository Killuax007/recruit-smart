import "./App.css";
import { Routes, Route } from "react-router";
import { Navbar } from "./components/navbar";
import Home from "./components/home";
import Resume from "./components/resume";
import Job from "./components/job";
import Jobdetails from "./components/job-details";
import Scorecheck from "./components/score-check";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/jobs/:id" element={<Jobdetails />} />
        <Route path="/score-check" element={<Scorecheck />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
