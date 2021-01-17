/*
  Annie Liu
  HCDE 439 Physical Computing
  A1 Blink!

  Description: This program blinks 5 LEDs, one after the other. Each LED independently
  blinks on for 100 milliseconds and then off for 100 milliseconds, before the next LED blinks.
  I have my 5 LEDs arranged in order and in a row on my breadboard, from pins 9 to 13.

  This code was built off of the built-in example, Blink; this example code is
  in the public domain.
  http://www.arduino.cc/en/Tutorial/Blink
*/

// Setting up. This setup function only runs once when the board is powered.
void setup() {
  // Instead of writing a line for each of the 5 pins, I wrote a for
  // loop to initialize pins 9 through 13 as an output. The variable,
  // i, represents the pin number.
  for(int i=9; i<=13; i++){  // when i==14, the for loop is finished
    pinMode(i, OUTPUT);      // initialize pin i as an output
  }
}

// After setting up, this loop function will run forever. I want the 5
// LEDs that I have set up in a row on my breadboard to blink one by one
// down the row, and then when it reaches the end of the row at the fifth LED,
// to blink one by one back up to the first LED. I wrote 2 for loops to 
// execute this pattern.
void loop() {
  // In the first for loop, I go down the row of LEDs, beginning at pin 9 and
  // ending at pin 13, turning each LED on for 100 milliseconds, then off for
  // 100 milliseconds. 
  for(int i = 9; i<=13; i++) {  // when i==14, the for loop is finished
  digitalWrite(i, HIGH);  // Turn the LED on
  delay(100);             // Wait for 100 milliseconds
  digitalWrite(i, LOW);   // Turn the LED off
  delay(100);             // Wait for 100 milliseconds.
  }

  // To give the appearance that the LEDs are blinking up and down the row
  // continuously, the purpose of the second for loop is to the blink the middle
  // 3 LEDs 'back up the row' before the first for loop function runs again.
  // We start by blinking the LED connected to pin 12, then we blink our way up
  // to the LED connected at pin 10.
  for(int i = 12; i>=10; i--) {  // when i==9, the for loop is finished
  digitalWrite(i, HIGH);  // Turn the LED on
  delay(100);             // Wait for 100 milliseconds
  digitalWrite(i, LOW);   // Turn the LED off
  delay(100);             // Wait for 100 milliseconds
  }
}
