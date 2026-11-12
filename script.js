// ==========================================
// A Very Special Question - Interactive Logic
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const proposalCard = document.getElementById('proposalCard');
  const celebrationCard = document.getElementById('celebrationCard');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const dodgeMessage = document.getElementById('dodgeMessage');
  const praiseGrid = document.getElementById('praiseGrid');
  const slotDisplay = document.getElementById('slotDisplay');
  const perkBtn = document.getElementById('perkBtn');
  const extraConfettiBtn = document.getElementById('extraConfettiBtn');
  const heartsContainer = document.getElementById('heartsContainer');

  // Background Music Elements
  const bgMusic = document.getElementById('bgMusic');
  const musicPill = document.getElementById('musicPill');
  const musicBtn = document.getElementById('musicBtn');
  const musicBtnIcon = document.getElementById('musicBtnIcon');
  const vinylDisc = document.getElementById('vinylDisc');
  const musicStatus = document.getElementById('musicStatus');

  let dodgeCount = 0;
  let yesScale = 1;

  // ----------------------------------------------------
  // 0. Soft Background Music Controller
  // ----------------------------------------------------
  if (bgMusic) {
    bgMusic.volume = 0.25; // Gentle, light background volume
  }

  let isMusicPlaying = false;

  function updateMusicUI(playing) {
    isMusicPlaying = playing;
    if (playing) {
      vinylDisc.classList.add('playing');
      musicBtnIcon.innerText = '⏸️';
      musicStatus.innerText = 'Playing softly 💖';
    } else {
      vinylDisc.classList.remove('playing');
      musicBtnIcon.innerText = '▶️';
      musicStatus.innerText = 'Tap to play music';
    }
  }

  function playMusic() {
    if (!bgMusic) return;
    bgMusic.play().then(() => {
      updateMusicUI(true);
    }).catch(() => {
      // Handled: Will start on next tap
    });
  }

  function pauseMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    updateMusicUI(false);
  }

  function toggleMusic(e) {
    if (e) e.stopPropagation();
    if (!bgMusic) return;
    if (bgMusic.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  }

  if (musicPill) {
    musicPill.addEventListener('click', toggleMusic);
  }
  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }

  // Attempt gentle auto-play on first screen interaction (browser policy compliant)
  const startMusicOnFirstTouch = () => {
    if (bgMusic && bgMusic.paused) {
      playMusic();
    }
    window.removeEventListener('pointerdown', startMusicOnFirstTouch);
    window.removeEventListener('touchstart', startMusicOnFirstTouch);
    window.removeEventListener('click', startMusicOnFirstTouch);
  };

  window.addEventListener('pointerdown', startMusicOnFirstTouch);
  window.addEventListener('touchstart', startMusicOnFirstTouch);
  window.addEventListener('click', startMusicOnFirstTouch);

  // Funny & cute messages when she attempts to click No
  const dodgePhrases = [
    "Nice try! 😜",
    "Oops, too slow! 🏃‍♀️💨",
    "Wait, are you sure? Look at that shiny YES button! 🥺",
    "Error 404: 'No' button is permanently disabled! 💅",
    "I dodge faster than lightning! ⚡",
    "Nope! My heart refuses to accept that! 💖",
    "You're stuck with me, cutie! 🙈",
    "Resistance is futile, say YES already! 🥰",
    "Almost got it... just kidding! 🤭",
    "You know you want to click YES! 💕"
  ];

  // Core Boyfriend Praise Cards
  const boyfriendPraiseList = [
    {
      icon: "🏆",
      title: "10/10 Certified Cuddle Expert",
      desc: "Guaranteed unlimited hugs, back scratches, and forehead kisses whenever requested."
    },
    {
      icon: "🍟",
      title: "The Golden Fry Rule",
      desc: "Will always share my food with you, and always order extra fries when you claim you're 'not hungry'."
    },
    {
      icon: "🎧",
      title: "Master Listener & Vault",
      desc: "Remembers your favorite snacks, comfort drinks, and every single 2 AM rant with full emotional support."
    },
    {
      icon: "📸",
      title: "Personal Hype Man & Photographer",
      desc: "Will happily take 300 photos from every conceivable angle until we get your absolute favorite one."
    },
    {
      icon: "🚗",
      title: "Passenger Princess Chauffeur",
      desc: "Seat warmer activated, snacks packed, and you get 100% unconditional aux cord & playlist privileges."
    },
    {
      icon: "🛡️",
      title: "Chief Bug Relocator & Jar Opener",
      desc: "No spider is too terrifying and no pickle jar lid is too tight when you need me to save the day."
    }
  ];

  // Interactive Perks Generator List
  const extraBoyfriendPerks = [
    "🍫 24/7 emergency sweet tooth & chocolate delivery service.",
    "🧥 Will willingly freeze to death just so you can wear my oversized hoodie.",
    "💌 Spontaneous sweet text messages reminding you how gorgeous you are.",
    "🍿 Will rewatch your favorite comfort movies with you even if we've seen them 20 times.",
    "☕ Morning coffee / matcha drinks brought directly to you without asking.",
    "👑 Automatic winner of all silly arguments because you're the queen.",
    "🧸 Expert pillow fluffer and weighted blanket alternative on cozy movie nights.",
    "✨ 100% lifetime guarantee of being loved, respected, and cherished every day!"
  ];

  // ----------------------------------------------------
  // 1. Ambient Floating Hearts Background
  // ----------------------------------------------------
  function createAmbientHearts() {
    const emojis = ['💖', '💕', '🌸', '✨', '💗', '🍓', '🌷'];
    for (let i = 0; i < 16; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.fontSize = `${16 + Math.random() * 24}px`;
      heart.style.animationDuration = `${6 + Math.random() * 8}s`;
      heart.style.animationDelay = `${Math.random() * 6}s`;
      heartsContainer.appendChild(heart);
    }
  }
  createAmbientHearts();

  // ----------------------------------------------------
  // Interactive Fairy Dust Cursor / Touch Motion Trail
  // ----------------------------------------------------
  let lastSparkleTime = 0;
  const sparkleSymbols = ['✨', '💖', '⭐', '🌸', '💫', '💕'];

  function createCursorSparkle(x, y) {
    const now = Date.now();
    if (now - lastSparkleTime < 50) return; // Smooth 20fps throttle for silky feel
    lastSparkleTime = now;

    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    sparkle.innerText = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
    
    const offsetX = (Math.random() - 0.5) * 16;
    const offsetY = (Math.random() - 0.5) * 16;
    
    sparkle.style.left = `${x + offsetX}px`;
    sparkle.style.top = `${y + offsetY}px`;
    sparkle.style.fontSize = `${14 + Math.random() * 10}px`;
    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
      const moveY = 22 + Math.random() * 20;
      const moveX = (Math.random() - 0.5) * 24;
      sparkle.style.transform = `translate(${moveX}px, ${moveY}px) scale(0.3) rotate(${Math.random() * 180}deg)`;
      sparkle.style.opacity = '0';
    });

    setTimeout(() => sparkle.remove(), 600);
  }

  window.addEventListener('mousemove', (e) => {
    createCursorSparkle(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      createCursorSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // ----------------------------------------------------
  // 2. Playful Sweet Sound Synthesizer (Web Audio API)
  // ----------------------------------------------------
  function playSweetChime(type = 'success') {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (!ctx) return;

      if (type === 'dodge') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else {
        // Romantic celebratory harp arpeggio: C5, E5, G5, B5, C6
        const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.55);
        });
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // ----------------------------------------------------
  // 3. The Unclickable "No" Button Evasion System
  // ----------------------------------------------------
  function createDodgePoof(x, y) {
    const poof = document.createElement('div');
    poof.className = 'dodge-poof';
    const poofIcons = ['💨', '✨', '🌸', '🪄', '💖'];
    poof.innerText = poofIcons[Math.floor(Math.random() * poofIcons.length)];
    poof.style.left = `${x - 14}px`;
    poof.style.top = `${y - 14}px`;
    document.body.appendChild(poof);
    setTimeout(() => poof.remove(), 550);
  }

  function moveNoButton() {
    dodgeCount++;
    playSweetChime('dodge');

    // Spawn poof motion graphic at old position
    const oldRect = noBtn.getBoundingClientRect();
    if (oldRect.width > 0 && oldRect.height > 0) {
      createDodgePoof(oldRect.left + oldRect.width / 2, oldRect.top + oldRect.height / 2);
    }

    // Make button absolute/fixed for free floating
    if (!noBtn.classList.contains('evading')) {
      noBtn.classList.add('evading');
    }

    const btnWidth = noBtn.offsetWidth || 120;
    const btnHeight = noBtn.offsetHeight || 50;
    const padding = 30;

    // Viewport boundaries
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    let newX = Math.floor(Math.random() * (maxX - padding)) + padding;
    let newY = Math.floor(Math.random() * (maxY - padding)) + padding;

    // Avoid overlapping the YES button directly
    const yesRect = yesBtn.getBoundingClientRect();
    if (
      newX < yesRect.right + 20 &&
      newX + btnWidth > yesRect.left - 20 &&
      newY < yesRect.bottom + 20 &&
      newY + btnHeight > yesRect.top - 20
    ) {
      newX = Math.min(maxX, yesRect.right + 60);
      newY = Math.min(maxY, yesRect.bottom + 60);
    }

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;

    // Show funny dodging phrase
    const phrase = dodgePhrases[dodgeCount % dodgePhrases.length];
    dodgeMessage.innerText = phrase;

    // Slightly grow the YES button to make it more tempting!
    if (yesScale < 1.45) {
      yesScale += 0.05;
      yesBtn.style.transform = `scale(${yesScale})`;
    }
  }

  // Multiple evasion triggers (desktop mouse hover, mobile touch start, focus)
  noBtn.addEventListener('mouseenter', moveNoButton);
  noBtn.addEventListener('mouseover', moveNoButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });
  noBtn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    moveNoButton();
  });
  noBtn.addEventListener('focus', moveNoButton);
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
  });

  // ----------------------------------------------------
  // 4. Confetti Engine (Canvas-Confetti + Fallback)
  // ----------------------------------------------------
  function triggerConfettiShower() {
    if (typeof confetti === 'function') {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const colors = ['#ff2a6d', '#ff758c', '#ffccd5', '#ffb703', '#a18cd1', '#ffffff'];

      // Big initial burst
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors
      });

      // Side cannons continuous shower
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 40 * (timeLeft / duration);

        confetti({
          particleCount,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: colors
        });
        confetti({
          particleCount,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: colors
        });
      }, 250);
    } else {
      // Offline fallback: CSS emoji shower
      createFallingEmojis();
    }
  }

  function createFallingEmojis() {
    const emojis = ['💖', '🎉', '🥂', '✨', '💐', '🥰'];
    for (let i = 0; i < 40; i++) {
      const elem = document.createElement('div');
      elem.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      elem.style.position = 'fixed';
      elem.style.top = '-50px';
      elem.style.left = `${Math.random() * 100}vw`;
      elem.style.fontSize = `${20 + Math.random() * 30}px`;
      elem.style.zIndex = '9999';
      elem.style.pointerEvents = 'none';
      elem.style.transition = 'all 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      document.body.appendChild(elem);

      setTimeout(() => {
        elem.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`;
        elem.style.opacity = '0';
      }, 50);

      setTimeout(() => elem.remove(), 3200);
    }
  }

  // ----------------------------------------------------
  // 5. Populate Praise Cards
  // ----------------------------------------------------
  function renderBoyfriendPraises() {
    praiseGrid.innerHTML = '';
    boyfriendPraiseList.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'praise-card';
      card.style.animationDelay = `${index * 0.12}s`;
      card.innerHTML = `
        <div class="praise-card-icon">${item.icon}</div>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      `;
      praiseGrid.appendChild(card);
    });
  }

  // ----------------------------------------------------
  // 6. "YES" Button Clicked!
  // ----------------------------------------------------
  yesBtn.addEventListener('click', () => {
    playMusic();
    playSweetChime('success');
    triggerConfettiShower();

    // Transition smoothly
    proposalCard.classList.add('hidden');
    if (noBtn.classList.contains('evading')) {
      noBtn.remove();
    }

    renderBoyfriendPraises();
    celebrationCard.classList.remove('hidden');

    // Scroll smoothly to top of celebration
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ----------------------------------------------------
  // 7. Interactive Perks Generator Button
  // ----------------------------------------------------
  let perkIndex = 0;
  perkBtn.addEventListener('click', () => {
    playSweetChime('dodge');
    slotDisplay.classList.remove('highlight');
    void slotDisplay.offsetWidth; // Trigger reflow
    slotDisplay.classList.add('highlight');

    const perk = extraBoyfriendPerks[perkIndex % extraBoyfriendPerks.length];
    slotDisplay.innerText = perk;
    perkIndex++;

    // Small celebratory confetti puff
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ff2a6d', '#ff9a9e', '#ffd166']
      });
    }
  });

  // ----------------------------------------------------
  // 8. Extra Confetti Shower Button
  // ----------------------------------------------------
  extraConfettiBtn.addEventListener('click', () => {
    playSweetChime('success');
    triggerConfettiShower();
  });
});
