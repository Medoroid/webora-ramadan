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

let downloadBtn = document.querySelector('.btn-success');
let nameValue = document.querySelector('#username');
let warning = document.querySelector('.warning');
let musicBtn = document.querySelector('.music');
let vibs = new Audio('../audio/SpotiMate.io - Rmdan Gana - Mohamed Abdel Mottaleb.mp3');
vibs.loop = true;
    
document.addEventListener("click", () => {
 vibs.play();
    let musicBtn = document.querySelector('.music');
   // يخليها تعيد نفسها

musicBtn.addEventListener('click', () => {
    if (vibs.paused) {
        vibs.play();
        musicBtn.classList.remove("fa-play");
        musicBtn.classList.add("fa-pause");
    } else {
        vibs.pause();
        musicBtn.classList.remove("fa-pause");
        musicBtn.classList.add("fa-play");
    }
});

});


/* تحديث الاسم */
function updateNames(value) {
  document.querySelectorAll('.user-name').forEach(name => {
    name.textContent = value === "" 
      ? "كل عام و انت بخير يا" 
      : `كل عام و انت بخير يا ${value}`;
  });
}

/* تحديث لايف + تفعيل الزرار */
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

/* زرار تحميل */
downloadBtn.addEventListener('click', function (e) {
  e.preventDefault();

  let activeSlide = document.querySelector('.swiper-slide-active .card-preview');
  if (!activeSlide) return;

  let userName = nameValue.value.trim();
  if (userName === "") return;

  downloadBtn.disabled = true; // منع ضغط متكرر

  html2canvas(activeSlide, {
    scale: 3,
    useCORS: true
  }).then(canvas => {

    let link = document.createElement('a');
    link.download = userName + ".png";
    link.href = canvas.toDataURL('image/png');
    link.click();

    downloadBtn.disabled = false; // رجع الزرار
  });
});

function startHearts() {
    setInterval(() => {

        // 🌙 Moon
        const moon = document.createElement("div");
        moon.className = "moon";
        moon.innerHTML = "🌙";
        moon.style.left = Math.random() * 100 + "vw";
        moon.style.fontSize = Math.random() * 20 + 15 + "px";
        document.body.appendChild(moon);
        setTimeout(() => moon.remove(), 6000);


        // 🕌 Masjid
        const masged = document.createElement("div");
        masged.className = "masged";
        masged.innerHTML = "🕌";
        masged.style.left = Math.random() * 100 + "vw";
        masged.style.fontSize = Math.random() * 20 + 15 + "px";
        document.body.appendChild(masged);
        setTimeout(() => masged.remove(), 6000);





        // ✨ Word
        const word = document.createElement("div");
        word.className = "word";
        word.innerHTML = "🌛 رمضان مبارك ✨";
        word.style.left = Math.random() * 100 + "vw";
        word.style.fontSize = Math.random() * 20 + 15 + "px";
        document.body.appendChild(word);
        setTimeout(() => word.remove(), 6000);

    }, 1000);
}

startHearts();
