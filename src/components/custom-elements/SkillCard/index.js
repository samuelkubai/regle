class SkillCard extends HTMLElement {
  connectedCallback() {
    this.domNode = this.initShadow();
  }

  initShadow() {
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = SkillCard.style + this.template;

    return shadowRoot;
  }

  get title () {
    return this.getAttribute('title')
  }

  set title(val) {
    this.setAttribute('title', val);
  }

  get target () {
    return this.getAttribute('target')
  }

  set target(val) {
    this.setAttribute('target', val);
  }

  get skill () {
    return this.getAttribute('skill')
  }

  set skill(val) {
    this.setAttribute('skill', val);
  }

  get icon () {
    return this.getAttribute('icon')
  }

  set icon(val) {
    this.setAttribute('icon', val);
  }

  getProgressWidth(skill, target) {
    const width = (skill/target)*100;

    return width > 100 ? 100 : width === 0 ? .5 : width;
  }

  getProgressColor(skill, target) {
    const progress = skill/target;

    if (progress >= 0.75) {
      return 'mastered';
    } else if (progress > 0.25 && progress < 0.75) {
      return 'in-progress';
    } else {
      return 'in-danger';
    }
  }

  static get observedAttributes() {
    return ['target', 'skill']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if ((name === 'target' || name === 'skill') && this.domNode) {
      this.domNode.innerHTML = SkillCard.style + this.template;
    }
  }

  get template() {
    return `
      <div class="container">
        <div class="skill-content">
          <div class="icon-container">
            <img src="${this.icon}" alt="React">
          </div>
          
          <div class="skill-info">
            <div class="skill-title">${this.title}</div>
            <div class="skill-summary">Requires <span class="skill-summary__value">${parseInt(this.target).toLocaleString()}</span> submissions</div>
          </div>
        </div>
        
        <div class="skill-score">
          <div class="skill-score__value">${parseInt(this.skill).toLocaleString()}</div>
          <div class="skill-score__target">/${parseInt(this.target).toLocaleString()}</div>
        </div>
        
        <div class="skill-progress ${this.getProgressColor(this.skill, this.target)}" style="width: ${this.getProgressWidth(this.skill, this.target)}%"></div>
      </div>
    `;
  }

  static get style() {
    return `
      <style>
        .container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            width: 100%;
            height: 95px;
            
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
            box-sizing: border-box;
            margin-bottom: 14px;
            padding: 0 49px 0 20px;
        }
        
        .skill-content {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
        
        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          
          width: 65px;
          height: 65px;
          
          background: #EDF8FF;
          border-radius: 50%;
          margin-right: 16px;
        }
        
        .icon-container > img {
            height: 32px;
            width: 32px;
        }
        .skill-score {
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            
            color: #153C55;
        }
        
        .skill-title {
          font-size: 14px;
          color: #153C55;
          margin-bottom: 4px;
        }
        
        .skill-summary {
          font-size: 12px;
          color: #B5C4CF;
        }
        
        .skill-summary__value {
          color: #153C55;
        }
        
        .skill-score__value {
            font-size: 32px;
            line-height: 1;
        }
        
        .skill-score__target {
            font-size: 14px;
        }
        
        .skill-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          
          height: 5px;
        }
        
        .skill-progress.mastered { background: #009487; }
        .skill-progress.in-progress { background: #D0A419; }
        .skill-progress.in-danger { background: #C7000F; }
      </style>
    `;
  }
}

customElements.define('skill-card', SkillCard);
