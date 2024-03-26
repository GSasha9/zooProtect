//переход на вкладку "регистрация"
window.addEventListener('resize', saveRegForm);

function saveRegForm(){
    if(window.innerWidth <= '900' && document.querySelector('#form_registration').className != 'notActive'){
        document.querySelector('#enterForm').style.height = "94.5vw";
    }
    else {document.querySelector('#enterForm').style.height = "63vw"};
}


const form_enter = document.querySelector("#form_enter");
const form_registration = document.querySelector("#form_registration");
form_enter.addEventListener('click', openEnter);
form_registration.addEventListener('click', openReg);

function openEnter(){
    form_enter.classList.remove("notActive");
    document.querySelector('#formBodyRegistrationForm').style.visibility = "hidden";
    document.querySelector('#formBody').style.visibility = "visible";
    form_registration.classList.add("notActive");
    document.querySelector('#enterForm').style.height = "47vw";
}

function openReg(){
    form_registration.classList.remove("notActive");
    document.querySelector('#formBody').style.visibility = "hidden";
    document.querySelector('#formBodyRegistrationForm').style.visibility = "visible";
    form_enter.classList.add("notActive");
    if(window.innerWidth <= '900'){
        document.querySelector('#enterForm').style.height = "94.5vw";
    }
    else {document.querySelector('#enterForm').style.height = "63vw"};
}











//проверка заполнения формы входа
window.addEventListener("DOMContentLoaded", function(){
    document.querySelector("#formBody").addEventListener("submit", validateEnterForm);
});

function validateEnterForm(e){
    document.querySelectorAll(".alert").forEach((elem)=>elem.remove());
    const login = isEmpty(this.login);
    const password = isEmpty(this.password);

    if(login || password){
        e.preventDefault();
    };
};

//проверяем не пустые ли поля
function isEmpty(field){
    if (field.value.trim() === ""){
        const item = document.createElement("span");
        item.textContent = "Поле обязательно к заполнению";
        item.className = "alert";
        field.insertAdjacentElement("afterEnd",item);
    return true;
    };
    return false;
};


//проверка заполнения формы регистрации

window.addEventListener("DOMContentLoaded", function(){
    document.querySelector("#formBodyRegistrationForm").addEventListener("submit", validateRegForm);
});

function validateRegForm(e){
    document.querySelectorAll(".alert").forEach((elem)=>elem.remove());
    const name = isEmpty(this.name);
    const email = isErrorMail(this.email);
    const passwordReg = isErrorPasswordReg(this.passwordReg);
    const passRegCheck = isErrorPassRegCheck(this.passRegCheck);
    const city = isEmpty(this.city);
    if(name || passwordReg || passRegCheck || city || mail){
        e.preventDefault();
    };
};

//проверяем пароль, должен быть не короче 6 символов
function isErrorPasswordReg(field){
    if (isEmpty(field)) return true;
    if(field.value.length < 6){
        const item = document.createElement("span");
        item.textContent = "Минимальная длина пароля - 6 символов";
        item.className = "alert";
        field.insertAdjacentElement("afterEnd",item);
    return true;
    };
    return false;
    
};

//проверяем совпадают ли введенные пароли
function isErrorPassRegCheck(field){
    if (isEmpty(field)) return true;
    let pass1= document.querySelector("#passwordReg");
    if(field.value !== pass1.value){
        const item = document.createElement("span");
        item.textContent = "Пароль не совпадает";
        item.className = "alert";
        field.insertAdjacentElement("afterEnd",item);
    return true;
    };
    return false;
    
};

//проверяем приавльно ли введена электронная почта
function isErrorMail(field){
    if (isEmpty(field)) return true;
    const inpMail = field.value;
    if(!/\w*\d*@{1}\w*\.{1}\w*/gi.test(inpMail)) {
        const item = document.createElement("span");
        item.textContent = "Адрес введен неверно. Пример <adress@gmail.com>";
        item.className = "alert";
        field.insertAdjacentElement("afterEnd",item);
    return true;
    };
    return false;
}

