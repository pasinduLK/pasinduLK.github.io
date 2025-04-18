import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import emailjs from '@emailjs/browser';
import Footer from './Footer'; // adjust path if needed
import Preloader from './Preloader';
import SparkleTrail from "./SparkleTrail";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';

// --- React Router Imports ---
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- Import your new Playground component ---
import Playground from './Playground'; // Assuming Playground.jsx is in the same src folder

// Original skills array (untouched)
const skills = [
  { name: "Aseprite", image: "/images/aseprite.png" },
  { name: "Blender", image: "/images/blender.png" },
  { name: "ChatGPT", image: "/images/chat-gpt.png" },
  { name: "CSS", image: "/images/css.png" },
  { name: "Figma", image: "/images/figma.png" },
  { name: "HTML", image: "/images/html.png" },
  { name: "Obsidian", image: "/images/obsidian.png" },
  { name: "Photoshop", image: "/images/photoshop.png" },
  { name: "Tailwind", image: "/images/tailwind.png" },
  { name: "Vite", image: "/images/vite.png" },
  { name: "VS-code", image: "/images/vscode.png" },
  { name: "Xd", image: "/images/xd.png" },
];

// --- Define the Project Modal Component (Keep As Is) ---
const ProjectModal = ({ project, onClose }) => {
    // ... code remains the same ...
    if (!project) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-zinc-900 rounded-lg border border-zinc-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative p-6 text-white shadow-xl">
          <button onClick={onClose} className="absolute top-3 right-3 text-zinc-400 hover:text-white text-3xl font-bold leading-none p-1 hover:bg-zinc-700 rounded-full" aria-label="Close" >&times;</button>
          <h2 className="text-3xl font-bold mb-4 pr-8">{project.data.title || 'Project Details'}</h2>
          <hr className="border-zinc-700 mb-4" />
          <div className="prose prose-invert max-w-none prose-img:rounded-md prose-img:my-4 prose-a:text-green-400 hover:prose-a:text-green-300 prose-video:w-full prose-video:rounded-md prose-headings:my-3">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
};

