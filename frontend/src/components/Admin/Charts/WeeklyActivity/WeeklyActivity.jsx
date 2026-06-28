import React from 'react';
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

export default function WeeklyActivity({ data }) {
  const primaryDark = getCSSVariable('--color-primary-dark');
  const primaryMid = getCSSVariable('--color-primary-light') ;
  const textColor = getCSSVariable('--color-text');

  // Assuming data comes as { newUsers: number, newTeams: number }
  // We map them to the 7-day structure or represent them as weekly totals
  const chartData = {
    labels: ['Weekly Activity'],
    datasets: [
      {
        label: 'Teams',
        data: [data?.newTeams || 0],
        backgroundColor: primaryDark,
        borderRadius: 6,
        barThickness: 40,
      },
      {
        label: 'Users',
        data: [data?.newUsers || 0],
        backgroundColor: primaryMid,
        borderRadius: 6,
        barThickness: 40,
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
      <Bar data={chartData} options={options} />
    </div>
  );
}