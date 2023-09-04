function carousel (rootSelector, autoSlide = false) {
  const root = document.querySelector(rootSelector);
  const track = root.querySelector('.carousel__track');
  const slides = Array.from(track.children);
  const nextButton = root.querySelector('.carousel__button--right');
  const prevButton = root.querySelector('.carousel__button--left');
  const indsNav = root.querySelector('.carousel__nav');
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

  //this is an integrate function
  function moveAndUpdateSlide(track, indsNav, slides, prevButton, nextButton, targetSlide) {
    const currentSlide = track.querySelector('.current-slide');
    const currentInd = indsNav.querySelector('.current-slide');
    const targetIndex = slides.findIndex(slide => slide === targetSlide);
    const targetInd = inds[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateInds(currentInd, targetInd);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
  }

  const autoSliding = () => {
    const currentSlide = track.querySelector('.current-slide');
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    let nextSlide;
    if (currentIndex === slides.length - 1) {
      nextSlide = slides[0];
    } else {
      nextSlide = currentSlide.nextElementSibling;
    }
    moveAndUpdateSlide(track, indsNav, slides, prevButton, nextButton, nextSlide);
  };
  
  
  if(autoSlide) {
    setInterval(autoSliding, 1e4);
  }
  
  nextButton.addEventListener('click', e =>{
    const nextSlide = track.querySelector('.current-slide').nextElementSibling;
    moveAndUpdateSlide(track, indsNav, slides, prevButton, nextButton, nextSlide);
  });
  
  prevButton.addEventListener('click', e =>{
    const prevSlide = track.querySelector('.current-slide').previousElementSibling;
    moveAndUpdateSlide(track, indsNav, slides, prevButton, nextButton, prevSlide);
  });
  
  indsNav.addEventListener('click', e => {
    const targetInd = e.target.closest('button');
    if(!targetInd) return;
    const targetIndex = inds.findIndex(ind => ind === targetInd);
    const targetSlide = slides[targetIndex];
    moveAndUpdateSlide(track, indsNav, slides, prevButton, nextButton, targetSlide);
  });
  
}

carousel('.main-carousel');
carousel('.recentProduct-carousel');




