import { CONTACT_CONFIG, STYLES } from '../config/constants.js';

const Contact = () => {
  return (
    <div id='contact' className='section'>
      <h2>Get In Touch</h2>
      <p style={{ textAlign: 'center', marginBottom: STYLES.SPACING.XL }}>
        You're welcome to contact me if something sparked your curiosity.
      </p>

      <div style={{ textAlign: 'center' }}>
        <button
          className='outline'
          onClick={() => (window.location.href = `mailto:${CONTACT_CONFIG.EMAIL}`)}
        >
          Send an email
        </button>
      </div>
    </div>
  );
};

export default Contact;
