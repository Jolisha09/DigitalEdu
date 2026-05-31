const form = document.getElementById("regForm");

if(form){

form.addEventListener("submit", async(e)=>{

e.preventDefault();

const data = new FormData(form);

const response = await fetch("/register",{
method:"POST",
body:new URLSearchParams(data)
});

const msg = await response.text();

alert(msg);

form.reset();

});

}