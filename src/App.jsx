import { FaChartBar } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Dashboard from "./components/Dashboard";
import { FaRobot } from "react-icons/fa";
import AIAssistant from "./components/AIAssistant";
import Profile from "./components/Profile";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            className="min-h-screen bg-cover bg-center bg-no-repeat p-8 text-white"
            style={{
              backgroundImage: "url('/image.png')",
            }}
          >
            <h1 className="text-6xl font-bold text-purple-400">Priora AI</h1>

            <p className="mt-3 text-xl text-gray-300">
              Your Intelligent Productivity Companion ✨
            </p>

            <div className="flex mt-10 gap-8">
              <div className="w-72 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-purple-900">
                <h2 className="text-xl font-bold mb-6 text-purple-400">
                  Navigation
                </h2>

                {/* Dashboard */}
                <Link to="/dashboard">
                  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-purple-800/30 transition cursor-pointer">
                    <FaChartBar className="text-2xl text-purple-400" />
                    <span>Dashboard</span>
                  </div>
                </Link>

                {/* Add Task */}
                <Link to="/add-task">
                  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-purple-800/30 transition cursor-pointer">
                    <FaClipboardList className="text-2xl text-purple-400" />
                    <span>Add Task</span>
                  </div>
                </Link>
              </div>
            </div>
            <Link to="/assistant">
              <button
                className="fixed bottom-8 right-8 w-16 h-16 rounded-full
               bg-purple-600 hover:bg-purple-700
               shadow-2xl flex items-center justify-center
               hover:scale-110 transition duration-300"
              >
                <FaRobot className="text-white text-3xl" />
              </button>
            </Link>
            <Link to="/profile">
              <div className="w-[290px] bg-white/5 backdrop-blur-md border border-purple-900 rounded-3xl p-8 hover:border-purple-500 hover:scale-105 transition duration-300">
                <h2 className="text-2xl font-bold">👤 Profile</h2>
                <p className="text-gray-300 mt-2">
                  Manage your personal information
                </p>
              </div>
            </Link>
          </div>
        }
      />
      <Route
        path="/add-task"
        element={<AddTask tasks={tasks} setTasks={setTasks} />}
      />
      <Route
        path="/dashboard"
        element={<Dashboard tasks={tasks} setTasks={setTasks} />}
      />
      <Route path="/assistant" element={<AIAssistant tasks={tasks} />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
