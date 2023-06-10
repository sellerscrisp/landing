// Calculate the number of rows needed based on window height divided by 50
const res = Math.ceil(window.innerHeight / 50);

// Calculate the initial number of columns based on window width divided by res
let w = Math.ceil(window.innerWidth / res);

// Calculate the initial number of rows based on window height divided by res
let h = Math.ceil(window.innerHeight / res);

// Select the body element from the HTML document
const $b = document.querySelector('body');

// Create a canvas element
const $c = document.createElement('canvas');

// Get the 2D rendering context of the canvas
const ctx = $c.getContext('2d');

// Set the width and height of the canvas to match the window size
$c.width = window.innerWidth;
$c.height = window.innerHeight;

// Append the canvas to the body
$b.appendChild($c);

// Set the speed of the animation
const speed = 0.0025;

// Function to interpolate between two values
function lerp(start, end, time) {
  return start * (1 - time) + end * time;
}

// Function to update the size of the canvas based on the window size
function setSize() {
  // Update the number of columns and rows based on the new window size
  w = Math.ceil(window.innerWidth / res);
  h = Math.ceil(window.innerHeight / res);

  // Set the width and height of the canvas to match the new window size
  $c.width = window.innerWidth;
  $c.height = window.innerHeight;
}

// Initialize progress and randomize the noise seed
let progress = 0;
noise.seed(Math.random());

// Variables for tracking mouse position and acceleration
let winY = winX = 0;
let diffx = diffy = 0;
acceleration = 0.001;

// Event listener for mouse movement
window.addEventListener('mousemove', e => {
  // Calculate the difference in mouse position from the previous position
  // diffx = (e.pageX - winX);
  // diffy = (e.pageY - winY);

  // Apply acceleration to the difference values
  // diffx += diffx * acceleration;
  // winY += diffy * acceleration;

  // Normalize mouse position values between 0 and 1
  winX = e.pageX / window.innerWidth;
  winY = e.pageY / window.innerHeight;
});

// Initialize the base color and counter variable
let baseColor = Math.random() * 360;
let i = 0;

// Main animation function
function animate() {
  // Update the progress and counter variables
  progress += speed;
  i += 0.25;

  // Loop through each column and row
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      // Generate simplex noise value based on window position, progress, and coordinates
      const sim = noise.simplex3(winX * -0.25 + (progress + x) / (w * 1.25), y / (h * 1.5), winY * 0.25 + progress);

      // Calculate the color based on the noise value
      ctx.fillStyle = `hsl(34, 85%, ${61 + Math.abs(sim) * 50 + Math.random() * 1.25}%)`;

      // Draw a rectangle at the current position using the calculated color
      ctx.fillRect(x * res, y * res, res, res);
    }
  }

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Start the animation
animate();

// Event listener for click events to randomize the base color and noise seed
document.addEventListener('click', function () {
  baseColor = Math.random() * 360;
  noise.seed(Math.random());
});

// Initialize the canvas size
setSize();

// Event listener for window resize to update the canvas size
window.addEventListener('resize', setSize);