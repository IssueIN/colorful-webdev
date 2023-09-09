FilePond.registerPlugin(FilePondPluginFileEncode)
const inputElement = document.querySelector('input[type="file"]');
const pond = FilePond.create(inputElement);

// FilePond.setOptions({
//   stylePanelAspectRatio: 150 / 100,
//   imageResizeTargetWidth: 100,
//   imageResizeTargetHeight: 150
// })

const submitButton = document.getElementById('create-button');

pond.on('addfilestart', (error, file) => {
  submitButton.disabled = true;
});

pond.on('addfile', (error, file) => {
  submitButton.disabled = false;
});

FilePond.parse(document.body);