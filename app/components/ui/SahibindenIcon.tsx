import React from "react";

interface SahibindenIconProps {
  size?: number;
  className?: string;
}

export const SahibindenIcon: React.FC<SahibindenIconProps> = ({
  size = 20,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <rect width="24" height="24" rx="5" fill="#FFE800" />
    <path
      d="M15.8 8.1C14.9 7.4 13.7 7 12.3 7C9.6 7 8 8.5 8 10.5C8 14.3 14.5 12.6 14.5 15.2C14.5 16.2 13.6 16.8 12.2 16.8C10.6 16.8 9.3 16.1 8.3 15.2L7.3 17.1C8.6 18.2 10.3 19 12.2 19C15.2 19 17 17.3 17 15.1C17 11.1 10.5 13 10.5 10.4C10.5 9.5 11.3 8.9 12.4 8.9C13.6 8.9 14.6 9.4 15.3 10L15.8 8.1Z"
      fill="#111827"
    />
  </svg>
);

export default SahibindenIcon;
