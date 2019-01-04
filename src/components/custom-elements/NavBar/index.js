import GroupIconActive from '../../../assets/group-active.svg';
import SettingsIcon from '../../../assets/settings.svg';
import SkillsIcon from '../../../assets/skills.svg';
import TeamIcon from '../../../assets/team.svg';

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

  get template() {
    return `
        <nav class="navigation-bar">
            <ul class="menu">
                <li class="active"> <img src="${GroupIconActive}" alt="Dashboard"> Dashboard</li>
                <li> <img src="${SkillsIcon}" alt="Skills"> Skills</li>
                <li> <img src="${TeamIcon}" alt="Teams"> Teams</li>
                <li> <img src="${SettingsIcon}" alt="Settings"> Settings</li>
            </ul> 
            
            <div id="profile-dropdown" class="profile-dropdown">
                <img 
                    alt="User profile"
                    class="profile-dropdown__image"
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
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 10;
              
              width: 100%;
              height: 62px;
              
              display: flex;
              align-items: center;
              justify-content: space-between;
              
              background: #0068A6;
              box-shadow: 0 -2px 4px #DFE6EB;
              box-sizing: border-box;
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
            width: 30px;
            height: 30px;
            
            margin-right: 4px;
          }
          
          .menu {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            
            height: 100%;
            margin: 0;
            list-style: none;
            padding: 0;
          }
          
          .menu li {
            display: flex;
            justify-content: center;
            align-items: center;
            
            width: 132px;
            
            color: #8595A9;
            cursor: pointer;
            font-size: 16px;
            margin: 0 8px;
            padding-bottom: 19px;
            padding-top: 21px;
          }
          
          .menu li:first-child {
            margin-left: 0 !important;
          }
          
          .menu li img {
            margin-right: 8px;
          }
          
          .menu li.active {
            border-top: 3px solid #F8F9FA;
            color: #F8F9FA !important;
            padding-top: 18px !important;
          }
          
          .profile-dropdown {
            display: flex;
            align-items: center;
            color: #F8F9FA;
            cursor: pointer;
            
            font-size: 14px;
          }
          
          .profile-dropdown__image {
            height: 30px;
            width: 30px;
            
            border: 1px solid #F8F9FA;
            border-radius: 50%;
            margin-right: 12px;
          }
          
          .breadcrumbs-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            
            height: 59px;
            margin-top: 62px;
            padding: 0 79px;
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
          
          .breadcrumbs-list li:last-child {
            color: #004873;
            font-weight: 500;
          }
          
          .breadcrumbs-list li.indicator {
            margin: 0 8px;
          }
      </style>
    `;
  }
}

customElements.define('nav-bar', NavBar);
