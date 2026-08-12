import React from 'react';
import './PageLoader.css';

const PageLoader: React.FC = () => {
  return (
    <div className="page-loader-container" aria-label="Sayfa Yükleniyor">
      <div className="page-loader-spinner-wrapper">
        <div className="page-loader-spinner" />
        <div className="page-loader-pulse" />
      </div>
    </div>
  );
};

export default PageLoader;
