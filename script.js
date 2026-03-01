// ===============================
// WEATHER CONFIG
// ===============================
const API_KEY = "6379c02462e04c51a05174111260103";
const LOCATION_QUERY = "686510,Kerala,India";

// ===============================
// FETCH WEATHER (3 DAYS)
// ===============================
fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION_QUERY}&days=3&aqi=no&alerts=no`)
    .then(response => response.json())
    .then(data => {

        const locationText = "Chathanthara, Kerala, PIN 686510";

        // ---------- ഇന്നത്തെ കാലാവസ്ഥ ----------
        const temperature = data.current.temp_c;
        const feelsLike = data.current.feelslike_c;
        const humidity = data.current.humidity;
        const condition = data.current.condition.text;

        const rainChanceToday =
            data.forecast.forecastday[0].day.daily_chance_of_rain;

        document.getElementById("weather").innerHTML = `
            📍 സ്ഥലം: ${locationText}<br><br>
            🌡️ താപനില: ${temperature}°C<br>
            🤒 അനുഭവപ്പെടുന്നത്: ${feelsLike}°C<br>
            💧 ഈർപ്പം: ${humidity}%<br>
            ☁️ കാലാവസ്ഥ: ${condition}
        `;

        // ---------- ഇന്നത്തെ മഴ സാധ്യത ----------
        let rainText = `🌧️ മഴയ്ക്ക് സാധ്യത: ${rainChanceToday}%`;

        if (rainChanceToday >= 60) {
            rainText += " (മഴയ്ക്ക് കൂടുതലായ സാധ്യത)";
        } else if (rainChanceToday >= 30) {
            rainText += " (മിതമായ സാധ്യത)";
        } else {
            rainText += " (കുറഞ്ഞ സാധ്യത)";
        }

        document.getElementById("rain").innerText = rainText;

        // ---------- അടുത്ത 2 ദിവസത്തെ ലളിത പ്രവചനം ----------
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

        document.getElementById("forecast").innerHTML = forecastText;
    })
    .catch(error => {
        document.getElementById("weather").innerText =
            "കാലാവസ്ഥ വിവരങ്ങൾ ലഭ്യമല്ല";
        document.getElementById("rain").innerText =
            "മഴ വിവരങ്ങൾ ലഭ്യമല്ല";
        document.getElementById("forecast").innerText =
            "പ്രവചന വിവരം ലഭ്യമല്ല";
        console.error(error);
    });

// ===============================
// AUTO REFRESH – 30 MINUTES
// ===============================
setInterval(() => {
    location.reload();
}, 30 * 60 * 1000);
