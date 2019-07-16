import {ClassMapBox} from './ClassMapBox';

const checkError = function(ele) {
  const classList = Array.prototype.slice.call(ele.classList);

  if ('' === ele.value) {
    classList.push('-error');
  } else {
    const index = classList.indexOf('-error');
    if (-1 !== index) {
      classList.splice(index, 1);
    }
  }

  ele.className = classList.join(' ');
};

export class ClassProblemInfo {
  constructor() {
    this.messageInfo = document.getElementById('js-message-info');
    this.nameElement = document.getElementById('js-name-text');
    this.nameInput = document.getElementById('js-name-input');
    this.messageElement = document.getElementById('js-message-text');
    this.messageInput = document.getElementById('js-message-input');
    this.addButtonElement = document.getElementById('js-add-problem');

    this.nameInput.addEventListener('input', () => {
      checkError(this.nameInput);
    });

    this.messageInput.addEventListener('input', () => {
      checkError(this.messageInput);
    });
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

  initClickCloseInfo(Map) {
    document.getElementById('js-close-info').addEventListener('click', () => {
      this.hideMessageInfo();
      this.reset();
      if (Map instanceof ClassMapBox) {
        Map.resetNewPoint();
      }
    });
  }
}
