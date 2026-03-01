// ===============================
// WEATHER CONFIG
// ===============================
const API_KEY = "PASTE_YOUR_NEW_VALID_API_KEY_HERE";
const LOCATION_QUERY = "686510,Kerala,India";

// ===============================
// FETCH WEATHER
// ===============================
fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION_QUERY}&days=1&aqi=no&alerts=no`)
    .then(response => response.json())
    .then(data => {

        const locationText = "Chathanthara, Kerala, PIN 686510";

        const temperature = data.current.temp_c;
        const feelsLike = data.current.feelslike_c;
        const humidity = data.current.humidity;
        const condition = data.current.condition.text;

        const rainChance =
            data.forecast.forecastday[0].day.daily_chance_of_rain;

        // Weather text (Malayalam)
        const weatherText = `
            📍 സ്ഥലം: ${locationText}<br><br>
            🌡️ താപനില: ${temperature}°C<br>
            🤒 അനുഭവപ്പെടുന്നത്: ${feelsLike}°C<br>
            💧 ഈർപ്പം: ${humidity}%<br>
            ☁️ കാലാവസ്ഥ: ${condition}
        `;

        // Rain chance (Malayalam)
        let rainText = `🌧️ മഴയ്ക്ക് സാധ്യത: ${rainChance}%`;

        if (rainChance >= 60) {
            rainText += " (മഴയ്ക്ക് കൂടുതലായ സാധ്യത)";
        } else if (rainChance >= 30) {
            rainText += " (മിതമായ സാധ്യത)";
        } else {
            rainText += " (കുറഞ്ഞ സാധ്യത)";
        }

        document.getElementById("weather").innerHTML = weatherText;
        document.getElementById("rain").innerText = rainText;
    })
    .catch(error => {
        document.getElementById("weather").innerText =
            "കാലാവസ്ഥ വിവരങ്ങൾ ലഭ്യമല്ല";
        document.getElementById("rain").innerText =
            "മഴ വിവരങ്ങൾ ലഭ്യമല്ല";
        console.error(error);
    });

// ===============================
// AUTO PAGE REFRESH (30 MINUTES)
// ===============================
setInterval(() => {
    location.reload();
}, 30 * 60 * 1000);
