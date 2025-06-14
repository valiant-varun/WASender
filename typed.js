document.addEventListener("DOMContentLoaded", function () {
  // === TYPING PARAGRAPH LOGIC ===
  const paragraphElement = document.getElementById("typed-paragraph-output");
  const cursorElement = document.querySelector(".typed-cursor");
  const textToType =
    "Combine WhatsApp with AI to automatically \nengage, qualify, and convert leads";
  let charIndex = 0;
  const typingSpeed = 40;
  const delayBeforeTyping = 1000;

  // Ensure paragraphElement exists before trying to type
  if (paragraphElement) {
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
  }

  // === ANIMATION TIMING VARIABLES (Centralized Calculation) ===
  const heroTitle = document.querySelector(".hero-title");
  const heroImage = document.querySelector(".hero-image");
  const navbarBrand = document.querySelector(".navbar-brand");

  const subtitleCharCount = textToType.length;
  const subtitleTotalTime = delayBeforeTyping + subtitleCharCount * typingSpeed;

  // !!! IMPORTANT: Adjust these values to EXACTLY match your CSS animation definitions !!!
  const endTimeTitle = 300 + 1000; // H1 delay + duration
  const endTimeImage = 500 + 1000; // Image delay + duration
  const endTimeNavbarBrand = 200 + 1500; // Navbar Brand delay + duration
  const endTimeSubtitle = subtitleTotalTime; // Paragraph typing total time

  // Assuming the "Book Live Demo" button also has an initial CSS animation delay,
  // include it in the calculation for overall page load completion.
  // Replace `bookDemoButtonInitialDelay` with the actual delay from your CSS for `.custom-book-demo`
  const bookDemoButtonInitialDelay = 1000; // Example: if .custom-book-demo animation-delay is 1s

  const maxInitialAnimationEndTime = Math.max(
    endTimeTitle,
    endTimeImage,
    endTimeNavbarBrand,
    endTimeSubtitle,
    bookDemoButtonInitialDelay
  );

  const bufferTime = 500; // A small buffer after all initial animations
  const delayBeforeButtonPulseStarts = maxInitialAnimationEndTime + bufferTime;
  // The checkmark animation should start after the buttons have appeared and perhaps pulsed once or twice
  const delayBeforeCheckmarkSequenceStarts =
    delayBeforeButtonPulseStarts + 2000; // Example: 2 seconds after buttons start pulsing

  // === BUTTON PULSING LOGIC (for "Start Free Trial" buttons) ===
  const navbarCtaButton = document.getElementById("navbar-cta-button");
  const heroCtaButton = document.getElementById("hero-cta-button");

  const pulsingCtaButtons = [];
  if (navbarCtaButton) pulsingCtaButtons.push(navbarCtaButton);
  if (heroCtaButton) pulsingCtaButtons.push(heroCtaButton);

  const pulseAnimDuration = 2000;
  const numPulsesPerSet = 3;
  const breakBetweenPulseSets = 5000;

  function startButtonPulsing() {
    if (pulsingCtaButtons.length === 0) return;

    let currentPulseCount = 0;

    function doSinglePulse() {
      if (currentPulseCount < numPulsesPerSet) {
        pulsingCtaButtons.forEach((button) => {
          button.classList.remove("pulsing-active");
          void button.offsetWidth; // Force reflow
          button.classList.add("pulsing-active");
        });
        currentPulseCount++;
        setTimeout(doSinglePulse, pulseAnimDuration);
      } else {
        setTimeout(startButtonPulsing, breakBetweenPulseSets);
      }
    }
    doSinglePulse();
  }

  setTimeout(startButtonPulsing, delayBeforeButtonPulseStarts);

  // === CHECKBOX ANIMATION LOGIC ===
  const checkmarks = document.querySelectorAll(".animated-check");
  const totalCheckmarks = checkmarks.length;

  const checkmarkDuration = 800; // 0.8 seconds (duration of checkmarkAnimation in CSS)
  const delayBetweenCheckmarks = 300; // 0.3 seconds between each checkmark appearing
  const pauseAfterAllTicksAppear = 1000; // 1 second pause AFTER the LAST tick is fully visible

  // Total time from sequence start until all ticks are visible and settle
  const timeUntilAllTicksAreVisible =
    (totalCheckmarks - 1) * delayBetweenCheckmarks + checkmarkDuration;

  let currentIndex = 0;

  function animateCheckmarkSequence() {
    if (checkmarks.length === 0) return; // Exit if no checkmarks to animate

    if (currentIndex < totalCheckmarks) {
      // Animate the current checkmark
      const currentCheckmark = checkmarks[currentIndex];
      currentCheckmark.classList.add("active"); // Start the CSS animation

      // Schedule the next checkmark's animation
      setTimeout(() => {
        currentIndex++;
        animateCheckmarkSequence();
      }, delayBetweenCheckmarks);
    } else {
      // All checkmarks have animated in this sequence and are now visible.
      // Wait for the defined pauseBeforeReset, then reset them all.
      setTimeout(() => {
        checkmarks.forEach((check) => {
          check.classList.remove("active"); // Remove 'active' to reset animation state (makes them disappear)
          void check.offsetWidth; // Force reflow to ensure animation can restart next time
        });

        currentIndex = 0; // Reset index for the next loop
        // After resetting, wait a bit then restart the entire sequence
        setTimeout(animateCheckmarkSequence, pauseAfterAllTicksAppear); // Start the next sequence after the full pause
      }, pauseAfterAllTicksAppear); // This timeout is the critical pause after ALL ticks are done
    }
  }

  // === SCHEDULE CHECKMARK ANIMATION AFTER EVERYTHING ELSE HAS SETTLED ===
  setTimeout(animateCheckmarkSequence, delayBeforeCheckmarkSequenceStarts);

  // ==========================================================
  // Any other global JavaScript for your website would go here.
  // ==========================================================
}); // End of DOMContentLoaded
