const bioText = document.getElementById('bioText');
const bioArray = window.BIO_ARRAY || ['#bakstageskkuad', 'shotout to my goytoy: https://loopy.rest ', 'Spain | 18'];

let charIndex = 0;
let bioIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentBio = bioArray[bioIndex];
  
  if (isDeleting) {
    bioText.innerText = currentBio.substring(0, charIndex - 1);
    charIndex--;
  } else {
    bioText.innerText = currentBio.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentBio.length) {
    isDeleting = true;
    setTimeout(typeWriter, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    bioIndex = (bioIndex + 1) % bioArray.length;
    setTimeout(typeWriter, 500);
  } else {
    setTimeout(typeWriter, isDeleting ? 50 : 100);
  }
}

if (bioText) {
  typeWriter();
}
