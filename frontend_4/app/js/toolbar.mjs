import { VoiceControl } from "./voice-control.mjs";

export class Toolbar {
  root;
  app;
  delayInput;

  constructor(app, rootElement) {
    this.root = rootElement;
    this.app =  app;

    const map = new Map();

    map.set("Сбросить карточки",this._clear.bind(this));
    map.set("Снимок!",this._shot.bind(this));
    map.set("Серия снимков",this._burstShot.bind(this));
    map.set("Задержка",this._setDelay.bind(this));

    this.voicecontroller = new VoiceControl(this.root, this, map);
    this.bindListeners();
  }

  bindListeners() {
    let clearButton = this.root.querySelector('button[name="clear"]');
    let shotButton = this.root.querySelector('button[name="shot"]');
    let burstShotButton = this.root.querySelector('button[name="burst_shot"]');
    this.delayInput = this.root.querySelector('input[name="delay"]');
    let voiceButton = this.root.querySelector('#voice_control');

    this._clear = this._clear.bind(this);
    this._shot = this._shot.bind(this);
    this._burstShot = this._burstShot.bind(this);
    this._setDelay = this._setDelay.bind(this);

    clearButton.addEventListener('click', this._clear);
    shotButton.addEventListener('click', this._shot);
    burstShotButton.addEventListener('click', this._burstShot);
    this.delayInput.addEventListener('change', this._setDelay);
    voiceButton.addEventListener('click', this.voicecontroller._onRecognition);
  }

  _clear() {
    this.app.clear();
  }

  _shot() {
    this.app.shot();
  }

  _burstShot() {
    this.app.burstShot();
  }

  _setDelay() {
    this.app.setDelay(this.delayInput.value);
  }
}