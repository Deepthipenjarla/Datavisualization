import React, { useState, useEffect } from 'react';
import './Content.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import images from '../images/datalogo.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

function Content() {
  const [statisticsData, setStatisticsData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/statistics'); // Replace with the correct URL
        setStatisticsData(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    }

    fetchData();
  }, []);

  if (!statisticsData) {
    return <div>Loading...</div>;
  }

  const statisticalFunctions = ['mode', 'median', 'min', 'max', 'mean', 'variance'];

  const firstDivStats = statisticalFunctions.slice(0, 3);
  const secondDivStats = statisticalFunctions.slice(3);

  return (
    <div className="content">
      <div className="boxes-container">
        <div className="boxes">
          {firstDivStats.map((statisticKey) => (
            <div className="box" key={statisticKey}>
              <h3>{statisticKey}</h3>
              <div className="chart-container">
                {/* Adjust the height of the ResponsiveContainer */}
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart
                    data={Object.entries(statisticsData[statisticKey])}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="0" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="1" fill="rgba(75, 192, 192, 0.6)" name={`${statisticKey} Score`} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
        <div className="boxes">
          {secondDivStats.map((statisticKey) => (
            <div className="box" key={statisticKey}>
              <h3>{statisticKey}</h3>
              <div className="chart-container">
                {/* Adjust the height of the ResponsiveContainer */}
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart
                    data={Object.entries(statisticsData[statisticKey])}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="0" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="1" fill="rgba(75, 192, 192, 0.6)" name={`${statisticKey} Score`} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="info-box"  style={{ color: 'white' }}>
      <h2 className="heading">
    <span className="icon-container">
      <FontAwesomeIcon icon={faDatabase} size="1.5x" />
    </span>
    About the Data
  </h2>

  <p>
    Statistics is a pivotal field within mathematics that revolves around collecting, analyzing, interpreting, and presenting data. It plays a crucial role in various disciplines, ranging from science and economics to social sciences and beyond. At its core, statistics enables us to extract meaningful insights from seemingly complex datasets, transforming raw information into actionable knowledge.
  </p>
  <p>
    Key concepts in statistics include measures of central tendency such as the median, mode, and mean. The mode signifies the most frequent value, offering insights into prevailing patterns. The mean, or average, provides a central value by summing all values and dividing by their count.
  </p>
  <p>
    Dispersion measures, like variance, elucidate the spread of data points from the mean. Variance indicates how much individual data points deviate from the average, giving an understanding of data variability. Statistical analyses involve hypothesis testing, where assumptions are made about a population based on sample data, aiding in drawing conclusions.
  </p>
</div>

      </div>
  );
}

export default Content;
