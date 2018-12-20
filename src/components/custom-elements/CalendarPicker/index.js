import { format } from 'date-fns';

class CalendarPicker extends HTMLElement {
  connectedCallback() {
    this.domNode = this.initShadow();


    window.addEventListener('click', e => {
      if (!this.contains(e.target)){
        this.show = false;
      }
    });

    this.addEventListener('click', e => {
      e.target.show = !(e.target.getAttribute('show') === "true");
    });
  }

  initShadow() {
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = CalendarPicker.style + this.template;

    return shadowRoot;
  }

  get show() {
    return this.hasAttribute('show');
  }

  set show(val) {
    if (val && val !== 'false') {
      this.setAttribute('show', val);
    } else {
      this.removeAttribute('show');
    }
  }

  get icon() {
    return this.getAttribute('icon');
  }

  set icon(val) {
    this.setAttribute('icon', val);
  }

  get start() {
    if (this.hasAttribute('start')) {
      return format(this.getAttribute('start'), 'DD MMM, YYYY')
    }

    return null;
  }

  set start(val) {
    this.setAttribute('start', val);
  }

  get end() {
    if (this.hasAttribute('end')) {
      return format(this.getAttribute('end'), 'DD MMM, YYYY')
    }

    return null;
  }

  set end(val) {
    this.setAttribute('end', val);
  }

  static get observedAttributes() {
    return ['show', 'start', 'end']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if ((name === 'show' || name === 'start' || name === 'end') && this.domNode) {
      this.domNode.innerHTML = CalendarPicker.style + this.template;
    }
  }

  get template() {
    return `
      <div class="calendar-picker__container">
        <div class="container">
          <div class="calendar-picker__range">
            ${this.start} - ${this.end}
          </div>
          
          <img src="${this.icon}" alt="Calendar Icon">
        </div>
        
        <div id="calendar-container" class="calendar-container ${this.show ? 'calendar-container--open' : 'calendar-container--closed'}">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get style() {
    return `
      <style>
        .calendar-picker__container {
          position: relative;
        }
        
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          
          position: relative;
          height: 45px;
          width: 261px;
          
          border: 1px solid #CDD6DF;
          box-sizing: border-box;
          padding: 12px 8px;
          
          color: #B5C4CF;
          cursor: pointer;
          font-size: 14px;
          text-align: left;
        }
        
        .calendar-container {
          position: absolute;
          right: 0;
          top: 45px;
          
          box-shadow: 0 2px 10px 0 rgba(0,0,0,0.15);
          visibility: hidden;
          z-index: 100;
        }
        
        .calendar-container.calendar-container--open {
          visibility: visible;
        }
      </style>
    `;
  }
}

customElements.define('calendar-picker', CalendarPicker);
