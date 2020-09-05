//-----BACKGROUND----------
let spaceCount = 1;
const max = 100;

//-------------------------

//---------- AUDIO ----------------------------
let scoreOne;
let partOne, partTwo;
let trackOnePattern = [1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1];
let trackTwoPattern = [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0];
let trackThreePattern = [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1];
let trackNoisePattern = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
let trackBassPattern = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];


//let trackSawPattern = [0, 1, 0, 1, 0, 0, 1, 0, 1];


//--VOICES AND ENVELOPES----------------
let monoSynthDeep, monoSynthMid, monoSynthHigh, monoSynthBass, mrNoisy, env, saw;

//--MIXING-------------------------------

let noiseGain;


//--NOTE PATTERN-----Harmonic Minor---------
// let notePatternDeep = [45, 47, 48, 50, 52, 53, 56];
// let notePatternMid = [57, 59, 60, 62, 64, 65, 68]
// let notePatternHigh = [69, 71, 72, 74, 76, 77, 80];
// let notePatternBass = [33, 35, 42];

//--NOTE PATTERN-----C Major----------------
let notePatternDeep = [48, 50, 52, 50, 53, 55, 57, 59];
let notePatternMid = [60, 62, 64, 65, 67, 69, 71]
let notePatternHigh = [72, 74, 76, 77, 79, 81, 83];
let notePatternBass = [33, 36, 43, 41];
//let notePatternSaw = [72, 74, 76, 77, 79, 81, 83];

//---------- VISUALS --------
const circles = [];

//-----------SLIDER----------
let setVolume;

