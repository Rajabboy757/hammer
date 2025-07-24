// npm package: chart.js
// github link: https://github.com/chartjs/Chart.js

var colors = {
    primary: "#6571ff",
    secondary: "#7987a1",
    success: "#05a34a",
    info: "#66d1d1",
    warning: "#fbbc06",
    danger: "#ff3366",
    light: "#e9ecef",
    dark: "#060c17",
    muted: "#7987a1",
    gridBorder: "rgba(77, 138, 240, .15)",
    bodyColor: "#000",
    cardBg: "#fff"
}

var fontFamily = "'Roboto', Helvetica, sans-serif"

function createBarChart(chartElement, labels, data) {
    if (chartElement) {
        new Chart(chartElement, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Talaba",
                        backgroundColor: 'blue', // Set your desired color
                        data: data,
                    }
                ]
            },
            options: {
                plugins: {
                    datalabels: {
                        color: 'black',
                        anchor: 'end',
                        align: 'top',
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        formatter: (value) => {
                            return value.toFixed(2); // Veriyi iki ondalık basamağa yuvarla ve göster
                        }
                    },
                    legend: {display: false},
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: true,
                            color: 'lightgray', // Set your grid color
                            borderColor: 'lightgray',
                        },
                        ticks: {
                            color: 'black', // Set your desired color for the x-axis ticks
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: true,
                            color: 'lightgray',
                            borderColor: 'lightgray',
                        },
                        ticks: {
                            color: 'black',
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
}


function createdoughnutChart(chartElement, labels, data) {
    if ((chartElement).length) {
        new Chart((chartElement), {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Talaba",
                        backgroundColor: [colors.primary, colors.danger, colors.info, colors.muted, colors.success],
                        borderColor: colors.cardBg,
                        data: data,
                    }
                ]
            },
            options: {
                aspectRatio: 2,
                plugins: {
                    datalabels: {
                        color: 'black',
                        anchor: 'end',
                        align: 'top',
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        formatter: (value) => {
                            return value.toFixed(2);
                        }
                    },
                    legend: {
                        display: true,
                        labels: {
                            color: colors.bodyColor,
                            font: {
                                size: '13px',
                                family: fontFamily
                            }
                        }
                    },
                }
            }
        });
    }

}

// Pie Chart
function creatpiechart(chartElement, labels, data) {
    if ((chartElement).length) {
        new Chart((chartElement), {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: "Talaba",
                    backgroundColor: [colors.success, colors.primary, colors.danger],
                    borderColor: colors.cardBg,
                    data: data
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: colors.bodyColor,
                            font: {
                                size: '13px',
                                family: fontFamily
                            }
                        }
                    },
                },
                aspectRatio: 2,
            }
        });
    }
}