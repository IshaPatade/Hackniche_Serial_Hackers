import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Graph = () => {
  const [hotelData, setHotelData] = useState({
    hotel1: [
      { rating: 4.5, reviews: 50 },
      { rating: 4.0, reviews: 30 },
      { rating: 3.5, reviews: 20 },
    ], // Ratings and number of reviews for Hotel 1
    hotel2: [
      { rating: 4.5, reviews: 70 },
      { rating: 4.0, reviews: 40 },
      { rating: 3.5, reviews: 25 },
    ], // Ratings and number of reviews for Hotel 2
  });

  useEffect(() => {
    let chartInstance = null;

    // Function to update the chart
    const updateChart = () => {
      const ctx = document.getElementById('myChart');
      
      // Destroy existing chart instance if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      const labels = hotelData.hotel1.map(data => data.rating);

      // Extract data for each hotel
      const hotel1Data = hotelData.hotel1.map(data => data.reviews);
      const hotel2Data = hotelData.hotel2.map(data => data.reviews);

      // Create new chart instance
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Hotel 1',
            data: hotel1Data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red color for Hotel 1
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }, {
            label: 'Hotel 2',
            data: hotel2Data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue color for Hotel 2
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }]
        },
        options: {
          indexAxis: 'x',
          scales: {
            x: {
              stacked: false,
            },
            y: {
              beginAtZero: true
            }
          },
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20
            }
          }
        }
      });
    };

    // Update chart when hotelData changes
    updateChart();

    return () => {
      // Cleanup to prevent memory leaks
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [hotelData]);

  // Dynamically adjust canvas width and height based on screen dimensions
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = document.getElementById('myChart');
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <canvas id="myChart"></canvas>
      {/* <div>
        <button onClick={() => setHotelData({
          ...hotelData,
          hotel1: hotelData.hotel1.map(item =>
            item.rating === 4.5 ? { ...item, reviews: item.reviews + 1 } : item
          )
        })}>Add review to Hotel 1 (Rating: 4.5)</button>
        <button onClick={() => setHotelData({
          ...hotelData,
          hotel2: hotelData.hotel2.map(item =>
            item.rating === 3.8 ? { ...item, reviews: item.reviews + 1 } : item
          )
        })}>Add review to Hotel 2 (Rating: 3.8)</button>
      </div> */}
    </div>
  );
};

export default Graph;
