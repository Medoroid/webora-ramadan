// ------------------ Swiper ------------------
const swiper = new Swiper('.card-swiper', {
  slidesPerView: 1.25,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  speed: 600,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// ------------------ DOM Elements ------------------
let downloadBtn = document.querySelector('.btn-success');
let nameValue = document.querySelector('#username');
let warning = document.querySelector('.warning');
let musicSwitch = document.querySelector('#flexSwitchCheckChecked');

// ------------------ Audio ------------------
let vibs = new Audio('../audio/SpotiMate.io - Rmdan Gana - Mohamed Abdel Mottaleb.mp3');
vibs.loop = true;

// تشغيل الصوت لأول click لتجنب مشاكل Autoplay
function startMusicOnce() {
  if (musicSwitch.checked) vibs.play();
  document.removeEventListener("click", startMusicOnce);
}
document.addEventListener("click", startMusicOnce);

// التحكم في الـ Switch
musicSwitch.addEventListener('change', () => {
  if (musicSwitch.checked) {
    vibs.play();
  } else {
    vibs.pause();
  }
});

// ------------------ تحديث الاسم ------------------
function updateNames(value) {
  document.querySelectorAll('.user-name').forEach(name => {
    name.textContent = value === "" 
      ? "كل عام و انت بخير يا" 
      : `كل عام و انت بخير يا ${value}`;
  });
}

nameValue.addEventListener("input", function () {
  let value = this.value.trim();
  updateNames(value);

  if (value === "") {
    downloadBtn.disabled = true;
    warning.textContent = "اكتب اسمك من اجل تحميل البطاقة";
  } else {
    downloadBtn.disabled = false;
    warning.textContent = "";
  }
});

// ------------------ تحميل البطاقة ------------------
downloadBtn.addEventListener('click', function (e) {
  e.preventDefault();

  let activeSlide = document.querySelector('.swiper-slide-active .card-preview');
  if (!activeSlide) return;

  let userName = nameValue.value.trim();
  if (userName === "") return;

  downloadBtn.disabled = true;

  html2canvas(activeSlide, {
    scale: 3,
    useCORS: true
  }).then(canvas => {
    let link = document.createElement('a');
    link.download = userName + ".png";
    link.href = canvas.toDataURL('image/png');
    link.click();

    downloadBtn.disabled = false;
  });
});

// ------------------ Hearts Animation ------------------
function createHeart(emoji, className) {
  const el = document.createElement("div");
  el.className = className;
  el.innerHTML = emoji;
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = Math.random() * 20 + 15 + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 6000);
}

function animateHearts() {
  createHeart("🌙", "moon");
  createHeart("🕌", "masged");
  createHeart("🌛 رمضان مبارك ✨", "word");
  setTimeout(animateHearts, 1000); // تكرار كل ثانية
}

// تشغيل الـ Hearts بعد تحميل DOM
document.addEventListener("DOMContentLoaded", () => {
  animateHearts();
});
