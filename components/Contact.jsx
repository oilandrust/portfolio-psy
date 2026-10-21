'use client';

import { CONTACT_CONFIG, STYLES } from '../config/constants.js';
import SessionCta from './SessionCta';

const Contact = ({ currentLang = 'fr' }) => {
  return (
    <div id='contact' className='section reading-content'>
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

      <SessionCta currentLang={currentLang} />
    </div>
  );
};

export default Contact;
