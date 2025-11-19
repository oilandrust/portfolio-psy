const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid #e2e8f0',
    }}>
      <div className="container" style={{
        paddingTop: '1rem',
        paddingBottom: '1rem'
      }}>
        <div style={{
          fontSize: '0.75rem',
          color: '#666',
          fontStyle: 'italic',
          marginBottom: '1rem',
          lineHeight: '1.5',
          textAlign: 'center'
        }}>
          *Les idées, théories et opinions présentées ici le sont à titre exploratoire et ne doivent pas être considérées comme des vérités établies. Elles reflètent mon état actuel de réflexion, s'accompagnant à la fois de prudence et d'un certain degré de confiance fondé sur mon expérience.
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.7rem',
          color: '#666'
        }}>
          <div>© Olivier Rouiller</div>
          <div style={{ textAlign: 'right' }}>
            Ecrit en Francais, traduit en Englais avec l'IA.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
