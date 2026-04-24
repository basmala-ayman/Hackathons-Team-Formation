import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { getCSSVariable } from '../../../../utils/getColors';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function WeeklyActivity() {
  // 3. Grab your variables
  const primaryDark = getCSSVariable('--color-primary-dark') || '#4f46e5';
  const primaryMid = getCSSVariable('--color-primary-light') || '#a5a6f6';
  const textColor = getCSSVariable('--color-text') || '#333';

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Teams',
        data: [40, 50, 45, 60, 55, 30, 40],
        backgroundColor: primaryDark,
        borderRadius: 6,
        barThickness: 32,
      },
      {
        label: 'Participants',
        data: [120, 140, 130, 160, 150, 90, 110],
        backgroundColor: primaryMid,
        borderRadius: 6,
        barThickness: 32,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          color: textColor,
          font: { family: 'inherit' }
        }
      },
      tooltip: {
        backgroundColor: primaryDark,
        cornerRadius: 8,
        padding: 10,
        titleFont: { family: 'inherit' }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor, font: { family: 'inherit' } }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0',
          drawBorder: false,
        },
        ticks: { color: textColor, font: { family: 'inherit' } }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}