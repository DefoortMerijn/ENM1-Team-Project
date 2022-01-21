Reveal.addEventListener("duiktank", function () {

    const pluginCustomBackground = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#15182D';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
        }
    };

    function showAnswer() {
        var antwoord = document.querySelector(".c-quiz-question__a");
        antwoord.style.backgroundColor = "#c92f4d";
    }

    setTimeout(showAnswer, 10000);

    const urlToday = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    fetch(urlToday)
    .then((response) => response.json())
    .then((data) => {
    let responseData = data.data[0].values;
    let arrayData = [];
    let arrayLabels = [];

    responseData.forEach((element) => {
        arrayData.push(element.value);
        var date = new Date(element.time)
        var hour = date.getHours()	
        arrayLabels.push(hour)
    });

    const ctxToday = document.getElementById("c-today-chart").getContext("2d");
    const todayChart = new Chart(ctxToday, {
            type: "bar",
            data: {
                labels: arrayLabels,
                datasets: [
                    {
                    label: "Verbruik in Watt",
                    data: arrayData,
                    backgroundColor: [
                                "rgba(201, 47, 77)",
                            ],
                    borderColor: [
                                "rgba(255, 99, 132, 1)",
                            ],
                    }
            ]
            //end of data
            },
            options: {
            plugins:{
                legend: {
                display: true,
                labels: {
                    color: 'white'
                }
                },
            },
            scales:{
                y: {
                grid:{
                    color:"white"
                },
                ticks:{
                    color: "white"
                }
                },
                x: {
                grid:{
                    color:"white"
                },
                ticks:{
                    color: "white"
                }
                },
            }
            },
            //end of options
            plugins:[pluginCustomBackground],
        });
    //end of fetch 
    });

    const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    fetch(urlMonth)
    .then((response) => response.json())
    .then((data) => {
    let responseData = data.data[0].values;
    let arrayData = [];
    let arrayLabels = [];


    responseData.forEach((element) => {
        arrayData.push(element.value);
        var date = new Date(element.time)
        var day = date.getDate()	
        arrayLabels.push(day)
    });


    const ctxMonth = document.getElementById("c-month-chart").getContext("2d");
    const monthChart = new Chart(ctxMonth, {
        type: "line",
        data: {
        labels: arrayLabels,
        datasets: [
            {
            label: "Verbruik in Watt",
            data: arrayData,
            backgroundColor: [
                        "rgba(201, 47, 77)",
                    ],
            borderColor: [
                        "rgba(201, 47, 77)",,
                    ],
            }
        ]
        //end of data
        },
        options: {
        plugins:{
            legend: {
            display: true,
            labels: {
                color: 'white'
            }
            },
        },
        scales:{
            y: {
            grid:{
                color:"white"
            },
            ticks:{
                color: "white"
            }
            },
            x: {
            grid:{
                color:"white"
            },
            ticks:{
                color: "white"
            }
            },
        }
        },
        //end of options
        plugins:[pluginCustomBackground],
    });
    // end of fetch 
    });

    const urlComparison = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
    fetch(urlComparison)
    .then((response) => response.json())
    .then((data) => {
    let responseData = data.data[0].values;
    let arrayData = [];
    let arrayLabels = [];


    responseData.forEach((element) => {
        arrayData.push(element.value);
        var date = new Date(element.time)
        var day = date.getDate()	
        arrayLabels.push(day)
    });

    const ctxComparison = document.getElementById("c-comparison-chart").getContext("2d");
    const comparisonChart = new Chart(ctxComparison, {
        type: "bar",
        data: {
        labels: ["Vlaamse woning","Duiktank"],
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
        //end of data
        },
        options: {
        plugins:{
            legend: {
            display: true,
            labels: {
                color: 'white'
            }
            },
        },
        scales:{
            y: {
            grid:{
                color:"white"
            },
            ticks:{
                color: "white"
            }
            },
            x: {
            grid:{
                color:"white"
            },
            ticks:{
                color: "white"
            }
            },
        }
        },
        //end of options
        plugins:[pluginCustomBackground],
    });
    // end of fetch 
    });
});