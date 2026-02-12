    // ------------------ Swiper ------------------
    const swiper = new Swiper('.card-swiper', {
      slidesPerView: 1.25,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      speed: 600,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });

    // ------------------ DOM Elements ------------------
    const downloadBtn = document.querySelector('.btn-success');
    const nameValue = document.querySelector('#username');
    const warning = document.querySelector('.warning');
    const musicSwitch = document.querySelector('#flexSwitchCheckChecked');

    // ------------------ Audio ------------------
    const vibs = new Audio('./audio/SpotiMate.io - Rmdan Gana - Mohamed Abdel Mottaleb.mp3');
    vibs.loop = true;

    // تشغيل الصوت بعد أول click
    function startMusicOnce() {
      if (musicSwitch.checked) vibs.play().catch(e => console.log("Audio blocked:", e));
      document.removeEventListener("click", startMusicOnce);
    }
    document.addEventListener("click", startMusicOnce);

    // Switch للتحكم في الصوت
    musicSwitch.addEventListener('change', () => {
      if (musicSwitch.checked) vibs.play().catch(e => console.log("Audio blocked:", e));
      else vibs.pause();
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
      const value = this.value.trim();
      updateNames(value);
      if (value === "") { downloadBtn.disabled = true; warning.textContent = "اكتب اسمك من اجل تحميل البطاقة"; }
      else { downloadBtn.disabled = false; warning.textContent = ""; }
    });

    // ------------------ تحميل البطاقة ------------------
    downloadBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const activeSlide = document.querySelector('.swiper-slide-active .card-preview');
      if (!activeSlide) return;
      const userName = nameValue.value.trim();
      if (userName === "") return;

      downloadBtn.disabled = true;

      html2canvas(activeSlide, { scale: 3, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
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
      el.style.top = "-50px";
      el.style.fontSize = Math.random() * 20 + 15 + "px";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }

    function animateHearts() {
      createHeart("🌙", "moon");
      createHeart("🕌", "masged");
      createHeart("🌛 رمضان مبارك ✨", "word");
      setTimeout(animateHearts, 1000);
    }

    document.addEventListener("DOMContentLoaded", () => {
      animateHearts();
    });