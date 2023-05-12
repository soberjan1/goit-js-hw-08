import throttle from 'lodash.throttle';

const refs = {
  formEl: document.querySelector('.feedback-form'),
  inputEl: document.querySelector('input'),
  textareaEl: document.querySelector('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.formEl.addEventListener('input', throttle(onFormInput, 500));
refs.formEl.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      email: refs.inputEl.value,
      message: refs.textareaEl.value,
    })
  );
}

function onFormSubmit(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function getSavedValue() {
  const savedValues = localStorage.getItem(STORAGE_KEY);

  if (savedValues) {
    const parse = JSON.parse(savedValues);
    refs.textareaEl.value = parse.message;
    refs.inputEl.value = parse.email;
  }
  console.log(JSON.parse(savedValues));
}
getSavedValue();
