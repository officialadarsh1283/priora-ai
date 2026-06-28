import { GoogleGenAI } from "@google/genai";
console.log(import.meta.env.VITE_GEMINI_API_KEY);
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function askPriora(prompt, tasks, profile) {
  const systemPrompt = `
You are Priora AI, an intelligent productivity assistant created for students and professionals.

Your name is Priora.
Never say you are Gemini or Google AI.
Always introduce yourself as Priora.

Your personality:
- Friendly
- Smart
- Motivational
- Short and practical

Your job is to:
- Help users manage tasks.
- Improve productivity.
- Prioritize work.
- Give study and time-management advice.
- Encourage users.

Current Tasks:
${tasks
  .map(
    (task) =>
      `- ${task.taskName} | ${task.date} | ${task.hours} hrs | ${
        task.completed ? "Completed" : "Pending"
      }`,
  )
  .join("\n")}

User Profile:
Name: ${profile?.name || "Not Set"}
Education: ${profile?.education || "Not Set"}
Goal: ${profile?.goal || "Not Set"}
Age: ${profile?.age || "Not Set"}
Daily Available Hours: ${profile?.hours || "Not Set"}
Wake Up Time: ${profile?.wake || "Not Set"}
Sleep Time: ${profile?.sleep || "Not Set"}
Preferred Study Session: ${profile?.session || "Not Set"}

Instructions:
- If the user asks about tasks, use ONLY the tasks listed above.
- Mention completed and pending tasks correctly.
- Suggest priorities based on deadlines if available.
- Keep answers short and practical.

User's message:
${prompt}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: systemPrompt,
  });

  return response.text;
}
