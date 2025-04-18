---
title: "My Portfolio Website"
description: "my latest portfolio April"
tags: ["React", "Tailwind","GFM","Web"]
image: "/projects/images/portfoliocard.png"
date: "2024-02-10"
---


## Overview:

The main goal of this project was to create a **personal portfolio website** to effectively showcase my skills, projects, and creative explorations in a visually appealing and user-friendly manner. The portfolio also includes a dedicated space for experimentation and fun projects.

### Design and Development:

The development process began with **UI/UX design** to plan the website's structure and components, ensuring a smooth and intuitive user experience. The front-end of the portfolio was then built using **React** with **Vite** as the build tool for speed and efficiency. **Tailwind CSS** was utilized for styling, enabling rapid development of a modern and responsive design.

![](/projects/images/portfolio/portfolioui.png)

### Content Management Strategy:

To facilitate easy addition of new projects without requiring a full website rebuild, a unique content management approach was implemented. Project details are stored in **Markdown (MD)** files located in the `public` directory of the project. These files allow for rich text, images, and other media to be easily included. A **JSON** file acts as an index, listing the available projects for the website to display.

The portfolio was specifically designed and structured to be hosted on **GitHub Pages**. By storing project content in the `public` directory, these assets are directly accessible without being processed during the build phase. This allows for the addition of new project Markdown files without needing to rebuild and redeploy the entire website, streamlining the content update process.

---

### Features:

* **Interactive Mouse Effect:** A subtle sparkle effect follows the mouse cursor, adding a touch of visual interest.
* **Animated Title:** The main title section features animated text,utilizes a GIF as a background, implemented with webkit for smooth animation.
* **Unique Playground Section:** A dedicated area allows for showcasing experiments, personal creations, and fun side projects.
* **Contact Form:** A "Contact Me" section is integrated using **EmailJS**, enabling visitors to easily reach out.

---

### Technologies:

* **React with Vite:** For building the dynamic user interface.
* **Tailwind CSS:** For rapid and utility-first styling.
* **GitHub Flavored Markdown (GFM):** For easy and rich content creation for projects.
* **ChatGPT:** As an assistive tool.

![](/projects/images/portfolio/portfolio.png)