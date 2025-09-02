const Hero = () => {
  return (
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
          <button 
            className="outline" 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Get in touch
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero

