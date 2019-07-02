export class ClassProblemInfo {
  constructor() {
    this.messageInfo = document.getElementById('js-message-info');
    this.nameElement = document.getElementById('js-name-text');
    this.messageElement = document.getElementById('js-message-text');
    this.addButtonElement = document.getElementById('js-add-problem');
  }
  disabled() {
    this.hideMessageInfo();
    this.nameElement.disabled = true;
    this.messageElement.disabled = true;
    this.addButtonElement.disabled = true;
  }
  enabled() {
    this.showMessageInfo();
    this.nameElement.disabled = false;
    this.messageElement.disabled = false;
    this.addButtonElement.disabled = false;
    this.addButtonElement.style.display = 'block';
  }
  showMessageInfo() {
    this.messageInfo.style.display = 'block';
  }
  hideMessageInfo() {
    this.messageInfo.style.display = 'none';
  }
  reset() {
    this.nameElement.value = '';
    this.messageElement.value = '';
  }
}
