import { useState } from "react";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function AddTask({ tasks, setTasks }) {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [message, setMessage] = useState("");
  return (
    <>
      <Link to="/">
        <IoArrowBackCircleSharp className="text-black-900 text-4xl mb-4" />
      </Link>
      <div className="bg-white/5 backdrop-blur-md border border-purple-900 rounded-3xl p-8 hover:border-purple-500 hover:scale-105 transition duration-300">
        <FaClipboardList className="text-purple-400 text-5xl mb-6" />

        <h2 className="text-3xl font-bold mb-4">Add Task</h2>

        <input
          type="text"
          placeholder="Task Name"
          className="w-full p-3 rounded-lg bg-black/20 border border-purple-800 mb-3"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-3 rounded-lg bg-black/20 border border-purple-800 mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Estimated Hours"
          className="w-full p-3 rounded-lg bg-black/20 border border-purple-800 mb-4"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <button
          onClick={() => {
            if (taskName.trim() === "") {
              setMessage("❌ Please enter a task name");
              return;
            }
            const alreadyExists = tasks.some(
              (task) =>
                task.taskName.trim().toLowerCase() ===
                taskName.trim().toLowerCase(),
            );

            if (alreadyExists) {
              setMessage("❌ Task already exists!");
              return;
            }
            console.log("Task:", taskName);
            console.log("Date:", date);
            console.log("Hours:", hours);
            setTasks([
              ...tasks,
              {
                id: Date.now(),
                taskName: taskName,
                date: date,
                hours: hours,
                completed: false,
              },
            ]);
            setMessage("Task Added Successfully ✅");
            setTaskName("");
            setDate("");
            setHours("");
            console.log(tasks);
          }}
          className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-semibold"
        >
          Add Task
        </button>
        {message && (
          <p className="text-black-400 mt-4 font-semibold">{message}</p>
        )}
        <hr className="my-6 border-purple-700" />

        <h3 className="text-2xl font-bold mb-3">Tasks</h3>
        {[...tasks].reverse().map((task, index) => (
          <div
            key={index}
            className="bg-purple-900/30 p-4 rounded-lg mb-3 border border-purple-700"
          >
            <p>
              <strong>Task:</strong> {task.taskName}
            </p>
            <p>
              <strong>Date:</strong> {task.date}
            </p>
            <p>
              <strong>Hours:</strong> {task.hours}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default AddTask;
