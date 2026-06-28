import { Link } from "react-router-dom";
import { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { askPriora } from "../api/gemini";
import { useEffect } from "react";
import Profile from "./Profile";

function AIAssistant({ tasks }) {
    const profile = JSON.parse(localStorage.getItem("profile")) || {};
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatHistory");

    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: "ai",
            text: "Hello 👋 I'm Priora. How can I help you today?",
          },
        ];
  });
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);
  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");

    setIsTyping(true);

    try {
      const reply = await askPriora(userMessage, tasks, profile);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: error.message,
        },
      ]);
    }

    setIsTyping(false);
  };
  const prioritizeTasks = async () => {
    if (tasks.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "📭 You don't have any tasks yet. Add some tasks first!",
        },
      ]);
      return;
    }

    setIsTyping(true);

    const taskList = tasks
      .map(
        (task) =>
          `• ${task.taskName} (${task.hours} hrs) - ${task.date} ${
            task.completed ? "[Completed]" : "[Pending]"
          }`,
      )
      .join("\n");

    const prompt = `
You are Priora AI, an intelligent productivity planner.

Today's date is ${new Date().toLocaleDateString("en-CA")}.

Below are my tasks:

${taskList}

Analyze every task intelligently.

Rules:

1. Pending tasks due TODAY must always get highest priority.

2. If a future task has a very high estimated time and the remaining days are not enough, recommend starting it TODAY even if its deadline is later.

3. Calculate whether the user can realistically finish the task before its deadline.

4. If required, calculate approximately:
Required hours per day = Estimated Hours ÷ Remaining Days

5. If a task requires too many hours per day, warn the user that it should be started immediately.

6. Ignore completed tasks while prioritizing.

Return the response exactly like this:

🔥 Today's Priority
1.
Reason:

2.
Reason:

📅 Upcoming Priority
3.
Reason:

4.
Reason:

⚠️ Deadline Analysis

Mention if any future task should be started today because of its workload.

🎯 Daily Advice

One short practical advice.

🚀 Motivation

One motivational sentence.

Use proper spacing and line breaks.
`;

    try {
      const reply = await askPriora(prompt, tasks, profile);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Unable to prioritize your tasks.",
        },
      ]);
    }

    setIsTyping(false);
  };
  return (
    <div
      className="min-h-screen bg-[#140426] bg-cover bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: "url('/image_ai.png')",
      }}
    >
      <Link to="/">
        <IoArrowBackCircleSharp className="text-4xl mb-6" />
      </Link>

      <h1 className="text-4xl font-bold text-purple-400 mb-8">
        🤖 Talk to Priora
      </h1>

      <div className="bg-white/5 backdrop-md  h-[500px] p-5 flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-xl max-w-[70%] whitespace-pre-wrap ${
                msg.sender === "ai"
                  ? "bg-yellow-400 text-black self-start"
                  : "bg-purple-600 text-white self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="bg-yellow-400 text-black px-4 py-2 rounded-xl max-w-[200px] self-start">
              Priora is typing...
            </div>
          )}
        </div>
        <button
          onClick={prioritizeTasks}
          className="w-full mb-3 bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-semibold"
        >
          ✨ Prioritize My Tasks
        </button>

        {/* Input */}
        <div className="flex gap-3 mt-5">
          <input
            type="text"
            placeholder="Ask Priora anything..."
            className="flex-1 p-3 text-white rounded-xl bg-black/30 border border-purple-700 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button
            onClick={handleSend}
            className="bg-purple-600 px-6 rounded-xl hover:bg-purple-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;
