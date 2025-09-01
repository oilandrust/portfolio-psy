import { useState, useEffect } from 'react'

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
      <div className="hero">
        <div className="container">
          <div className="hero-profile">
            <img src="/portfolio/profile/IMG-20250419-WA0003 (2).jpg" alt="Olivier Rouiller" />
          </div>
          <div className="hero-content">
            <h1>Olivier Rouiller</h1>
            <p>Building things fast and slow</p>
          </div>
          <div className="hero-button">
            <button className="outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Get in touch
            </button>
          </div>
        </div>
      </div>

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

        <div className="section">
          <h2>Featured Projects</h2>
          <div className="projects-grid" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {projects.map((project, index) => (
              <div key={project.id} className="project-card" style={{
                border: '1px solid var(--muted-border-color)',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                background: 'var(--card-background-color, white)',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start'
              }}>
                <div style={{ flex: '1' }}>
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{project.title}</h3>
                  {project.subtitle && (
                    <p style={{ 
                      marginBottom: '0.75rem', 
                      fontSize: '1rem', 
                      color: 'var(--muted-color)',
                      fontStyle: 'italic'
                    }}>
                      {project.subtitle}
                    </p>
                  )}
                  {project.description && (
                    <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>{project.description}</p>
                  )}
                  
                  {project.tech && project.tech.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      {project.tech.map((tech, techIndex) => {
                        if (tech.icon) {
                          // Display icon if available
                          return (
                            <img
                              key={techIndex}
                              src={tech.icon}
                              alt={tech.name}
                              title={tech.name}
                              style={{
                                width: '32px',
                                height: '32px',
                                margin: '0.25rem 0.25rem 0.25rem 0',
                                borderRadius: '4px',
                                objectFit: 'contain'
                              }}
                            />
                          );
                        } else {
                          // Fallback to badge for technologies without icons
                          return (
                            <span
                              key={techIndex}
                              style={{
                                display: 'inline-block',
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.875rem',
                                margin: '0.25rem 0.25rem 0.25rem 0',
                                fontWeight: '500'
                              }}
                            >
                              {tech.name || tech}
                            </span>
                          );
                        }
                      })}
                    </div>
                  )}

                  {/* Project URLs */}
                  {(project.github_url || project.live_url) && (
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'var(--primary-hover, #0056b3)'}
                          onMouseLeave={(e) => e.target.style.background = 'var(--primary)'}
                        >
                          🐙 GitHub
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'var(--success)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'var(--success-hover, #28a745)'}
                          onMouseLeave={(e) => e.target.style.background = 'var(--success)'}
                        >
                          🌐 Live Demo
                        </a>
                      )}
                    </div>
                  )}

                  {/* Project dates */}
                  {(project.start_date || project.end_date) && (
                    <div style={{ 
                      marginBottom: '1rem', 
                      fontSize: '0.875rem', 
                      color: 'var(--muted-color)',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center'
                    }}>
                      {project.start_date && (
                        <span>📅 Started: {new Date(project.start_date).toLocaleDateString()}</span>
                      )}
                      {project.end_date && (
                        <span>✅ Completed: {new Date(project.end_date).toLocaleDateString()}</span>
                      )}
                    </div>
                  )}
                  
                </div>
                {project.images && project.images.length > 0 ? (
                  <div style={{
                    display: project.image_layout === 'column' ? 'flex' : 'grid',
                    flexDirection: project.image_layout === 'column' ? 'column' : 'row',
                    gridTemplateColumns: project.image_layout === 'grid' 
                      ? 'repeat(auto-fit, minmax(150px, 1fr))' 
                      : 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '0.5rem',
                    width: project.image_layout === 'column' ? '200px' : '300px',
                    flexShrink: '0'
                  }}>
                    {project.images.map((img, imgIndex) => (
                      <img 
                        key={imgIndex}
                        src={img.thumbnail || img.path} 
                        alt={`${project.title} - Image ${imgIndex + 1}`} 
                        style={{
                          width: '100%',
                          height: project.image_layout === 'column' ? '120px' : '150px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        onClick={() => openCarousel(project, imgIndex)}
                      />
                    ))}
                  </div>
                ) : (
                  <div style={{
                    width: '300px',
                    height: '200px',
                    background: 'var(--card-background-color)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--muted-color)',
                    fontSize: '0.875rem',
                    flexShrink: '0'
                  }}>
                    No images available
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

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
