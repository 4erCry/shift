export class PaintEventTrigger {
  root;
  _startPosition;
  _lastPosition;
  _onPaintProgress;
  _active;
  editor;

  constructor(rootElement, editor, onPaintProgress) {
    this.root = rootElement;
    this.editor = editor;

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);

    this.attachEvents();

    this._onPaintProgress = onPaintProgress;
  }

  _onMouseDown(e) {
    this._active = true;
    this._startPosition = {
      x: e.clientX,
      y: e.clientY
    };
    this._startPosition = this._adjustPosition(this._startPosition);

    this._onPaintProgress({
      start: this._startPosition,
      last: this._startPosition
    });
  }

  _onMouseMove(e) {
    if (this._active) {
      if (this.editor.tool === "line") {
        this._startPosition = this._lastPosition;
        this._lastPosition = {
          x: e.clientX,
          y: e.clientY
        };
        this._lastPosition = this._adjustPosition(this._lastPosition);
        this._onPaintProgress({
          start: this._startPosition,
          last: this._lastPosition
        });
      }
      if (this.editor.tool === "circle") {
        this._lastPosition = {
          x: e.clientX,
          y: e.clientY
        };
        this._lastPosition = this._adjustPosition(this._lastPosition);
        this._onPaintProgress({
          start: this._startPosition,
          last: this._lastPosition
        });
      }
    }
  }

  _onMouseUp() {
    this._active = false;
    this._lastPosition = undefined;
  }

  _adjustPosition(position) {
    const margin = this.root.getBoundingClientRect();
    position.x -= margin.left;
    position.y -= margin.top;
    return position;
  }

  attachEvents() {
    this.root.addEventListener('mousedown', this._onMouseDown);
    this.root.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);
  }
}