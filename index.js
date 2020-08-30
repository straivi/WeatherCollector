const axios = require('axios')
const cheerio = require('cheerio')

const urlYandex = 'https://yandex.ru/pogoda/saint-petersburg'
const urlGismeteo = 'https://www.gismeteo.ru/weather-sankt-peterburg-4079/now/'

axios.get(urlYandex)
    .then(response => {
        getYandexWeather(response.data)
    })
    .catch(error => {
        console.log(error)
    })

axios.get(urlGismeteo)
    .then(response => {
        getGismeteoWeather(response.data)
    })
    .catch(error => {
        console.log(error)
    })


let getData = html => {
    let dataHtml = cheerio.load(html)
    let tempWraper = dataHtml('.fact__temp')
    console.log(tempWraper.find('.temp__value').text())
    //console.log(tempWraper('.temp__value').html())
    console.log(cheerio('.temp__value', html).text())
}

let getYandexWeather = html => {
    console.log('Яндекс')

    let data = cheerio.load(html)

    let factTemp = data('.fact__temp').find('.temp__value').text()
    console.log('фактическая: ' + factTemp)

    let fillingTemp = data('.fact__feelings').find('.temp__value').text()
    console.log('ощущается: ' + fillingTemp)

    let weatherState = data('.fact__feelings').find('.link__condition').text()
    console.log('На улице' + weatherState)
}

let getGismeteoWeather = html => {
    console.log('Гисметео')

    let data = cheerio.load(html)

    let factTemp = data('.now__weather').find('.unit_temperature_c').find('.nowvalue__text_l').text()
    console.log('фактическая: ' + factTemp)

    let fillingTemp = data('.now__feel').find('.unit_temperature_c').text()
    fillingTemp = fillingTemp.replace(/\s+/g, '')
    console.log('ощущается: ' + fillingTemp)

    let weatherState = data('.now__desc').text()
    console.log('На улице' + weatherState)
}



