document.addEventListener("DOMContentLoaded", function () {
  // === TYPING PARAGRAPH LOGIC ===
  const paragraphElement = document.getElementById("typed-paragraph-output");
  const cursorElement = document.querySelector(".typed-cursor");
  const textToType =
    "Combine WhatsApp with AI to automatically \nengage, qualify, and convert leads";
  let charIndex = 0;
  const typingSpeed = 40;
  const delayBeforeTyping = 1000;

  function typeParagraph() {
    if (charIndex < textToType.length) {
      const char = textToType.charAt(charIndex);
      paragraphElement.innerHTML += char === "\n" ? "<br>" : char;
      charIndex++;
      setTimeout(typeParagraph, typingSpeed);
    } else {
      if (cursorElement) cursorElement.style.display = "none";
    }
  }

  setTimeout(typeParagraph, delayBeforeTyping);

  // === ANIMATION TIMING VARIABLES ===
  const subtitleCharCount = textToType.length;
  const subtitleTotalTime = delayBeforeTyping + subtitleCharCount * typingSpeed;

  const endTimeTitle = 300 + 1000; // delay + duration
  const endTimeImage = 500 + 1000;
  const endTimeNavbarBrand = 200 + 1500;
  const endTimeSubtitle = subtitleTotalTime;

  const maxInitialAnimationEndTime = Math.max(
    endTimeTitle,
    endTimeImage,
    endTimeNavbarBrand,
    endTimeSubtitle
  );

  const delayBeforeButtonPulseStarts = maxInitialAnimationEndTime + 500;

  // === BUTTON PULSING LOGIC ===
  const ctaButton = document.querySelector(".btn-success.custom-light-green");
  const pulseAnimDuration = 2000;
  const numPulsesPerSet = 3;
  const breakBetweenPulseSets = 5000;

  function startButtonPulsing() {
    let currentPulseCount = 0;

    function doSinglePulse() {
      if (currentPulseCount < numPulsesPerSet) {
        ctaButton.classList.remove("pulsing-active");
        void ctaButton.offsetWidth; // Force reflow
        ctaButton.classList.add("pulsing-active");
        currentPulseCount++;
        setTimeout(doSinglePulse, pulseAnimDuration);
      } else {
        setTimeout(startButtonPulsing, breakBetweenPulseSets);
      }
    }

    doSinglePulse();
  }

  // === SCHEDULE BUTTON PULSING AFTER INITIAL LOAD ===
  setTimeout(startButtonPulsing, delayBeforeButtonPulseStarts);
});

// here you go
