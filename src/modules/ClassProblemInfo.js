export class ClassProblemInfo {
  constructor() {
    this.nameElement = document.getElementById('js-name-text');
    this.messageElement = document.getElementById('js-message-text');
    this.addButtonElement = document.getElementById('js-add-problem');
  }
  disabled() {
    this.nameElement.disabled = true;
    this.messageElement.disabled = true;
    this.addButtonElement.disabled = true;
  }
  enabled() {
    this.nameElement.disabled = false;
    this.messageElement.disabled = false;
    this.addButtonElement.disabled = false;
  }
  reset() {
    this.nameElement.value = '';
    this.messageElement.value = '';
  }
}
