import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { useNavigate } from 'react-router-dom';
import './Playground.css'; // Keep importing CSS
import Footer from './Footer'; // adjust path if needed

const Playground = () => {
  // --- State, useEffect, handlers, breakpointColumnsObj, renderPlaygroundItem ---
  // --- Paste the same logic here from the previous version ---
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaygroundData = async () => {
      try {
        setLoading(true); setError(null);
        const response = await fetch('/playground/playground.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const validatedData = data.map(item => ({ ...item, type: item.type || 'image' }));
        setItems(validatedData);
      } catch (err) {
        console.error("Failed to fetch playground data:", err);
        setError("Oops! Couldn't load the playground experiments.");
      } finally { setLoading(false); }
    };
    fetchPlaygroundData();
  }, []);

  const breakpointColumnsObj = { default: 3, 1100: 3, 700: 2, 500: 1 };
  const handleMouseEnter = (index) => { if (window.innerWidth > 768) setActiveItemIndex(index); };
  const handleMouseLeave = () => { if (window.innerWidth > 768) setActiveItemIndex(null); };
  const handleClick = (index) => { setActiveItemIndex(prevIndex => (prevIndex === index ? null : index)); };

  const renderPlaygroundItem = (item, index) => {
    const isActive = activeItemIndex === index;
    return (
      <div key={item.imagePath || item.videoPath || index} className="playground-item" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} onClick={() => handleClick(index)} >
        {item.type === 'video' ? (
          <video src={item.videoPath} controls className="playground-media" aria-label={item.alt || `Playground video ${index + 1}`} > Your browser does not support the video tag. </video>
        ) : (
          <img src={item.imagePath} alt={item.alt || `Playground item ${index + 1}`} loading="lazy" className="playground-media" />
        )}
        <div className={`description-overlay ${isActive ? 'visible' : ''}`}> {item.description} </div>
      </div>
    );
  };
  // --- End of unchanged logic ---


  if (loading) { return <p className="playground-message">Loading experiments...</p>; }
  if (error) { return <p className="playground-message">{error}</p>; }

  // --- UPDATED RETURN STATEMENT ---
  return (
    // Added relative positioning context if needed, and more padding top
    <div className="relative py-16 px-4 min-h-screen">

      {/* --- Professional Back Button --- */}
      {/* Positioned container */}
      <div className="absolute top-6 left-4 sm:top-8 sm:left-6 z-10"> {/* Use absolute positioning */}
         <button
           onClick={() => navigate("/")} // Go back in history
           // --- Styling for the button ---
           className="group inline-flex items-center justify-center overflow-hidden rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-all duration-300 ease-in-out"
         >
           {/* Icon Container (Circle) */}
           <span className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-600 group-hover:border-zinc-500 transition-colors">
             {/* Arrow SVG */}
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5 -ml-px"> {/* Slightly smaller icon */}
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
             </svg>
           </span>
           {/* Animated Text ("Back to home") */}
           <span
              // --- Animation classes ---
              className="ml-0 max-w-0 whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100" // Adjust max-w if needed
           >
             Back to home
           </span>
         </button>
      </div>


      {/* --- Page Title and Description (Aligned Center) --- */}
      <div className="text-center mb-12 pt-4"> {/* Added padding-top */}
        <h1 className="text-[10vw]  font-bold mb-6 gradient-text">Playground</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          A space where I try new ideas and have fun building things.<br/>
        </p>
      </div>       

      {/* --- Masonry Grid (Unchanged) --- */}
      {items.length === 0 ? (
         <p className="playground-message">Nothing in the playground yet. Add items to /public/playground/playground.json!</p>
      ) : (
         <Masonry
             breakpointCols={breakpointColumnsObj}
             className="playground-grid"
             columnClassName="playground-grid_column"
           >
           {items.map((item, index) => renderPlaygroundItem(item, index))}
         </Masonry>
      )}

    </div>
  );
};

export default Playground;