export class Toolbar {
  root;
  editor;
  colorButton;
  clearButton;
  tool;

  constructor(editor, rootSelector) {
    this.editor = editor;
    this.root = editor.root.querySelector(rootSelector);

    this.tool = this.root.querySelectorAll('input[name="tool"]');
    this.colorButton = this.root.querySelector('input[name="color"]');
    this.clearButton = this.root.querySelector('button.clear');

    this._setEditorOptions();
    this.bindListeners();
  }

  bindListeners() {

    this._setEditorOptions = this._setEditorOptions.bind(this);
    this._clearEditor = this._clearEditor.bind(this);
    this.nextTool = this.nextTool.bind(this);

    this.colorButton.addEventListener('change', this._setEditorOptions);
    this.clearButton.addEventListener('click', this._clearEditor);

    this.tool.forEach(tool => {
      tool.addEventListener('input', this.nextTool);
    });
  }

  _setEditorOptions() {
    this.editor.setOption('strokeStyle', this.colorButton.value);
    this.nextTool();
  }

  _clearEditor() {
    this.editor.clear();
  }

  nextTool() {
    const {length} = this.tool;
    for(let i = 0; i < length; i++) {
      if (this.tool[i]["checked"]) {
        this.editor.tool = this.tool[i].value;
      }
    }
  }
}