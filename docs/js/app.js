const get = (url) => fetch(url).then((r)=> r.json());
var topverbruikersChart = null;

function average(array)
{
  var sum = 0;
  for (var i = 0; i < array.length; i++){
    if( array[i] === null ){
        sum += 0;
    }
    else{
        sum += array[i];
    }
  } 
  return parseFloat(sum / array.length);
}

function createArrayFromResponse (responseData){
    var arrayPower = [];
    responseData.values.TotaalNet.forEach((element) => {
                    var el = element.value;
                    arrayPower.push(el)
            }
    );

    return arrayPower
}

Reveal.on( 'ready', event => {
    const ctx = document.getElementById('js-topverbruikersChart');
    topverbruikersChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Verbruik in Kilowatt',
                data: [5,2,3,5,6,4],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
           plugins:{
                legend: {
                    display: true,
                    labels: {
                        color: "rgba(255,255,255)"
                    }
                }
            },
            scales: {
                y: {
                    grid:{
                        color: "rgba(255,255,255, 0.4)"
                    },
                    beginAtZero: true,
                    ticks:{
                        color: "rgba(255,255,255)",
                        callback: function(value, index, ticks) {
                            return value + "Kw";
                        }
                    }
                },
                x: {
                    ticks:{
                        color: "rgba(255,255,255)",
                    }
                },
            }
        }
        });
  } );

const map_animation = () => {
        var duiktankLegend = document.getElementById("js-duiktankLegend");
        var duiktank = document.getElementById("divingtank");

        var hoofdgebouwLegend = document.getElementById("js-hoofdgebouwLegend");
        var hoofdgebouw = document.getElementById("main_building");

        var watertorenLegend = document.getElementById("js-watertorenLegend");
        var watertoren = document.getElementById("water_tower");

        var batterijenLegend = document.getElementById("js-batterijenLegend");
        var batterijen = document.getElementById("batteries");

        var zonneparkingLegend = document.getElementById("js-zonneparkingLegend");
        var zonneparking = document.getElementById("parking");

        var windturbineLegend = document.getElementById("js-windturbineLegend");
        var windturbine = document.getElementById("wind_turbine");

        duiktankLegend.classList.add("c-legend__list__item__rect--active");
        duiktank.classList.add("c-map__section--active");

        setTimeout(()=>{
            duiktankLegend.classList.remove("c-legend__list__item__rect--active");
            duiktank.classList.remove("c-map__section--active");

            hoofdgebouwLegend.classList.add("c-legend__list__item__rect--active");
            hoofdgebouw.classList.add("c-map__section--active");
        }, 5000);
        setTimeout(()=>{
            hoofdgebouwLegend.classList.remove("c-legend__list__item__rect--active");
            hoofdgebouw.classList.remove("c-map__section--active");

            watertorenLegend.classList.add("c-legend__list__item__rect--active");
            watertoren.classList.add("c-map__section--active");
        }, 10000);
        setTimeout(()=>{
            watertorenLegend.classList.remove("c-legend__list__item__rect--active");
            watertoren.classList.remove("c-map__section--active");

            batterijenLegend.classList.add("c-legend__list__item__rect--active");
            batterijen.classList.add("c-map__section--active");
        }, 15000);
        setTimeout(()=>{
            batterijenLegend.classList.remove("c-legend__list__item__rect--active");
            batterijen.classList.remove("c-map__section--active");

            zonneparkingLegend.classList.add("c-legend__list__item__rect--active");
            zonneparking.classList.add("c-map__section--active");
        }, 20000);
        setTimeout(()=>{
            zonneparkingLegend.classList.remove("c-legend__list__item__rect--active");
            zonneparking.classList.remove("c-map__section--active");

            windturbineLegend.classList.add("c-legend__list__item__rect--active");
            windturbine.classList.add("c-map__section--active");
        }, 25000);
        setTimeout(()=>{ 
            windturbineLegend.classList.remove("c-legend__list__item__rect--active");
            windturbine.classList.remove("c-map__section--active");
        }, 30000);
    };

Reveal.addEventListener("welkom", () => {
    map_animation();
});

