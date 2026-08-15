import React from "react";
import "./SectionTitle.css";

interface SectionTitleProps {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  center = false,
}) => {
  return (
    <div className={`section-title ${center ? "section-title--center" : ""}`}>
      <h2 className="section-title__heading">{title}</h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
