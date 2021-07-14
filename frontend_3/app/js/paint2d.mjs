import { Toolbar } from "./toolbar.mjs";
import { PaintEventTrigger } from "./paint-event-trigger.mjs";
import { Canvas2D } from "./canvas2d.mjs";

export class Paint2D {
  root;
  tool = "none";
  toolbar;
  canvas2d;

  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
    this.canvas2d = new Canvas2D(this.root.querySelector('canvas'));
    this.toolbar = new Toolbar(this, '.toolbar');
    new PaintEventTrigger(this.canvas2d.root, this, this._onPaintProgress.bind(this));
  }

  _onPaintProgress(e) {
    if (this.tool === "line") {
      this.canvas2d.renderLine(e.start, e.last);
    }
    if (this.tool === "circle") {
      this.canvas2d.renderCircle(e.start, this.calculateDistance(e.start, e.last))
    }
  }

  calculateDistance(startPoint, endPoint) {
    return Math.sqrt(
        Math.pow(startPoint.x - endPoint.x, 2) + Math.pow(startPoint.y - endPoint.y, 2)
    );
  }

  setOption(key, value) {
    this.canvas2d.ctx[key] = value;
  }

  clear() {
    this.canvas2d.clear();
  }
}
