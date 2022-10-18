const characters = "1234567890qwertyuiopasdfghjklzxcvbnm@#&QWERTYUIOPASDFGHJKLZXCVBNM"
const randomise_btn = document.querySelector('#randomiser')
const pass_field = document.querySelector('#password')
const pass_con_field = document.querySelector('#pass_con')

const randomString = ()=>{
    return "string"
}

randomise_btn.addEventListener('click', ()=>{
    let pass = '';
    for ( var i = 0; i < 18; i++ ) {
        pass += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    pass_field.value = pass
    pass_con_field.value = pass
})