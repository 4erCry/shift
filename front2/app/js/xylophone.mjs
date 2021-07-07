let root;

const KEYS_TO_NOTES = {
  65: 'A',
  66: 'B',
  67: 'C',
  68: 'D',
  69: 'E',
  70: 'F',
  71: 'G'
}

export function init(rootElement) {
  root = rootElement;

  const Bar = root.querySelectorAll('.bar');
  Bar.forEach(bar => {

    bar.audio = new Audio();
    bar.audio.src = "sounds/" + bar.getAttribute('data-note') + ".mp3";

    bar.addEventListener('mouseenter', MouseOnBar);
  });
  document.addEventListener('keydown', onKeyPress(Bar));
}

document.addEventListener('click', function (e) {
  const el = e.target.closest('.bar');
  if (el) {
    el.classList.toggle('disabled');
  }
});

function hitBar(bar) {
  bar.audio.currentTime = 0;
  bar.audio.play();
}

function MouseOnBar(e) {
  hitBar(e.target);
}

function onKeyPress(Bar) {
  return function(event) {
    let note = KEYS_TO_NOTES[event.keyCode];
    hitBar(getBarByNote(note, Bar));
  }
}

function getBarByNote(note, Bar) {
  for(let i = 0; i < Bar.length; i++) {
    if(Bar[i].getAttribute('data-note') === note) {
      return Bar[i];
    }
  }
}

/*
document.addEventListener('mouseenter',function (e) {
  /!*e.play('C');*!/
  e = document.getAttribute('data-note');
  if (e.data-note == "C")
  {
    e.play('C');
  }
  /!*if (e.id == 0){
    e.getElementById('B').play();}
  if (e.id == 2){
    e.getElementById('A').play();}
  if (e.id == 3){
    e.getElementById('G').play();}*!/
});

var inputs = document.getElementsByTagName("div");
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("click", myFunction);
}

function myFunction() {
  alert(this.id);

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 67){
    document.getElementById('C').play();
    e.audio.currentTime = 0;
  }
  if (e.keyCode === 68){
    e.audio.currentTime = 0;
    document.getElementById('D').play();
  }
  if (e.keyCode === 69){
    e.audio.currentTime = 0;
    document.getElementById('E').play();
  }
  if (e.keyCode === 70){
    e.audio.currentTime = 0;
    document.getElementById('F').play();
  }
  if (e.keyCode === 71){
    e.audio.currentTime = 0;
    document.getElementById('G').play();
  }
  if (e.keyCode === 65){
    e.audio.currentTime = 0;
    document.getElementById('A').play();
  }
  if (e.keyCode === 66){
    e.audio.currentTime = 0;
    document.getElementById('B').play();
  }
});*/
