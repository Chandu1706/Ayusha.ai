import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui";
import { fetchLLMResponse } from "./api/api"; 
import {
  FaPaperPlane,
  FaPaperclip,
  FaMicrophone,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

import "./App.css";
import logo from "./assets/ayusha_logo_circular.png";

export default function HomePage() {
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const headline = "The new GenAI Virtual Health Assistant";

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      // 🧪 UI Testing Mode - Simulate API response
      //setTimeout(() => {
        //setResponse(`🧪 Echoed Prompt for Testing:\n\n${message}`);
        //setLoading(false);
      //}, 500);

      // ✅ Real API call (uncomment to use)
       const result = await fetchLLMResponse(message);
       setResponse(result);
    } catch (error) {
      console.error("LLM Error:", error);
      setResponse(error.message || "⚠️ Failed to connect to Together API.");
    } finally {
       setLoading(false); 
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Ayusha Logo" className="logo-img" />
          <span className="logo-text">Ayusha.ai</span>
        </div>
        <div className="nav-center">
          <a href="/forum">Forum</a>
          <a href="/expert">Expert</a>
          <a href="/pricing">Pricing</a>
        </div>
        <div className="nav-right">
          <Button variant="outline">Sign in</Button>
          <Button>Register</Button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="vertical-line"></div>
          <motion.h1 className="animated-text">
            {headline.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="word">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${wordIndex}-${charIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: wordIndex * 0.3 + charIndex * 0.05,
                      duration: 2.5,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                {"\u00A0"}
              </span>
            ))}
          </motion.h1>
        </div>

        <div className="chat-input-container">
          <button className="attach-icon-btn">
            <FaPaperclip className="attach-icon" />
          </button>
          <button className="voice-icon-btn">
            <FaMicrophone className="voice-icon" />
          </button>
          <textarea
            className="chat-textbox"
            placeholder="Ask Ayusha anything about health..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className="send-icon-btn" onClick={sendMessage} disabled={loading}>
            {loading ? "⌛..." : <FaPaperPlane className="send-icon" />}
          </button>
        </div>

        {loading && <p className="loading">⌛ Generating response...</p>}

        {response && (
          <div className="response-container">
            <label htmlFor="response-box" className="response-label">
              Ayusha's Response:
            </label>
            <textarea
              id="response-box"
              className="response-textarea"
              value={response}
              readOnly
            ></textarea>
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="footer-logo">Ayusha</div>
        <div className="social-icons">
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
          <FaLinkedin />
        </div>
        <div className="resources">
          <h3>Resources</h3>
          <ul></ul>
        </div>
      </footer>
    </div>
  );
}