Reveal.addEventListener("verbruikers", async () => {
    const urlDuiktank = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Duiktank/year?field=TotaalNet&fn=mean";
    const urlHoofdgebouw = "";
    const urlSilo = "";
    const urlDing = "";
    const urlDink= "";
    const urlnogiets = "";

    responseDuiktank = await get(urlDuiktank);

    var verbruiker1 = average(createArrayFromResponse(responseDuiktank));
    var verbruiker2 = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    var verbruiker3 = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    var verbruiker4 = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    var verbruiker5 = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    var vlaamseWoning = 3500;

    var data = [verbruiker1, verbruiker2, verbruiker3, verbruiker4, verbruiker5, vlaamseWoning]
    var labels = ["Duiktank", "Hoofdgebouw", "Mechaniekersgebouw", "Oenanthé", "Silo", "Vlaams woning"]

    topverbruikersChart.data.labels = labels;
    topverbruikersChart.data.datasets[0].data = data;
    topverbruikersChart.update()

    var Hoogsteverbruiker = Math.max(...data);

    document.getElementById("c-topverbruiker").innerHTML = Math.round(Hoogsteverbruiker / 3500)
});


// function createChart( ctx, type, data ){
//     const mychart = new Chart( ctx ,  {
//         type: type,
//         data: data,
//         options: {
//             plugins:{
//                 legend: {
//                     display: true,
//                     labels: {
//                         color: 'white'
//                     }
//                 },
//                 title: {
//                     display: true,
//                     text: 'Verbruik in Watt',
//                     color: 'white'
//                 },
//             },
//             scales:
//             {
//                 y: {
//                     grid:{
//                         color:"white"
//                     },
//                     ticks:{
//                         color: "white",
//                         callback: function(value, index, ticks) {
//                             return value + "w";
//                         }
//                     }
//                 },
//                 x: {
//                     grid:{
//                         color:"white",
//                     },
//                     ticks:{
//                         color: "white"
//                     }
//                 },
//             }    
//         }
//     });
    
//     return mychart;
// }

// function getData(response){
//     let arrayData = [];

//     response.forEach(element => {
//         arrayData.push(element.value);
//     });

//     return arrayData;
// }

// Reveal.addEventListener("duiktank", async () => {
//     const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
//     const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
//     const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

//     const ctxToday = document.getElementById("c-today-chart").getContext("2d");
//     const ctxMonth = document.getElementById("c-month-chart").getContext("2d");
//     const ctxComparison = document.getElementById("c-comparison-chart").getContext("2d");

//     const responseToday = await get(urlDay);
//     const responseMonth = await get(urlMonth);
//     const responseYear = await get(urlYear);

//     let todayData = getData(responseToday.data[0].values);
//     let todayLabels = [];
    
//     responseToday.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             todayLabels.push(hour)
//     });

//     let monthData = getData(responseMonth.data[0].values);
//     let monthLabels = [];
    
//     responseMonth.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var day = date.getDate()	
//             monthLabels.push(day)
//     });

//     let yearData = getData(responseYear.data[0].values);
//     let yearLabels = [];
    
//     responseYear.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             yearLabels.push(hour)
//     });

//     const dataToday = {
//                     labels: todayLabels,
//                     datasets: [
//                         {
//                         label: "Duiktank",
//                         data: todayData,
//                         backgroundColor: [
//                                     "rgba(201, 47, 77)",
//                                 ],
//                         borderColor: [
//                                     "rgba(255, 99, 132, 1)",
//                                 ],
//                         }
//                     ]};

//     const dataMonth = {
//                         labels: monthLabels,
//                         datasets: [
//                             {
//                             label: "Duiktank",
//                             data: monthData,
//                             backgroundColor: [
//                                         "rgba(201, 47, 77)",
//                                     ],
//                             borderColor: [
//                                         "rgba(201, 47, 77)",
//                                     ],
//                             }
//                         ]};

//     const dataYear = {
//                         labels: ["Vlaamse woning", "Duiktank"],
//                         datasets: [
//                             {
//                                 label: "Verbruik in Kilowatt per jaar",
//                                 data: [3300, 78000],
//                                 backgroundColor: [
//                                             "rgba(201, 47, 77)",
//                                         ],
//                                 borderColor: [
//                                             "rgba(201, 47, 77)",
//                                         ],
//                             }
//                         ]
//                     };

//     createChart(ctxToday, "bar" , dataToday);
//     createChart(ctxMonth, "line" , dataMonth);
//     createChart(ctxComparison, "bar" , dataYear);
// });

// Reveal.addEventListener("demo", async () => {
//     const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
//     const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
//     const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

//     const ctxToday = document.getElementById("c-today-chart2").getContext("2d");
//     const ctxMonth = document.getElementById("c-month-chart2").getContext("2d");
//     const ctxComparison = document.getElementById("c-comparison-chart2").getContext("2d");

//     const responseToday = await get(urlDay);
//     const responseMonth = await get(urlMonth);
//     const responseYear = await get(urlYear);

