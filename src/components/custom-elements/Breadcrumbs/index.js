import ChevronRight from '../../../assets/right-chevron.svg';

class BreadCrumbs extends HTMLElement {
  connectedCallback() {
    this.initShadow();
  }

  initShadow() {
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = BreadCrumbs.style + this.template;

    return shadowRoot;
  }
  get title() {
    return this.getAttribute('title');
  }

  set title(val) {
    this.setAttribute('title', val);
  }

  get icon() {
    return this.getAttribute('icon');
  }

  set icon(val) {
    this.setAttribute('icon', val);
  }

  get paths() {
    return this.getAttribute('path').split(",")
  }

  set paths(val) {
    this.setAttribute('path', val);
  }

  static getDivider(paths, index) {
    if ((paths.length - 1) > index) {
      return `<li class="indicator"><img src="${ChevronRight}" alt="Right"></li>`;
    }

    return "";
  }

  composeBreadcrumb(paths) {
    let breadcrumbElement = ``;
    paths.map((path, index) => `
        <li>${path}</li> 
        ${BreadCrumbs.getDivider(paths, index)}
    `).forEach(tag => breadcrumbElement = breadcrumbElement + tag);

    return breadcrumbElement;
  }

  get template() {
    return `
        <div class="breadcrumbs-container">
            <div id="navigator" class="navigation-bar__navigator">
                <img src="${this.icon}" alt="${this.title}"> 
                <div class="">${this.title}</div>
            </div>
            <ul class="breadcrumbs-list">` +
                // ${this.composeBreadcrumb(this.paths)}
      `
            </ul>   
        </div>
    `;
  }

  static get style() {
    return `
      <style>
          .navigation-bar__navigator {
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            color: #153C55;
            cursor: pointer;
            
            font-weight: 600;
            font-size: 18px;
          }
          
          .navigation-bar__navigator > img {
            width: 30px;
            height: 30px;
            
            margin-right: 8px;
          }
          
          .breadcrumbs-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            height: 59px;
            padding: 0 16px;
          }
          
          .breadcrumbs-list {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            
            margin: 0;
            list-style: none;
            padding: 0;
          }
          
          .breadcrumbs-list li {
            color: #153C55;
            font-size: 14px;
            font-weight: 800;
          }
          
          .breadcrumbs-list li:not(.indicator) {
            cursor: pointer;
          }
          
          .breadcrumbs-list li:last-child {
            color: #004873;
            cursor: default;
            font-weight: 500;
          }
          
          .breadcrumbs-list li.indicator {
            margin: 0 8px;
          }
      </style>
    `;
  }
}

customElements.define('bread-crumbs', BreadCrumbs);
