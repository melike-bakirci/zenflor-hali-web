import React from 'react';
import SectionTitle from './SectionTitle';
import { referenceClients } from '../../data/referencesData';
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
        <SectionTitle
          title={title}
          subtitle={subtitle}
          center
        />
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
