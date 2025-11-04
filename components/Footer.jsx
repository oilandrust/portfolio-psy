const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid #e2e8f0',

    }}>
      <div className="container" style={{
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
    </footer>
  );
};

export default Footer;
