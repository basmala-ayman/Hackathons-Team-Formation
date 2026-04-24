import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getCSSVariable } from '../../../../utils/getColors';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TeamPieChart() {
  const darkPurple = getCSSVariable('--color-primary-dark') || '#6366f1';
  const midPurple = getCSSVariable('--color-primary-light') || '#a5a6f6';
  const lightPurple = getCSSVariable('--color-primary-light-2') || '#e0e0ff';
  const textColor = getCSSVariable('--color-text') || '#333';

  const data = {
    labels: ['Auto-matched', 'Manual', 'Invited'],
    datasets: [{
      data: [65, 20, 15],
      backgroundColor: [darkPurple, midPurple, lightPurple],
      borderWidth: 0,
      hoverOffset: 10
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 25,
          color: textColor,
          font: { family: 'inherit', size: 14 }
        }
      },
      tooltip: {
        backgroundColor: darkPurple,
        titleFont: { family: 'inherit' },
        bodyFont: { family: 'inherit' },
        cornerRadius: 8,
        padding: 10,
        displayColors: false
      }
    }
  };

  return (
    <div style={{ height: '320px', position: 'relative' }}>
      <Doughnut data={data} options={options} />

      <div style={{
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        <span style={{
          fontSize: '2.4rem',
          fontWeight: '700',
          display: 'block',
          color: textColor
        }}>100%</span>
        <span style={{ fontSize: '1.2rem', color: '#888' }}>Total</span>
      </div>
    </div>
  );
}