import React from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loadingState,
    loading,
    resultData,
    setInput,
    input,
  } = React.useContext(Context);

  // Unique suggestion cards with diverse prompts
  const suggestionCards = [
    {
      text: "Write a Python script to analyze CSV data and create visualizations",
      icon: assets.code_icon,
      prompt: "Write a Python script to analyze CSV data and create visualizations"
    },
    {
      text: "Explain quantum computing concepts in simple terms with examples",
      icon: assets.bulb_icon,
      prompt: "Explain quantum computing concepts in simple terms with examples"
    },
    {
      text: "Create a comprehensive study plan for learning React.js in 30 days",
      icon: assets.compass_icon,
      prompt: "Create a comprehensive study plan for learning React.js in 30 days"
    },
    {
      text: "Generate creative startup ideas for sustainable technology solutions",
      icon: assets.image_icon,
      prompt: "Generate creative startup ideas for sustainable technology solutions"
    }
  ];

  // Function to handle suggestion card clicks
  const handleSuggestionClick = (prompt) => {
    setInput(prompt);
    onSent(prompt);
  };

  // Get current time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini Clone</p>
        <a target="_blank" href="https://github.com/shivas1432" rel="noopener noreferrer">
          <img src={assets.user_icon} alt="User Profile" />
        </a>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>{getGreeting()}, Shivashanker!</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {suggestionCards.map((card, index) => (
                <div 
                  key={index}
                  className="card" 
                  onClick={() => handleSuggestionClick(card.prompt)}
                  style={{ cursor: 'pointer' }}
                >
                  <p>{card.text}</p>
                  <img src={card.icon} alt="" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img
                src={loading ? assets.gemini_gif : assets.gemini_icon}
                alt="Gemini"
              />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p
                  style={{ marginTop: "0px" }}
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onKeyDown={(e) => {
                if (input && e.key === "Enter") {
                  onSent();
                }
              }}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Ask me anything..."
            />
            <div>
              <span>
                <img
                  src={assets.gallery_icon}
                  alt="Upload"
                  data-tooltip-id="upload-image"
                  data-tooltip-content="Upload image"
                />
                <Tooltip
                  id="upload-image"
                  style={{ padding: "5px", fontSize: "12px", color: "#f0f4f9" }}
                />
              </span>
              <span>
                <img
                  src={assets.mic_icon}
                  alt="Microphone"
                  data-tooltip-id="use-microphone"
                  data-tooltip-content="Use microphone"
                />
                <Tooltip
                  id="use-microphone"
                  style={{ padding: "5px", fontSize: "12px", color: "#f0f4f9" }}
                />
              </span>
              {input.length > 0 && (
                <span className={`send-icon ${input.length > 0 ? "show" : ""}`}>
                  <img
                    onClick={() => {
                      onSent();
                    }}
                    src={assets.send_icon}
                    alt="Send"
                    data-tooltip-id="submit"
                    data-tooltip-content="Submit"
                  />
                  <Tooltip
                    id="submit"
                    style={{
                      padding: "5px",
                      fontSize: "12px",
                      color: "#f0f4f9",
                    }}
                  />
                </span>
              )}
            </div>
          </div>
          <p className="bottom-info">
            This AI assistant may display inaccurate info, so please verify important information.{" "}
            <a 
              href="https://github.com/shivas1432/my-gemini-clone" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View source code on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;