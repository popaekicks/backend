import React from 'react';

function StatCard({ icon: Icon, title, count, colorClass }) {
  return (
    <div className="stat-card">
      <Icon size={40} className="stat-icon" />
      <h3 className="stat-title">{title}</h3>
      <p className={`stat-count ${colorClass}`}>{count}</p>
    </div>
  );
}

export default StatCard;
