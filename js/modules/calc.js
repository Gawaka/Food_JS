function calc() {
    // // // Calc

    const result = document.querySelector('.calculating__result span'); // куда помещается результат

    let sex, height, weight, age, ratio;

    /// /// /// /// /// LocalStorage для запоминания значений(не обязательно)

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }  
        });
    };

    initLocalSettings('#gender div' , 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    /// /// /// /// ///^^

    function calcTotal() {                                  // //func расчёта калорийности
        if (!sex || !height || !weight || !age || !ratio) {//если значения false то выведится '---' если тру то сработает формула
            result.textContent = '---';
            return;                             // // ретерн для досрочного завершения функиции
        }

        if (sex === 'female') {           // //  если выбран жен пол то расчёт будет по одной формуле и выведется на страницу
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {                              // // если мужской то по второй формуле
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };

    calcTotal();

    function getStaticInform(selector, activeClass) {                 // // получение статической инфы
        const elements = document.querySelectorAll(selector);   // //получаем дивы в родителе (дивы указываем при вызове функ)

        elements.forEach(elem => {
            elem.addEventListener('click', (e)=> {
                if (e.target.getAttribute('data-ratio')) { // // если у элема на котором произ. событие есть аттрибут мы его присваиваем
                    ratio = +e.target.getAttribute('data-ratio');   // //  из e.target
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {              // // убираем класс актив у дивов которые получали
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass); // // добавляем тому диву клас на котором произошло событие
    
                calcTotal();
            });
        });
    };

    getStaticInform('#gender div', 'calculating__choose-item_active');// 1арг родитель по id 2арг класс активности
    getStaticInform('.calculating__choose_big div', 'calculating__choose-item_active');// 1арг родитель 2арг класс активности

    function getDynamicInform(selector) {           // // func по работе с инпутами для получения динамич информ
        const input = document.querySelector(selector);     // //получаем нужный инпут

        input.addEventListener('input', ()=> { // // обработчик на инпут

            if(input.value.match(/\D/g)) {      // // проверям регЭкспом на не числа
                input.style.border = '2px solid red'; // // Если в value не число подсвечиваем бордер красным
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) { // switch/Case проверяем наши єлем по id. Если совпало то присваеваем input.value
                case 'height':                                                                  //то что вписал пользователь
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            
            calcTotal();
        });
    };

    getDynamicInform('#height');
    getDynamicInform('#weight');
    getDynamicInform('#age');
}

export default calc;