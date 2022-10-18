const tv = (input)=>{
    input.forEach(val => {
    if(val.getAttribute('type') === "password")
        val.setAttribute('type', "text")
    else if(val.getAttribute('type') === "text")
        val.setAttribute('type', "password")
    else val.setAttribute('type', "password")
    });
}

const passChk = document.querySelector('#forgot-check')
const passField = document.querySelectorAll('.password')

passChk.addEventListener('change', ()=>tv(passField))