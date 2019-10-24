console.log('client side javascript is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    console.log(response)
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const forecastText = document.querySelector('#forecastMessage')

//messageOne.textContent = 'From Javascript!'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageTwo.textContent = 'Loading...'

    fetch('http://localhost:3000/sandbox?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log('Error. Please enter a valid address')
            } else {
                console.log(data.location)
                console.log(data.forecast)
                forecastText.textContent = 'Here is your location: ' + data.location + data.forecast
            }
        })
    })
})