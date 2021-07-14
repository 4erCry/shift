export class VoiceControl {
  root;
  recognition;
  commandsMap;
  commandHanler;

  constructor(rootElement, commandsMap, commandHanler) {
    this.root = rootElement;
    this.commandsMap = commandsMap;
    this.commandHanler = commandHanler;

    this.bindEventHandles();
    
  }

  bindEventHandles() {
    this._onRecognition = this._onRecognition.bind(this);
    this._onRecognitionResult = this._onRecognitionResult.bind(this);
  }


  _onRecognition() {

  }

  _onRecognitionResult(event) {

  }

  initRecognition() {
    let grammar = '#JSGF V1.0; grammar commands; public <commands> = сбросить карточки | снимок | серия снимков | задержка;';
    this.recognition = new SpeechRecognition();
    let speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    this.recognition.grammars = speechRecognitionList;
    this.recognition.continuous = true;
    this.recognition.lang = 'ru-RU';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = this._onRecognition;
  }
}
