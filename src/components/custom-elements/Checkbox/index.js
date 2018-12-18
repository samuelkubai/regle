class Checkbox extends HTMLElement {
  connectedCallback() {
    this.initShadow();
  }

  initShadow() {
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = Checkbox.style + this.template;

    return shadowRoot;
  }

  get checked () {
    return this.hasAttribute('checked')
  }

  set checked(val) {
    if (val) {
      this.setAttribute('checked', val);
    } else {
      this.removeAttribute('checked');
    }
  }

  get disabled () {
    return this.hasAttribute('disabled')
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', val);
    } else {
      this.removeAttribute('disabled');
    }
  }


  get template() {
    return `
      <label class="container ${this.disabled ? 'disabled' : ''}">
          <input ${this.checked ? 'checked' : ''} ${this.disabled ? 'disabled' : ''} type="checkbox">
          <span class="checkmark"></span>
          <slot></slot>
      </label>
    `;
  }

  static get style() {
    return `
      <style>
          /* Customize the label (the container) */
          .container {
            display: block;
            position: relative;
            
            color: #000;
            font-size: 14px;
            padding-left: 35px;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          .container.disabled {
            color: #CDD6DF !important;
          }
          
          /* Hide the browser's default checkbox */
          .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }
          
          input[type=checkbox] {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }
          
          .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 20px;
            width: 20px;
            background: #FFFFFF;
            box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.25);
          }
          
          /* On mouse-over, add a grey background color */
          .container:hover input ~ .checkmark {
            background-color: #f1f1f1;
          }
          
          /* When the checkbox is checked, add a blue background */
          .container input:checked ~ .checkmark {
            background-color: #0068A6;
          }
          
          /* Create the checkmark/indicator (hidden when not checked) */
          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
          }
          
          /* Show the checkmark when checked */
          .container input:checked ~ .checkmark:after {
            display: block;
          }
          
          /* Style the checkmark/indicator */
          .container .checkmark:after {
            left: 7px;
            top: 3px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 1px 1px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }

      </style>
    `;
  }
}

customElements.define('custom-checkbox', Checkbox);
