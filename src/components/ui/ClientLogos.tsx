import React from 'react';
import { referenceClients } from '../../data/referencesData';
import { ShieldCheck, Award } from 'lucide-react';
import './ClientLogos.css';

interface ClientLogosProps {
  title?: string;
  subtitle?: string;
  isEn?: boolean;
  limit?: number;
}

const ClientLogos: React.FC<ClientLogosProps> = ({
  title,
  subtitle,
  isEn = false,
  limit,
}) => {
  const clientsToDisplay = limit ? referenceClients.slice(0, limit) : referenceClients;

  return (
    <div className="client-logos">
      {title && (
        <div className="client-logos__header">
          <span className="client-logos__tag">
            <Award size={15} />
            {isEn ? 'Corporate Solution Partner' : 'Kurumsal Referanslarımız'}
          </span>
          <h3 className="client-logos__title">{title}</h3>
          {subtitle && <p className="client-logos__subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="client-logos__grid">
        {clientsToDisplay.map((client) => (
          <div key={client.id} className="client-logos__card">
            <div
              className="client-logos__badge"
              style={{ backgroundColor: `${client.accentColor}12`, borderColor: `${client.accentColor}30` }}
            >
              <span
                className="client-logos__badge-text font-display"
                style={{ color: client.accentColor }}
              >
                {client.logoText}
              </span>
            </div>
            <div className="client-logos__info">
              <strong className="client-logos__name">{client.name}</strong>
              <span className="client-logos__industry">
                {isEn ? client.industryEn : client.industry}
              </span>
            </div>
            <span title="Onaylı Referans"><ShieldCheck size={16} className="client-logos__verified" /></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
