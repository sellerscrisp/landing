const res = Math.ceil(window.innerHeight / 60);
let w = Math.ceil(window.innerWidth / res);
let h = Math.ceil(window.innerHeight / res);
const $b = document.querySelector('body');
const $c = document.createElement('canvas');
const ctx = $c.getContext('2d');
$c.width = window.innerWidth;
$c.height = window.innerHeight;
$b.appendChild($c);

const speed = .0025;

function lerp(start, end, time) {
  return start * (1 - time) + end * time;
}

function setSize() {
  w = Math.ceil(window.innerWidth / res);
  h = Math.ceil(window.innerHeight / res);
  $c.width = window.innerWidth;
  $c.height = window.innerHeight;
}

let progress = 0;

noise.seed(Math.random());

let winY = winX = 0;
let diffx = diffy = 0;
acceleration = 0.001;
window.addEventListener('mousemove', e => {
  /*diffx = (e.pageX - winX);
  diffy = (e.pageY - winY);
  
  diffx += diffx * acceleration;
  winY += diffy * acceleration;*/

  winX = e.pageX / window.innerWidth;
  winY = e.pageY / window.innerHeight;
});



let baseColor = Math.random() * 360;
let i = 0;
function doit() {
  //const dayprogress = (new Date()).getHours() / 24;
  //console.log(dayprogress)
  progress += speed;
  i += .25;
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const sim = noise.simplex3(winX * -.25 + (progress + x) / (w * 1.25), y / (h * 1.5), winY * .25 + progress);
      ctx.fillStyle = `hsl(3,85%,${61 + Math.abs(sim) * 38 + Math.random() * 1.25}%)`;
      //hsl(3, 85%, 61%)
      // ${(Math.random() * 11) + ((i + baseColor + 111 * Math.abs(sim) % 30) % 360)}
      ctx.fillRect(x * res, y * res, res, res);
    }
  }
  requestAnimationFrame(doit);
}

doit();

document.addEventListener('click', function () {
  baseColor = Math.random() * 360;
  noise.seed(Math.random());
});


setSize();

window.addEventListener('resize', setSize);