export class ClassProblemInfo {
  constructor() {
    this.messageInfo = document.getElementById('js-message-info');
    this.nameElement = document.getElementById('js-name-text');
    this.nameInput = document.getElementById('js-name-input');
    this.messageElement = document.getElementById('js-message-text');
    this.messageInput = document.getElementById('js-message-input');
    this.addButtonElement = document.getElementById('js-add-problem');
  }
  disabledEditMode() {
    this.hideMessageInfo();
    this.nameElement.style.display = 'block';
    this.nameInput.style.display = 'none';
    this.messageElement.style.display = 'block';
    this.messageInput.style.display = 'none';
    this.addButtonElement.style.display = 'none';
  }
  enabledEditMode() {
    this.showMessageInfo();
    this.nameElement.style.display = 'none';
    this.nameInput.style.display = 'block';
    this.messageElement.style.display = 'none';
    this.messageInput.style.display = 'block';
    this.addButtonElement.style.display = 'block';
  }
  showMessageInfo() {
    this.messageInfo.style.display = 'block';
  }
  hideMessageInfo() {
    this.messageInfo.style.display = 'none';
  }
  reset() {
    this.nameInput.value = '';
    this.messageInput.value = '';
  }
}
