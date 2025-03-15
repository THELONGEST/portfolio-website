import { useState, useEffect } from 'react'
import './App.css'
import * as emailjs from '@emailjs/browser'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'

// Initialize EmailJS globally with the provided public key
emailjs.init("IobXut44Lh6rpc6vg");

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Update the nav logo
  const navLogo = "LONG TRUONG";

  // Reduce initial loading time
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  return (
    <div className="app-container">
      {isLoading ? (
        <div className="loader-container">
          <div className="loader-content">
            <div className="spinner"></div>
          </div>
        </div>
      ) : (
        <>
          <nav className="main-nav">
            <div className="nav-content">
              <div className="nav-logo">{navLogo}</div>
              <div className="nav-menu">
                <a href="#home">Home</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#services">Services</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
          </nav>

          <main>
            <Hero />
            <Portfolio />
            <Services />
            <About />
            <Contact />
          </main>

          <footer className="main-footer">
            <div className="footer-content">
              <div className="social-links">
                <a href="https://www.behance.net/nhlongtruong" target="_blank" rel="noopener noreferrer">Behance</a>
                <a href="https://www.linkedin.com/in/long-truong-318b47253/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer">Vimeo</a>
              </div>
              <p className="copyright">&copy; 2024 Long Truong. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}

export default App
