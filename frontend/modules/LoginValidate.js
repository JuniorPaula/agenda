import validator from "validator";

/** class responsável por fazer a validação no frontend
 *  do formulario de login.
 */
export default class Login {
    constructor(formLogin) {
        this.form = document.querySelector(formLogin);
    }

    init() {
        this.events();
    }

    /** método responsável por disparar o evento */
    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    /** método responsável por validar o formulário */
    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name=email]');
        const senhaInput = el.querySelector('input[name=senha]');
        const msgEmail = document.createElement('span');
        const msgSenha = document.createElement('span');
        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            msgEmail.innerHTML = 'E-mail inválido!';
            msgEmail.style.color = '#F7431C';
            msgEmail.style.fontSize = '14px';
            emailInput.insertAdjacentElement('afterend', msgEmail);

            error = true;   
        }

        if(senhaInput.value.length < 3 || senhaInput.value.length > 50) {
            msgSenha.innerHTML = 'Senha precisa ter entre 3 e 50 caracteres!';
            msgSenha.style.color = '#F7431C';
            msgSenha.style.fontSize = '14px';
            senhaInput.insertAdjacentElement('afterend', msgSenha);

            error = true;  
        }

        if(!error) el.submit();

    }
}