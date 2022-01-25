Reveal.addEventListener("duiktank", function () {
  const pluginCustomBackground = {
    id: "custom_canvas_background_color",
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext("2d");
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "#15182D";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  function showAnswer() {
    var antwoord = document.querySelector(".c-quiz__question__a");
    antwoord.style.backgroundColor = "#c92f4d";
  }

  setTimeout(showAnswer, 10000);

  const urlToday =
    "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
  fetch(urlToday)
    .then((response) => response.json())
    .then((data) => {
      let responseData = data.data[0].values;
      let arrayData = [];
      let arrayLabels = [];

      responseData.forEach((element) => {
        arrayData.push(element.value);
        var date = new Date(element.time);
        var hour = date.getHours();
        arrayLabels.push(hour);
      });

      const ctxToday = document
        .getElementById("c-today-chart")
        .getContext("2d");
      const todayChart = new Chart(ctxToday, {
        type: "bar",
        data: {
          labels: arrayLabels,
          datasets: [
            {
              label: "Verbruik in Watt",
              data: arrayData,
              backgroundColor: ["rgba(201, 47, 77)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
            },
          ],
          //end of data
        },
        options: {
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "white",
              },
            },
          },
          scales: {
            y: {
              grid: {
                color: "white",
              },
              ticks: {
                color: "white",
              },
            },
            x: {
              grid: {
                color: "white",
              },
              ticks: {
                color: "white",
              },
            },
          },
        },
        //end of options
        plugins: [pluginCustomBackground],
      });
      //end of fetch
    });

  const urlMonth =
    "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
  fetch(urlMonth)
    .then((response) => response.json())
    .then((data) => {
      let responseData = data.data[0].values;
      let arrayData = [];
      let arrayLabels = [];

      responseData.forEach((element) => {
        arrayData.push(element.value);
        var date = new Date(element.time);
        var day = date.getDate();
        arrayLabels.push(day);
      });

      const ctxMonth = document
        .getElementById("c-month-chart")
        .getContext("2d");
      const monthChart = new Chart(ctxMonth, {
        type: "line",
        data: {
          labels: arrayLabels,
          datasets: [
            {
              label: "Verbruik in Watt",
              data: arrayData,
              backgroundColor: ["rgba(201, 47, 77)"],
              borderColor: ["rgba(201, 47, 77)", ,],
            },
          ],
          //end of data
        },
        options: {
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "white",
              },
            },
          },
          scales: {
            y: {
              grid: {
                color: "white",
              },
              ticks: {
                color: "white",
              },
            },
            x: {
              grid: {
                color: "white",
              },
              ticks: {
                color: "white",
              },
            },
          },
        },
        //end of options
        plugins: [pluginCustomBackground],
      });
      // end of fetch
    });

  const urlComparison =
    "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
  fetch(urlComparison)
    .then((response) => response.json())
    .then((data) => {
      let responseData = data.data[0].values;
      let arrayData = [];
      let arrayLabels = [];

      responseData.forEach((element) => {
        arrayData.push(element.value);
        var date = new Date(element.time);
        var day = date.getDate();
        arrayLabels.push(day);
      });

      const ctxComparison = document
        .getElementById("c-comparison-chart")
        .getContext("2d");
      const comparisonChart = new Chart(ctxComparison, {
        type: "bar",
        data: {
          labels: ["Vlaamse woning", "Duiktank"],
          datasets: [
            {
              label: "Verbruik in Kilowatt per jaar",
              data: [3300, 78000],
              backgroundColor: ["rgba(201, 47, 77)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
            },
          ],
          //end of data
        },
        options: {
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "white",
              },
            },
          },
          scales: {
            y: {
              grid: {
                color: "white",
              },
              ticks: {
                color: "white",
              },
            },
            x: {
              grid: {
                color: "white",
              },
              ticks: {
                color: "white",
              },
            },
          },
        },
        //end of options
        plugins: [pluginCustomBackground],
      });
      // end of fetch
    });
});
const get = (url) => fetch(url).then((r)=> r.json());

function createChart( ctx, type, data ){
    const mychart = new Chart( ctx ,  {
        type: type,
        data: data,
        options: {
            plugins:{
                legend: {
                    display: true,
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: 'Verbruik in Watt',
                    color: 'white'
                },
            },
            scales:
            {
                y: {
                    grid:{
                        color:"white"
                    },
                    ticks:{
                        color: "white",
                        callback: function(value, index, ticks) {
                            return value + "w";
                        }
                    }
                },
                x: {
                    grid:{
                        color:"white",
                    },
                    ticks:{
                        color: "white"
                    }
                },
            }    
        }
    });
    
    return mychart;
}

function getData(response){
    let arrayData = [];

    response.forEach(element => {
        arrayData.push(element.value);
    });

    return arrayData;
}

