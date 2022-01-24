function createChart( ctx, type, data ){
    return new Chart( ctx ,  {
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
}