'use strict'
document.addEventListener('DOMContentLoaded', ()=>{
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
	form.addEventListener('submit', event => {
	    if (!form.checkValidity()) {
		event.preventDefault()
		event.stopPropagation()
	    }
	    registerSomeone();
	    event.preventDefault()

	    form.classList.add('was-validated')
	}, false)
    })
});
function registerSomeone(){
    let names=document.getElementById('validationNames').value,
    surnames=document.getElementById('validationSurnames').value,
    email=document.getElementById('validationEmail').value,
    gender=document.getElementById('validationGender').value,
    comment=document.getElementById('validationComment').value,
    typeOfComment=document.getElementById('validationTypeOfComment').value,
    file=document.getElementById('formFile').value,
    url=document.getElementById('validationUrl').value;

    let loopbackUrl='http://localhost:3000/people';
    let data={
	names: names,
	surnames: surnames,
	email: email,
	gender: gender,
	comment: comment,
	typeOfComment: typeOfComment,
	file: file,
	url: url
    }
    fetch(loopbackUrl, {
	method: 'POST',
	body: JSON.stringify(data),
	headers: {
	    'Content-Type': 'application/json'
	}
    }).then(res=>res.json())
	.then(message=>console.log(message));
}
