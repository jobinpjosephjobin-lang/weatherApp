// ===============================
// WEATHER CONFIG
// ===============================
const API_KEY = "6379c02462e04c51a05174111260103";
const LOCATION_QUERY = "686510,Kerala,India";

// ===============================
// FETCH WEATHER (3 days)
// ===============================
fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION_QUERY}&days=3&aqi=no&alerts=no`)
    .then(response => response.json())
    .then(data => {

        // Fixed English location text
        const locationText = "Chathanthara, Kerala, PIN 686510";

        // Current weather
        const temperature = data.current.temp_c;
        const feelsLike = data.current.feelslike_c;
        const humidity = data.current.humidity;
        const condition = data.current.condition.text;

        const rainChanceToday =
            data.forecast.forecastday[0].day.daily_chance_of_rain;

        // -------------------------------
        // Weather text (Malayalam)
        // -------------------------------
        const weatherText = `
            📍 സ്ഥലം: ${locationText}<br><br>
            🌡️ താപനില: ${temperature}°C<br>
            🤒 അനുഭവപ്പെടുന്നത്: ${feelsLike}°C<br>
            💧 ഈർപ്പം: ${humidity}%<br>
            ☁️ കാലാവസ്ഥ: ${condition}
        `;

        // -------------------------------
        // Rain chance today
        // -------------------------------
        let rainText = `🌧️ മഴയ്ക്ക് സാധ്യത: ${rainChanceToday}%`;

        if (rainChanceToday >= 60) {
            rainText += " (മഴയ്ക്ക് കൂടുതലായ സാധ്യത)";
        } else if (rainChanceToday >= 30) {
            rainText += " (മിതമായ സാധ്യത)";
        } else {
            rainText += " (കുറഞ്ഞ സാധ്യത)";
        }

        // -------------------------------
        // Next 2 days prediction (simple)
        // -------------------------------
        let forecastText = "";

        for (let i = 1; i <= 2; i++) {
            const day = data.forecast.forecastday[i];
            const rainChance = day.day.daily_chance_of_rain;

            let result = "സൂര്യപ്രകാശമുള്ള ദിവസം ☀️";

            if (rainChance >= 40) {
                result = "മഴയുള്ള ദിവസം 🌧️";
            }

            forecastText += `
                📆 ${i === 1 ? "നാളെ" : "മറ്റന്നാൾ"}: ${result}<br>
            `;
        }

        // -------------------------------
        // Update UI
        // -------------------------------
        document.getElementById("weather").innerHTML = weatherText;
        document.getElementById("rain").innerText = rainText;
        document.getElementById("forecast").innerHTML = forecastText;
    })
    .catch(error => {
        document.getElementById("weather").innerText =
            "കാലാവസ്ഥ വിവരങ്ങൾ ലഭ്യമല്ല";
        document.getElementById("rain").innerText =
            "മഴ വിവരങ്ങൾ ലഭ്യമല്ല";
        document.getElementById("forecast").innerText =
            "കാലാവസ്ഥ പ്രവചനം ലഭ്യമല്ല";
        console.error(error);
    });

// ===============================
// AUTO PAGE REFRESH (30 MINUTES)
// ===============================
setInterval(() => {
    location.reload();
}, 30 * 60 * 1000);
