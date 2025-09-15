const Hero = ({ profile }) => {
  return (
    <div className='hero'>
      <div className='container'>
        <div className='hero-profile'>
          <img
            src='/portfolio-psy/data/profile/IMG-20250419-WA0003 (2).jpg'
            alt={profile?.title || 'John Doe'}
          />
        </div>
        <div className='hero-content'>
          <h1>{profile?.title || 'John Doe'}</h1>
          <p>{profile?.subtitle || 'Full Stack Developer'}</p>
        </div>
      </div>
      <div className='hero-quote'>
        <div className='container'>
          <blockquote className='quote-content'>
            <p className='quote-text'>
              "Intersubjective, relational affect-focused psychotherapy is not the 'talking cure' but the 'affect communicating cure.'"
            </p>
            <cite className='quote-author'>— Allan Schore</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Hero;