//--SETUP--------------------
function setup() {
  masterVolume(0.9);

  //--CANVAS-----------------
  let cnv = createCanvas(windowWidth, windowHeight);
  noStroke();

  button = createButton('Start/Pause');
  button.position(19, 19);
  button.mousePressed(playScore);

  textAlign(CENTER, CENTER);
  // PLAY / PAUSE
  //cnv.mousePressed(playMyPart);
  //cnv.mousePressed(playMyScore);


  //--PRASES-----------------
  let trackOnePhrase = new p5.Phrase('trackOne', trackOne, trackOnePattern);
  let trackTwoPhrase = new p5.Phrase('trackTwo', trackTwo, trackTwoPattern);
  let trackThreePhrase = new p5.Phrase('trackThree', trackThree, trackThreePattern);
  let trackNoisePhrase = new p5.Phrase('trackNoise', trackNoise, trackNoisePattern);
  //let trackSawPhrase = new p5.Phrase('trackSaw', trackSaw, trackSawPattern);
  let trackBassPhrase = new p5.Phrase('trackBass', trackBass, trackBassPattern);
  //

  //--PARTS-------------------
  partOne = new p5.Part(32, 1 / 8);

  // partOne.addPhrase(trackTwoPhrase);
  // partOne.addPhrase(trackThreePhrase);
  // partOne.addPhrase(trackBassPhrase);
  partOne.addPhrase(trackNoisePhrase);
  // partOne.addPhrase(trackSawPhrase);
  partOne.setBPM(60);


  partTwo = new p5.Part(32, 1 / 8);

  // partTwo.addPhrase(trackOnePhrase);
  // partTwo.addPhrase(trackTwoPhrase);
  partTwo.addPhrase(trackThreePhrase);
  // partTwo.addPhrase(trackBassPhrase);
  // partTwo.addPhrase(trackNoisePhrase);
  partTwo.setBPM(60);

  //--SCORE-------------------------
  scoreOne = new p5.Score(partOne, partTwo);
  scoreOne.setBPM(60);

  //scoreOne.loop();

  //--VOICE 1-----------------------
  //--------------------------------
  monoSynthDeep = new p5.MonoSynth();
  monoSynthDeep.amp(0.9);

  //--VOICE 1 --- DELAY ----
  voice1Delay = new p5.Delay();
  voice1Delay.setType("pingPong");
  voice1Delay.process(monoSynthDeep, 3 / 4, 0.7, 5000);
  voice1Delay.amp(0.9);




  //--VOICE 2-----------------------
  //--------------------------------
  monoSynthMid = new p5.MonoSynth();
  monoSynthMid.amp(0.9);
  //--VOICE 2 DELAY ----
  voice2Delay = new p5.Delay();
  voice2Delay.setType("pingPong");
  voice2Delay.process(monoSynthMid, 1 / 2, 0.7, 3000);
  voice2Delay.amp(0.9);
  //--VOICE 2 REVERB ----
  voice2 = new p5.Reverb();
  voice2.process(monoSynthMid, 9, 8, false);
  voice2.amp(0.9);


  //--VOICE 3-----------------------
  //--------------------------------
  monoSynthHigh = new p5.MonoSynth();
  monoSynthHigh.amp(0.6);
  //--VOICE 3 DELAY ----
  // voice3Delay = new p5.Delay();
  // voice3Delay.setType("pingPong");
  // voice3Delay.process(monoSynthHigh, 7 / 8, 0.5, 3000);
  // voice3Delay.amp(0.9);
  // //--VOICE 3 REVERB ----
  // voice3reverb = new p5.Reverb();
  // voice3reverb.process(monoSynthHigh, 9, 8, false);
  // voice3reverb.amp(0.9);

  //--VOICE Bass-----------------------
  monoSynthBass = new p5.MonoSynth();
  monoSynthBass.amp(0.6);

  //PANNER

  //--NOISE AMP ENVELOPE--


  //lfo = new Tone.LFO("32n",0.5, 10);

  //--COMPRESSOR--
  comp = new p5.Compressor();

  //--NOISE----------------------
  mrNoisy = new p5.Noise("pink");
  //--NOISE GAIN MIXER-----------
  mrNoisy.disconnect();//disconnect from P5.sound
  noiseGain = new p5.Gain();
  noiseGain.connect();//connect to p5.sound
  noiseGain.setInput(mrNoisy);
  noiseGain.amp(0.2);
  //-- NOISE ENVELOPE------------
  env = new p5.Envelope();
  mrNoisy.amp(env);
  mrNoisy.pan(0);
  //--NOISE REVERB ----
  noiseReverb = new p5.Reverb();
  noiseReverb.process(mrNoisy, 9, 8, false);
  //console.log(frameCount);
  noiseReverb.amp(0.9);
  //console.log(mrNoisy.amp);


  //--VOICE 4--
  //saw = new p5.Oscillator('sawtooth');
  //saw.scale(0.2, 0.2, 0.2, 0.2);
  //saw.amp(env);


  // //-----UI ELEMENTS------------------------
  // //-------SLIDER------------------------
  // //--MASTER VOLUME--
  // function masterVol() {
  //   setVolume = createSlider(-60, 0, -10, 0); //-60dB max
  //   setVolume.position(130, 20);
  //   setVolume.size(200);
  //   setVolume.input(function () {
  //     window.masterVolume(pow(10, setVolume.value() / 20), 0.01);
  //   });
  // }
  // masterVol();

  // //-- VOICE 1 VOLUME--
  // function synthDeepSlider() {
  //   synthVolumeDeep = createSlider(-60, 0, -10, 0); //-60dB max
  //   synthVolumeDeep.position(130, 60);
  //   synthVolumeDeep.size(200);
  //   synthVolumeDeep.input(function () {
  //     monoSynthDeep.amp(pow(10, synthVolumeDeep.value() / 20), 0.01);
  //   });
  // }
  // synthDeepSlider();

  // //-- VOICE 2 VOLUME--
  // function synthMidSlider() {
  //   synthVolumeMid = createSlider(-60, 0, -10, 0); //-60dB max
  //   synthVolumeMid.position(130, 100);
  //   synthVolumeMid.size(200);
  //   synthVolumeMid.input(function () {
  //     monoSynthMid.amp(pow(10, synthVolumeMid.value() / 20), 0.01);
  //   });
  // }
  // synthMidSlider();

  // //-- VOICE 3 VOLUME--
  // function synthHighSlider() {
  //   synthVolumeHigh = createSlider(-60, 0, -10, 0); //-60dB max
  //   synthVolumeHigh.position(130, 140);
  //   synthVolumeHigh.size(200);
  //   synthVolumeHigh.input(function () {
  //     monoSynthHigh.amp(pow(10, synthVolumeHigh.value() / 20), 0.01);
  //   });
  // }
  // synthHighSlider();


  //Stops Visuals
  noLoop();
}
//---------- CIRCLES --------