//     let todayData = getData(responseToday.data[0].values);
//     let todayLabels = [];
    
//     responseToday.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             todayLabels.push(hour)
//     });

//     let monthData = getData(responseMonth.data[0].values);
//     let monthLabels = [];
    
//     responseMonth.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var day = date.getDate()	
//             monthLabels.push(day)
//     });

//     let yearData = getData(responseYear.data[0].values);
//     let yearLabels = [];
    
//     responseYear.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             yearLabels.push(hour)
//     });

//     const dataToday = {
//                     labels: todayLabels,
//                     datasets: [
//                         {
//                         label: "Verbruik in Watt",
//                         data: todayData,
//                         backgroundColor: [
//                                     "rgba(201, 47, 77)",
//                                 ],
//                         borderColor: [
//                                     "rgba(255, 99, 132, 1)",
//                                 ],
//                         }
//                     ]};

//     const dataMonth = {
//                         labels: monthLabels,
//                         datasets: [
//                             {
//                             label: "Verbruik in Watt",
//                             data: monthData,
//                             backgroundColor: [
//                                         "rgba(201, 47, 77)",
//                                     ],
//                             borderColor: [
//                                         "rgba(255, 99, 132, 1)",
//                                     ],
//                             }
//                         ]};

//     const dataYear = {
//                         labels: ["Vlaamse woning", "Duiktank"],
//                         datasets: [
//                             {
//                                 label: "Verbruik in Kilowatt per jaar",
//                                 data: [3300, 78000],
//                                 backgroundColor: [
//                                             "rgba(201, 47, 77)",
//                                         ],
//                                 borderColor: [
//                                             "rgba(255, 99, 132, 1)",
//                                         ],
//                             }
//                         ]
//                     };

//     createChart(ctxToday, "bar" , dataToday);
//     createChart(ctxMonth, "line" , dataMonth);
//     createChart(ctxComparison, "bar" , dataYear);
// });

// Reveal.addEventListener("hoofdgebouw", async () => {
//     const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q1_L2";
//     const urlDay2 = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q7_L2";
//     const urlDay3 = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q3_L3";

//     const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q1_L2";
//     const urlMonth2 = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q7_L2";
//     const urlMonth3 = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_55Q3_L3";

//     const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

//     const ctxToday = document.getElementById("c-today-chart3").getContext("2d");
//     const ctxMonth = document.getElementById("c-month-chart3").getContext("2d");
//     const ctxComparison = document.getElementById("c-comparison-chart3").getContext("2d");

//     const responseToday = await get(urlDay);
//     const responseToday2 = await get(urlDay2);
//     const responseToday3 = await get(urlDay3);

//     const responseMonth = await get(urlMonth);
//     const responseMonth2 = await get(urlMonth2);
//     const responseMonth3 = await get(urlMonth3);

//     const responseYear = await get(urlYear);

//     let todayData = getData(responseToday.data[0].values);
//     let todayLabels = [];
    
//     responseToday.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             todayLabels.push(hour)
//     });

//     let todayData2 = getData(responseToday2.data[0].values);
//     let todayData3 = getData(responseToday3.data[0].values);

//     let monthData = getData(responseMonth.data[0].values);
//     let monthLabels = [];
    
//     responseMonth.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var day = date.getDate()	
//             monthLabels.push(day)
//     });

//     let monthData2 = getData(responseMonth2.data[0].values);
//     let monthData3 = getData(responseMonth3.data[0].values);

//     let yearData = getData(responseYear.data[0].values);
//     let yearLabels = [];
    
//     responseYear.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             yearLabels.push(hour)
//     });

//     const dataToday = {
//                     labels: todayLabels,
//                     datasets: [
//                         {
//                             label: "kantoorgebouw",
//                             data: todayData,
//                             backgroundColor: [
//                                         "rgba(201, 47, 77)",
//                                     ],
//                             borderColor: [
//                                         "rgba(201, 47, 77)",
//                                     ],
//                         },
//                         {
//                             label: "Feestzaal",
//                             data: todayData2,
//                             backgroundColor: [
//                                 "rgb(49, 99, 255)",
//                             ],
//                             borderColor: [
//                                 "rgb(49, 99, 255)",
//                             ],
//                         },
//                         {
//                             label: "Machinezaal",
//                             data: todayData3,
//                             backgroundColor: [
//                                 "rgba(101, 61, 235)",
//                             ],
//                             borderColor: [
//                                 "rgba(101, 61, 235)",
//                             ],
//                         }
//                     ]};

