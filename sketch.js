/*-------------------------FINAL PROJECT WBS CODING SCHOOL - FULLSTACK WEB DEVELOPMENT-------------

This is an experimental audio-visual web wpplication
The goual of thsi project is to create calming random melodies and visuals using p5.js
The sounds will be generated by synthesis adding a variety of delays and reverbs without using samples

Just klick play and enjoy as long as you like

*/


//---------- SCORE PATTERN TRACKS -----------------------------------
let scoreOne;
let partOne, partTwo, partThree, partFour, partFive, partSix, partSeven, partEight, partNine, partTen, partTest;

let trackLowPatternA = [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
let trackMidPatternA = [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
let trackHighPatternA = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
let trackHighDistPatternA = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let trackBassPatternA = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let trackNoisePattern = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let trackLowPatternB = [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
let trackMidPatternB = [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0];
let trackHighPatternB = [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1];
let trackHighDistPatternB = [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0];
let trackBassPatternB = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];



//--VOICES, ENVELOPES, MIXING----------------
let monoSynthDeep, monoSynthMid, monoSynthHigh, monoSynthBass,
  mrNoisy, noiseEnvelope, monoSynthDist, voice2Delay, voice2Reverb,
  V1Dist, V1Filter, noiseGain;


//var lfo = new Tone.LFO("4n", 400, 4000);
//lfo.connect(filter.frequency);



//--NOTE PATTERN-------------
//---------------------------
//-----Harmonic Minor---
// let notePatternDeep = [45, 47, 48, 50, 52, 53, 56];
// let notePatternMid = [57, 59, 60, 62, 64, 65, 68]
// let notePatternHigh = [69, 71, 72, 74, 76, 77, 80];
// let notePatternBass = [33, 35, 42];

//-----C Major---------
let notePatternDeep = [48, 50, 52, 50, 53, 55, 57];//[48, 52, 55, 59];
let notePatternMid = [60, 62, 64, 65, 67, 69, 71]//[60, 64, 67, 71];
let notePatternHigh = [72, 74, 76, 77, 79, 81, 83];//[72, 76, 79, 83];
let notePatternDist = [72, 74, 76, 77, 79, 81, 83];
let notePatternBass = [29, 33, 36, 40];


//---------- VISUALS --------
const circles = [];

//-----------SLIDER----------
//let setVolume;

//--SETUP--------------------
function setup() {
  masterVolume(0.9);

  //--CANVAS-----------------
  let cnv = createCanvas(windowWidth, windowHeight);
  noStroke();
  cnv.mousePressed(playScore);

  // PLAY / PAUSE BUTTON------
  // button = createButton('Start/Pause');
  // button.position(19, 19);
  // button.mousePressed(playScore);
  //textAlign(CENTER, CENTER);

  //--PRASES-----------------
  let trackOnePhrase = new p5.Phrase('trackOne', trackOne, trackLowPatternA);
  let trackTwoPhrase = new p5.Phrase('trackTwo', trackTwo, trackMidPatternA);
  let trackThreePhraseA = new p5.Phrase('trackThree', trackThree, trackHighPatternA);
  let trackThreePhraseB = new p5.Phrase('trackThree', trackThree, trackHighPatternB);
  let trackFourPhraseA = new p5.Phrase('trackFour', trackFour, trackHighDistPatternA);
  let trackFourPhraseB = new p5.Phrase('trackFour', trackFour, trackHighDistPatternB);
  let trackNoisePhrase = new p5.Phrase('trackNoise', trackNoise, trackNoisePattern);
  let trackBassPhrase = new p5.Phrase('trackBass', trackBass, trackBassPatternA);

  //--PARTS-------------------
  //--ONE-------------------
  partOne = new p5.Part(32, 1 / 8);
  partOne.addPhrase(trackNoisePhrase);

  //partOne.setBPM(60);

  //--TWO-------------------
  partTwo = new p5.Part(32, 1 / 8);
  partTwo.addPhrase(trackTwoPhrase);
  partTwo.addPhrase(trackNoisePhrase);

  //partTwo.setBPM(60);

  //--THREE-------------------
  partThree = new p5.Part(64, 1 / 8);
  partThree.addPhrase(trackOnePhrase);
  partThree.addPhrase(trackTwoPhrase);
  partThree.addPhrase(trackNoisePhrase);

  //--FOUR-------------------
  partFour = new p5.Part(64, 1 / 8);
  partFour.addPhrase(trackOnePhrase);
  partFour.addPhrase(trackTwoPhrase);
  partFour.addPhrase(trackThreePhraseA);
  partFour.addPhrase(trackNoisePhrase);

  //--FIVE-------------------
  partFive = new p5.Part(64, 1 / 8);
  partFive.addPhrase(trackOnePhrase);
  partFive.addPhrase(trackTwoPhrase);
  partFive.addPhrase(trackThreePhraseA);
  partFive.addPhrase(trackNoisePhrase);
  partFive.addPhrase(trackBassPhrase);

  //--SIX-------------------
  partSix = new p5.Part(64, 1 / 8);
  partSix.addPhrase(trackOnePhrase);
  partSix.addPhrase(trackTwoPhrase);
  partSix.addPhrase(trackThreePhraseA);
  partSix.addPhrase(trackFourPhraseA);
  partSix.addPhrase(trackNoisePhrase);
  partSix.addPhrase(trackBassPhrase);

  //--SEVEN-------------------
  partSeven = new p5.Part(128, 1 / 8);
  partSeven.addPhrase(trackOnePhrase);
  partSeven.addPhrase(trackTwoPhrase);
  partSeven.addPhrase(trackThreePhraseA);
  partSeven.addPhrase(trackFourPhraseA);
  partSeven.addPhrase(trackNoisePhrase);
  partSeven.addPhrase(trackBassPhrase);

  //--EIGHT-------------------
  partEight = new p5.Part(64, 1 / 8);
  partEight.addPhrase(trackOnePhrase);
  partEight.addPhrase(trackTwoPhrase);
  partEight.addPhrase(trackThreePhraseA);
  partEight.addPhrase(trackNoisePhrase);
  partEight.addPhrase(trackBassPhrase);

  //--NINE-------------------
  partNine = new p5.Part(64, 1 / 8);
  partNine.addPhrase(trackTwoPhrase);
  partNine.addPhrase(trackThreePhraseA);
  partNine.addPhrase(trackNoisePhrase);
  partNine.addPhrase(trackBassPhrase);

  //--TEN-------------------
  partTen = new p5.Part(64, 1 / 8);
  partTen.addPhrase(trackThreePhraseA);
  partTen.addPhrase(trackNoisePhrase);
  partTen.addPhrase(trackBassPhrase);

  //--TESTING----------------
  partTest = new p5.Part(32, 1 / 8);
  partTest.addPhrase(trackOnePhrase);

  //--SCORE-------------------------
  //--------------------------------
  scoreOne = new p5.Score(partOne, partTwo, partThree, partFour, partFive, partSix, partSeven, partEight, partNine, partTen);
  scoreOne.setBPM(60);

  //scoreOne.loop();

  //--VOICE 1-----------------------
  //--------------------------------
  monoSynthDeep = new p5.MonoSynth();
  monoSynthDeep.amp(0.9);
  monoSynthDeep.setADSR(1, 2, 1, 2);
  //--VOICE 1 GAIN NODE-----------
  monoSynthDeep.disconnect();//disconnect from P5.sound
  voice1Gain = new p5.Gain();
  voice1Gain.connect();//connect to p5.sound
  voice1Gain.setInput(monoSynthDeep);
  voice1Gain.amp(0.9);
  //--VOICE 1 --- DISTORTION ----
  // V1Dist = new p5.Distortion(0.50, '2x');
  // V1Dist.process(voice1Gain);
  // V1Dist.amp(0.3);
  //--VOICE 1 --- DELAY ----
  voice1Delay = new p5.Delay();
  voice1Delay.setType("pingPong");
  voice1Delay.process(voice1Gain, 15 / 16, 0.6, 3000);
  voice1Delay.amp(0.9);
  //--VOICE 2 REVERB ----
  voice1Reverb = new p5.Reverb();
  voice1Reverb.process(voice1Gain, 9, 8, false);
  voice1Reverb.amp(0.9);






  //--VOICE 2-----------------------
  //--------------------------------
  monoSynthMid = new p5.MonoSynth();
  monoSynthMid.amp(0.9);
  monoSynthMid.setADSR(1, 2, 1, 2);
  //--VOICE 2 GAIN NODE-----------
  monoSynthMid.disconnect();//disconnect from P5.sound
  voice2Gain = new p5.Gain();
  voice2Gain.connect();//connect to p5.sound
  voice2Gain.setInput(monoSynthMid);
  voice2Gain.amp(0.7);
  //--VOICE 2 DELAY ----
  voice2Delay = new p5.Delay();
  voice2Delay.setType("pingPong");
  voice2Delay.process(voice2Gain, 15 / 16, 0.6, 3000);
  voice2Delay.amp(0.9);
  //--VOICE 2 REVERB ----
  voice2Reverb = new p5.Reverb();
  voice2Reverb.process(voice2Gain, 9, 8, false);
  voice2Reverb.amp(0.9);


  //--VOICE 3-----------------------
  //--------------------------------
  monoSynthHigh = new p5.MonoSynth();
  monoSynthHigh.amp(0.6);
  monoSynthHigh.setADSR(0.2, 1, 1, 1);
  //--VOICE 3 GAIN NODE-----------
  monoSynthHigh.disconnect();//disconnect from P5.sound
  voice3Gain = new p5.Gain();
  voice3Gain.connect();//connect to p5.sound
  voice3Gain.setInput(monoSynthHigh);
  voice3Gain.amp(0.7);
  //--VOICE 3 DELAY ----
  voice3Delay = new p5.Delay();
  voice3Delay.setType("pingPong");
  voice3Delay.process(voice3Gain, 15 / 16, 0.5, 3000);
  voice3Delay.amp(0.9);
  // //--VOICE 3 REVERSE REVERB ----
  voice3revReverb = new p5.Reverb();
  voice3revReverb.process(voice3Gain, 5, 2, true);
  voice3revReverb.amp(0.9);
  // //--VOICE 3 REVERB ----
  voice3reverb = new p5.Reverb();
  voice3reverb.process(voice3Gain, 5, 10, false);
  voice3reverb.amp(0.9);
  voice3reverb.drywet(0.9);
  //--COMPRESSOR--
  comp = new p5.Compressor();
  comp.process(voice3revReverb);

  //--VOICE 4 DIST-----------------------
  //--------------------------------
  monoSynthDist = new p5.MonoSynth();
  monoSynthDist.amp(0.9);
  monoSynthDist.setADSR(2, 1, 5, 1);
  //--VOICE 3 GAIN NODE-----------
  monoSynthDist.disconnect();//disconnect from P5.sound
  voice4Gain = new p5.Gain();
  voice4Gain.connect();//connect to p5.sound
  voice4Gain.setInput(monoSynthDist);
  voice4Gain.amp(0.6);
  //--VOICE 4 --- DISTORTION ----
  voice4Dist = new p5.Distortion(0.10, '2x');
  voice4Gain.disconnect();//disconnect from voice 4 gain node
  voice4Dist.process(voice4Gain);
  voice4Dist.amp(0.3);
  // //--VOICE 3 REVERB ----
  voice4reverb = new p5.Reverb();
  voice4Dist.disconnect();
  voice4reverb.process(voice4Dist, 5, 2, false);// 3 second reverbTime, decayRate of 2%
  voice4reverb.amp(0.9);
  let dryWet = 1;
  voice4reverb.drywet(dryWet);

  //--VOICE BASS-----------------------
  monoSynthBass = new p5.MonoSynth();
  monoSynthBass.amp(0.7);
  monoSynthBass.setADSR(0.01, 4, 0, 0);
  //let attack = random(0.01, 0.09);
  //let decay = random(0.01, 0.09);
  //--VOICE BASS GAIN NODE-----------
  monoSynthBass.disconnect();//disconnect from P5.sound
  voiceBassGain = new p5.Gain();
  voiceBassGain.connect();//connect to p5.sound
  voiceBassGain.setInput(monoSynthBass);
  voiceBassGain.amp(0.7);
  //--VOICE BASS --- DISTORTION ----
  vBassDist = new p5.Distortion(0.02, 'none');
  vBassDist.process(voiceBassGain);
  vBassDist.amp(0.3);
  //--VOICE BASS REVERB ----
  // vBassDelay = new p5.Delay();
  // vBassDelay.setType("pingPong");
  // vBassDelay.process(voiceBassGain, 6 / 9, 0.6, 10000);
  // vBassDelay.amp(0.9);
  //--VOICE BASS REVERB ----
  vBassReverb = new p5.Reverb();
  vBassReverb.process(voiceBassGain, 3, 3, false);
  vBassReverb.amp(0.9);

  //--NOISE----------------------
  mrNoisy = new p5.Noise("pink");
  //--NOISE GAIN MIXER-----------
  mrNoisy.disconnect();//disconnect from P5.sound
  noiseGain = new p5.Gain();
  noiseGain.connect();//connect to p5.sound
  noiseGain.setInput(mrNoisy);
  noiseGain.amp(0.6);
  //-- NOISE ENVELOPE------------
  noiseEnvelope = new p5.Envelope();
  mrNoisy.amp(noiseEnvelope);
  //--FILTER-----------
  noiseFilter = new p5.BandPass();
  noiseGain.disconnect();//disconnect from noise gain node
  noiseFilter.process(noiseGain, 6000, 2);
  noiseFilter.amp(0.4);
  //--NOISE REVERB ----
  noiseReverb = new p5.Reverb();
  noiseFilter.disconnect();//disconnect from noise filter
  noiseReverb.process(noiseFilter, 9, 8, false);
  noiseReverb.amp(0.5);
  //--NOISE DELAY ----
  noiseDelay = new p5.Delay();
  noiseDelay.setType("pingPong");
  noiseDelay.process(noiseReverb, 15 / 16, 0.6, 10000);
  noiseDelay.amp(0.9);

  //Stops Visuals at loading page
  noLoop();
}
//---------- CIRCLES --------
function draw() {
  clear();
  background(255, 255, 255);
  //--------BREATHING-----------
  breathe();
  //--------CIRCLES-------------
  circles.forEach(c => {
    c.update()
    c.redraw()
  })
}



// TRACK 1----------------------------
function trackOne(time) {
  let randomNote = random(notePatternDeep);
  let note = midiToFreq(randomNote);
  let velocity = random(0.5, 0.9);
  //---VISUALS-----
  circles.push(new Circle());
  monoSynthDeep.play(note, velocity, time);
}

// TRACK 2----------------------------
function trackTwo(time) {
  let randomNote = random(notePatternMid);
  let note = midiToFreq(randomNote);
  let velocity = random(0.5, 0.9);
  //---VISUALS-----
  circles.push(new Circle());
  monoSynthMid.play(note, velocity, time);
}

// TRACK 3----------------------------
function trackThree(time) {
  let randomNote = random(notePatternHigh);
  let note = midiToFreq(randomNote);
  let velocity = random(0.1, 0.9);
  //---VISUALS-----
  circles.push(new Circle());
  //monoSynthHigh.pan(-1, 4);
  monoSynthHigh.play(note, velocity, time);
}

// TRACK 4----------------------------
function trackFour(time) {
  let randomNote = random(notePatternDist);
  let noteA = midiToFreq(randomNote);
  //let noteC = midiToFreq(randomNote);
  //let velocity = random(0.1, 0.9);
  //---VISUALS-----
  circles.push(new Circle());
  //monoSynthHigh.pan(-1, 4);
  monoSynthDist.play(noteA, 0.9, time);
}

// TRACK NOISE----------------------------
function trackNoise() {
  mrNoisy.start();
  noiseEnvelope.setADSR(5, 0.7, 0.7, 4);
  noiseEnvelope.play();
}

// TRACK Bass----------------------------
function trackBass(time) {
  let randomNote = random(notePatternBass);
  let note = midiToFreq(randomNote);
  //let velocity = random(0.1, 0.9);
  //monoSynthHigh.pan(-1, 4);
  monoSynthBass.play(note, 0.6, time);
}


function playScore() {
  userStartAudio();
  if ((partOne.isPlaying) ||
    (partTwo.isPlaying) ||
    (partThree.isPlaying) ||
    (partFour.isPlaying) ||
    (partFive.isPlaying) ||
    (partSix.isPlaying) ||
    (partSeven.isPlaying) ||
    (partEight.isPlaying) ||
    (partNine.isPlaying) ||
    (partTen.isPlaying)
  ) {
    noLoop();
    scoreOne.pause();
    //scoreOne.stop();
    mrNoisy.stop();
  } else {
    scoreOne.start();
    scoreOne.loop();
    loop();
    mrNoisy.start();
  }
} //(partTest.isPlaying)

