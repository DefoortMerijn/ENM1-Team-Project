// function showAnswer() {
//     var antwoord = document.querySelector(".c-quiz__question__a");
//     antwoord.style.backgroundColor = "#c92f4d";
// }

const get = (url) => fetch(url).then((r)=> r.json());

function createChart(ctx, type ,data){
    return new Chart(ctx,  {
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
        }
    });
}

function getData(response){
    let arrayData = [];

    response.forEach(element => {
        arrayData.push(element.value);
    });

    return arrayData;
}

const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

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

Reveal.addEventListener("demo", async () => {
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
    const ctxToday = document.getElementById("c-today-chart3").getContext("2d");
    const ctxMonth = document.getElementById("c-month-chart3").getContext("2d");
    const ctxComparison = document.getElementById("c-comparison-chart3").getContext("2d");

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

Reveal.addEventListener("silo", async () => {
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

Reveal.addEventListener("mechanikergebouw", async () => {
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

Reveal.addEventListener("waterkot", async () => {
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