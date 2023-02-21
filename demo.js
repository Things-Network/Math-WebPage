function initDemo() {
  var container = document.getElementsByClassName('demo-image-container')[0];
  var images = container.getElementsByTagName('img');

  var dots = document.getElementsByClassName('demo-carousel-dot');
  for (var i = 0; i < dots.length; ++i) {
    dots[i].onclick = staticBind(onClickDot, dots, images, i);
  }
  updateApm();
}

function onClickDot(dots, images, index) {
  selectedIndex = index;
  for (var i = 0; i < dots.length; ++i) {
    if (i == index) {
      addClassName(dots[i], 'selected');
      addClassName(images[i], 'selected');
    } else {
      removeClassName(dots[i], 'selected');
      removeClassName(images[i], 'selected');
    }
  }
}

var selectedIndex = 0;

var clicks = [];
var numClicks = 0;

function moveCarousel() {
  var container = document.getElementsByClassName('demo-image-container')[0];
  var images = container.getElementsByTagName('img');
  var dots = document.getElementsByClassName('demo-carousel-dot');
  selectedIndex = (selectedIndex + 1) % dots.length;
  onClickDot(dots, images, selectedIndex);
  ++numClicks;
  var now = new Date().getTime();
  clicks.push(now);
}

function updateApm() {
  var now = new Date().getTime();
  while (clicks[0] < now - 4000) { clicks.shift();  }
  var interval = (now - clicks[0]) / 1000;
  var apm = 0;
  if (interval > 0 && clicks.length > 1) {
    apm = Math.floor(60*clicks.length / interval);
  }
  var counter = document.getElementsByClassName('apm')[0];
  if (apm > 200 && numClicks > 20) {
    counter.style.display = 'block';
  }
  counter.innerHTML = 'APM: ' + apm;
  setTimeout(updateApm, 500);
}