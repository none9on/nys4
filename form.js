

function showSidebar() {
    const sideBar = document.querySelector('.side-bar');
    sideBar.style.display = 'flex';
}

function hideSidebar() {
    const sideBar = document.querySelector('.side-bar');
    sideBar.style.display = 'none';
}


function enableMobileStack() {
    const container = document.querySelector(".mobile-stack");
    if (!container) return;

    let photos = Array.from(container.querySelectorAll("img"));

    photos.forEach(img => {
        img.addEventListener("click", () => {
            let first = photos.shift();
            photos.push(first);

           
            photos.forEach((img, i) => {
                img.style.zIndex = photos.length - i;

              
            });
        });
    });
}


if (window.innerWidth <= 540) {
    enableMobileStack();
}

const form = document.getElementById('survey-form');

document.querySelectorAll('.next-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const currentPart = button.parentElement;
        const nextPartId = button.getAttribute('data-next');
        const nextPart = document.getElementById(nextPartId);

        const formData = new FormData();
        currentPart.querySelectorAll('input, textarea').forEach(input => {
            if(input.value.trim() !== '') {
                formData.append(input.name, input.value);
            }
        });
        formData.append('access_key', '046ab3ea-c2ac-4eee-a29d-da90b2750ab1');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                currentPart.style.display = 'none';
                nextPart.style.display = 'block';
            } else {
                console.log(result);
                alert('Ошибка при отправке, проверьте данные формы.');
            }
        } catch (error) {
            console.error(error);
            alert('Ошибка сети, попробуйте снова.');
        }
    });
});


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lastPart = document.getElementById('part3');

    const formData = new FormData();
    lastPart.querySelectorAll('input, textarea').forEach(input => {
        if(input.value.trim() !== '') {
            formData.append(input.name, input.value);
        }
    });
    formData.append('access_key', '046ab3ea-c2ac-4eee-a29d-da90b2750ab1');

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById('success-message').style.display = 'block';
            lastPart.querySelector('button[type="submit"]').style.display = 'none';
        } else {
            console.log(result);
            alert('Ошибка при отправке, попробуйте снова');
        }
    } catch (error) {
        console.error(error);
        alert('Ошибка сети, попробуйте снова');
    }
});


function saveToLocalStorage(input) {
    if(input.name) {
        localStorage.setItem(input.name, input.value);
    }
}


function loadFromLocalStorage() {
    document.querySelectorAll('input, textarea').forEach(input => {
        if(input.name && localStorage.getItem(input.name)) {
            input.value = localStorage.getItem(input.name);
        }
    });
}


document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => saveToLocalStorage(input));
});

window.addEventListener('DOMContentLoaded', loadFromLocalStorage);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lastPart = document.getElementById('part3');

    const formData = new FormData();
    lastPart.querySelectorAll('input, textarea').forEach(input => {
        if(input.value.trim() !== '') {
            formData.append(input.name, input.value);
        }
    });
    formData.append('access_key', '046ab3ea-c2ac-4eee-a29d-da90b2750ab1');

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById('success-message').style.display = 'block';
            lastPart.querySelector('button[type="submit"]').style.display = 'none';

          
            document.querySelectorAll('input, textarea').forEach(input => {
                localStorage.removeItem(input.name);
            });
        } else {
            console.log(result);
            alert('Ошибка при отправке, попробуйте снова');
        }
    } catch (error) {
        console.error(error);
        alert('Ошибка сети, попробуйте снова');
    }
});
