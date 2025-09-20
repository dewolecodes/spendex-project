"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// All icons now from react-icons (install with `npm i react-icons`)
import {
  FiCopy,
  FiThumbsUp,
  FiThumbsDown,
  FiVolume2,
  FiEdit2,
  FiShare2,
  FiPlus,
  FiMic,
  FiSend,
  FiFileText,
  FiHome,
  FiBookOpen,
  FiFile,
  FiSettings,
  FiMessageSquare,
  FiGrid,
  FiClipboard,
} from "react-icons/fi";

const FinancialAssistantChat = () => {
  const router = useRouter();
  // Chat messages state
  const [messages, setMessages] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Input field state
  const [inputText, setInputText] = useState("");
  // Loading indicator for sending message
  const [loading, setLoading] = useState(false);
  // Toast message state
  const [toast, setToast] = useState("");
  // Mobile menu open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // On mount: set up session and preload conversation
  useEffect(() => {
    // Always create a fresh session ID when the chat page mounts so
    // we don't reuse old chats from previous servers. This ensures a
    // new chat is started each time the user opens the chat page.
    try {
      const newSession = Date.now().toString();
      localStorage.setItem("session_id", newSession);
      setSessionId(newSession);
    } catch (e) {
      // If localStorage is unavailable for any reason fall back to in-memory only
      console.warn("Could not write session_id to localStorage on mount", e);
      setSessionId(Date.now().toString());
    }

    // Start each session with a formal greeting from the assistant.
    const greeting = {
      id: Date.now(),
      isUser: false,
      content: "Hello. May I have your name, please?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([greeting]);
    setMounted(true);
  }, []);

  // Helper to show a toast notification
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  // Handle sending a new message
  const handleSend = async () => {
    const text = inputText.trim();
    if (!text) return;
    // Add user message to chat
    const userMsg = {
      id: Date.now(),
      isUser: true,
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    // Call the backend API
    try {
      setLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          // include session_id if we already have one
          ...(sessionId ? { session_id: sessionId } : {}),
        }),
      });
      const data = await response.json();

      if (data.session_id && data.session_id !== sessionId) {
        try {
          localStorage.setItem("session_id", data.session_id);
        } catch (e) {
          console.warn("Could not write session_id to localStorage", e);
        }
        setSessionId(data.session_id);
      }

      const botAnswer = (
        data.answer ||
        data.response ||
        data.message ||
        ""
      ).trim();

      const botMsg = {
        id: Date.now() + 1,
        isUser: false,
        content:
          botAnswer ||
          // guaranteed fallback if for some reason upstream returned an empty string
          'Sorry — I couldn\'t create a reply right now. Try rephrasing or ask: "Help me set up my profile."',
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
      showToast("Error sending message");
      // Ensure UI still shows a helpful fallback bot message
      const fallbackMsg = {
        id: Date.now() + 2,
        isUser: false,
        content:
          "The assistant is temporarily unavailable. Try again or check your network connection.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Copy text to clipboard and show toast
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard");
  };
  // Handle thumbs up/down feedback
  const handleFeedback = (type) => {
    showToast(type === "up" ? "Glad it helped!" : "Sorry about that");
  };
  // Speak text via Web Speech API
  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };
  // Edit a user message (populate input for re-edit)
  const handleEdit = (msg) => {
    setInputText(msg.content);
  };
  // Share button action (copy current URL)
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copied to clipboard");
  };

  return (
    <div className="flex h-screen" style={{ background: "#f9fafb" }}>
      {/* Sidebar - hidden on mobile; mobile menu is implemented below */}
      <aside
        className="hidden md:flex w-64 flex-col justify-between p-6"
        style={{ background: "#001726" }}
      >
        {/* Logo - replace src with your image when ready */}
        <div className="flex flex-col items-start w-full mb-6">
          <Link href="/">
            <img
              src="/logo/logo.png"
              alt="Spendex Logo"
              className="h-24 w-auto object-contain cursor-pointer"
            />
          </Link>
          <p className="text-[#6B7280] -mt-3 text-xs">
            Your AI Financial Assistant
          </p>
        </div>

        <nav className="space-y-4 mt-4">
          <div
            className="flex items-center space-x-3 cursor-pointer text-[#9c9c9c] hover:text-white p-2 rounded-md"
            role="button"
            tabIndex={0}
            onClick={() => {
              // Clear localStorage session and reset UI state so a new chat
              // is created instead of reopening the old one.
              try {
                localStorage.removeItem("session_id");
              } catch (e) {
                console.warn("Could not remove session_id from localStorage", e);
              }
              setSessionId(Date.now().toString());
              const greeting = {
                id: Date.now(),
                isUser: false,
                content: "Hello. May I have your name, please?",
                timestamp: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };
              setMessages([greeting]);
              // force navigation to the same page to ensure mount logic runs
              router.push("/dashboard/wireframe");
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                try {
                  localStorage.removeItem("session_id");
                } catch (err) {
                  console.warn("Could not remove session_id from localStorage", err);
                }
                setSessionId(Date.now().toString());
                setMessages([]);
                router.push("/dashboard/wireframe");
              }
            }}
          >
            <div className="bg-transparent hover:bg-white/10 p-2 rounded-md">
              <FiMessageSquare className="w-5 h-5 text-[#9c9c9c]" />
            </div>
            <span>New Chat</span>
          </div>

          <div className="flex items-center space-x-3 cursor-pointer text-[#9c9c9c] hover:text-white p-2 rounded-md">
            <div className="bg-transparent hover:bg-white/10 p-2 rounded-md">
              <FiGrid className="w-5 h-5 text-[#9c9c9c]" />
            </div>
            <span>Dashboard</span>
          </div>

          <div className="flex items-center space-x-3 cursor-pointer text-[#9c9c9c] hover:text-white p-2 rounded-md">
            <div className="bg-transparent hover:bg-white/10 p-2 rounded-md">
              <FiBookOpen className="w-5 h-5 text-[#9c9c9c]" />
            </div>
            <span>Knowledge Base</span>
          </div>

          <div className="flex items-center space-x-3 cursor-pointer text-[#9c9c9c] hover:text-white p-2 rounded-md">
            <div className="bg-transparent hover:bg-white/10 p-2 rounded-md">
              <FiClipboard className="w-5 h-5 text-[#9c9c9c]" />
            </div>
            <span>My Plans</span>
          </div>

          <div className="flex items-center space-x-3 cursor-pointer text-[#9c9c9c] hover:text-white p-2 rounded-md">
            <div className="bg-transparent hover:bg-white/10 p-2 rounded-md">
              <FiSettings className="w-5 h-5 text-[#9c9c9c]" />
            </div>
            <span>Settings</span>
          </div>
        </nav>

        <div className="mt-auto text-xs text-[#9c9c9c] pt-6">
          © 2025 FinanceBot
          <div className="text-[#9c9c9c] text-[11px] mt-2">
            All your financial data is secured and encrypted
          </div>
        </div>
      </aside>


      {/* Main content area */}
      <div className="flex flex-col flex-1 h-full">
        {/* Header */}
        <header
          className="flex items-center justify-between px-4 py-3 relative"
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            background: "#f9fafb",
          }}
        >
          {/* Left: hamburger on mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-md mr-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
          </div>

          {/* Center: title - centered on mobile and slightly smaller */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-lg md:text-xl font-semibold" style={{ color: "#1f2937" }}>
              Financial Assistant
            </h2>
            <p className="text-xs md:text-sm mx-auto" style={{ color: "#6B7280" }}>
              Ask me anything about your finances
            </p>
          </div>

          {/* Right: actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-[#f0f0f0]"
              aria-label="Share"
            >
              <FiShare2 className="w-6 h-6 text-black" />
            </button>

            {/* removed small top-right avatar as requested */}
          </div>
        </header>

        {/* Mobile side panel (left) */}
        <div
          className={`fixed inset-0 z-40 transition-opacity ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Panel */}
          <aside
            className={`absolute top-0 left-0 h-full w-64 bg-[#001726] text-white shadow-lg transform transition-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            aria-label="Chat menu"
          >
            <div className="p-4 flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <img src="/logo/logo.png" alt="Spendex" className="h-20 w-auto" />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="p-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </button>
            </div>

            <nav className="px-4 py-2 space-y-3 text-base text-[#9c9c9c]">
              <button
                onClick={() => {
                  try { localStorage.removeItem('session_id'); } catch(e){}
                  setSessionId(Date.now().toString());
                  const greeting = { id: Date.now(), isUser: false, content: 'Hello. May I have your name, please?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
                  setMessages([greeting]);
                  setMobileMenuOpen(false);
                  router.push('/dashboard/wireframe');
                }}
                className="flex items-center space-x-3 hover:text-white p-2 rounded-md w-full text-left"
              >
                <div className="bg-transparent p-2 rounded-md">
                  <FiMessageSquare className="w-5 h-5 text-[#9c9c9c]" />
                </div>
                <span>New Chat</span>
              </button>

              <div className="flex items-center space-x-3 p-2">
                <div className="bg-transparent p-2 rounded-md">
                  <FiGrid className="w-5 h-5 text-[#9c9c9c]" />
                </div>
                <span>Dashboard</span>
              </div>

              <div className="flex items-center space-x-3 p-2">
                <div className="bg-transparent p-2 rounded-md">
                  <FiBookOpen className="w-5 h-5 text-[#9c9c9c]" />
                </div>
                <span>Knowledge Base</span>
              </div>

              <div className="flex items-center space-x-3 p-2">
                <div className="bg-transparent p-2 rounded-md">
                  <FiClipboard className="w-5 h-5 text-[#9c9c9c]" />
                </div>
                <span>My Plans</span>
              </div>

              <div className="flex items-center space-x-3 p-2">
                <div className="bg-transparent p-2 rounded-md">
                  <FiSettings className="w-5 h-5 text-[#9c9c9c]" />
                </div>
                <span>Settings</span>
              </div>
            </nav>

            <div className="mt-auto text-xs text-[#9c9c9c] p-4">
              © 2025 FinanceBot
              <div className="text-[11px] mt-2">All your financial data is secured and encrypted</div>
            </div>
          </aside>
        </div>

        {/* Chat messages area */}
        <main
          className="flex-1 overflow-y-auto p-8"
          style={{ background: "#f9fafb" }}
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-center mb-6" style={{ color: "#6B7280" }}>
              TODAY
            </p>

            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: msg.isUser ? 20 : -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`mb-6 flex ${
                    msg.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    key={msg.id}
                    className={`mb-6 flex ${
                      msg.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xl p-5 rounded-lg `}
                      style={{
                        background: msg.isUser ? "#ffffff" : "#ffffff",
                        color: "#1f2937",
                      }}
                    >
                      {msg.content.includes("<ul") ||
                      msg.content.includes("<li") ||
                      msg.content.includes("<b") ? (
                        <div
                          style={{ color: "#1f2937" }}
                          dangerouslySetInnerHTML={{ __html: msg.content }}
                        />
                      ) : (
                        <p style={{ color: "#1f2937" }}>{msg.content}</p>
                      )}

                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-xs" style={{ color: "#6B7280" }}>
                          {msg.timestamp}
                        </div>
                        <div className="flex items-center">
                          {msg.isUser ? (
                            <>
                              <button
                                onClick={() => handleCopy(msg.content)}
                                className="p-1 rounded-full hover:bg-[#f0f0f0]"
                                aria-label="Copy"
                              >
                                <FiCopy className="w-[12px] h-[12px] text-black" />
                              </button>
                              <button
                                onClick={() => handleEdit(msg)}
                                className="p-1 rounded-full hover:bg-[#f0f0f0]"
                                aria-label="Edit"
                              >
                                <FiEdit2 className="w-[12px] h-[12px] text-black" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleCopy(msg.content)}
                                className="p-1 rounded-full hover:bg-[#f0f0f0]"
                                aria-label="Copy"
                              >
                                <FiCopy className="w-[12px] h-[12px] text-black" />
                              </button>
                              <button
                                onClick={() => handleFeedback("up")}
                                className="p-1 rounded-full hover:bg-[#f0f0f0]"
                                aria-label="Like"
                              >
                                <FiThumbsUp className="w-[12px] h-[12px] text-black" />
                              </button>
                              <button
                                onClick={() => handleFeedback("down")}
                                className="p-1 rounded-full hover:bg-[#f0f0f0]"
                                aria-label="Dislike"
                              >
                                <FiThumbsDown className="w-[12px] h-[12px] text-black" />
                              </button>
                              <button
                                onClick={() => handleSpeak(msg.content)}
                                className="p-1 rounded-full hover:bg-[#f0f0f0]"
                                aria-label="Speak"
                              >
                                <FiVolume2 className="w-[12px] h-[12px] text-black" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>

        {/* Message input area */}
        <div
          className="p-6"
          style={{
            borderTop: "1px solid rgba(0,0,0,0.06)",
            background: "#ffffff",
          }}
        >
          <div className="flex items-center max-w-3xl mx-auto">
            <button
              className="p-2 rounded-full hover:bg-[#f0f0f0]"
              aria-label="Add"
            >
              <FiPlus className="w-6 h-6 text-black" />
            </button>

            <input
              type="text"
              className="flex-grow rounded-full px-4 py-3 mx-4 focus:outline-none"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              style={{
                border: "1px solid #cccccc",
                color: "#1f2937",
              }}
            />

            <button
              className="p-2 rounded-full hover:bg-[#f0f0f0]"
              aria-label="Mic"
            >
              <FiMic className="w-6 h-6 text-black" />
            </button>

            <button
              onClick={handleSend}
              className="ml-3 p-3 rounded-full disabled:opacity-50 flex items-center justify-center"
              disabled={loading}
              style={{ background: "#00929A", color: "#ffffff" }}
              aria-label="Send"
            >
              {/* Paper plane should face right; no rotation applied */}
              <FiSend className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast notification */}
        {toast && (
          <div
            className="fixed bottom-4 right-4 px-4 py-2 rounded shadow"
            style={{ background: "#1f2937", color: "#ffffff" }}
          >
            {toast}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialAssistantChat;
