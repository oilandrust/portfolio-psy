import { useState, useEffect } from 'react'
import ProjectsList from './components/ProjectsList'
import Hero from './components/Hero'

function App() {
  // State for image carousel modal
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Fallback projects in case fetch fails
  const fallbackProjects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A modern React portfolio built with Vite and Pico CSS, featuring responsive design and dynamic project showcase.",
      tech: [
        { name: "React", icon: "/portfolio/icons/javascript.svg", iconType: "svg" },
        { name: "Vite", icon: null, iconType: null },
        { name: "CSS", icon: null, iconType: null },
        { name: "JavaScript", icon: "/portfolio/icons/javascript.svg", iconType: "svg" }
      ],
      images: [],
      start_date: "2024-07-01",
      end_date: "2024-08-24"
    },
    {
      id: 2,
      title: "Project Management Tool",
      description: "Internal tool for managing portfolio projects with SQLite database and JSON export functionality.",
      tech: [
        { name: "Node.js", icon: "/portfolio/icons/javascript.svg", iconType: "svg" },
        { name: "Express", icon: null, iconType: null },
        { name: "SQLite", icon: null, iconType: null },
        { name: "React", icon: "/portfolio/icons/javascript.svg", iconType: "svg" }
      ],
      images: [],
      start_date: "2024-08-01",
      end_date: "2024-08-24"
    },
    {
      id: 3,
      title: "Simple Project",
      images: [],
      start_date: "2024-09-01",
      end_date: "2024-10-15"
    },
    {
      id: 4,
      title: "Minimal Project",
      images: [],
      start_date: "2024-11-01"
    }
  ]
  
  const [projects, setProjects] = useState(fallbackProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      // Try multiple fetch strategies for better compatibility
      const fetchStrategies = [
        './projects.json',
        '/portfolio/projects.json',
        '/projects.json',
        'projects.json'
      ]
      
      let projectsLoaded = false
      
      for (const strategy of fetchStrategies) {
        try {
          const response = await fetch(strategy)
          
          if (response.ok) {
            const data = await response.json()
            setProjects(data)
            projectsLoaded = true
            break
          }
        } catch (strategyError) {
          // Silently continue to next strategy
        }
      }
      
      if (!projectsLoaded) {
        setProjects(fallbackProjects)
      }
      
    } catch (err) {
      // Fallback to default projects on any error
    } finally {
      setLoading(false)
    }
  }

  // Carousel functions
  const openCarousel = (project, imageIndex = 0) => {
    setCurrentProject(project)
    setCurrentImageIndex(imageIndex)
    setCarouselOpen(true)
  }

  const closeCarousel = () => {
    setCarouselOpen(false)
    setCurrentProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (currentProject && currentProject.images) {
      setCurrentImageIndex((prev) => 
        prev === currentProject.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (currentProject && currentProject.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentProject.images.length - 1 : prev - 1
      )
    }
  }

  const handleKeyDown = (e) => {
    if (!carouselOpen) return
    
    switch (e.key) {
      case 'Escape':
        closeCarousel()
        break
      case 'ArrowLeft':
        prevImage()
        break
      case 'ArrowRight':
        nextImage()
        break
    }
  }

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [carouselOpen])

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="App">
      <Hero />

      <div className="container">
        <div className="section">
          <h2>About</h2>
          <p>
            Hi, I'm Olivier, I live in Strasbourg, France, and before I lived around Europe in Germany and Sweden.
            I worked as a developer for 10 years and I've worked in a few companies and had some pojects.
            This pages showcases a few of them with some details about how I approached working on those and the technologies I used. 
          </p>
          <p>
            Right now I study Psychology to become a Psychotherapist, but I might be able to contribute to some new projects.
            Feel free to get in touch if you have some curiosity.
          </p>
        </div>

        <ProjectsList projects={projects} />

        <div id="contact" className="section">
          <h2>Get In Touch</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can work together!
          </p>
          
          <div className="contact-info">
            <div className="contact-item">
              <span>📧</span>
              <span>hello@example.com</span>
            </div>
            <div className="contact-item">
              <span>📱</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <span>💼</span>
              <span>linkedin.com/in/yourprofile</span>
            </div>
            <div className="contact-item">
              <span>🐙</span>
              <span>github.com/yourusername</span>
            </div>
          </div>
          
          <div className="social-links">
            <a href="#" title="LinkedIn">💼</a>
            <a href="#" title="GitHub">🐙</a>
            <a href="#" title="Twitter">🐦</a>
            <a href="#" title="Email">📧</a>
          </div>
        </div>
      </div>

      {/* Image Carousel Modal */}
      {carouselOpen && currentProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          {/* Close button */}
          <button
            onClick={closeCarousel}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            ×
          </button>

          {/* Navigation arrows */}
          {currentProject.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: '3rem',
                  height: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: '3rem',
                  height: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                ›
              </button>
            </>
          )}

          {/* Main image */}
          <img
            src={currentProject.images[currentImageIndex].path || currentProject.images[currentImageIndex].thumbnail}
            alt={`${currentProject.title} - Image ${currentImageIndex + 1}`}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />

          {/* Image counter */}
          {currentProject.images.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.875rem'
            }}>
              {currentImageIndex + 1} / {currentProject.images.length}
            </div>
          )}

          {/* Project title */}
          <div style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1.125rem',
            fontWeight: '600'
          }}>
            {currentProject.title}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