function draw() {
  clear();
  background(0);
  //--------BACKGROUND----------


  //--------BREATHING-----------
  breathe();
  //--------CIRCLES-------------
  circles.forEach(c => {
    c.update()
    c.redraw()
  })

  // if (spaceCount < max) {
  //   fill(random(255), random(255), random(255), random(255));
  //   ellipse(random(windowWidth), random(windowHeight), random(1, 10));
  //   spaceCount++
  // }

  // //--------LABELS------------
  // text("All", 100, 20);
  // text("Voice 1", 100, 60);
  // text("Voice 2", 100, 100);
  // text("Voice 3", 100, 140);
}



// TRACK 1----------------------------
function trackOne(time) {
  let randomNote = random(notePatternDeep);
  let note = midiToFreq(randomNote);
  let velocity = random(0.5, 0.9);
  circles.push(new Circle());

  // trackOneRandomTrigger = random(trackOnePattern);
  // console.log(trackOneRandomTrigger);

  monoSynthDeep.play(note, velocity, time);
  monoSynthDeep.setADSR(0.01, 1, 1, 1);
}

// TRACK 2----------------------------
function trackTwo(time) {
  let randomNote = random(notePatternMid);
  let note = midiToFreq(randomNote);
  let velocity = random(0.5, 0.9);
  circles.push(new Circle());

  monoSynthMid.play(note, velocity, time);
  monoSynthMid.setADSR(1, 2, 1, 2);
}

// TRACK 3----------------------------
function trackThree(time) {
  let randomNote = random(notePatternHigh);
  let note = midiToFreq(randomNote);
  let velocity = random(0.1, 0.9);
  circles.push(new Circle());

  //let attack = random(0.01, 0.09);
  //let decay = random(1, 3);
  //console.log(attack);
  //monoSynthHigh.pan(-1, 4);
  monoSynthHigh.setADSR(0.1, 0.1, 0, 1);
  monoSynthHigh.play(note, velocity, time);
}

// TRACK NOISE----------------------------
function trackNoise() {
  mrNoisy.start();
  env.setADSR(4, 0.7, 0.7, 4);
  env.play();
}

// TRACK Bass----------------------------
function trackBass(time) {
  let randomNote = random(notePatternBass);
  let note = midiToFreq(randomNote);
  let velocity = random(0.1, 0.9);
  //let attack = random(0.01, 0.09);
  //let decay = random(0.01, 0.09);
  //console.log(attack);
  //monoSynthHigh.pan(-1, 4);
  monoSynthBass.play(note, velocity, time);
  monoSynthBass.setADSR(0.01, 8, 0, 0);
}

// TRACK 5----------------------------
// function trackSaw(time) {
//   // let randomNote = random(notePatternSaw);
//   // let note = midiToFreq(randomNote);
//   // //env.set(4, 0.1, 1, 0.1, 2, 0.1);
//   // saw.pan(1.0);
//   // saw.start();
//   // //saw.play(note, 0.5, time);
//   // saw.setADSR(0.7, 3, 1, 1);
// }

//PLAY PARTS----------------------------
// function playMyPart() {
//   if (partOne.isPlaying) {
//     partOne.stop();
//     mrNoisy.stop();
//     noLoop();
//   } else {
//     partOne.start();
//     partOne.loop();
//     loop();
//     mrNoisy.start();
//   }
// }

function playScore() {
  userStartAudio();

  if ((partOne.isPlaying) || (partTwo.isPlaying)) {
    noLoop();
    scoreOne.stop();
    mrNoisy.stop();

  } else {
    scoreOne.start();
    scoreOne.loop();
    loop();
    mrNoisy.start();
  }
}
