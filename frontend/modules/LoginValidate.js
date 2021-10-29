import validator from "validator";

/** class responsável por fazer a validação no frontend
 *  do formulario de login.
 */
 export default class Login {
    constructor(formLogin) {
        this.form = document.querySelector(formLogin);
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const checkFilds = this.isValidFilds();
        const passwordIsValid = this.checkPassword();

        if(checkFilds && passwordIsValid) {
            this.form.submit();
        }
    }

    checkPassword() {
        let valid = true;

        const password = this.form.querySelector('input[name=senha]');

        if(password.value.length < 3 || password.value.length > 50) {
            valid = false;
            this.createError(password, 'Senha precisa ter entre 3 e 50 caracteres!');
        }

        return valid;
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