// Annie Liu
// HCDE 439 Final Project'
// Description: For my final project I want to create an interactive
// website that will allow me to controll the speed of the servo motors
// in my light painting instrument.

// I referred to the in-class example code when writing this sketch. I
// modified the Web-to-Arduino keyboard example to meet the needs
// of this project.

// I modified the code here:
// https://github.com/machineagency/hcde439/blob/master/p5-examples-and-addons/hcde439-example3/sketch.js


var serial;             // variable to hold an instance of the serialport library
var portName = 'COM5'   // rename to the name of your port
var inData;             // variable to store data
let val = 3;            // val is the servo speed setting value


function setup() {
    serial = new p5.SerialPort();             // make a new instance of the serialport library
    serial.on('list', printList);             // set a callback function for the serialport list event
    serial.on('connected', serverConnected);  // callback for connecting to the server
    serial.on('open', portOpen);              // callback for the port opening
    serial.on('data', serialEvent);           // callback for when new data arrives
    serial.on('error', serialError);          // callback for errors
    serial.on('close', portClose);            // callback for the port closing

    serial.list();                            // list the serial ports
    serial.open(portName);                    // open a serial port

    createCanvas(2000, 1000);                 // create a 2000x1000 createCanvas
    textSize(50);                             // making the text size large
    textFont("Neue Kabel");                   // this is the font I want to use

    sliderServo = createSlider (1, 5, 3);     // create a slider with min val 1, max val 5, and default val 3
    sliderServo.position(505,280);            // position of the slider (x,y)
    sliderServo.style('width', '350px');      // width of the slider
}

// This is how we communicate to the Arduino.
function servoSlider_Arduino() {
  serial.write(val);                  // write the value of the servo speed setting to serial
}

// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
	// Display the list the console:
	print(i + " " + portList[i]);
    }
}

function serverConnected() {
    print('connected to server.');
}

function portOpen() {
    print('the serial port opened.')
}

function serialError(err) {
    print('Something went wrong with the serial port. ' + err);
}

function portClose() {
    print('The serial port closed.');
}

function serialEvent() {
    if (serial.available()) {               // if there's serial data
	     inData = serial.read();              // read the data
	     console.log("got back " + inData);   // log the read data
    }
}

function draw() {
    background(0);                                  // black background
    fill(255);                                      // white text
    textSize(50);                                   // large text
    text("light painting iii (2021)", 100, 120);    // project title
    textSize(25);                                   // small text
    text("Experiments by Annie Liu", 300, 170);     // light painting experiments by me !

    textSize(40);                                   // larger text
    fill(220, 46, 118);                             // pink text
    text('Servo Speed', 100, 300);                  // Servo label
    text('Lighting', 100, 400);                     // Lighting label

    fill(255);                                      // white text
    textSize(30);                                   // smaller text
    text('Slow', 400, 297);                         // slider label
    text('Fast', 900, 297);                         // slider label
    text('To be continued', 400, 400);              // lighting label
    let currentVal = sliderServo.value();           // make currentVal the value of the servo slider
    if (currentVal != val) {                        // if the currentVal isn't equal to val (that means val changed),
      val = currentVal;                             // reassign val's value to currentval
      servoSlider_Arduino();                        // tell Arduino to change speed of servo through serial input
    }
}
