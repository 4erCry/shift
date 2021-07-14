import { Gallery } from "./gallery.mjs";
import { Toolbar } from "./toolbar.mjs";

export class Photobooth {
  root;
  video;
  canvas;
  ctx;
  _toolbar;
  _gallery;
  delay;

  constructor(rootElement) {
    window.__photoboth = this;
    this.root = rootElement;

    this.canvas = this.root.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this._toolbar = new Toolbar(this, this.root.querySelector('.camera form'));
    this._gallery = new Gallery(this.root.querySelector('.gallery'));

    this.delay = 0;

    this._shot = this._shot.bind(this);
    this.initCamera();
  }

  initCamera() {
    let errorElement = document.querySelector('#errorMsg');
    this.video = this.root.querySelector('video');
    this.onstream = this.onstream.bind(this);

    let constraints = window.constraints = {
      audio: false,
      video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(this.onstream)
        .catch(function(error) {
          if (error.name === 'ConstraintNotSatisfiedError') {
            errorMsg('Разрешение ' + constraints.video.width.exact + 'x' +
                constraints.video.height.exact + ' px не поддерживается устройством.');
          } else if (error.name === 'PermissionDeniedError') {
            errorMsg('Разрешения на использование камеры и микрофона не были предоставлены. ' +
                'Вам нужно разрешить странице доступ к вашим устройствам,' +
                ' чтобы демо-версия работала.');
          }
          errorMsg('getUserMedia error: ' + error.name, error);
        });

    function errorMsg(msg, error) {
      errorElement.innerHTML += '<p>' + msg + '</p>';
      if (typeof error !== 'undefined') {
        console.error(error);
      }
    }
  }

  onstream(stream) {
    this.video.srcObject = stream;
    this.video.play();
  }

  clear() {
    this._gallery.clear();
  }

  _shot() {
    this.canvas.width = this.video.width;
    this.canvas.height = this.video.height;
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    let data = this.canvas.toDataURL();
    this._gallery.addPicture(data);
  }

  shot() {
    setTimeout(this._shot, this.delay);
  }

  burstShot() {
    this.shot();
    setTimeout(() => {
      let interval = setInterval(this._shot, 1000);
      setTimeout(() => {
        clearInterval(interval)}, 2500)}, this.delay);
  }

  setDelay(delay) {
    this.delay = delay * 1000;
  }
}

