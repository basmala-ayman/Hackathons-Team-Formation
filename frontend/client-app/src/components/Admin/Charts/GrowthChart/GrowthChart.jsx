import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { getCSSVariable } from '../../../../utils/getColors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

export default function GrowthChart() {
  const primaryDark = getCSSVariable('--color-primary-dark') || '#6366f1';
  const primaryLight = getCSSVariable('--color-primary-light-3') || 'rgba(99, 102, 241, 0.1)';
  const textColor = getCSSVariable('--color-text') || '#333';

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Registrations',
      data: [120, 190, 250, 320, 430, 480],
      borderColor: primaryDark,
      backgroundColor: primaryLight,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: primaryDark,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: primaryDark,
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 8,
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { borderDash: [5, 5], color: '#eef0f2' },
        ticks: {
          color: textColor,
          font: { family: 'inherit', size: 12 }
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          color: textColor,
          font: { family: 'inherit', size: 12 }
        }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
}