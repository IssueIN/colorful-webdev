document.getElementById('switchToEnglish').addEventListener('click', function() {
  fetch('/change-lang?lang=en')
    .then(() => {
      location.reload();
    });
});

document.getElementById('switchToChinese').addEventListener('click', function() {
  fetch('/change-lang?lang=zh')
    .then(() => {
      location.reload();
    });
});
