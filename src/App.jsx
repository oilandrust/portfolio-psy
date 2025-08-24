import { useState, useEffect } from 'react'

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      // Read from local projects.json file instead of API
      const response = await fetch('/projects.json')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      } else {
        console.error('Failed to fetch projects')
      }
    } catch (err) {
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="App">
      <div className="hero">
        <div className="container">
          <h1>John Doe</h1>
          <p>Full-Stack Developer & UI/UX Enthusiast</p>
          <button className="outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Let's Work Together
          </button>
        </div>
      </div>

      <div className="container">
        <div className="section">
          <h2>About Me</h2>
          <p>
            I'm a passionate full-stack developer with a love for creating beautiful, 
            functional web applications. With expertise in modern JavaScript frameworks 
            and a keen eye for design, I bring ideas to life through clean, efficient code.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, 
            contributing to open-source projects, or sharing knowledge with the developer community.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <span>📍</span>
              <span>San Francisco, CA</span>
            </div>
            <div className="contact-item">
              <span>🎓</span>
              <span>Computer Science Degree</span>
            </div>
            <div className="contact-item">
              <span>💼</span>
              <span>5+ Years Experience</span>
            </div>
          </div>
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
                  <h3 style={{ marginBottom: '0.75rem', color: 'var(--primary)' }}>{project.title}</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>{project.description}</p>
                  <div style={{ marginTop: '1rem' }}>
                    {project.tech.map((tech, techIndex) => (
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
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{
                    width: '300px',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    flexShrink: '0'
                  }}
                />
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
    </div>
  )
}

export default App
