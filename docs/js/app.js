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
    }, 1000);
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

Reveal.addEventListener("Quiz1", () => {
    setTimeout(()=>{
        var answer = document.getElementById("js-quiz1Answer").parentElement;

        answer.classList.add("c-quiz-answer");
    },15000)
});

Reveal.addEventListener("Quiz2", () => {
    setTimeout(()=>{
        var answer = document.getElementById("js-quiz2Answer").parentElement;

        answer.classList.add("c-quiz-answer");
    },15000)
});