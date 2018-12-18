class CalendarPicker extends HTMLElement {
  connectedCallback() {
    this.initShadow();
  }

  initShadow() {
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = CalendarPicker.style + this.template;

    return shadowRoot;
  }

  get template() {
    return `
      <div class="container">
        12 Dec 2018 - 12 Feb 2019
      </div>
    `;
  }

  static get style() {
    return `
      <style>
        .container {
          height: 45px;
          width: 261px;
          
          border: 1px solid #CDD6DF;
          box-sizing: border-box;
          padding: 12px 8px;
          
          color: #B5C4CF;
          font-size: 14px;
          text-align: left;
        }
      </style>
    `;
  }
}

customElements.define('calendar-picker', CalendarPicker);
