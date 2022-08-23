const game = document.getElementById('game');

// Initialize lockpicks and lockpick health
let LOCKPICKS = 3;
let LOCKPICK_HEALTH = 100;

// Generate sweetspot and hotzone in degrees (between -90 and 90, by using floats)

// Initialize scene: Background, outer lock, lock, lockpick, kind of lock, amount of lockpicks left

// Setup mouse controls to move lockpick between -90 and 90 degrees

// Setup mouse click controls to attempt lock rotation

// On lock rotation calculate how much the lock can be rotated

// On lock rotation shake lock if not in the sweetspot and reduce lockpick health every x ms

// If lockpick health is reduced to 0, break pick, reduce lockpicks with 1 and restart lock

// Setup mouse release function to pause lockpick health and lock rotates back to original state

// On lockpick rotation and is in the sweetspot, player wins