Reveal.addEventListener("duiktank", async () => {
    const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

    const ctxToday = document.getElementById("c-today-chart").getContext("2d");
    const ctxMonth = document.getElementById("c-month-chart").getContext("2d");
    const ctxComparison = document.getElementById("c-comparison-chart").getContext("2d");

    const responseToday = await get(urlDay);
    const responseMonth = await get(urlMonth);
    const responseYear = await get(urlYear);

    let todayData = getData(responseToday.data[0].values);
    let todayLabels = [];
    
    responseToday.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            todayLabels.push(hour)
    });

    let monthData = getData(responseMonth.data[0].values);
    let monthLabels = [];
    
    responseMonth.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var day = date.getDate()	
            monthLabels.push(day)
    });

    let yearData = getData(responseYear.data[0].values);
    let yearLabels = [];
    
    responseYear.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            yearLabels.push(hour)
    });

    const dataToday = {
                    labels: todayLabels,
                    datasets: [
                        {
                        label: "Duiktank",
                        data: todayData,
                        backgroundColor: [
                                    "rgba(201, 47, 77)",
                                ],
                        borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                ],
                        }
                    ]};

    const dataMonth = {
                        labels: monthLabels,
                        datasets: [
                            {
                            label: "Duiktank",
                            data: monthData,
                            backgroundColor: [
                                        "rgba(201, 47, 77)",
                                    ],
                            borderColor: [
                                        "rgba(201, 47, 77)",
                                    ],
                            }
                        ]};

    const dataYear = {
                        labels: ["Vlaamse woning", "Duiktank"],
                        datasets: [
                            {
                                label: "Verbruik in Kilowatt per jaar",
                                data: [3300, 78000],
                                backgroundColor: [
                                            "rgba(201, 47, 77)",
                                        ],
                                borderColor: [
                                            "rgba(201, 47, 77)",
                                        ],
                            }
                        ]
                    };

    createChart(ctxToday, "bar" , dataToday);
    createChart(ctxMonth, "line" , dataMonth);
    createChart(ctxComparison, "bar" , dataYear);
});

Reveal.addEventListener("demo", async () => {
    const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

    const ctxToday = document.getElementById("c-today-chart2").getContext("2d");
    const ctxMonth = document.getElementById("c-month-chart2").getContext("2d");
    const ctxComparison = document.getElementById("c-comparison-chart2").getContext("2d");

    const responseToday = await get(urlDay);
    const responseMonth = await get(urlMonth);
    const responseYear = await get(urlYear);

    let todayData = getData(responseToday.data[0].values);
    let todayLabels = [];
    
    responseToday.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            todayLabels.push(hour)
    });

    let monthData = getData(responseMonth.data[0].values);
    let monthLabels = [];
    
    responseMonth.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var day = date.getDate()	
            monthLabels.push(day)
    });

    let yearData = getData(responseYear.data[0].values);
    let yearLabels = [];
    
    responseYear.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            yearLabels.push(hour)
    });

    const dataToday = {
                    labels: todayLabels,
                    datasets: [
                        {
                        label: "Verbruik in Watt",
                        data: todayData,
                        backgroundColor: [
                                    "rgba(201, 47, 77)",
                                ],
                        borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                ],
                        }
                    ]};

    const dataMonth = {
                        labels: monthLabels,
                        datasets: [
                            {
                            label: "Verbruik in Watt",
                            data: monthData,
                            backgroundColor: [
                                        "rgba(201, 47, 77)",
                                    ],
                            borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                    ],
                            }
                        ]};

    const dataYear = {
                        labels: ["Vlaamse woning", "Duiktank"],
                        datasets: [
                            {
                                label: "Verbruik in Kilowatt per jaar",
                                data: [3300, 78000],
                                backgroundColor: [
                                            "rgba(201, 47, 77)",
                                        ],
                                borderColor: [
                                            "rgba(255, 99, 132, 1)",
                                        ],
                            }
                        ]
                    };

    createChart(ctxToday, "bar" , dataToday);
    createChart(ctxMonth, "line" , dataMonth);
    createChart(ctxComparison, "bar" , dataYear);
});

