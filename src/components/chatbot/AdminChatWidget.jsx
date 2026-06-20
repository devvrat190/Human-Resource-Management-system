import { useState } from "react";
import "./chatWidget.css";

import { askGemini } from "../../services/geminiService";
import {
  loadAdminContextData,
  buildContext,
} from "../../services/adminChatbotService";

export default function AdminChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I’m your HRMS Assistant. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userQuestion = input;
    setInput("");
    setLoading(true);

    // Add user message immediately
    setMessages((prev) => [...prev, { from: "user", text: userQuestion }]);

    try {
      // 1️⃣ Load HRMS data
      const rawData = await loadAdminContextData();

      // 2️⃣ Build context
      const context = buildContext(rawData);

      // 3️⃣ Ask Gemini
      const answer = await askGemini(context, userQuestion);

      // 4️⃣ Show response
      setMessages((prev) => [...prev, { from: "bot", text: answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Failed to fetch response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING ICON */}
      <div
        className="chat-fab"
        onClick={() => setOpen(!open)}
        title="Admin Assistant"
      >
        💬
      </div>

      {/* CHAT BOX */}
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <span>HRMS Assistant</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-msg bot">Thinking…</div>
            )}
          </div>

          <div className="chat-input">
            <input
              placeholder="Ask about employees, attendance, leaves..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
