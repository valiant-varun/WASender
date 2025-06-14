document.addEventListener("DOMContentLoaded", function () {
  const paragraphElement = document.getElementById("typed-paragraph-output");
  const cursorElement = document.querySelector(".typed-cursor");

  // Store the original text, using \n for line breaks
  const textToType =
    "Combine WhatsApp with AI to automatically \nengage, qualify, and convert leads";
  let charIndex = 0;
  const typingSpeed = 40; // Milliseconds per character (lower is faster)
  const delayBeforeTyping = 1000; // Delay before this paragraph starts typing, in ms

  function typeParagraph() {
    if (charIndex < textToType.length) {
      let char = textToType.charAt(charIndex);

      if (char === "\n") {
        paragraphElement.innerHTML += "<br>";
      } else {
        paragraphElement.innerHTML += char;
      }
      charIndex++;
      setTimeout(typeParagraph, typingSpeed);
    } else {
      // Typing complete, hide the cursor
      if (cursorElement) {
        cursorElement.style.display = "none";
      }
    }
  }

  // Start typing after a short delay, useful if other animations are happening
  // (e.g., if the H1 is sliding in first)
  setTimeout(typeParagraph, delayBeforeTyping);
});

document.addEventListener("DOMContentLoaded", function () {
  // 1. Get references to all animating elements
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.getElementById("typed-paragraph-output"); // Assuming you used the JS typing method for this
  const heroImage = document.querySelector(".hero-image");
  const navbarBrand = document.querySelector(".navbar-brand");
  const ctaButton = document.querySelector(".btn-success.custom-light-green");

  // 2. Define the animation durations and delays for each element (from your CSS)
  // Adjust these values to accurately reflect your CSS animation properties.
  const titleAnimDuration = 1000; // 1s
  const titleAnimDelay = 300; // 0.3s
  const subtitleTypingSpeed = 40; // ms per char (from your JS typing for paragraph)
  const subtitleDelay = 1000; // ms before paragraph typing starts (from your JS typing)
  const imageAnimDuration = 1000; // 1s
  const imageAnimDelay = 500; // 0.5s
  const navbarBrandAnimDuration = 1500; // 1.5s
  const navbarBrandAnimDelay = 200; // 0.2s

  // Assuming the paragraph has ~70 characters (rough estimate for "Combine WhatsApp...leads")
  // You might need to refine this based on the actual character count for accuracy.
  const subtitleCharCount = 70; // Adjust accurately
  const subtitleTotalTime =
    subtitleDelay + subtitleCharCount * subtitleTypingSpeed;

  // 3. Calculate when ALL initial animations are expected to finish
  // Find the maximum end time among all intro animations
  const endTimeTitle = titleAnimDelay + titleAnimDuration;
  const endTimeImage = imageAnimDelay + imageAnimDuration;
  const endTimeNavbarBrand = navbarBrandAnimDelay + navbarBrandAnimDuration;
  // The subtitle typing is also part of the initial load
  const endTimeSubtitle = subtitleTotalTime;

  const maxInitialAnimationEndTime = Math.max(
    endTimeTitle,
    endTimeImage,
    endTimeNavbarBrand,
    endTimeSubtitle
  );

  // Add a small buffer time after everything settles before the button starts
  const bufferTime = 500; // 0.5 seconds extra pause

  const delayBeforeButtonPulseStarts = maxInitialAnimationEndTime + bufferTime;

  // 4. Button Pulsing Logic (similar to the previous JS, but triggered after initial load)
  const pulseAnimDuration = 2000; // 2 seconds for one pulse cycle (matches CSS)
  const numPulsesPerSet = 3; // How many times it pulses in one set
  const breakBetweenPulseSets = 5000; // 5 seconds break after a set of pulses

  function startButtonPulsing() {
    let currentPulseCount = 0;

    function doSinglePulse() {
      if (currentPulseCount < numPulsesPerSet) {
        // Remove and add class to re-trigger CSS animation
        ctaButton.classList.remove("pulsing-active");
        void ctaButton.offsetWidth; // Force reflow
        ctaButton.classList.add("pulsing-active");

        currentPulseCount++;
        // Schedule the next pulse after its duration
        setTimeout(doSinglePulse, pulseAnimDuration);
      } else {
        // All pulses in this set done, schedule the next set after a break
        setTimeout(startButtonPulsing, breakBetweenPulseSets);
      }
    }

    // Start the first pulse in the current set
    doSinglePulse();
  }

  // 5. Schedule the button pulsing to start after all other animations
  console.log(
    "Calculated delay before button pulse:",
    delayBeforeButtonPulseStarts,
    "ms"
  );
  setTimeout(startButtonPulsing, delayBeforeButtonPulseStarts);
});