Reveal.addEventListener("hoofdgebouw", async () => {
    const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q1_L2";
    const urlDay2 = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q7_L2";
    const urlDay3 = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q3_L3";

    const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q1_L2";
    const urlMonth2 = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q7_L2";
    const urlMonth3 = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q3_L3";

    const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

    const ctxToday = document.getElementById("c-today-chart3").getContext("2d");
    const ctxMonth = document.getElementById("c-month-chart3").getContext("2d");
    const ctxComparison = document.getElementById("c-comparison-chart3").getContext("2d");

    const responseToday = await get(urlDay);
    const responseToday2 = await get(urlDay2);
    const responseToday3 = await get(urlDay3);

    const responseMonth = await get(urlMonth);
    const responseMonth2 = await get(urlMonth2);
    const responseMonth3 = await get(urlMonth3);

    const responseYear = await get(urlYear);

    let todayData = getData(responseToday.data[0].values);
    let todayLabels = [];
    
    responseToday.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            todayLabels.push(hour)
    });

    let todayData2 = getData(responseToday2.data[0].values);
    let todayData3 = getData(responseToday3.data[0].values);

    let monthData = getData(responseMonth.data[0].values);
    let monthLabels = [];
    
    responseMonth.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var day = date.getDate()	
            monthLabels.push(day)
    });

    let monthData2 = getData(responseMonth2.data[0].values);
    let monthData3 = getData(responseMonth3.data[0].values);

    let yearData = getData(responseYear.data[0].values);
    let yearLabels = [];
    
    responseYear.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            yearLabels.push(hour)
    });

    const dataToday = {
                    labels: todayLabels,
                    datasets: [
                        {
                            label: "kantoorgebouw",
                            data: todayData,
                            backgroundColor: [
                                        "rgba(201, 47, 77)",
                                    ],
                            borderColor: [
                                        "rgba(201, 47, 77)",
                                    ],
                        },
                        {
                            label: "Feestzaal",
                            data: todayData2,
                            backgroundColor: [
                                "rgb(49, 99, 255)",
                            ],
                            borderColor: [
                                "rgb(49, 99, 255)",
                            ],
                        },
                        {
                            label: "Machinezaal",
                            data: todayData3,
                            backgroundColor: [
                                "rgba(101, 61, 235)",
                            ],
                            borderColor: [
                                "rgba(101, 61, 235)",
                            ],
                        }
                    ]};

    const dataMonth = {
                        labels: monthLabels,
                        datasets: [
                            {
                            label: "kantoorgebouw",
                            data: monthData,
                            backgroundColor: [
                                        "rgba(201, 47, 77)",
                                    ],
                            borderColor: [
                                        "rgba(201, 47, 77)",
                                    ],
                            },
                            {
                                label: "Feestzaal",
                                data: monthData2,
                                backgroundColor: [
                                            "rgb(49, 99, 255)",
                                        ],
                                borderColor: [
                                            "rgb(49, 99, 255)",
                                        ],
                            },
                            {
                                label: "Machinezaal",
                                data: monthData3,
                                backgroundColor: [
                                            "rgba(101, 61, 235)",
                                        ],
                                borderColor: [
                                            "rgba(101, 61, 235)",
                                        ],
                            }
                        ]};

    const dataYear = {
                        labels: ["Vlaamse woning", "Hoofdgebouw"],
                        datasets: [
                            {
                                label: "Verbruik in Kilowatt per jaar",
                                data: [3300, 78000],
                                backgroundColor: [
                                            "rgba(201, 47, 77)",
                                        ],
                                borderColor: [
                                            "rgba(255, 99, 132, 1)",
                                        ],
                            }
                        ]
                    };

    createChart(ctxToday, "line" , dataToday);
    createChart(ctxMonth, "line" , dataMonth);
    createChart(ctxComparison, "bar" , dataYear);
});

Reveal.addEventListener("silo", async () => {
    const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

    const ctxToday = document.getElementById("c-today-chart4").getContext("2d");
    const ctxMonth = document.getElementById("c-month-chart4").getContext("2d");
    const ctxComparison = document.getElementById("c-comparison-chart4").getContext("2d");

    const responseToday = await get(urlDay);
    const responseMonth = await get(urlMonth);
    const responseYear = await get(urlYear);

    let todayData = getData(responseToday.data[0].values);
    let todayLabels = [];
    
    responseToday.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            todayLabels.push(hour)
    });

    let monthData = getData(responseMonth.data[0].values);
    let monthLabels = [];
    
    responseMonth.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var day = date.getDate()	
            monthLabels.push(day)
    });

    let yearData = getData(responseYear.data[0].values);
    let yearLabels = [];
    
    responseYear.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            yearLabels.push(hour)
    });

    const dataToday = {
                    labels: todayLabels,
                    datasets: [
                        {
                        label: "Verbruik in Watt",
                        data: todayData,
                        backgroundColor: [
                                    "rgba(201, 47, 77)",
                                ],
                        borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                ],
                        }
                    ]};

    const dataMonth = {
                        labels: monthLabels,
                        datasets: [
                            {
                            label: "Verbruik in Watt",
                            data: monthData,
                            backgroundColor: [
                                        "rgba(201, 47, 77)",
                                    ],
                            borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                    ],
                            }
                        ]};

    const dataYear = {
                        labels: ["Vlaamse woning", "Silo"],
                        datasets: [
                            {
                                label: "Verbruik in Kilowatt per jaar",
                                data: [3300, 78000],
                                backgroundColor: [
                                            "rgba(201, 47, 77)",
                                        ],
                                borderColor: [
                                            "rgba(255, 99, 132, 1)",
                                        ],
                            }
                        ]
                    };

    createChart(ctxToday, "bar" , dataToday);
    createChart(ctxMonth, "line" , dataMonth);
    createChart(ctxComparison, "bar" , dataYear);
});

