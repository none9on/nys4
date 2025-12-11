const form = document.getElementById('survey-form');
const inputs = form.querySelectorAll('input, select');

inputs.forEach(input => {
    // при изменении сохраняем в localStorage
    input.addEventListener('input', () => {
        localStorage.setItem(input.name, input.value);
    });

    // при загрузке страницы восстанавливаем значение
    const savedValue = localStorage.getItem(input.name);
    if (savedValue) {
        input.value = savedValue;
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Отправка...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Анкета отправлена! Спасибо!");
            form.reset();

            // очищаем localStorage для всех полей формы
            inputs.forEach(input => localStorage.removeItem(input.name));
        } else {
            alert("Ошибка: " + data.message);
        }

    } catch (error) {
        alert("Что-то пошло не так. Попробуйте еще раз.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
