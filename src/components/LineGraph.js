import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import Chart from "chart.js/auto";

const buildChartData = (data, casesType = "cases") => {
    let chartData = [];
    let lastDataPoint;
    
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPont = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPont);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };


function LineGraph({ casesType = 'cases' }) {
  const [data, setData] = useState({});

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
        point: {
          radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0, 0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          let chartData = buildChartData(data, "cases")
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div className="graph">
      {data?.length > 0 && (
        <Line
          data={{
            options: { options },
            datasets: [
              {
                data: data,
                label: "cases",
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
