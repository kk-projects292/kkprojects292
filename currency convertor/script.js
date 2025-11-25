const dropList = document.querySelectorAll(".select-wrapper select");
const fromCurrency = document.querySelector("#from-currency");
const toCurrency = document.querySelector("#to-currency");
const getButton = document.querySelector("#get-rate-btn");
const exchangeRateTxt = document.querySelector("#exchange-rate-txt");
const amountInput = document.querySelector("#amount");
const swapBtn = document.querySelector("#swap-btn");

// Using a static list of common currencies for the dropdowns to ensure flag API compatibility
// In a production app, we might fetch this list, but for reliability with flagsapi.com, we'll use a curated list.
const country_code = {
    "AED": "AE", "AFN": "AF", "XCD": "AG", "ALL": "AL", "AMD": "AM", "ANG": "AN", "AOA": "AO", "AQD": "AQ", "ARS": "AR", "AUD": "AU", "AZN": "AZ", "BAM": "BA", "BBD": "BB", "BDT": "BD", "XOF": "BE", "BGN": "BG", "BHD": "BH", "BIF": "BI", "BMD": "BM", "BND": "BN", "BOB": "BO", "BRL": "BR", "BSD": "BS", "NOK": "BV", "BWP": "BW", "BYR": "BY", "BZD": "BZ", "CAD": "CA", "CDF": "CD", "XAF": "CF", "CHF": "CH", "CLP": "CL", "CNY": "CN", "COP": "CO", "CRC": "CR", "CUP": "CU", "CVE": "CV", "CYP": "CY", "CZK": "CZ", "DJF": "DJ", "DKK": "DK", "DOP": "DO", "DZD": "DZ", "ECS": "EC", "EEK": "EE", "EGP": "EG", "ETB": "ET", "EUR": "FR", "FJD": "FJ", "FKP": "FK", "GBP": "GB", "GEL": "GE", "GGP": "GG", "GHS": "GH", "GIP": "GI", "GMD": "GM", "GNF": "GN", "GTQ": "GT", "GYD": "GY", "HKD": "HK", "HNL": "HN", "HRK": "HR", "HTG": "HT", "HUF": "HU", "IDR": "ID", "ILS": "IL", "INR": "IN", "IQD": "IQ", "IRR": "IR", "ISK": "IS", "JMD": "JM", "JOD": "JO", "JPY": "JP", "KES": "KE", "KGS": "KG", "KHR": "KH", "KMF": "KM", "KPW": "KP", "KRW": "KR", "KWD": "KW", "KYD": "KY", "KZT": "KZ", "LAK": "LA", "LBP": "LB", "LKR": "LK", "LRD": "LR", "LSL": "LS", "LTL": "LT", "LVL": "LV", "LYD": "LY", "MAD": "MA", "MDL": "MD", "MGA": "MG", "MKD": "MK", "MMK": "MM", "MNT": "MN", "MOP": "MO", "MRO": "MR", "MTL": "MT", "MUR": "MU", "MVR": "MV", "MWK": "MW", "MXN": "MX", "MYR": "MY", "MZN": "MZ", "NAD": "NA", "XPF": "NC", "NGN": "NG", "NIO": "NI", "NPR": "NP", "NZD": "NZ", "OMR": "OM", "PAB": "PA", "PEN": "PE", "PGK": "PG", "PHP": "PH", "PKR": "PK", "PLN": "PL", "PYG": "PY", "QAR": "QA", "RON": "RO", "RSD": "RS", "RUB": "RU", "RWF": "RW", "SAR": "SA", "SBD": "SB", "SCR": "SC", "SDG": "SD", "SEK": "SE", "SGD": "SG", "SHP": "SH", "SLL": "SL", "SOS": "SO", "SRD": "SR", "STD": "ST", "SVC": "SV", "SYP": "SY", "SZL": "SZ", "THB": "TH", "TJS": "TJ", "TMT": "TM", "TND": "TN", "TOP": "TO", "TRY": "TR", "TTD": "TT", "TWD": "TW", "TZS": "TZ", "UAH": "UA", "UGX": "UG", "USD": "US", "UYU": "UY", "UZS": "UZ", "VEF": "VE", "VND": "VN", "VUV": "VU", "YER": "YE", "ZAR": "ZA", "ZMK": "ZM", "ZWD": "ZW"
};

for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_code) {
        // Selecting USD by default as FROM and INR as TO
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1) {
            selected = currency_code == "INR" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    for (let code in country_code) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

swapBtn.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector("#amount");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";

    // Using Frankfurter API
    // Note: Frankfurter works well for major currencies. If a currency isn't supported, it might throw 404.
    // We will handle errors gracefully.
    let url = `https://api.frankfurter.app/latest?amount=${amountVal}&from=${fromCurrency.value}&to=${toCurrency.value}`;

    fetch(url).then(response => {
        if (!response.ok) {
            throw new Error("Currency not supported by this free API");
        }
        return response.json();
    }).then(result => {
        let totalExchangeRate = result.rates[toCurrency.value];
        // If amount was passed in query, result.rates contains the total value
        // Actually frankfurter returns rates relative to base 1 if amount not specified, 
        // but since we specified amount, let's check the response structure.
        // Frankfurter: /latest?amount=10&from=USD&to=INR -> rates: { INR: 830.5 }
        // So the value in rates is the calculated total.

        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateTxt.innerText = "Something went wrong or currency not supported";
    });
}
