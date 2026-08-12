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
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSczeA1IJbeRlC25dY_Mdk83-UWVmHIqcF4aXux-h28dwogWAQ/formResponse';

    const formBody = new URLSearchParams();
    formBody.append('entry.2005620554', formData.name);
    formBody.append('entry.1166974658', formData.phone);
    formBody.append('entry.839337160', formData.message);

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', phone: '', message: '' });

      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Form gönderim hatası:', error);
      setIsSubmitting(false);
    }
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
              <a
                href="https://maps.app.goo.gl/cyQwTaXrGfFNJmyTA"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__info-item card"
              >
                <div className="contact__info-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="contact__info-title">{t('contact.address')}</h3>
                  <p className="contact__info-desc">Leman Sk. No:4, Sancaktepe/İstanbul</p>
                </div>
              </a>

              <a href="tel:+905302708487" className="contact__info-item card">
                <div className="contact__info-icon">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="contact__info-title">{t('contact.phone')}</h3>
                  <p className="contact__info-desc">+90 (530) 270 84 87</p>
                </div>
              </a>

              <a href="mailto:zenflormarket@gmail.com" className="contact__info-item card">
                <div className="contact__info-icon">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="contact__info-title">{t('contact.email')}</h3>
                  <p className="contact__info-desc">zenflormarket@gmail.com</p>
                </div>
              </a>

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
            {success ? (
              <div className="contact__success">
                <div className="contact__success-icon">✓</div>
                <h2 className="contact__form-title font-display" style={{ marginBottom: 0 }}>
                  {isEn ? 'Message Sent!' : 'Mesajınız Alındı!'}
                </h2>
                <p className="contact__success-text">{t('contact.successMsg')}</p>
              </div>
            ) : (
              <>
                <h2 className="contact__form-title font-display">{isEn ? 'Send us a Message' : 'Bize Mesaj Gönderin'}</h2>
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
                    <label htmlFor="phone" className="contact__label">{t('contact.phoneLabel')} *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="contact__input"
                      placeholder={t('contact.phonePlaceholder')}
                      value={formData.phone}
                      onChange={handleChange}
                      required
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
              </>
            )}
          </div>

        </div>
      </section>

      {/* Map */}
      <section className="contact__map">
        <iframe
          title="Zenflor Google Maps Konumu"
          src="https://maps.google.com/maps?q=Leman+Sk.+No:4,+Sancaktepe/İstanbul&t=&z=18&ie=UTF8&iwloc=&output=embed"
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
