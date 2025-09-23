const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid #e2e8f0',

    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        <div>
          © Olivier Rouiller
        </div>
      </div>
    </footer>
  );
};

export default Footer;
