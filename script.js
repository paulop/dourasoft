$(document).ready(function () {
    const APIURL = "https://api.openweathermap.org/data/2.5/";
    const APIKEY = "a670b69c5de9a9ecb93b521c7c536eaa";
    const GEOURL = "http://api.openweathermap.org/geo/1.0/";

    $("#searchBtn").click(function () {
        const city_name = $("#cityInput").val();
        $.get(`${GEOURL}direct?q=${city_name}&limit=5&appid=${APIKEY}`, function (data) {
            if (data.length > 0) {
                let lat = parseFloat(data[0]["lat"]);
                let lon = parseFloat(data[0]["lon"]);
                getCurrentWeather(lat, lon);
                getFiveDaysForecast(lat, lon);
            }
        }).fail(function () {
            console.log("Error occurred while fetching data");
        });
    });


    // get para Clima Atual
    function getCurrentWeather(lat, lon) {
        $.get(`${APIURL}weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${APIKEY}`, function (data) {
            const currentWeather = `
                <p>Temperatura: ${data.main.temp.toFixed(1)} °C</p>
                <p>Clima: ${data.weather[0].description}</p>
                <p>Umidade: ${data.main.humidity} %</p>
                <p>Vento: ${data.wind.speed} m/s</p>
             `; 
            $("#currentWeatherDetails").html(currentWeather);
            $("#currentWeather").show();
        }).fail(function () {
            console.log("Error!"); //depuração apenas
        });
    }


    // get para Clima dos próximos 5 dias 
    function getFiveDaysForecast(lat, lon) {
        $.get(`${APIURL}forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${APIKEY}`, function (data) {
            let forecastHTML = '';
            let dailyForecast = {};

            data.list.forEach(item => {
                let timestamp = item.dt; 
                let date = new Date(timestamp * 1000); // converte para Milisegundos
                let day = date.toISOString().split('T')[0]; // ANO-MES-DIA

                if (!dailyForecast[day]) {
                    dailyForecast[day] = { // cria objeto day se não existir
                        tempSum: 0,
                        description: item.weather[0].description,
                        humidity: item.main.humidity,
                        windSpeed: item.wind.speed,
                        count: 0
                    };
                }

                dailyForecast[day].tempSum += item.main.temp;
                dailyForecast[day].count++;
            });

            for (let day in dailyForecast) { // calcula a temperatura média e cria o html para exibição
                let avgTemp = dailyForecast[day].tempSum / dailyForecast[day].count;
                forecastHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${day}</h5>
                                <p class="card-text">Temperatura Média: ${avgTemp.toFixed(1)} °C</p>
                                <p class="card-text">Clima: ${dailyForecast[day].description}</p>
                                <p class="card-text">Umidade: ${dailyForecast[day].humidity} %</p>
                                <p class="card-text">Vento: ${dailyForecast[day].windSpeed} m/s</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            $("#forecastDetails").html(forecastHTML);
            $("#forecast").show(); // exibe o HTML
        }).fail(function () {
            console.log("ERROR"); // depuração apenas
        });
    }
});
