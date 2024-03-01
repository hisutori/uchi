'use strict';

// Main
const submit = document.body.querySelector('[type="submit"]');

submit.addEventListener('click', (event) => {
    event.preventDefault();

    const form = submit.parentElement;

    const query = form.querySelector('[name="q"]').value;
    const type = form.querySelector(':checked').value;

    if (form.querySelector('input').value.trim().length) {
        window.open(`https://duckduckgo.com/?t=h_&q=${query}&iax=${type}&ia=${type}`);
    }
});
