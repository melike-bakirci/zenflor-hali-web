import React from "react";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SAHIBINDEN_URL } from "~/lib/constants";
import "./FloatingContact.css";

const WhatsAppIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FloatingContact: React.FC = () => {
  const { t } = useTranslation();

  const phoneNumber = "+905302708487";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(
    t(
      "floatingContact.defaultMessage",
      "Merhaba, ürünleriniz ve hizmetleriniz hakkında bilgi almak istiyorum.",
    ),
  )}`;

  return (
    <div className="floating-contact">
      {/* 1. Telefon (Call Button) */}
      <a
        href={`tel:${phoneNumber}`}
        className="floating-contact__btn floating-contact__btn--call"
        aria-label={t("floatingContact.call", "Hemen Arayın")}
        title={t("floatingContact.call", "Hemen Arayın")}
      >
        <Phone size={22} />
      </a>

      {/* 2. WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact__btn floating-contact__btn--whatsapp"
        aria-label={t("floatingContact.whatsapp", "WhatsApp ile Yazın")}
        title={t("floatingContact.whatsapp", "WhatsApp ile Yazın")}
      >
        <WhatsAppIcon />
      </a>

      {/* 3. Sahibinden Button */}
      <a
        href={SAHIBINDEN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact__btn floating-contact__btn--sahibinden"
        aria-label={t("floatingContact.sahibinden", "Sahibinden Mağazamız")}
        title={t("floatingContact.sahibinden", "Sahibinden Mağazamız")}
      >
        <img
          src="/sahibinden_logo.png"
          alt="sahibinden.com"
          width="48"
          height="48"
          className="floating-contact__sahibinden-img"
        />
      </a>
    </div>
  );
};

export default FloatingContact;
