import validator from "validator";

/** class responsável por fazer a validação no frontend
 *  do formulario de login.
 */
 export default class Contact {
    constructor(formContact) {
        this.form = document.querySelector(formContact);

    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const checkFilds = this.isValidFilds();

        if(checkFilds) {
            alert('form enviado!');
            //this.form.submit();
        }
    }


    isValidFilds() {
        let valid = true;

        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let campo of this.form.querySelectorAll('.valid')) {
            const label = campo.previousElementSibling.innerHTML;

            if(campo.classList.contains('email')) {
                if(!this.validaEmail(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')) {
                if(!this.nameValid(campo)) valid = false;
            }

            if(campo.classList.contains('sobrenome')) {
                if(!this.lastnameValid(campo)) valid = false;
            }

            if(campo.classList.contains('telefone')) {
                if(!this.phoneValid(campo)) valid = false;
            }

        }

        return valid;
    }

    phoneValid(campo) {
        const tel = campo.value;
        let valid = true;

        if(tel.value.length !== 11) {
            this.createError(campo, 'Telefone precisar ter 11 digitos!');
            valid = false;
        }

        return valid;
    }

    lastnameValid(campo) {
        const lastname = campo.value;
        let valid = true;

        if(!lastname) {
            this.createError(campo, 'Sobrenome não pode estar vazio!');
            valid = false;
        }
        return valid;
    }

    nameValid(campo) {
        const user = campo.value;
        let valid = true;

        if(!user) {
            this.createError(campo, 'Nome não pode estar vazio!');
            valid = false;
        }
        return valid;
    }

    validaEmail(campo) {

        if(!validator.isEmail(campo.value)) {
            this.createError(campo, 'E-mail Inválido!');
            return false;
        }

        return true;
    }

    createError(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }

}