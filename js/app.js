const game = document.getElementById('game');
const screenHeight = window.innerHeight;

// Settings
const SWEETSPOT_RANGE = 10;
const HOTZONE = 30;

let LOCKPICK_ANGLE = 0;
let LOCK_ANGLE = 0;
let UNLOCK_ZONE = {};
let rotateLock = setInterval( () => clearInterval(rotateLock) );
let rotateLockCounterClockwise = setInterval( () => clearInterval(rotateLockCounterClockwise) );
let rotateLockShaker = setInterval( () => clearInterval(rotateLockShaker) );

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
        'hotzoneStart': hotzoneStart,
        'hotzoneEnd': hotzoneEnd,
        'sweetspotStart': sweetspotStart,
        'sweetspotEnd': sweetspotEnd
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

// Setup controls
const setupControls = () => {

    // Setup mouse controls to move lockpick between -90 and 90 degrees
    game.addEventListener('mousemove', mouseControls);

    // Setup mouse click controls to attempt lock rotation
    lockRotationHandling();

}


// Mouse movement controls
const mouseControls = (e) => {
    const y = e.clientY;
    const yPercentageOfScreenHeight = y / screenHeight * 100;
    const minDegrees = -150;
    const maxDegrees = 150;
    LOCKPICK_ANGLE = minDegrees + (yPercentageOfScreenHeight / 100) * (maxDegrees - minDegrees);

    // Rotation cap
    LOCKPICK_ANGLE = LOCKPICK_ANGLE < -90 ? -90 : LOCKPICK_ANGLE;
    LOCKPICK_ANGLE = LOCKPICK_ANGLE > 90 ? 90 : LOCKPICK_ANGLE;

    console.log(LOCKPICK_ANGLE);

    // Set lockpick degrees
    const lockpick = document.getElementById('lockpick');
    lockpick.style.transform = `rotate(${LOCKPICK_ANGLE}deg)`;

}

// Lock rotation controls and handling
const lockRotationHandling = () => {

    // Reset lock angle
    LOCK_ANGLE = 0;

    // Get lock elements
    const lock = document.getElementById('lock');

    // Get unlockzone as variables
    const { hotzoneStart, hotzoneEnd, sweetspotStart, sweetspotEnd } = UNLOCK_ZONE;

    // Rotate lock
    window.addEventListener('keydown', (e) => {
        if (e.repeat) return;

        if (e.key === ' ') {

            // Disable mouse controls
            game.removeEventListener('mousemove', mouseControls);

            // Clear lock rotation counter clockwise
            clearInterval(rotateLockCounterClockwise);

            rotateLock = setInterval( () => {
                if( LOCKPICK_ANGLE >= sweetspotStart && LOCKPICK_ANGLE <= sweetspotEnd ) {

                    // Rotate further
                    LOCK_ANGLE++;
                    lock.style.transform = `rotate(${LOCK_ANGLE}deg)`;

                    // Player wins
                    if( LOCK_ANGLE >= 90 ) {
                        clearInterval(rotateLock);
                        alert('Player wins');
                    }

                } else if( LOCKPICK_ANGLE >= hotzoneStart && LOCKPICK_ANGLE <= hotzoneEnd ) {

                    // Rotate further
                    LOCK_ANGLE++;
                    lock.style.transform = `rotate(${LOCK_ANGLE}deg)`;

                    // TODO: Calculate distance and start shaking

                } else {

                    // Start shaking
                    startShaking();
                }
  
            }, 15);
        }
    });

    // Rotate lock counter clockwise
    window.addEventListener('keyup', (e) => {
        if (e.repeat) return;

        if (e.key === ' ') {

            // Stop shaking
            stopShaking();

            // Clear lock rotation clockwise
            clearInterval(rotateLock);

            // Enable mouse controls
            game.addEventListener('mousemove', mouseControls);

            rotateLockCounterClockwise = setInterval( () => {
                if( LOCK_ANGLE > 0 ) {
                    LOCK_ANGLE--;
                    lock.style.transform = `rotate(${LOCK_ANGLE}deg)`;
                } else {
                    clearInterval(rotateLockCounterClockwise);
                }
            }, 5);
        }
    } );

}

// On lock rotation calculate how much the lock can be rotated

// On lock rotation shake lock if not in the sweetspot and reduce lockpick health every x ms
const startShaking = () => {
    const lockImage = document.getElementById('lock-image');

    // Add shake animation
    lockImage.classList.add('shake');

    // Reduce lockpick health
    LOCKPICK_HEALTH--;
}


const stopShaking = () => {
    const lockImage = document.getElementById('lock-image');

    // Add shake animation
    lockImage.classList.remove('shake');
}

// If lockpick health is reduced to 0, break pick, reduce lockpicks with 1 and restart lock

// Setup mouse release function to pause lockpick health and lock rotates back to original state

// On lockpick rotation and is in the sweetspot, player wins

const start = async () => {

    // Set UNLOCK_ZONE global variable
    UNLOCK_ZONE = await generateUnlockZone();
    console.log(UNLOCK_ZONE);

    // Setup interface
    setupInterface();

    // Setup controls
    setupControls();

}

start();