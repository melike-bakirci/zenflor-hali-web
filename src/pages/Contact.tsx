import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import Breadcrumb from '../components/ui/Breadcrumb';
import './Contact.css';

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="contact page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="page-hero__content">
            <h1 className="page-hero__title font-display">{t('contact.title')}</h1>
            <p className="page-hero__subtitle">{t('contact.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="container page-breadcrumb-container">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Anasayfa', url: '/' },
            { label: t('nav.contact') },
          ]}
        />
      </div>


      <section className="section contact__section">
        <div className="container contact__grid">

          {/* Info */}
          <div className="contact__info">
            <SectionTitle title={isEn ? 'Contact Information' : 'İletişim Bilgilerimiz'} />

            <div className="contact__info-list">
              <div className="contact__info-item card">
                <div className="contact__info-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="contact__info-title">{t('contact.address')}</h3>
                  <p className="contact__info-desc">
                    <a href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA" target="_blank" rel="noopener noreferrer">
                      Leman Sk. No:4, Sancaktepe/İstanbul
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact__info-item card">
                <div className="contact__info-icon">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="contact__info-title">{t('contact.phone')}</h3>
                  <p className="contact__info-desc">
                    <a href="tel:+905302708487">+90 (530) 270 84 87</a>                  </p>
                </div>
              </div>

              <div className="contact__info-item card">
                <div className="contact__info-icon">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="contact__info-title">{t('contact.email')}</h3>
                  <p className="contact__info-desc">
                    <a href="mailto:zenflormarket@gmail.com">zenflormarket@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="contact__info-item card">
                <div className="contact__info-icon">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="contact__info-title">{t('contact.hours')}</h3>
                  <p className="contact__info-desc">{t('contact.hoursValue')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact__form-wrapper card">
            <h2 className="contact__form-title font-display">{isEn ? 'Send us a Message' : 'Bize Mesaj Gönderin'}</h2>

            {success ? (
              <div className="contact__success">
                <div className="contact__success-icon">✓</div>
                <p>{t('contact.successMsg')}</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label htmlFor="name" className="contact__label">{t('contact.nameLabel')} *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="contact__input"
                      placeholder={t('contact.namePlaceholder')}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact__form-group">
                    <label htmlFor="email" className="contact__label">{t('contact.emailLabel')} *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="contact__input"
                      placeholder={t('contact.emailPlaceholder')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label htmlFor="phone" className="contact__label">{t('contact.phoneLabel')}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="contact__input"
                      placeholder={t('contact.phonePlaceholder')}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact__form-group">
                    <label htmlFor="subject" className="contact__label">{t('contact.subjectLabel')}</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="contact__input"
                      placeholder={t('contact.subjectPlaceholder')}
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact__form-group">
                  <label htmlFor="message" className="contact__label">{t('contact.messageLabel')} *</label>
                  <textarea
                    id="message"
                    name="message"
                    className="contact__input contact__textarea"
                    placeholder={t('contact.messagePlaceholder')}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg contact__submit" disabled={isSubmitting}>
                  {isSubmitting ? t('common.loading') : (
                    <>{t('contact.sendBtn')} <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Map */}
      <section className="contact__map">
        <iframe
          title="Zenflor Google Maps Konumu"
          src="https://maps.google.com/maps?q=Leman+Sk.+No:4,+Sancaktepe/İstanbul&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
