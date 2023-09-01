document.querySelectorAll('.header-row-bottom > ul > li').forEach((parentLi) => {
  parentLi.addEventListener('mouseover', function() {
    const dropdownItems = this.querySelectorAll('.dropdown > li');
    dropdownItems.forEach((item, index) => {
      item.style.animation = `slideIn 0.2s ease forwards ${index * 0.1}s`;
    });
  });

  parentLi.addEventListener('mouseout', function() {
    const dropdownItems = this.querySelectorAll('.dropdown > li');
    dropdownItems.forEach((item, index) => {
      item.style.animation = `fadeOut 0.1s ease forwards`;
    });
  });
});
