class NavBar extends HTMLElement {
  connectedCallback() {
    this.initShadow();
  }

  initShadow() {
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = NavBar.style + this.template;

    return shadowRoot;
  }

  get chevronDown() {
    return this.getAttribute('chevron-down');
  }

  set chevronDown(val) {
    return this.setAttribute('chevron-down', val);
  }

  get profileImage() {
    return this.getAttribute('profile-image');
  }

  set profileImage(val) {
    return this.setAttribute('profile-image', val);
  }

  get profileName() {
    return this.getAttribute('profile-name');
  }

  set profileName(val) {
    return this.setAttribute('profile-name', val);
  }

  get icon() {
    return this.getAttribute('icon');
  }

  set icon(val) {
    this.setAttribute('icon', val);
  }

  get template() {
    return `
        <nav class="navigation-bar">
            <div id="navigator" class="navigation-bar__navigator">
                <img src="${this.icon}" alt="Back"> Dashboard
            </div>  
            
            <div id="profile-dropdown" class="profile-dropdown">
                <img 
                    alt="User profile"
                    style="margin-right: 12px;"
                    src="${this.profileImage}"
                >
                
                ${this.profileName}
                
                <img
                    alt="Down"
                    style="margin-left: 10px;"
                    src="${this.chevronDown}"
                >
            </div>
        </nav>
    `;
  }

  static get style() {
    return `
      <style>
          .navigation-bar {
          
              width: 100%;
              height: 74px;
              
              display: flex;
              align-items: center;
              justify-content: space-between;
              
              background: #fff;
              box-sizing: border-box;
              box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
              padding: 0 79px;
          }
          
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
            width: 29px;
            height: 29px;
            
            margin-right: 12px;
          }
          
          .profile-dropdown {
            display: flex;
            align-items: center;
            color: #153C55;
            cursor: pointer;
            
            font-weight: 600;
            font-size: 16px;
          }
          
          .profile-dropdown > img {
            margin-right: 12px;
            
          }
      </style>
    `;
  }
}

customElements.define('nav-bar', NavBar);
