import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Main from "./components/Main/Main.jsx";

const App = () => {
  // Dark mode state - defaults to light mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('gemini-theme');
    return savedTheme === 'dark';
  });

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('gemini-theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Apply theme styles to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDarkMode) {
      // Dark mode styles
      root.style.setProperty('--primary-bg', '#131314');
      root.style.setProperty('--secondary-bg', '#1e1f20');
      root.style.setProperty('--tertiary-bg', '#282a2c');
      root.style.setProperty('--text-primary', '#e3e3e3');
      root.style.setProperty('--text-secondary', '#b1b1b1');
      root.style.setProperty('--border-color', '#3c4043');
      root.style.setProperty('--hover-bg', '#2d2e30');
      root.style.setProperty('--card-bg', '#282a2c');
      root.style.setProperty('--input-bg', '#2d2e30');
      root.style.setProperty('--nav-bg', '#202124');
      root.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.3)');
    } else {
      // Light mode styles
      root.style.setProperty('--primary-bg', '#f0f4f9');
      root.style.setProperty('--secondary-bg', '#ffffff');
      root.style.setProperty('--tertiary-bg', '#f9f9f9');
      root.style.setProperty('--text-primary', '#585858');
      root.style.setProperty('--text-secondary', '#848484');
      root.style.setProperty('--border-color', '#e6eaf1');
      root.style.setProperty('--hover-bg', '#f0f4f9');
      root.style.setProperty('--card-bg', '#f9f9f9');
      root.style.setProperty('--input-bg', '#f0f4f9');
      root.style.setProperty('--nav-bg', '#ffffff');
      root.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.05)');
    }
  }, [isDarkMode]);

  return (
    <>
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '20px',
          right: '80px', // Moved left to avoid covering user icon
          zIndex: 1000,
          background: isDarkMode ? '#2d2e30' : '#ffffff',
          border: `2px solid ${isDarkMode ? '#3c4043' : '#e6eaf1'}`,
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          transition: 'all 0.3s ease',
          boxShadow: isDarkMode 
            ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
            : '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = isDarkMode 
            ? '0 4px 12px rgba(0, 0, 0, 0.4)' 
            : '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = isDarkMode 
            ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
            : '0 2px 8px rgba(0, 0, 0, 0.1)';
        }}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Global Styles Injection */}
      <style jsx global>{`
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        
        body {
          background-color: var(--primary-bg);
          color: var(--text-primary);
        }
        
        /* Update existing styles to use CSS variables */
        .main {
          background-color: var(--primary-bg) !important;
          color: var(--text-primary) !important;
        }
        
        .main .nav {
          background-color: var(--nav-bg) !important;
          box-shadow: 0 2px 4px var(--shadow) !important;
        }
        
        .main .nav p {
          color: var(--text-primary) !important;
        }
        
        .main .greet {
          color: var(--text-secondary) !important;
        }
        
        .main .card {
          background-color: var(--card-bg) !important;
          border: 1px solid var(--border-color) !important;
          box-shadow: 0 2px 6px var(--shadow) !important;
        }
        
        .main .card:hover {
          background-color: var(--hover-bg) !important;
        }
        
        .main .card p {
          color: var(--text-primary) !important;
        }
        
        .search-box {
          background-color: var(--input-bg) !important;
          border: 1px solid var(--border-color) !important;
          box-shadow: 0 2px 6px var(--shadow) !important;
        }
        
        .search-box input {
          color: var(--text-primary) !important;
        }
        
        .search-box input::placeholder {
          color: var(--text-secondary) !important;
        }
        
        .search-box img:hover {
          background-color: var(--hover-bg) !important;
        }
        
        .result-title p,
        .result-data p {
          color: var(--text-primary) !important;
        }
        
        .bottom-info {
          color: var(--text-secondary) !important;
        }
        
        .sidebar {
          background-color: var(--secondary-bg) !important;
          border-right: 1px solid var(--border-color) !important;
          box-shadow: 2px 0 4px var(--shadow) !important;
        }
        
        .sidebar .menu:hover {
          background-color: var(--hover-bg) !important;
        }
        
        .sidebar .new-chat {
          background-color: var(--tertiary-bg) !important;
          border: 1px solid var(--border-color) !important;
          color: var(--text-secondary) !important;
        }
        
        .sidebar .new-chat:hover {
          background-color: var(--hover-bg) !important;
        }
        
        .sidebar .recent-title {
          color: var(--text-primary) !important;
        }
        
        .sidebar .recent-entry {
          color: var(--text-secondary) !important;
        }
        
        .sidebar .recent-entry:hover {
          background-color: var(--hover-bg) !important;
          color: var(--text-primary) !important;
        }
        
        .sidebar .bottom-item {
          color: var(--text-secondary) !important;
        }
        
        .sidebar .bottom-item:hover {
          background-color: var(--hover-bg) !important;
          color: var(--text-primary) !important;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: var(--primary-bg);
        }
        
        ::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: var(--text-secondary);
        }
      `}</style>
      
      <Sidebar />
      <Main />
    </>
  );
};

export default App;