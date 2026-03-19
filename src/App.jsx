import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Resume from "./pages/Resume";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Companies from "./pages/Companies";
import Insights from "./pages/Insights";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;