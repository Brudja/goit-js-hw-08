import Throttle from "lodash.throttle"

    const form = document.querySelector(".feedback-form");
    const email = form.querySelector("[name=email]");
    const message = form.querySelector("[name=message]");

const localKey = "feedback-form-state"

form.addEventListener("input", Throttle(storageFromData, 500));
form.addEventListener("submit", onFormSubmit);


window.addEventListener('load', checkStorage);
function checkStorage() {
  if (!localStorage.getItem(localKey)) return;
  const formValue = JSON.parse(localStorage.getItem(localKey));
  email.value = formValue.email;
  message.value = formValue.message;
}

function onFormSubmit(event){
    event.preventDefault();
    const {email, message}=event.currentTarget.elements
    console.dir({email: email.value, message:message.value})
    
    localStorage.removeItem(localKey);
    email.value = "";
    message.value = "";

}

function storageFromData(event){
    const formValue = {email:"", message:""};

    if(localStorage.getItem(localKey)){
        Object.assign(formValue, JSON.parse(localStorage.getItem(localKey)))
    }

    formValue[event.target.name] = event.target.value.trim();



    localStorage.setItem(localKey, JSON.stringify(formValue))
}