Reveal.addEventListener("mechanikergebouw", async () => {
    const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

    const ctxToday = document.getElementById("c-today-chart5").getContext("2d");
    const ctxMonth = document.getElementById("c-month-chart5").getContext("2d");
    const ctxComparison = document.getElementById("c-comparison-chart5").getContext("2d");

    const responseToday = await get(urlDay);
    const responseMonth = await get(urlMonth);
    const responseYear = await get(urlYear);

    let todayData = getData(responseToday.data[0].values);
    let todayLabels = [];
    
    responseToday.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            todayLabels.push(hour)
    });

    let monthData = getData(responseMonth.data[0].values);
    let monthLabels = [];
    
    responseMonth.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var day = date.getDate()	
            monthLabels.push(day)
    });

    let yearData = getData(responseYear.data[0].values);
    let yearLabels = [];
    
    responseYear.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            yearLabels.push(hour)
    });

    const dataToday = {
                    labels: todayLabels,
                    datasets: [
                        {
                        label: "Verbruik in Watt",
                        data: todayData,
                        backgroundColor: [
                                    "rgba(201, 47, 77)",
                                ],
                        borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                ],
                        }
                    ]};

    const dataMonth = {
                        labels: monthLabels,
                        datasets: [
                            {
                            label: "Verbruik in Watt",
                            data: monthData,
                            backgroundColor: [
                                        "rgba(201, 47, 77)",
                                    ],
                            borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                    ],
                            }
                        ]};

    const dataYear = {
                        labels: ["Vlaamse woning", "Oenanthe"],
                        datasets: [
                            {
                                label: "Verbruik in Kilowatt per jaar",
                                data: [3300, 78000],
                                backgroundColor: [
                                            "rgba(201, 47, 77)",
                                        ],
                                borderColor: [
                                            "rgba(255, 99, 132, 1)",
                                        ],
                            }
                        ]
                    };

    createChart(ctxToday, "bar" , dataToday);
    createChart(ctxMonth, "line" , dataMonth);
    createChart(ctxComparison, "bar" , dataYear);
});

Reveal.addEventListener("waterkot", async () => {
    const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

    const ctxToday = document.getElementById("c-today-chart6").getContext("2d");
    const ctxMonth = document.getElementById("c-month-chart6").getContext("2d");
    const ctxComparison = document.getElementById("c-comparison-chart6").getContext("2d");

    const responseToday = await get(urlDay);
    const responseMonth = await get(urlMonth);
    const responseYear = await get(urlYear);

    let todayData = getData(responseToday.data[0].values);
    let todayLabels = [];
    
    responseToday.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            todayLabels.push(hour)
    });

    let monthData = getData(responseMonth.data[0].values);
    let monthLabels = [];
    
    responseMonth.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var day = date.getDate()	
            monthLabels.push(day)
    });

    let yearData = getData(responseYear.data[0].values);
    let yearLabels = [];
    
    responseYear.data[0].values.forEach((element) => {
            var date = new Date(element.time)
            var hour = date.getHours()	
            yearLabels.push(hour)
    });

    const dataToday = {
                    labels: todayLabels,
                    datasets: [
                        {
                        label: "Verbruik in Watt",
                        data: todayData,
                        backgroundColor: [
                                    "rgba(201, 47, 77)",
                                ],
                        borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                ],
                        }
                    ]};

    const dataMonth = {
                        labels: monthLabels,
                        datasets: [
                            {
                            label: "Verbruik in Watt",
                            data: monthData,
                            backgroundColor: [
                                        "rgba(201, 47, 77)",
                                    ],
                            borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                    ],
                            }
                        ]};

    const dataYear = {
                        labels: ["Vlaamse woning", "Waterkot"],
                        datasets: [
                            {
                                label: "Verbruik in Kilowatt per jaar",
                                data: [3300, 78000],
                                backgroundColor: [
                                            "rgba(201, 47, 77)",
                                        ],
                                borderColor: [
                                            "rgba(255, 99, 132, 1)",
                                        ],
                            }
                        ]
                    };

    createChart(ctxToday, "bar" , dataToday);
    createChart(ctxMonth, "line" , dataMonth);
    createChart(ctxComparison, "bar" , dataYear);
});
