const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select")
getButton = document.querySelector("form button")
let apiKey = "ed2e69aca797d46a12694a73"

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "AMD" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e=>{
         loadFlag(e.target)
    })
}


function loadFlag(element) {
    for (code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

const exchangeIcon = document.querySelector(".drop-list .icon")
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value
    fromCurrency.value =  toCurrency.value
    toCurrency.value = tempCode
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
    getExchangeRate()
})


window.addEventListener("load", ()=>{
   getExchangeRate()
})

getButton.addEventListener("click", e=>{
    e.preventDefault()
   getExchangeRate()
})

function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate ..."
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    fetch(url)
    .then(res => res.json())
    .then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value]
         let totalExchangeRate = (amountVal * exchangeRate).toFixed(3)
         console.log(totalExchangeRate);
         exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
    })
}