import React from 'react';
import './ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thankyou-wrapper">
      <div className="thankyou-card">
        
        {/* Decorative floating background elements */}
        <div className="floating-bg">
            {[...Array(15)].map((_, i) => (
                <div key={i} className={`dot dot-${i+1}`}></div>
            ))}
        </div>

        <div className="content-center">
          <h1 className="thankyou-title">THANK YOU</h1>

          <div className="contact-info">
            <div className="contact-label">
              <span>CONTACT</span>
            </div>
            <div className="contact-divider"></div>
            <div className="contact-details">
              <a href="tel:081320247097" className="contact-row">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                081320247097
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact-row">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                syahdaaurelliam
              </a>
              <a href="mailto:syahdaau26@gmail.com" className="contact-row">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                syahdaau26@gmail.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ThankYou;