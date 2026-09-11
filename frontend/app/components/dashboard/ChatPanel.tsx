"use client";

import { useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

interface Message {
  id: number;
  role: "assistant" | "user";
  text: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi Pratham! 👋 I'm Aura, your AI assistant. I noticed you were experiencing some cognitive overload, so I've simplified your interface. How can I help you today?",
  },
  {
    id: 2,
    role: "user",
    text: "Thanks Aura! The simplified view is much better. Can you hide the analytics and team activity sections?",
  },
  {
    id: 3,
    role: "assistant",
    text: "Absolutely! I've already removed those sections to reduce visual clutter. Your workspace now shows only the essentials: Tasks, Calendar, and Files. Would you like me to adjust anything else?",
  },
  {
    id: 4,
    role: "user",
    text: "That's perfect. Can you remind me what tasks are most important today?",
  },
  {
    id: 5,
    role: "assistant",
    text: "Sure! Here are your top priorities for today:\n\n1. 📝 Review API documentation (due today)\n2. 📊 Submit weekly report (due today)\n3. 🎨 Update UI components (due tomorrow)\n\nWould you like me to help you with any of these?",
  },
];

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: messages.length + 1,
      role: "user",
      text: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate assistant reply
    setTimeout(() => {
      const reply: Message = {
        id: messages.length + 2,
        role: "assistant",
        text: "I understand! Let me look into that for you. AuraGen continuously learns from your preferences to provide a better experience. Is there anything else I can help with?",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-2xl border border-gray-100 bg-white shadow-sm animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg shadow-md shadow-primary/20">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">
            Aura{" "}
            <span className="text-sm font-normal text-gray-400">
              (AI Assistant)
            </span>
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 animate-slide-up ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                msg.role === "assistant"
                  ? "gradient-bg"
                  : "bg-gray-200"
              }`}
            >
              {msg.role === "assistant" ? (
                <Bot className="h-4 w-4 text-white" />
              ) : (
                <User className="h-4 w-4 text-gray-600" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "assistant"
                  ? "bg-gray-50 text-gray-700 rounded-tl-md"
                  : "gradient-bg text-white rounded-tr-md"
              }`}
            >
              {msg.text.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < msg.text.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Aura anything..."
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
          />
          <button
            onClick={handleSend}
            className="flex h-11 w-11 items-center justify-center rounded-xl gradient-bg text-white shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
