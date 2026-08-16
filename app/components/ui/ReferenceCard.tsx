import React from "react";
import { Maximize2 } from "lucide-react";
import type { ReferenceProject } from "~/data/referencesData";
import "./ReferenceCard.css";

interface ReferenceCardProps {
  project: ReferenceProject;
  onSelect: (project: ReferenceProject) => void;
}

const ReferenceCard: React.FC<ReferenceCardProps> = ({
  project,
  onSelect,
}) => {
  const title = project.title;

  return (
    <article
      className="ref-card ref-card--pure-image"
      onClick={() => onSelect(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
    >
      <div className="ref-card__img-wrapper">
        <img
          src={project.mainImage}
          alt={
            `Kurumsal Zemin Kaplama Referans Projesi: ${title}`
          }
          className="ref-card__img"
          loading="lazy"
        />
        <div className="ref-card__overlay">
          <span className="ref-card__zoom-icon">
            <Maximize2 size={26} color="#ffffff" />
          </span>
        </div>
      </div>
    </article>
  );
};

export default ReferenceCard;
