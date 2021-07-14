export class Canvas2D {
  root;
  ctx;

  constructor(rootElement) {
    this.root = rootElement;
    this.ctx = this.root.getContext("2d");
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 12;
  }

  /*setColor(color) {
    document.getElementById('color').oninput = function () {
      let myColor = 'red';
      myColor = this.value();
    }
  }*/

  renderLine(startPoint, endPoint) {
    if (startPoint !== endPoint) {
      this.ctx.beginPath();
      this.ctx.moveTo(startPoint.x, startPoint.y);
      this.ctx.lineTo(endPoint.x, endPoint.y);
      this.ctx.stroke();
    }
  }

  renderCircle(centerPoint, radius) {
    this.ctx.beginPath();
    this.ctx.arc(centerPoint.x, centerPoint.y, radius,0,Math.PI*2, true);
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.root.width, this.root.height);
  }
}
