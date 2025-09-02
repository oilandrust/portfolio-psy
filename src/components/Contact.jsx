const Contact = () => {
  return (
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
  )
}

export default Contact

