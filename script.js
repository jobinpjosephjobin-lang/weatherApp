// ===============================
// CONFIG
// ===============================
const API_KEY = "6379c02462e04c51a05174111260103";
const LOCATION = "686510"; // PIN is safest

// ===============================
// FETCH WEATHER (3 DAYS)
// ===============================
async function loadWeather() {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION}&days=3&aqi=no&alerts=no`
        );

        const data = await response.json();

        // If API sends error
        if (data.error) {
            throw new Error(data.error.message);
        }

        // -------- Location --------
        const locationText = "Chathanthara, Kerala, PIN 686510";

        // -------- Today --------
        const current = data.current;
        const today = data.forecast.forecastday[0];

        document.getElementById("weather").innerHTML = `
            📍 സ്ഥലം: ${locationText}<br><br>
            🌡️ താപനില: ${current.temp_c}°C<br>
            🤒 അനുഭവപ്പെടുന്നത്: ${current.feelslike_c}°C<br>
            💧 ഈർപ്പം: ${current.humidity}%<br>
            ☁️ കാലാവസ്ഥ: ${current.condition.text}
        `;

        // -------- Rain chance today --------
        document.getElementById("rain").innerText =
            `🌧️ ഇന്നത്തെ മഴ സാധ്യത: ${today.day.daily_chance_of_rain}%`;

        // -------- Next 2 days (simple) --------
        let forecastHTML = "";

        for (let i = 1; i <= 2; i++) {
            const day = data.forecast.forecastday[i];
            const chance = day.day.daily_chance_of_rain;

            const text =
                chance >= 40
                    ? "മഴയുള്ള ദിവസം 🌧️"
                    : "സൂര്യപ്രകാശമുള്ള ദിവസം ☀️";

            forecastHTML += `➡️ ${i === 1 ? "നാളെ" : "മറ്റന്നാൾ"}: ${text}<br>`;
        }

        document.getElementById("forecast").innerHTML = forecastHTML;

    } catch (err) {
        console.error("Weather fetch failed:", err);

        document.getElementById("weather").innerText =
            "കാലാവസ്ഥ വിവരങ്ങൾ ലഭ്യമല്ല";
        document.getElementById("rain").innerText =
            "മഴ വിവരങ്ങൾ ലഭ്യമല്ല";
        document.getElementById("forecast").innerText =
            "പ്രവചന വിവരം ലഭ്യമല്ല";
    }
}

// Run once on load
loadWeather();

// Auto refresh every 30 minutes
setInterval(loadWeather, 30 * 60 * 1000);
