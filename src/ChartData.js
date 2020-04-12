export const companyChart = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        // one line graph
        data: [],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#bdc2c9",
        borderWidth: 3
      }
    ]
  },
  options: {
    title: {
      display: true,
      fontColor: "#fff",
      text: "Monthly Incomes",
      fontSize: 16
    },
    legend: {
      display: false
    },

    responsive: true,
    maintainAspectRatio: false,

    lineTension: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 5,
            fontColor: "#fff",
            fontSize: 12
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25,
            fontColor: "#fff",
            fontSize: 12
          }
        }
      ]
    }
  }
};

export default companyChart;
