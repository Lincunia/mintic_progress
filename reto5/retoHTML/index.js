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
	    else{
		alert('Was macht das schon');
	    }
	    form.classList.add('was-validated')
	}, false)
    })
});
