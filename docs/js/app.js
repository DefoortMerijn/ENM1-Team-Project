const get = (url) => fetch(url).then((r)=> r.json());
var topverbruikersChart = null;
var duiktankChart = null;

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
    responseData.forEach((element) => {
                    var el = element.value;
                    arrayPower.push(el)
            }
    );

    return arrayPower
}

function createLabelsFromResponse (responseData){
    const monthNames = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    var array = [];
    responseData.forEach((element) => {
            var el = new Date(element.time);
            var label = monthNames[el.getMonth()]
            array.push(label)
        }
    );

    return array
}

Reveal.on( 'ready', () => {
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

    const ctxDuiktank = document.getElementById('js-duiktankChart');
    duiktankChart = new Chart(ctxDuiktank, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Verbruik in Kilowatt',
                data: [5,2,3,5,6,4],
                backgroundColor: [
                    'rgb(148, 202, 227)',
                    'rgb(244, 174, 26)',
                    'rgb(243, 107, 40)',
                    'rgb(239, 73, 36)',
                    'rgb(238, 47, 68)',
                    'rgb(236, 70, 139)',
                    'rgb(184, 86, 161)',
                    'rgb(145, 91, 166)',
                    'rgb(81, 139, 201)',
                    'rgb(39, 190, 182)',
                    'rgb(103, 191, 107)',
                    'rgb(161, 205, 73)',
                ],
                borderColor: [
                    'rgb(148, 202, 227)',
                    'rgb(244, 174, 26)',
                    'rgb(243, 107, 40)',
                    'rgb(239, 73, 36)',
                    'rgb(238, 47, 68)',
                    'rgb(236, 70, 139)',
                    'rgb(184, 86, 161)',
                    'rgb(145, 91, 166)',
                    'rgb(81, 139, 201)',
                    'rgb(39, 190, 182)',
                    'rgb(103, 191, 107)',
                    'rgb(161, 205, 73)',
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
});

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
    const urlDuiktank = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Duiktank/monthly?field=TotaalNet&fn=mean";
    const urlHoofdgebouwFuifzaal = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Fuifzaal/monthly?field=Aansluiting_Fuifzaal_EB1_I&fn=mean";
    const urlHoofdgebouwMachinezaal = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Machinezaal/monthly?field=Aansluiting_Machinezaal_EB3_A&fn=mean";
    const urlHoofdgebouwKantoor1 = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Kantoren_Verdiep_4/monthly?field=Aansluiting_kantoren_Verdiep_4_EB3_B&fn=mean";
    const urlHoofdgebouwKantoor2 = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Kantoren_Verdiep_5/monthly?field=Aansluiting_kantoren_Verdiep_5_EB3_D&fn=mean";
    const urlSilo = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Silo/monthly?field=Aansluiting_Silo&fn=mean";
    const urlMechanieker = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Mechaniekersgebouw/monthly?field=Aansluiting_Mechaniekersgebouw_EB2&fn=mean";
    const urlOenanthe = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Oenanthe/monthly?field=Aansluiting_Oenanthe_EB3_C&fn=mean";

    responseDuiktank = await get(urlDuiktank);
    responseFuifzaal = await get(urlHoofdgebouwFuifzaal)
    responseMachinezaal = await get(urlHoofdgebouwMachinezaal)
    responseKantoor1 = await get(urlHoofdgebouwKantoor1)
    responseKantoor2 = await get(urlHoofdgebouwKantoor2)
    responseMechanieker = await get(urlMechanieker);
    responseOenanthe = await get(urlOenanthe);
    responseSilo = await get(urlSilo);

    var arr = createArrayFromResponse(responseFuifzaal.values.Aansluiting_Fuifzaal_EB1_I);
    var arr2 = createArrayFromResponse(responseMachinezaal.values.Aansluiting_Machinezaal_EB3_A);
    var arr3 = createArrayFromResponse(responseKantoor1.values.Aansluiting_kantoren_Verdiep_4_EB3_B); 
    var arr4 = createArrayFromResponse(responseKantoor2.values.Aansluiting_kantoren_Verdiep_5_EB3_D); 

    var hoofdgebouwArray = arr.map((a, i) => a + arr2[i] + arr3[i] + arr4[i]);

    var verbruiker1 = average(createArrayFromResponse(responseDuiktank.values.TotaalNet));
    var verbruiker2 = average(hoofdgebouwArray);
    var verbruiker3 = average(createArrayFromResponse(responseMechanieker.values.Aansluiting_Mechaniekersgebouw_EB2));
    var verbruiker4 = average(createArrayFromResponse(responseOenanthe.values.Aansluiting_Oenanthe_EB3_C));
    var verbruiker5 = average(createArrayFromResponse(responseSilo.values.Aansluiting_Silo));
    var vlaamseWoning = 3500;

    var data = [verbruiker1, verbruiker2, verbruiker3, verbruiker4, verbruiker5, vlaamseWoning]
    var labels = ["Duiktank", "Hoofdgebouw", "Mechaniekersgebouw", "Oenanthé", "Silo", "Vlaams woning"]

    topverbruikersChart.data.labels = labels;
    topverbruikersChart.data.datasets[0].data = data;
    topverbruikersChart.update()

    var Hoogsteverbruiker = Math.max(...data);

    document.getElementById("c-topverbruiker").innerHTML = Math.round(Hoogsteverbruiker / 3500)
});