//     const dataMonth = {
//                         labels: monthLabels,
//                         datasets: [
//                             {
//                             label: "kantoorgebouw",
//                             data: monthData,
//                             backgroundColor: [
//                                         "rgba(201, 47, 77)",
//                                     ],
//                             borderColor: [
//                                         "rgba(201, 47, 77)",
//                                     ],
//                             },
//                             {
//                                 label: "Feestzaal",
//                                 data: monthData2,
//                                 backgroundColor: [
//                                             "rgb(49, 99, 255)",
//                                         ],
//                                 borderColor: [
//                                             "rgb(49, 99, 255)",
//                                         ],
//                             },
//                             {
//                                 label: "Machinezaal",
//                                 data: monthData3,
//                                 backgroundColor: [
//                                             "rgba(101, 61, 235)",
//                                         ],
//                                 borderColor: [
//                                             "rgba(101, 61, 235)",
//                                         ],
//                             }
//                         ]};

//     const dataYear = {
//                         labels: ["Vlaamse woning", "Hoofdgebouw"],
//                         datasets: [
//                             {
//                                 label: "Verbruik in Kilowatt per jaar",
//                                 data: [3300, 78000],
//                                 backgroundColor: [
//                                             "rgba(201, 47, 77)",
//                                         ],
//                                 borderColor: [
//                                             "rgba(255, 99, 132, 1)",
//                                         ],
//                             }
//                         ]
//                     };

//     createChart(ctxToday, "line" , dataToday);
//     createChart(ctxMonth, "line" , dataMonth);
//     createChart(ctxComparison, "bar" , dataYear);
// });

// Reveal.addEventListener("silo", async () => {
//     const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
//     const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
//     const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

//     const ctxToday = document.getElementById("c-today-chart4").getContext("2d");
//     const ctxMonth = document.getElementById("c-month-chart4").getContext("2d");
//     const ctxComparison = document.getElementById("c-comparison-chart4").getContext("2d");

//     const responseToday = await get(urlDay);
//     const responseMonth = await get(urlMonth);
//     const responseYear = await get(urlYear);

//     let todayData = getData(responseToday.data[0].values);
//     let todayLabels = [];
    
//     responseToday.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             todayLabels.push(hour)
//     });

//     let monthData = getData(responseMonth.data[0].values);
//     let monthLabels = [];
    
//     responseMonth.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var day = date.getDate()	
//             monthLabels.push(day)
//     });

//     let yearData = getData(responseYear.data[0].values);
//     let yearLabels = [];
    
//     responseYear.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             yearLabels.push(hour)
//     });

//     const dataToday = {
//                     labels: todayLabels,
//                     datasets: [
//                         {
//                         label: "Verbruik in Watt",
//                         data: todayData,
//                         backgroundColor: [
//                                     "rgba(201, 47, 77)",
//                                 ],
//                         borderColor: [
//                                     "rgba(255, 99, 132, 1)",
//                                 ],
//                         }
//                     ]};

//     const dataMonth = {
//                         labels: monthLabels,
//                         datasets: [
//                             {
//                             label: "Verbruik in Watt",
//                             data: monthData,
//                             backgroundColor: [
//                                         "rgba(201, 47, 77)",
//                                     ],
//                             borderColor: [
//                                         "rgba(255, 99, 132, 1)",
//                                     ],
//                             }
//                         ]};

//     const dataYear = {
//                         labels: ["Vlaamse woning", "Silo"],
//                         datasets: [
//                             {
//                                 label: "Verbruik in Kilowatt per jaar",
//                                 data: [3300, 78000],
//                                 backgroundColor: [
//                                             "rgba(201, 47, 77)",
//                                         ],
//                                 borderColor: [
//                                             "rgba(255, 99, 132, 1)",
//                                         ],
//                             }
//                         ]
//                     };

//     createChart(ctxToday, "bar" , dataToday);
//     createChart(ctxMonth, "line" , dataMonth);
//     createChart(ctxComparison, "bar" , dataYear);
// });

// Reveal.addEventListener("mechanikergebouw", async () => {
//     const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
//     const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
//     const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

//     const ctxToday = document.getElementById("c-today-chart5").getContext("2d");
//     const ctxMonth = document.getElementById("c-month-chart5").getContext("2d");
//     const ctxComparison = document.getElementById("c-comparison-chart5").getContext("2d");

//     const responseToday = await get(urlDay);
//     const responseMonth = await get(urlMonth);
//     const responseYear = await get(urlYear);

//     let todayData = getData(responseToday.data[0].values);
//     let todayLabels = [];
    
