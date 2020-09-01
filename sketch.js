
//---------- AUDIO ----------------------------
let partOne;
let trackOnePattern = [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1];
let trackTwoPattern = [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0];
let trackThreePattern = [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1];
let trackNoisePattern = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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

  //--CANVAS------------
  let cnv = createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  // PLAY / PAUSE
  cnv.mousePressed(playMyPart);


  //--PRASES------------
  let trackOnePhrase = new p5.Phrase('trackOne', trackOne, trackOnePattern);
  let trackTwoPhrase = new p5.Phrase('trackTwo', trackTwo, trackTwoPattern);
  let trackThreePhrase = new p5.Phrase('trackThree', trackThree, trackThreePattern);
  let trackNoisePhrase = new p5.Phrase('trackNoise', trackNoise, trackNoisePattern);
  //let trackSawPhrase = new p5.Phrase('trackSaw', trackSaw, trackSawPattern);
  let trackBassPhrase = new p5.Phrase('trackBass', trackBass, trackBassPattern);
  //
  //--PARTS------------
  partOne = new p5.Part(8, 1 / 4);
  partOne.addPhrase(trackOnePhrase);
  partOne.addPhrase(trackTwoPhrase);
  partOne.addPhrase(trackThreePhrase);
  // partOne.addPhrase(trackBassPhrase);
  partOne.addPhrase(trackNoisePhrase);
  // partOne.addPhrase(trackSawPhrase);
  partOne.setBPM(120);
  //partOne.loop();

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
  voice3Delay = new p5.Delay();
  voice3Delay.setType("pingPong");
  voice3Delay.process(monoSynthHigh, 3 / 4, 0.6, 3000);
  voice3Delay.amp(0.9);
  //--VOICE 3 REVERB ----
  voice3reverb = new p5.Reverb();
  voice3reverb.process(monoSynthHigh, 9, 8, false);
  voice3reverb.amp(0.9);

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


  //--DELAY processing--
  delay = new p5.Delay();
  delay.setType("pingPong");
  delay.process(monoSynthMid, 3 / 4, 0.5, 3000);
  delay.process(monoSynthHigh, 3 / 4, 0.6, 3000);
  delay.amp(0.9);

  //--REVERB processing--
  //reverb = new p5.Reverb();
  //reverb.process(monoSynthMid, 9, 8, false);
  // reverb.process(monoSynthHigh, 9, 8, false);
  // reverb.process(noiseGain, 9, 8, false);
  //reverb.amp(0.9);


  //--VOICE 4--
  //saw = new p5.Oscillator('sawtooth');
  //saw.scale(0.2, 0.2, 0.2, 0.2);
  //saw.amp(env);


  //-----UI ELEMENTS------------------------

  //--MASTER VOLUME--
  function masterVol() {
    setVolume = createSlider(-60, 0, -10, 0); //-60dB max
    setVolume.position(130, 20);
    setVolume.size(200);
    setVolume.input(function () {
      window.masterVolume(pow(10, setVolume.value() / 20), 0.01);
    });
  }
  masterVol();

  //-- VOICE 1 VOLUME--
  function synthDeepSlider() {
    synthVolumeDeep = createSlider(-60, 0, -10, 0); //-60dB max
    synthVolumeDeep.position(130, 60);
    synthVolumeDeep.size(200);
    synthVolumeDeep.input(function () {
      monoSynthDeep.amp(pow(10, synthVolumeDeep.value() / 20), 0.01);
    });
  }
  synthDeepSlider();

  //-- VOICE 2 VOLUME--
  function synthMidSlider() {
    synthVolumeMid = createSlider(-60, 0, -10, 0); //-60dB max
    synthVolumeMid.position(130, 100);
    synthVolumeMid.size(200);
    synthVolumeMid.input(function () {
      monoSynthMid.amp(pow(10, synthVolumeMid.value() / 20), 0.01);
    });
  }
  synthMidSlider();

  //-- VOICE 3 VOLUME--
  function synthHighSlider() {
    synthVolumeHigh = createSlider(-60, 0, -10, 0); //-60dB max
    synthVolumeHigh.position(130, 140);
    synthVolumeHigh.size(200);
    synthVolumeHigh.input(function () {
      monoSynthHigh.amp(pow(10, synthVolumeHigh.value() / 20), 0.01);
    });
  }
  synthHighSlider();


  //Stops Visuals
  noLoop();
}
//---------- CIRCLES --------
function draw() {
  clear();
  background(0);

  circles.forEach(c => {
    c.update()
    c.redraw()
  })


  //--------LABELS------------
  text("All", 100, 20);
  text("Voice 1", 100, 60);
  text("Voice 2", 100, 100);
  text("Voice 3", 100, 140);


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
  let decay = random(1, 3);
  //console.log(attack);
  //monoSynthHigh.pan(-1, 4);
  monoSynthHigh.setADSR(1, decay, 1, 1);
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

// PLAY PARTS----------------------------
function playMyPart() {
  userStartAudio();

  if (partOne.isPlaying) {
    partOne.stop();
    mrNoisy.stop();
    noLoop();
  } else {
    partOne.start();
    partOne.loop();
    loop();
    mrNoisy.start();
  }

}