Reveal.addEventListener("HernieuwbareEnergie", async () => {
    const urlZonnenergie = "";
    const urlWindenergie = "";
    const urlSmartGrid = "";
    const urlPumpedStorage = "";

    const urlBatteries = "";
    const urlTotaleenergie = "";

    const Zonnenergie = document.getElementById("js-renewableEnergiesCounterZon");
    const Windenergie = document.getElementById("js-renewableEnergiesCounterWind");
    const SmartGrid = document.getElementById("js-renewableEnergiesCounterGrid");
    const PumpedStorage = document.getElementById("js-renewableEnergiesCounterPump");

    const Batteries = document.getElementById("js-renewableEnergiesCounterBattery");
    const Totaleenergie = document.getElementById("js-renewableEnergiesCounterTotal");

    setInterval(() => {
        Zonnenergie.innerHTML = Math.floor(Math.random() * (420 - 0 + 1)) + 0;
        Windenergie.innerHTML = Math.floor(Math.random() * (95 - 0 + 1)) + 0;
        SmartGrid.innerHTML = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
        PumpedStorage.innerHTML = Math.random().toFixed(2);

        Batteries.innerHTML = Math.floor(Math.random() * (100 - 0 + 1)) + 0;;
        Totaleenergie.innerHTML = Math.floor(Math.random() * (1000 - 400 + 1)) + 400;;
    }, 5000);
});

Reveal.addEventListener("water-tower", async () => {
    const solar_panels_amount = document.getElementById("js-solar-panels__amount");
    const water_tower_watts = document.getElementById("js-water-tower__watts");
    let watts = 0;

    setInterval(() => {
        watts = Math.floor(Math.random() * (100 - 0 +1)) + 0;
        water_tower_watts.textContent = watts;
        solar_panels_amount.textContent = watts / 10;
    }, 5000);
});

Reveal.addEventListener("duiktank", async ()=>{
    const urlCurrent = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Duiktank/daily?field=TotaalNet&fn=mean";
    const urlMonth = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Duiktank/monthly?field=TotaalNet&fn=mean";
    const urlYear = "https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Duiktank/monthly?field=TotaalNet&fn=mean";

    responseCurrent = await get(urlCurrent);
    repsonseMonth = await get(urlMonth);
    responseYear = await get(urlYear);

    const current = document.getElementById("js-duiktankCurrent");
    const month = document.getElementById("js-duiktankMonth");

    var tempData = createArrayFromResponse(responseYear.values.TotaalNet);
    var labels = createLabelsFromResponse(responseYear.values.TotaalNet);
    var data = []

    tempData.forEach((element) => {
        var el = element / 1000;
        data.push(el)
        }
    )


    current.innerHTML = Math.round(responseCurrent.values.TotaalNet[6].value / 1000);
    month.innerHTML = Math.round(responseCurrent.values.TotaalNet[6].value / 1000) * 24 * 30;

    duiktankChart.data.labels = labels;
    duiktankChart.data.datasets[0].data = data;
    duiktankChart.update()
});

Reveal.addEventListener("Quiz1", () => {
    var answer = document.getElementById("js-quiz1Answer").parentElement;

    if(answer.classList.contains("c-quiz-answer"))
    {
        answer.classList.remove("c-quiz-answer")
    }

    setTimeout(()=>{
        answer.classList.add("c-quiz-answer");
    },15000)
});

Reveal.addEventListener("Quiz2", () => {
    var answer = document.getElementById("js-quiz2Answer").parentElement;

    if(answer.classList.contains("c-quiz-answer"))
    {
        answer.classList.remove("c-quiz-answer")
    }

    setTimeout(()=>{
        answer.classList.add("c-quiz-answer");
    },15000)
});

Reveal.addEventListener("Quiz3", () => {
    var answer = document.getElementById("js-quiz3Answer").parentElement;

    if(answer.classList.contains("c-quiz-answer"))
    {
        answer.classList.remove("c-quiz-answer")
    }

    setTimeout(()=>{
        answer.classList.add("c-quiz-answer");
    },15000)
});

Reveal.addEventListener("Quiz4", () => {
    var answer1 = document.getElementById("js-quiz4Answer").parentElement;
    var answer2 = document.getElementById("js-quiz4Answer2").parentElement;

    if(answer1.classList.contains("c-quiz-answer"))
    {
        answer1.classList.remove("c-quiz-answer")
        answer2.classList.remove("c-quiz-answer")
    }

    setTimeout(()=>{
        answer1.classList.add("c-quiz-answer");
        answer2.classList.add("c-quiz-answer");
    },15000)
});