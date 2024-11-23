function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
locoScroll()

function cursorEffect() {
  var page1 = document.querySelector(".main")
  var cursor = document.querySelector(".cursor")

  page1.addEventListener("mousemove", function (dets) {
      gsap.to(cursor, {
          x: dets.x,
          y: dets.y
      })
  });

  page1.addEventListener("mouseenter", function () {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1
      })
  });

  page1.addEventListener("mouseleave", function () {
      gsap.to(cursor, {
          cursor: 1,
          scale: 0,
          opacity: 0
      })
  });
}
cursorEffect()

// Function to handle the loading screen and show the main content after the animation finishes
function hideLoadingScreen() {
  // Select the loading screen element
  const loadingScreen = document.querySelector('.loading');
  const mainContent = document.querySelector('.main');
  const body = document.querySelector('body');

  // Set a timeout for 5 seconds to wait for the animation to complete
  setTimeout(() => {
    // Add 'finished' class to fade out the loading screen
    loadingScreen.classList.add('finished');

    // After a delay (allowing fade-out to complete), hide the loading screen and show the main content
    setTimeout(() => {
        body.style.overflow = 'auto';
        loadingScreen.style.display = 'none';  // Hide the loading screen
        mainContent.classList.add('show');
    }, 1000);  // 1 second to let fade-out effect complete
  }, 5000);  // Set the animation duration to 5 seconds
}
// Start the process after the window is loaded
window.onload = hideLoadingScreen;

// document.querySelector('.btn').addEventListener('click', () => {
//     alert('CV is downloading...');
//   });
  
//   // Scroll reveal animations
//   window.addEventListener('scroll', () => {
//     const elements = document.querySelectorAll('.profile-image, .quote, .social-links li');
//     elements.forEach((el) => {
//       const position = el.getBoundingClientRect().top;
//       const windowHeight = window.innerHeight;
  
//       if (position < windowHeight - 50) {
//         el.style.opacity = 1;
//         el.style.transform = 'translateY(0)';
//       } else {
//         el.style.opacity = 0;
//         el.style.transform = 'translateY(50px)';
//       }
//     });
//   });

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('animated-btn');
  const btnText = button.querySelector('.btn-text');
  const btnCheck = button.querySelector('.btn-check');

  // URL of the PDF file to download
  const pdfUrl = 'components/Rohit_Resume.pdf';  // Replace with the actual path to your PDF

  button.addEventListener('click', () => {
    if (button.disabled) return; // Prevent multiple clicks

    button.disabled = true; // Disable button during animation
    button.classList.add('shrink'); // Shrink button into circle
    btnText.style.display = 'none'; // Hide text

    // Add loader animation
    const loader = document.createElement('div');
    loader.classList.add('btn-loader');
    button.appendChild(loader);

    // Stop loader and show checkmark
    setTimeout(() => {
      loader.remove(); // Remove loader
      button.classList.add('show-check'); // Add teal background for checkmark
      btnCheck.style.opacity = '1';
      btnCheck.style.transform = 'scale(1)';
    }, 2000); // Loader completes after 2 seconds

    // Trigger PDF download after 2.5 seconds (after animation finishes)
    setTimeout(() => {
      triggerPDFDownload(pdfUrl); // Trigger the download
    }, 2500); // Delay to ensure the checkmark has appeared

    // Reset button to original state
    setTimeout(() => {
      btnCheck.style.opacity = '0';
      btnCheck.style.transform = 'scale(0)';
      button.classList.remove('shrink', 'show-check');
      btnText.style.display = 'inline'; // Show text again
      button.disabled = false; // Enable button
    }, 3500); // Reset after 3.5 seconds
  });

  // Function to trigger the PDF download
  function triggerPDFDownload(pdfUrl) {
    const link = document.createElement('a'); // Create an invisible anchor element
    link.href = pdfUrl; // Set the href to the PDF file
    link.download = 'Rohit_Resume.pdf'; // Optionally specify a filename for the download
    link.click(); // Programmatically click the link to trigger the download
  }
});
