const game = document.getElementById('game');

// Settings
const SWEETSPOT_RANGE = 10;
const HOTZONE = 30;
let UNLOCK_ZONE = {};

// Initialize lockpicks and lockpick health
let LOCKPICKS = 3;
let LOCKPICK_HEALTH = 100;

// Generate sweetspot and hotzone in degrees (between -90 and 90, by using floats)
const generateUnlockZone = async () => {

    const sweetspotStart = parseFloat((Math.random() * ((90 - SWEETSPOT_RANGE) - -90) + -90).toFixed(2));
    const sweetspotEnd = sweetspotStart + SWEETSPOT_RANGE;
    const hotzoneStart = sweetspotStart - HOTZONE;
    const hotzoneEnd = sweetspotEnd + HOTZONE;

    return {
        'hotzone_start': hotzoneStart,
        'hotzone_end': hotzoneEnd,
        'sweetspot_start': sweetspotStart,
        'sweetspot_end': sweetspotEnd
    }

}

// Initialize scene: Background, outer lock, lock, lockpick, kind of lock, amount of lockpicks left
const setupInterface = () => {

    // Lock
    const outerLock = document.createElement('div');
    const lock = document.createElement('div');
    const lockImage = document.createElement('img');

    outerLock.id = 'outerlock';
    lock.id = 'lock';
    lockImage.id = 'lock-image';
    lockImage.src = './assets/inner-lock.png';

    // Lockpick
    const lockpickContainer = document.createElement('div');
    const lockpick = document.createElement('div');

    lockpickContainer.id = 'lockpick-container';
    lockpick.id = 'lockpick';

    // Append elements to #game
    lockpickContainer.append(lockpick);
    lock.append(lockImage, lockpickContainer);
    outerLock.append(lock);
    game.append(outerLock);

}

// Setup mouse controls to move lockpick between -90 and 90 degrees

// Setup mouse click controls to attempt lock rotation

// On lock rotation calculate how much the lock can be rotated

// On lock rotation shake lock if not in the sweetspot and reduce lockpick health every x ms

// If lockpick health is reduced to 0, break pick, reduce lockpicks with 1 and restart lock

// Setup mouse release function to pause lockpick health and lock rotates back to original state

// On lockpick rotation and is in the sweetspot, player wins

const start = async () => {

    // Set UNLOCK_ZONE global variable
    UNLOCK_ZONE = await generateUnlockZone();

    // Setup interface
    setupInterface();

}

start();