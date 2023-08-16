// Tweak At Your Own Risk. 
class DisableInspection{
  constructor(){
    this.disable = this.disable;
    this.disable();
  }
  disable(){
    document.body.addEventListener('contextmenu',function(e){
      e.preventDefault();
      alert('you cant get contextmenu in demo mode')
    })
    window.addEventListener('keydown',function(e){
      if(e.ctrlKey){
        e.preventDefault();
        this.location.reload();
      }
    })
  }
}
const restriction = new DisableInspection();
const exploreBtn = document.getElementById('explore-btn');
 exploreBtn.addEventListener('click',function(){
  this.parentElement.style.transform='translateX(5000px)';
  setTimeout(() => {
    this.parentElement.style.display = 'none';
  }, 1000);
  bgm.play();
  let debounceTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(onScroll, 40);
},{passive:true});

 })

 const scrollFactor = 100; // Adjust the scroll speed

 class BackgroundSFX{
    constructor(){
      this.sfx = document.getElementById('sfx-bg');
      this.muteBtn = document.getElementById('muteBtn');
      this.play = this.play;
      this.pause= this.pause;
      this.muteBtn.addEventListener('click',function(){
        bgm.check();
      })
    }

    play(){
      this.sfx.play();
      this.muteBtn.classList.add('playing');
    }
    pause(){
      this.sfx.pause();
      this.muteBtn.classList.remove('playing')
    }
    check(){
      if(!this.sfx.paused){
        this.pause();
      }
      else if(this.sfx.paused){
        this.play();
      }
    }
 }
const bgm = new BackgroundSFX();

const vid = document.getElementById('v0');
const setHeight = document.getElementById('set-height');
const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');
const c4 = document.getElementById('c4');
const c5 = document.getElementById('c5');

const bgBtn = document.getElementById('bg-player');
let totalPageY = 300;
let lastScrollY = 0;
let isScrolling = false;
let animationFrameId = null;

vid.addEventListener('loadedmetadata', function () {
  totalPageY = Math.floor(vid.duration) * 500;
  setHeight.style.height = totalPageY + 'px';
});

function onScroll() {
  lastScrollY = window.scrollY;
  if (!isScrolling) {
    animationFrameId = requestAnimationFrame(updateVideoPlayback);
    isScrolling = true;
  }
}

function updateVideoPlayback() {
  const scrollRatio = lastScrollY / totalPageY;
  const newTime = vid.duration * scrollRatio;

  if (newTime >= 0 && newTime <= vid.duration) {
    vid.currentTime = newTime;
  }

  check()
  isScrolling = false;
}
function scaleCardInRange(cardElement, start, end, progress) {
  if (progress >= start && progress <= end) {
    // cardElement.classList.add('show');
    const scale = 1.5 - (1.5 * (progress - start) / (end - start));
    cardElement.style.transform = `scale(${scale})`;
  } else if (progress > end) {
    // cardElement.classList.remove('show');
    cardElement.style.transform = 'scale(0)';
  } else {
    // cardElement.classList.remove('show');
    cardElement.style.transform = 'scale(0)';
  }
}

function check() {
  const progress = vid.currentTime / vid.duration;
  console.log(progress)
  scaleCardInRange(c1, 0.1, 0.2, progress);
  scaleCardInRange(c2, 0.3, 0.4, progress);
  scaleCardInRange(c3, 0.5, 0.6, progress);
  scaleCardInRange(c4, 0.7, 0.75, progress);
  scaleCardInRange(c5, 0.77, 0.85, progress);

  if(progress >0.95){
    document.getElementById('endScreen').style.transform = 'translateY(0px)';
    setHeight.style.height = '0px';
    document.querySelector('.main-container').removeChild(vid);
    bgm.check()
  }
}


window.addEventListener('beforeunload', () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

// 