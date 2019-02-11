export default class Container {
  static get currentTeam() {
    return window.localStorage.getItem('regle__selected-team')
  }

  static set currentTeam(team) {
    window.localStorage.setItem('regle__selected-team', team)
  }
}
