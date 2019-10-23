console.log('client side javascript is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    console.log(response)
    response.json().then((data) => {
        console.log(data)
    })
})

fetch('http://localhost:3000/sandbox?address=kona').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log('there was an error')
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})