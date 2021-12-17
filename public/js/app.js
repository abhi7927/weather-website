console.log('hello')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = search.value    
    //used to asynchronously make api request to the web server, which then sends json object
    //response is then recieved which then makes a callback
    //the response is json which can be used to make asynchronous calls
    fetch('http://192.168.1.11:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            } else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})