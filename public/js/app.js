// const { response } = require("express");


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const massegeOne = document.querySelector('#massage-1')
const massegeTwo = document.querySelector('#massage-2')

const getWeatherData = (location) =>{

    fetch('/weather?address='+location).then((response)=>{ 
        response.json().then((data) =>{
            console.log(data)
            if(data.error){
                massegeOne.textContent = data.error
                console.log(data.error)
                
            }else{
                massegeOne.textContent = data.forecast
                console.log(data.forecast)
            }
        })
    })

}


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value
    getWeatherData(location)
})

