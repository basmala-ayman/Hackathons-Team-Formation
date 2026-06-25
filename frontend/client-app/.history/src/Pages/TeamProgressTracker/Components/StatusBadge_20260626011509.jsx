import React from 'react'

function StatusBadge({ status }) {
    let bgColor, textColor;

  switch (status.toUpperCase()) {
    case 'ACCEPT':
      bgColor = 'var(--color-success-green)';
      textColor = 'var(--color-white)';
      break;
    case 'REJECT':
      bgColor = 'var(--color-error-red)';
      textColor = 'var(--color-white)';
      break;
    case 'PENDING':
    default:
      bgColor = 'var(--color-accent)';
      textColor = 'var(--color-text)'; 
      break;
  }
  return (
    <div>
      
    </div>
  )
}

export default StatusBadge