//     responseToday.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             todayLabels.push(hour)
//     });

//     let monthData = getData(responseMonth.data[0].values);
//     let monthLabels = [];
    
//     responseMonth.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var day = date.getDate()	
//             monthLabels.push(day)
//     });

//     let yearData = getData(responseYear.data[0].values);
//     let yearLabels = [];
    
//     responseYear.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             yearLabels.push(hour)
//     });

//     const dataToday = {
//                     labels: todayLabels,
//                     datasets: [
//                         {
//                         label: "Verbruik in Watt",
//                         data: todayData,
//                         backgroundColor: [
//                                     "rgba(201, 47, 77)",
//                                 ],
//                         borderColor: [
//                                     "rgba(255, 99, 132, 1)",
//                                 ],
//                         }
//                     ]};

//     const dataMonth = {
//                         labels: monthLabels,
//                         datasets: [
//                             {
//                             label: "Verbruik in Watt",
//                             data: monthData,
//                             backgroundColor: [
//                                         "rgba(201, 47, 77)",
//                                     ],
//                             borderColor: [
//                                         "rgba(255, 99, 132, 1)",
//                                     ],
//                             }
//                         ]};

//     const dataYear = {
//                         labels: ["Vlaamse woning", "Oenanthe"],
//                         datasets: [
//                             {
//                                 label: "Verbruik in Kilowatt per jaar",
//                                 data: [3300, 78000],
//                                 backgroundColor: [
//                                             "rgba(201, 47, 77)",
//                                         ],
//                                 borderColor: [
//                                             "rgba(255, 99, 132, 1)",
//                                         ],
//                             }
//                         ]
//                     };

//     createChart(ctxToday, "bar" , dataToday);
//     createChart(ctxMonth, "line" , dataMonth);
//     createChart(ctxComparison, "bar" , dataYear);
// });

// Reveal.addEventListener("waterkot", async () => {
//     const urlDay = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
//     const urlMonth = "https://enm1.azurewebsites.net/api/power/duiktank/usage/month/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";
//     const urlYear = "https://enm1.azurewebsites.net/api/power/duiktank/usage/day/Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal";

//     const ctxToday = document.getElementById("c-today-chart6").getContext("2d");
//     const ctxMonth = document.getElementById("c-month-chart6").getContext("2d");
//     const ctxComparison = document.getElementById("c-comparison-chart6").getContext("2d");

//     const responseToday = await get(urlDay);
//     const responseMonth = await get(urlMonth);
//     const responseYear = await get(urlYear);

//     let todayData = getData(responseToday.data[0].values);
//     let todayLabels = [];
    
//     responseToday.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             todayLabels.push(hour)
//     });

//     let monthData = getData(responseMonth.data[0].values);
//     let monthLabels = [];
    
//     responseMonth.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var day = date.getDate()	
//             monthLabels.push(day)
//     });

//     let yearData = getData(responseYear.data[0].values);
//     let yearLabels = [];
    
//     responseYear.data[0].values.forEach((element) => {
//             var date = new Date(element.time)
//             var hour = date.getHours()	
//             yearLabels.push(hour)
//     });

//     const dataToday = {
//                     labels: todayLabels,
//                     datasets: [
//                         {
//                         label: "Verbruik in Watt",
//                         data: todayData,
//                         backgroundColor: [
//                                     "rgba(201, 47, 77)",
//                                 ],
//                         borderColor: [
//                                     "rgba(255, 99, 132, 1)",
//                                 ],
//                         }
//                     ]};

//     const dataMonth = {
//                         labels: monthLabels,
//                         datasets: [
//                             {
//                             label: "Verbruik in Watt",
//                             data: monthData,
//                             backgroundColor: [
//                                         "rgba(201, 47, 77)",
//                                     ],
//                             borderColor: [
//                                         "rgba(255, 99, 132, 1)",
//                                     ],
//                             }
//                         ]};

//     const dataYear = {
//                         labels: ["Vlaamse woning", "Waterkot"],
//                         datasets: [
//                             {
//                                 label: "Verbruik in Kilowatt per jaar",
//                                 data: [3300, 78000],
//                                 backgroundColor: [
//                                             "rgba(201, 47, 77)",
//                                         ],
//                                 borderColor: [
//                                             "rgba(255, 99, 132, 1)",
//                                         ],
//                             }
//                         ]
//                     };

//     createChart(ctxToday, "bar" , dataToday);
//     createChart(ctxMonth, "line" , dataMonth);
//     createChart(ctxComparison, "bar" , dataYear);
// });