// --- Component for the Main Page Content ---
// We move the main page logic into its own component function
const MainPageContent = () => {
  const form = useRef();
  const [toast, setToast] = useState({ message: "", type: "", show: false });
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  // Project loading logic (using JSON manifest - keep as is from your code)
  useEffect(() => {
    const loadProjectsList = async () => {
      try {
        const response = await fetch('/projects/projects.json'); // Fetching the list
        if (!response.ok) {
          console.error('Oops! Couldn\'t find the list of projects.');
          return;
        }
        const projectList = await response.json(); // Expecting an array of filenames like ["project1.md", "project2.md"]
        const loadedProjects = [];
        for (const filename of projectList) {
          try {
            // Assuming markdown files are also in /public/projects/ based on this fetch path
            const mdResponse = await fetch(`/projects/${filename}`);
            if (!mdResponse.ok) {
              console.warn(`Hmm, couldn't find the project file: /projects/${filename}`);
              continue;
            }
            const rawContent = await mdResponse.text();
            const parsed = matter(rawContent);
            // Ensure data structure
            parsed.data = parsed.data || {};
            parsed.content = parsed.content || '';
            loadedProjects.push({ ...parsed, filename });
          } catch (error) {
            console.error(`Oh no! Something went wrong loading /projects/${filename}:`, error);
          }
        }
        setProjects(loadedProjects);
      } catch (error) {
        console.error('Uh oh! Couldn\'t load the project list /projects/projects.json:', error);
      }
    };
    loadProjectsList();
  }, []);


  const openProjectModal = (project) => { setSelectedProject(project); };
  const closeProjectModal = () => { setSelectedProject(null); };

  const sendEmail = (e) => {
      e.preventDefault();
      emailjs.sendForm('service_eme4ux4', 'template_u7xq1u1', form.current, 'MVeqhKknfVC9liiLT')
        .then((result) => {
            console.log(result.text);
            showToast("Message sent successfully!", "success");
            form.current.reset();
        }, (error) => {
            console.log(error.text);
            showToast("Something went wrong. Please try again.", "error");
        });
  };

  const showToast = (message, type) => {
      setToast({ message, type, show: true });
      setTimeout(() => { setToast({ ...toast, show: false }); }, 3000);
  };

  // Return JSX for the main page content ONLY
  return (
    <> 
      <Preloader />
      {/* Use Fragment to avoid extra div */}
      {/* --- Original Animated Title --- */}
      <div className="relative overflow-hidden w-full h-[19vw] mb-20" >
         <div className="absolute animate-ticket-infinite flex whitespace-nowrap text-[16vw] font-bold tracking-wide mainpage-title text-white">
             <div className="flex gap-10 px-4 "><span className="gif-text">★UI/UX_DESIGNER</span><span className="gif-text">★WEB_DEV</span><span className="gif-text">★3D_ARTIST</span><span className="gif-text">★CONCEPT_ARTIST</span></div>
             <div className="flex gap-10 px-4" aria-hidden="true"><span className="gif-text">★UI/UX_DESIGNER</span><span className="gif-text">★WEB_DEV</span><span className="gif-text">★3D_ARTIST</span><span className="gif-text">★CONCEPT_ARTIST</span></div>
           </div>
         </div>

      <SparkleTrail />

      {/* --- Original Intro and Navigation --- */}
      <div className="flex flex-col md:flex-row justify-between mb-16 px-4">
         <div className="mb-10 md:mb-0"><p className="text-base md:text-2xl leading-relaxed">HEY I'M LAKRUWAN<br />CREATIVE DESIGNER & DEVELOPER<br />CRAFTING IMMERSIVE DIGITAL EXPERIENCES</p></div>
         <div className="text-right space-y-2">
             <p><a href="#about" className="cursor-pointer hover:underline">About</a></p>
             <p><a href="#projects" className="cursor-pointer hover:underline">Projects</a></p>
             <p><a href="#contact" className="cursor-pointer hover:underline">Contact</a></p>
          </div>
       </div>


        {/* --- Project Cards Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4" id="projects">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div
                key={project.filename || index}
                className="group bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden cursor-pointer square-card"
                onClick={() => openProjectModal(project)}
              >
                <div
                  className="bg-cover bg-center w-full h-full group-hover:filter group-hover:grayscale transition-all duration-300"
                  style={{ backgroundImage: `url(${project.data.image || '/images/project1.jpg'})` }}
                ></div>
                <div className="p-4 flex flex-col justify-between h-1/2.5 bg-black ">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{project.data.title || 'Untitled Project'}</h2>
                    <hr className="border-zinc-700 mb-2" />
                    {/* Description removed from card in your last paste, keeping it that way */}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {Array.isArray(project.data.tags) && project.data.tags.map((tag, idx) => (
                      <span key={idx} className="bg-zinc-700 px-2 py-1 rounded-full text-xs" >{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-400 col-span-full text-center">Loading projects or none found...</p>
          )}
        </div>

      {/* --- MODIFIED Playground Section - Now a Link --- */}
      {/* Replace the outer div with Link component */}
      <Link to="/playground" className="block w-full mb-16 mt-10 cursor-pointer group px-4" id="playground"> {/* Added px-4 here */}
        <div
          className="bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden square-card w-full h-[400px] sm:h-[500px] md:h-[700px] lg:h-[800px] mx-auto group-hover:border-green-500 transition-colors duration-300" // Added hover effect
          style={{ backgroundImage: "url('/images/p2.gif')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="p-6 sm:p-8 flex flex-col justify-end h-full bg-gradient-to-t from-black via-transparent to-transparent">
            <h2 className="text-[10vw] font-bold tracking-wide gradient-text">Playground</h2>
            <hr className="border-zinc-700 mb-4" />
            <p className="text-lg sm:text-xl text-white">My digital sandbox where ideas come to play.</p>
          </div>
        </div>
      </Link>
      <br/>

       {/* --- Original About Me Section --- */}
      <div className="w-full mb-16 px-4 flex flex-col items-center" id="about">
         <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
           <div className="md:w-1/3 w-full flex md:justify-start justify-center"><h2 className="text-[7vw]  font-bold text-center md:text-right  text-zinc-100 subtitle">ABOUT<br />ME</h2></div>
           <div className="hidden md:flex w-px bg-zinc-700"></div>
           <div className="md:w-2/3 w-full flex justify-center items-center"><p className="text-lg md:text-xl leading-relaxed text-zinc-300 text-left md:text-left">Hi, I’m Lakruwan, an undergraduate at the University of Colombo (ICT, since 2022) with a passion for creative tech. I'm deeply into crafting engaging user experiences, visual storytelling, and innovative digital designs. While UI/UX is my sweet spot, I explore every corner of the creative and tech space blending imagination with functionality to build things that both impress and work beautifully.
               </p></div>
         </div>
       </div>
       <br/>

      {/* --- Original My Stack Section --- */}
      <div className="w-full mb-16 px-4 flex flex-col items-center">
         <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 w-full flex md:justify-end justify-center md:order-3 order-1"><h2 className="text-[7vw]  font-bold text-center md:text-left  text-zinc-100 subtitle">MY<br />STACK</h2></div>
          <div className="hidden md:flex w-px bg-zinc-700 md:order-2"></div>
          <div className="md:w-2/3 w-full flex justify-center md:order-1 order-2">
           <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            {skills.map((skill, index) => (
             <div key={index} className="bg-zinc-800 rounded-xl p-3 flex flex-col items-center justify-center w-full max-w-[100px] sm:max-w-[120px] sm:max-h-[120px] shadow-md hover:scale-105 transition-transform duration-300" >
              <img src={skill.image} alt={skill.name} className="w-10 h-10 sm:w-14 sm:h-14 object-contain mb-1" />
              <p className="text-xs sm:text-sm text-center text-zinc-200 break-words">{skill.name}</p>
             </div>
            ))}
           </div>
          </div>
         </div>
        </div>
       <br/>

       {/* --- Original Contact Me Section --- */}
      <div className="w-full mb-16 px-4 flex flex-col items-center" id="contact">
         <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
           <div className="md:w-1/3 w-full flex md:justify-start justify-center md:order-1 order-1"><h2 className="text-[7vw] font-bold text-center md:text-right text-zinc-100 subtitle">REACH<br />ME</h2></div>
           <div className="hidden md:flex w-px bg-zinc-700 md:order-2"></div>
           <div className="md:w-2/3 w-full flex justify-center md:order-3 order-2">
             <form ref={form} onSubmit={sendEmail} className="w-full max-w-xl flex flex-col gap-4" >
               <input type="text" name="name" placeholder="Your Name" required className="p-3 rounded bg-zinc-800 border border-zinc-600 text-white" />
               <input type="email" name="email" placeholder="Your Email" required className="p-3 rounded bg-zinc-800 border border-zinc-600 text-white" />
               <textarea name="message" rows="5" placeholder="Your Message" required className="p-3 rounded bg-zinc-800 border border-zinc-600 text-white" ></textarea>
               <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded mt-2" >Send</button>
             </form>
           </div>
         </div>
       </div>
       <br/>

       {/* --- Original Toast Notification --- */}
       {toast.show && (
         <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-500 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`} >
           {toast.message}
         </div>
       )}

      {/* --- Render the Project Modal --- */}
      <ProjectModal project={selectedProject} onClose={closeProjectModal} />
    </>
  );
};


// --- Main App component now handles Routing ---
const App = () => {
  return (
    <Router> {/* Wrap everything in the Router */}
      <div className="min-h-screen bg-black text-white px-4 py-10 pb-0 font-sans scroll-smooth" id="home">
        <Routes> {/* Define the Routes */}
          {/* Route for the main page */}
          <Route path="/" element={<MainPageContent />} />

          {/* Route for the Playground page */}
          <Route path="/playground" element={<Playground />} />

          {/* Optional: Add a 404 Not Found route later */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>

         {/* Footer is outside Routes to appear on all pages */}
         <Footer />
      </div>
    </Router>
  );
};

export default App; // Export the main App component