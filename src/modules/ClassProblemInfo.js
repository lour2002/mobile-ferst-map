export class ClassProblemInfo {
  constructor() {
    this.nameElement = document.getElementById('js-name-text');
    this.messageElement = document.getElementById('js-message-text');
  }
  disabled() {
    this.nameElement.disabled = true;
    this.messageElement.disabled = true;
  }
  enabled() {
    this.nameElement.disabled = false;
    this.messageElement.disabled = false;
  }
}
