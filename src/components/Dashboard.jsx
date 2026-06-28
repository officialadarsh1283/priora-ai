import { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function Dashboard({ tasks, setTasks }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  useEffect(() => {
    if (stripRef.current) {
      const todayIndex = 60; // because -60 se +60 tak dates hain

      const buttonWidth = 97; // approx 85px + gap

      stripRef.current.scrollLeft =
        todayIndex * buttonWidth -
        stripRef.current.clientWidth / 2 +
        buttonWidth / 2;
    }
  }, []);
  const stripRef = useRef(null);
  const dates = [];

  for (let i = -60; i <= 60; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    dates.push(date.toISOString().split("T")[0]);
  }
  const filteredTasks = tasks.filter((task) => task.date === selectedDate);
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = totalTasks - completedTasks;
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-8 text-white"
      style={{
        backgroundImage: "url('/image2.png')",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Link to="/">
          <IoArrowBackCircleSharp className="text-white text-4xl hover:scale-110 transition" />
        </Link>

        <h1 className="text-black text-3xl font-bold">Dashboard</h1>
      </div>
      <div
        ref={stripRef}
        className="flex gap-3 overflow-x-auto pb-3 mb-6 scrollbar-hide"
      >
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`min-w-[85px] rounded-2xl p-3 transition-all ${
              selectedDate === date
                ? "bg-purple-600 text-white"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            <p className="text-sm font-medium">
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>

            <p className="text-2xl font-bold">{new Date(date).getDate()}</p>

            <p className="text-xs opacity-80">
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
              })}
            </p>
          </button>
        ))}
      </div>
      <div
        className="
          w-[999px]
          h-[500px]
          mx-auto
          mt-10
          rounded-[35px]
          bg-white/90
          border-[10px]
          border-amber-700
          shadow-2xl
          p-8"
      >
        <h2 className="text-3xl font-bold text-black mb-5">📋  Tasks List</h2>

        <div className="h-[350px] overflow-y-auto pr-2">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-600">No tasks added yet.</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="border-b border-gray-300 py-3 last:border-none"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-2xl text-black">
                      {task.taskName} {task.completed ? "✅" : "❌"}
                    </h3>

                    <p className="text-gray-600">📅 {task.date}</p>

                    <p className="text-gray-600">⏱ {task.hours} Hours</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const updatedTasks = tasks.map((t) => {
                          if (t.id === task.id) {
                            return {
                              ...t,
                              completed: true,
                            };
                          }

                          return t;
                        });

                        setTasks(updatedTasks);
                      }}
                      className="mt-3 mr-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      ✔ Complete
                    </button>
                    <button
                      onClick={() => {
                        const updatedTasks = tasks.filter(
                          (t) => t.id !== task.id,
                        );
                        setTasks(updatedTasks);
                      }}
                      className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-600 text-white rounded-2xl p-4 shadow-lg">
          <p className="text-sm">📋 Total</p>
          <h2 className="text-3xl font-bold">{totalTasks}</h2>
        </div>

        <div className="bg-green-600 text-white rounded-2xl p-4 shadow-lg">
          <p className="text-sm">✅ Completed</p>
          <h2 className="text-3xl font-bold">{completedTasks}</h2>
        </div>

        <div className="bg-red-500 text-white rounded-2xl p-4 shadow-lg">
          <p className="text-sm">⏳ Pending</p>
          <h2 className="text-3xl font-bold">{pendingTasks}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
