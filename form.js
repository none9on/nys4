window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("survey-form");
    if (!form) return;

    (function () {
        emailjs.init("ZIV63XRFDVfzH9a4D");
    })();

   
    const forbiddenChars = /[=<>{}\[\]]/;

  
    const fields = form.querySelectorAll("input, textarea");
    fields.forEach(field => {
        const saved = localStorage.getItem(field.name);
        if (saved) field.value = saved;

        field.addEventListener("input", () => {
            localStorage.setItem(field.name, field.value);
        });
    });

  
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        for (let f of fields) {
            if (forbiddenChars.test(f.value)) {
                alert(`Поле "${f.name}" содержит недопустимые символы! = < > { } [ ] |`);
                return;
            }
        }

        emailjs.sendForm("service_66kuzd8", "template_nktnvh8", this)
            .then(() => {
                alert("Анкета отправлена! Спасибо за участие!");
                form.reset();
               
                fields.forEach(f => localStorage.removeItem(f.name));
            })
            .catch((error) => {
                console.error("Ошибка:", error);
                alert("Ошибка при отправке формы");
            });
    });

    
    function showSidebar() {
        document.querySelector('.side-bar').style.display = 'flex';
    }

    function hideSidebar() {
        document.querySelector('.side-bar').style.display = 'none';
    }

    
    const menuBtns = document.querySelectorAll('.menu-btn, .side-bar li');
    menuBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            hideSidebar();
        });
    });

    window.showSidebar = showSidebar; 
    window.hideSidebar = hideSidebar;

   
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
});
