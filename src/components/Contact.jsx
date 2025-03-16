import React, { useState } from 'react';
import * as emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email_from: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const templateParams = {
      name: formData.name,
      email_from: formData.email_from,
      message: formData.message,
      time: new Date().toLocaleString(), // 🕒 Add current time
    };

    emailjs.send('service_7hxzrvn', 'template_iwf7v1j', templateParams, 'IobXut44Lh6rpc6vg')
      .then((result) => {
        console.log('SUCCESS!', result.text);
        setSubmitStatus('success');
        setFormData({ name: '', email_from: '', message: '' });
      })
      .catch((error) => {
        console.log('FAILED...', error.text);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="section contact">
      <div className="section-content">
        <h2 className="section-title">Send me a message</h2>
        <div className="contact-container">
          <form className="contact-form" onSubmit={sendEmail}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email_from"
              placeholder="Email"
              className="form-input"
              value={formData.email_from}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              className="form-textarea"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && (
              <p className="submit-message success">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="submit-message error">
                Oops! Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
