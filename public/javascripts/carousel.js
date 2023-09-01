const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const indsNav = document.querySelector('.carousel__nav');
const inds = Array.from(indsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;


//arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide')
}

const updateInds = (currentInd, targetInd) => {
  currentInd.classList.remove('current-slide');
  targetInd.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

nextButton.addEventListener('click', e =>{
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentInd = indsNav.querySelector('.current-slide');
  const nextInd = currentInd.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide,nextSlide);

  updateInds(currentInd, nextInd);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

prevButton.addEventListener('click', e =>{
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentInd = indsNav.querySelector('.current-slide');
  const prevInd = currentInd.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);


  moveToSlide(track, currentSlide,prevSlide);

  updateInds(currentInd, prevInd);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

indsNav.addEventListener('click', e => {
  const targetInd = e.target.closest('button');
  if(!targetInd) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentInd = indsNav.querySelector('.current-slide');
  const targetIndex = inds.findIndex(ind => ind === targetInd);
  const targetSlide = slides[targetIndex];
  
  moveToSlide(track, currentSlide, targetSlide);

  updateInds(currentInd, targetInd);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
})





