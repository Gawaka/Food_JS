/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");



function forms(formSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {               // // Сообщение для юзера
        loading: 'img/spinner/spinner.svg',      // // Спиннер из папки img. Нужно просто указать путь и использовать изобр.
        ssucces: 'Дякуємо! Ми вам зателефонуємо.',
        failure: 'Error!'
    };

    forms.forEach(form => {             // //запуск функции(item это форма)
        bindPostData(form);
    });

    // const postData = async (url, data)=> {    // func настраивает наш запрос, посылает его на сервер
    //     const res = await fetch(url, {       // async await для того что бы асинхкод отработал правильно
    //         method: 'POST',                 //ответ от сервера приходит асинхронно
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: data
    //     });
    
    //     return await res.json();      // //получает ответ от сервера и трансфит его в json
    // };

    function bindPostData(form) {                           // // Функция по отправке данніх
        form.addEventListener('submit', (e)=> {
            e.preventDefault();

            const statusMessage = document.createElement('img');  // // Cоздание єлемента на странице для помещения сообщения юзеру
            statusMessage.src = message.loading;    // // Помещаем спиннер на стрнцу
            statusMessage.style.cssText = `         
                display: block;
                margin: 0 auto;
            `;                              // // центруем спиннер стилями
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);        // // Создание объекта formData

            const json = JSON.stringify(Object.fromEntries(formData.entries())); //превращаем formData в арр с аррами,
                                                                                    // //после в obj, а после в json
            // // FETCH
            // // Создание запроса на сервер с помощью func postData внутри которой fetch возвращающий promise
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3001/requests', json)        // // обрабатываем ответ с помошью then и catch
            .then(data => {                                             // // data - это полученные данные от сервера
                console.log(data);
                showThanksModal(message.ssucces);
                statusMessage.remove();             // Удаление соббщения для юзера
            })
            .catch(()=> {
                showThanksModal(message.failure);       // ввывод ошибки при срабатывании reject
            })
            .finally(()=> {
                form.reset();                    // Сброс формы после успешной отправки данных
            })
        });
    };

                // // //STM - showThanksModal
    function showThanksModal(message) {        // // Открытие окна благодарности
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);                            // // Когда срабатывает функция STM, в ней срабатывает openModal()

        const thanksModal = document.createElement('div'); // Создаем новый элемент для оповещ
        thanksModal.classList.add('modal__dialog'); // // Формируем верстку оповищ, сообщ юзеру берем из obj выше
        thanksModal.style.marginTop = '25%';
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal); // // appendim новый элемент в блок модального окна
        setTimeout(()=> {
            thanksModal.remove();               // // Удаление блока через 4 сек после показа сообщ
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {                        // Функция отвечающая за закрытие модального окна
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');                         // убираем класс видимости
    modal.classList.add('hide');                            // добавляем класс скрытия
    document.body.style.overflow = '';
};

function openModal(modalSelector, modalTimerId) {                         // Функция отвечающая за открытие модального окна
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('show');                            // Добавляем класс видимости
    modal.classList.remove('hide');                         // Убираем класс скрытия
    document.body.style.overflow = 'hidden';                // Убираем прокрутку при открытом модальном окне с помошью стилей
    
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
};

function modal(triggerSelector, modalSelector, modalTimerId) {
    //Modal
    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {                       // Перебор псевдомассива для навешивания обр.соб отвечающая за откр модалки
        btn.addEventListener('click', ()=> openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e)=> {              // Закрываем модалку при нажатии на подложку
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e)=> {                                // Событие отлавливает нажатие кнопки
        if (e.code === 'Escape' && modal.classList.contains('show')) {          // code - отслеживает код нажатой кнопки
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {          // Функция которая открывает модалку при скроле в низ страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);       // Удаляем обработчик после использования
        };
    };

    window.addEventListener('scroll', showModalByScroll);         // Событие с функицей выше
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/munuCards.js":
/*!*********************************!*\
  !*** ./js/modules/munuCards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");


function menuCards() {
    /////////// Cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {   ///////Класс для карточек
            this.src = src;                                             //свойства класса
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;        // // Метод конвертирующий грн в юсд

        }

        render() {
            const element = document.createElement('div');                      // // Создаем родителя карточек
            
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));    // назначаем класс всем каточкам
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Ціна:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);                       // // аппендим родителя
        }
    }
    
    // getResource('http://localhost:3001/menu') // // постинг карточек на страницу из db.json
    // .then(data=> {                             // //обрабатываем промис и устанавливаем параметры при помощи деструктур.
    //     data.forEach(({img, altimg, title, descr, price}) => {  // перебираем арр с карточками, констр срабатывает столько раз сколько карточек
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();// используем конструктор написаный ранее для рендера на страницу
    //     });                        
    // });

    axios.get('http://localhost:3001/menu')     // ссылка с которой мы получаем данные
    .then(data=> {                             // //обрабатываем промис и устанавливаем параметры при помощи деструктур.
        data.data.forEach(({img, altimg, title, descr, price}) => {                   // // перебираем арр с карточками
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();// используем конструктор написаный ранее для рендера на страницу
        });                        
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuCards);

/***/ }),

/***/ "./js/modules/services/services.js":
/*!*****************************************!*\
  !*** ./js/modules/services/services.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data)=> {    // func настраивает наш запрос, посылает его на сервер
    const res = await fetch(url, {       // async await для того что бы асинхкод отработал правильно
        method: 'POST',                 //ответ от сервера приходит асинхронно
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();      // //получает ответ от сервера и трансфит его в json
};

const getResource = async (url)=> {    // // Получение карточек с сервера
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch${url}, status: ${res.status}`); // // покажет ошибку и статус
    }

    return await res.json();      // //получает ответ от сервера и транфит его в json
};



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nexArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
        // // // Slider сложный вариант

        const slides = document.querySelectorAll(slide);
        const slider = document.querySelector(container);
        const prev = document.querySelector(prevArrow);
        const next = document.querySelector(nexArrow);
        const total = document.querySelector(totalCounter);
        const current = document.querySelector(currentCounter);
        const slidesWrapper = document.querySelector(wrapper);
        const slidesField = document.querySelector(field);
        const width = window.getComputedStyle(slidesWrapper).width;
    
        let slideIndex = 1;                            // //текущее положение в слайдере
        let offset = 0;
    
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`; // // если номер слайда меньше 10, перед цифрой добавляем 0
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;      // //если 10 или больше, 0 не добавляем
            current.textContent = slideIndex;
        }
    
        
        function slidesCurrent() {
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
        };
    
        const deleteTwoLastSymbols = /\D/g;
    
        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
    
        slidesWrapper.style.overflow = 'hidden';
    
        slides.forEach(slide => {
            slide.style.width = width;
        });
    
        slider.style.position = 'relative';
    
        const indicators = document.createElement('ol');
        const dots = [];
    
        indicators.classList.add('carousel-indicators');
        indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;
        slider.append(indicators);
    
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `;
    
            if (i == 0) {
                dot.style.opacity = 1;
            }
    
            indicators.append(dot);
            dots.push(dot);
        };
    
        function dotsOpasity() {
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        };
        
        next.addEventListener('click', ()=> {
            if(offset == +width.replace(deleteTwoLastSymbols, '') * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +width.replace(deleteTwoLastSymbols, '');
            }
    
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
    
            slidesCurrent();
            dotsOpasity();
        });
    
        prev.addEventListener('click', ()=> {
            if(offset == 0) {
                offset = + width.replace(deleteTwoLastSymbols, '') * (slides.length - 1);
            } else {
                offset -= +width.replace(deleteTwoLastSymbols, '');
            }
    
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
    
            slidesCurrent();
            dotsOpasity();
        });
    
        dots.forEach(dot => {
            dot.addEventListener('click', (e)=> {
                const slideTo = e.target.getAttribute('data-slide-to');
    
                slideIndex = slideTo;
                offset = +width.replace(deleteTwoLastSymbols, '') * (slideTo - 1);
    
                slidesField.style.transform = `translateX(-${offset}px)`;
    
                slidesCurrent();
                dotsOpasity();
            });
        })
    
        // // // Более простой вариант слайдера
    
        // showSlides(slideIndex);         // // вызов функции с изначальной позицией в слайдере
    
        // if (slides.length < 10) {
        //     total.textContent = `0${slides.length}`; // // если номер слайда меньше 10, перед цифрой добавляем 0
        // } else {
        //     total.textContent = slides.length;      // //если 10 или больше, 0 не добавляем 
        // }
    
        // function showSlides(n) {            // n - это slideIndex
        //     if (n > slides.length) {        // //если значение больше чем у нас в слайдере, устанавливаем то 
        //         slideIndex = 1;             //slideIndex = 1 (то есть возвращаемся на первый слайд)
        //     }
    
        //     if (n < 1) {                    // // обратная операция(если n < 1 то мы устанавливаем слайдер на последнюю позицию)
        //         slideIndex = slides.length;
        //     }
    
        //     slides.forEach(item => item.style.display = 'none'); // Скрываем все слайды с помошью стилей. предварительно перебрав
    
        //     slides[slideIndex - 1].style.display = 'block'; // показываем нужный слайд (-1 изза того что slides это arr)
    
        //     if (slides.length < 10) {
        //         current.textContent = `0${slideIndex}`; // // добавляем 0 к активному слайду
        //     } else {
        //         slideIndex.textContent = slideIndex;     
        //     }
        // };
    
        // function plusSlides(n) {   // // изменяет наш slideIndex. когда листаем вперед увеличиваем на 1, когда назад, уменьшаем
        //     showSlides(slideIndex += n);
        // };
    
        // prev.addEventListener('click', ()=> {
        //     plusSlides(-1); // // когда нажимаем на prev - передаем -1
        // });
    
        // next.addEventListener('click', ()=> {
        //     plusSlides(1); // // когда нажимаем на prev - передаем +1
        // }); 
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs

    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {          /////// функция скрывающая табы
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);    ///////// удаляем класс active у таба
        });
    };

    function showTabContent(i = 0) {          ////// функция отображающая табы. Аргумент i отвечает непосредственно за номер таба
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e)=> {     //// Делегирование событий, навешиваем обработчик на родителя табов
        const target = e.target;                     //// для удобства создаем переменную 

        if (target && target.classList.contains(tabsSelector.slice(1))) {  
            tabs.forEach((item, i)=> {       // C помошью forEach перебераем эл.ты внутри псевдоАRR,  
                if (target == item) {        // если target совпадает с перебераемым эл.том то мы его показываем функциями.
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
    //Timer

    function getTimeRemaining(endTime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / 1000 /  60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        };
    };

    setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_munuCards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/munuCards */ "./js/modules/munuCards.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', ()=> {

    const modalTimerId = setTimeout(()=> (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 300000);

        (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
        (0,_modules_munuCards__WEBPACK_IMPORTED_MODULE_2__["default"])();
        (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer', '2027-02-31');
        (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
        (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
            container: '.offer__slider',
            nexArrow: '.offer__slider-next',
            prevArrow: '.offer__slider-prev',
            slide: '.offer__slide',
            totalCounter: '#total',
            currentCounter: '#current',
            wrapper: '.offer__slider-wrapper',
            field: '.offer__slider-inner'
        });
        (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();

    //     // Tabs

    // const tabs = document.querySelectorAll('.tabheader__item');
    // const tabsContent = document.querySelectorAll('.tabcontent');
    // const tabsParent = document.querySelector('.tabheader__items');

    // function hideTabContent() {          /////// функция скрывающая табы
    //     tabsContent.forEach(item => {
    //         item.classList.add('hide');
    //         item.classList.remove('show', 'fade');
    //     });

    //     tabs.forEach(item => {
    //         item.classList.remove('tabheader__item_active');    ///////// удаляем класс active у таба
    //     });
    // };

    // function showTabContent(i = 0) {          ////// функция отображающая табы. Аргумент i отвечает непосредственно за номер таба
    //     tabsContent[i].classList.add('show', 'fade');
    //     tabsContent[i].classList.remove('hide');
    //     tabs[i].classList.add('tabheader__item_active');
    // }

    // hideTabContent();
    // showTabContent();

    // tabsParent.addEventListener('click', (e)=> {     //// Делегирование событий, навешиваем обработчик на родителя табов
    //     const target = e.target;                     //// для удобства создаем переменную 

    //     if (target && target.classList.contains('tabheader__item')) {  
    //         tabs.forEach((item, i)=> {       // C помошью forEach перебераем эл.ты внутри псевдоАRR,  
    //             if (target == item) {        // если target совпадает с перебераемым эл.том то мы его показываем функциями.
    //                 hideTabContent();
    //                 showTabContent(i);
    //             }
    //         });
    //     }
    // });

    // //Timer

    // const deadLine = '2025-04-23';

    // function getTimeRemaining(endTime) {
    //     let days, hours, minutes, seconds;
    //     const t = Date.parse(endTime) - Date.parse(new Date());

    //     if (t <= 0) {
    //         days = 0;
    //         hours = 0;
    //         minutes = 0;
    //         seconds = 0;
    //     } else {
    //         days = Math.floor(t / (1000 * 60 * 60 * 24));
    //         hours = Math.floor((t / (1000 * 60 * 60) % 24));
    //         minutes = Math.floor((t / 1000 /  60) % 60);
    //         seconds = Math.floor((t / 1000) % 60);
    //     }

    //     return {
    //         'total': t,
    //         'days': days,
    //         'hours': hours,
    //         'minutes': minutes,
    //         'seconds': seconds
    //     };
    // };

    // function getZero(num) {
    //     if (num >= 0 && num < 10) {
    //         return `0${num}`;
    //     } else {
    //         return num;
    //     }
    // }

    // function setClock(selector, endTime) {
    //     const timer = document.querySelector(selector);
    //     const days = timer.querySelector('#days');
    //     const hours = timer.querySelector('#hours');
    //     const minutes = timer.querySelector('#minutes');
    //     const seconds = timer.querySelector('#seconds');
    //     const timeInterval = setInterval(updateClock, 1000);

    //     updateClock();

    //     function updateClock() {
    //         const t = getTimeRemaining(endTime);

    //         days.innerHTML = getZero(t.days);
    //         hours.innerHTML = getZero(t.hours);
    //         minutes.innerHTML = getZero(t.minutes);
    //         seconds.innerHTML = getZero(t.seconds);

    //         if (t.total <= 0) {
    //             clearInterval(timeInterval);
    //         }
    //     };
    // };

    // setClock('.timer', deadLine);

    // //Modal

    // const modalTrigger = document.querySelectorAll('[data-modal]');
    // const modal = document.querySelector('.modal');

    // function openModal() {                              // Функция отвечающая за открытие модального окна
    //     modal.classList.add('show');                    // Добавляем класс видимости
    //     modal.classList.remove('hide');                 // Убираем класс скрытия
    //     document.body.style.overflow = 'hidden';        // Убираем прокрутку при открытом модальном окне с помошью стилей
    //     clearInterval(modalTimerID);
    // };

    // modalTrigger.forEach(btn => {                       // Перебор псевдомассива для навешивания обр.соб отвечающая за откр модалки
    //     btn.addEventListener('click', ()=> {
    //         openModal();
    //     });
    // });

    // function closeModal() {                              // Функция отвечающая за закрытие модального окна
    //     modal.classList.remove('show');                  // убираем класс видимости
    //     modal.classList.add('hide');                     // добавляем класс скрытия
    //     document.body.style.overflow = '';
    // };

    // modal.addEventListener('click', (e)=> {              // Закрываем модалку при нажатии на подложку
    //     if (e.target === modal || e.target.getAttribute('data-close') === '') {
    //         closeModal();
    //     }
    // });

    // document.addEventListener('keydown', (e)=> {                                // Событие отлавливает нажатие кнопки
    //     if (e.code === 'Escape' && modal.classList.contains('show')) {          // code - отслеживает код нажатой кнопки
    //         closeModal();
    //     }
    // });

    // const modalTimerID = setTimeout(openModal, 300000);

    // function showModalByScroll() {          // Функция которая открывает модалку при скроле в низ страницы
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
    //         openModal();
    //         window.removeEventListener('scroll', showModalByScroll);       // Удаляем обработчик после использования
    //     };
    // };

    // window.addEventListener('scroll', showModalByScroll);         // Событие с функицей выше

    // /////////// Cards

    // class MenuCard {
    //     constructor(src, alt, title, descr, price, parentSelector, ...classes) {   ///////Класс для карточек
    //         this.src = src;                                             //свойства класса
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.classes = classes;
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 27;
    //         this.changeToUAH();
    //     }

    //     changeToUAH() {
    //         this.price = this.price * this.transfer;        // // Метод конвертирующий грн в юсд

    //     }

    //     render() {
    //         const element = document.createElement('div');                      // // Создаем родителя карточек
            
    //         if (this.classes.length === 0) {
    //             this.element = 'menu__item';
    //             element.classList.add(this.element);
    //         } else {
    //             this.classes.forEach(className => element.classList.add(className));    // назначаем класс всем каточкам
    //         }

    //         element.innerHTML = `
    //             <img src=${this.src} alt=${this.alt}>
    //             <h3 class="menu__item-subtitle">${this.title}</h3>
    //             <div class="menu__item-descr">${this.descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Ціна:</div>
    //                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    //             </div>
    //         `;
    //         this.parent.append(element);                       // // аппендим родителя
    //     }
    // }

    // const getResource = async (url)=> {    // // Получение карточек с сервера
    //     const res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch${url}, status: ${res.status}`); // // покажет ошибку и статус
    //     }

    //     return await res.json();      // //получает ответ от сервера и транфит его в json
    // };

    // // getResource('http://localhost:3001/menu') // // постинг карточек на страницу из db.json
    // // .then(data=> {                             // //обрабатываем промис и устанавливаем параметры при помощи деструктур.
    // //     data.forEach(({img, altimg, title, descr, price}) => {  // перебираем арр с карточками, констр срабатывает столько раз сколько карточек
    // //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();// используем конструктор написаный ранее для рендера на страницу
    // //     });                        
    // // });

    // axios.get('http://localhost:3001/menu')     // ссылка с которой мы получаем данные
    // .then(data=> {                             // //обрабатываем промис и устанавливаем параметры при помощи деструктур.
    //     data.data.forEach(({img, altimg, title, descr, price}) => {                   // // перебираем арр с карточками
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();// используем конструктор написаный ранее для рендера на страницу
    //     });                        
    // });

    // // Forms

    // const forms = document.querySelectorAll('form');

    // const message = {               // // Сообщение для юзера
    //     loading: 'img/spinner/spinner.svg',      // // Спиннер из папки img. Нужно просто указать путь и использовать изобр.
    //     ssucces: 'Thank you!',
    //     failure: 'Error!'
    // };

    // const postData = async (url, data)=> {    // func настраивает наш запрос, посылает его на сервер
    //     const res = await fetch(url, {       // async await для того что бы асинхкод отработал правильно
    //         method: 'POST',                 //ответ от сервера приходит асинхронно
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: data
    //     });

    //     return await res.json();      // //получает ответ от сервера и трансфит его в json
    // };

    // function bindPostData(form) {                           // // Функция по отправке данніх
    //     form.addEventListener('submit', (e)=> {
    //         e.preventDefault();

    //         const statusMessage = document.createElement('img');  // // Cоздание єлемента на странице для помещения сообщения юзеру
    //         statusMessage.src = message.loading;    // // Помещаем спиннер на стрнцу
    //         statusMessage.style.cssText = `         
    //             display: block;
    //             margin: 0 auto;
    //         `;                              // // центруем спиннер стилями
    //         form.append(statusMessage);
    //         form.insertAdjacentElement('afterend', statusMessage);

    //         const formData = new FormData(form);        // // Создание объекта formData

    //         const json = JSON.stringify(Object.fromEntries(formData.entries())); //превращаем formData в арр с аррами,
    //                                                                               // //после в obj, а после в json
    //         // // FETCH
    //         // // Создание запроса на сервер с помощью func postData внутри которой fetch возвращающий promise
    //         postData('http://localhost:3001/requests', json)        // // обрабатываем ответ с помошью then и catch
    //         .then(data => {                                             // // data - это полученные данные от сервера
    //             console.log(data);
    //             showThanksModal(message.ssucces);
    //             statusMessage.remove();             // Удаление соббщения для юзера
    //         })
    //         .catch(()=> {
    //             showThanksModal(message.failure);       // ввывод ошибки при срабатывании reject
    //         })
    //         .finally(()=> {
    //             form.reset();                    // Сброс формы после успешной отправки данных
    //         })
    //     });
    // };
    
    // forms.forEach(form => {             // //запуск функции(item это форма)
    //     bindPostData(form);
    // });

    //             // // //STM - showThanksModal
    // function showThanksModal(message) {        // // Открытие окна благодарности
    //     const prevModalDialog = document.querySelector('.modal__dialog');

    //     prevModalDialog.classList.add('hide');
    //     openModal();                            // // Когда срабатывает функция STM, в ней срабатывает openModal()

    //     const thanksModal = document.createElement('div'); // Создаем новый элемент для оповещ
    //     thanksModal.classList.add('modal__dialog'); // // Формируем верстку оповищ, сообщ юзеру берем из obj выше
    //     thanksModal.style.marginTop = '25%';
    //     thanksModal.innerHTML = `
    //         <div class="modal__content">
    //             <div class="modal__close" data-close>×</div>
    //             <div class="modal__title">${message}</div>
    //         </div>
    //     `;

    //     document.querySelector('.modal').append(thanksModal); // // appendim новый элемент в блок модального окна
    //     setTimeout(()=> {
    //         thanksModal.remove();               // // Удаление блока через 4 сек после показа сообщ
    //         prevModalDialog.classList.add('show');
    //         prevModalDialog.classList.remove('hide');
    //         closeModal();
    //     }, 4000);
    // };

    // // // // Slider сложный вариант

    // const slides = document.querySelectorAll('.offer__slide');
    // const slider = document.querySelector('.offer__slider');
    // const prev = document.querySelector('.offer__slider-prev');
    // const next = document.querySelector('.offer__slider-next');
    // const total = document.querySelector('#total');
    // const current = document.querySelector('#current');
    // const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    // const slidesField = document.querySelector('.offer__slider-inner');
    // const width = window.getComputedStyle(slidesWrapper).width;

    // let slideIndex = 1;                            // //текущее положение в слайдере
    // let offset = 0;

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`; // // если номер слайда меньше 10, перед цифрой добавляем 0
    //     current.textContent = `0${slideIndex}`;
    // } else {
    //     total.textContent = slides.length;      // //если 10 или больше, 0 не добавляем
    //     current.textContent = slideIndex;
    // }

    
    // function slidesCurrent() {
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // };

    // const deleteTwoLastSymbols = /\D/g;

    // slidesField.style.width = 100 * slides.length + '%';
    // slidesField.style.display = 'flex';
    // slidesField.style.transition = '0.5s all';

    // slidesWrapper.style.overflow = 'hidden';

    // slides.forEach(slide => {
    //     slide.style.width = width;
    // });

    // slider.style.position = 'relative';

    // const indicators = document.createElement('ol');
    // const dots = [];

    // indicators.classList.add('carousel-indicators');
    // indicators.style.cssText = `
    //     position: absolute;
    //     right: 0;
    //     bottom: 0;
    //     left: 0;
    //     z-index: 15;
    //     display: flex;
    //     justify-content: center;
    //     margin-right: 15%;
    //     margin-left: 15%;
    //     list-style: none;
    // `;
    // slider.append(indicators);

    // for (let i = 0; i < slides.length; i++) {
    //     const dot = document.createElement('li');
    //     dot.setAttribute('data-slide-to', i + 1);
    //     dot.style.cssText = `
    //         box-sizing: content-box;
    //         flex: 0 1 auto;
    //         width: 30px;
    //         height: 6px;
    //         margin-right: 3px;
    //         margin-left: 3px;
    //         cursor: pointer;
    //         background-color: #fff;
    //         background-clip: padding-box;
    //         border-top: 10px solid transparent;
    //         border-bottom: 10px solid transparent;
    //         opacity: .5;
    //         transition: opacity .6s ease;
    //     `;

    //     if (i == 0) {
    //         dot.style.opacity = 1;
    //     }

    //     indicators.append(dot);
    //     dots.push(dot);
    // };

    // function dotsOpasity() {
    //     dots.forEach(dot => dot.style.opacity = '.5');
    //     dots[slideIndex - 1].style.opacity = 1;
    // };
    
    // next.addEventListener('click', ()=> {
    //     if(offset == +width.replace(deleteTwoLastSymbols, '') * (slides.length - 1)) {
    //         offset = 0;
    //     } else {
    //         offset += +width.replace(deleteTwoLastSymbols, '');
    //     }

    //     slidesField.style.transform = `translateX(-${offset}px)`;

    //     if (slideIndex == slides.length) {
    //         slideIndex = 1;
    //     } else {
    //         slideIndex++;
    //     }

    //     slidesCurrent();
    //     dotsOpasity();
    // });

    // prev.addEventListener('click', ()=> {
    //     if(offset == 0) {
    //         offset = + width.replace(deleteTwoLastSymbols, '') * (slides.length - 1);
    //     } else {
    //         offset -= +width.replace(deleteTwoLastSymbols, '');
    //     }

    //     slidesField.style.transform = `translateX(-${offset}px)`;

    //     if (slideIndex == 1) {
    //         slideIndex = slides.length;
    //     } else {
    //         slideIndex--;
    //     }

    //     slidesCurrent();
    //     dotsOpasity();
    // });

    // dots.forEach(dot => {
    //     dot.addEventListener('click', (e)=> {
    //         const slideTo = e.target.getAttribute('data-slide-to');

    //         slideIndex = slideTo;
    //         offset = +width.replace(deleteTwoLastSymbols, '') * (slideTo - 1);

    //         slidesField.style.transform = `translateX(-${offset}px)`;

    //         slidesCurrent();
    //         dotsOpasity();
    //     });
    // })

    // // // // Более простой вариант слайдера

    // // showSlides(slideIndex);         // // вызов функции с изначальной позицией в слайдере

    // // if (slides.length < 10) {
    // //     total.textContent = `0${slides.length}`; // // если номер слайда меньше 10, перед цифрой добавляем 0
    // // } else {
    // //     total.textContent = slides.length;      // //если 10 или больше, 0 не добавляем 
    // // }

    // // function showSlides(n) {            // n - это slideIndex
    // //     if (n > slides.length) {        // //если значение больше чем у нас в слайдере, устанавливаем то 
    // //         slideIndex = 1;             //slideIndex = 1 (то есть возвращаемся на первый слайд)
    // //     }

    // //     if (n < 1) {                    // // обратная операция(если n < 1 то мы устанавливаем слайдер на последнюю позицию)
    // //         slideIndex = slides.length;
    // //     }

    // //     slides.forEach(item => item.style.display = 'none'); // Скрываем все слайды с помошью стилей. предварительно перебрав

    // //     slides[slideIndex - 1].style.display = 'block'; // показываем нужный слайд (-1 изза того что slides это arr)

    // //     if (slides.length < 10) {
    // //         current.textContent = `0${slideIndex}`; // // добавляем 0 к активному слайду
    // //     } else {
    // //         slideIndex.textContent = slideIndex;     
    // //     }
    // // };

    // // function plusSlides(n) {   // // изменяет наш slideIndex. когда листаем вперед увеличиваем на 1, когда назад, уменьшаем
    // //     showSlides(slideIndex += n);
    // // };

    // // prev.addEventListener('click', ()=> {
    // //     plusSlides(-1); // // когда нажимаем на prev - передаем -1
    // // });

    // // next.addEventListener('click', ()=> {
    // //     plusSlides(1); // // когда нажимаем на prev - передаем +1
    // // }); 

    // // // // Calc

    // const result = document.querySelector('.calculating__result span'); // куда помещается результат

    // let sex, height, weight, age, ratio;

    // /// /// /// /// /// LocalStorage для запоминания значений(не обязательно)

    // if (localStorage.getItem('sex')) {
    //     sex = localStorage.getItem('sex');
    // } else {
    //     sex = 'female';
    //     localStorage.setItem('sex', 'female');
    // }

    // if (localStorage.getItem('ratio')) {
    //     ratio = localStorage.getItem('ratio');
    // } else {
    //     ratio = 1.375;
    //     localStorage.setItem('ratio', 1.375);
    // }

    // function initLocalSettings(selector, activeClass) {
    //     const elements = document.querySelectorAll(selector);

    //     elements.forEach(elem => {
    //         elem.classList.remove(activeClass);

    //         if(elem.getAttribute('id') === localStorage.getItem('sex')) {
    //             elem.classList.add(activeClass);
    //         }
    //         if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
    //             elem.classList.add(activeClass);
    //         }  
    //     });
    // };

    // initLocalSettings('#gender div' , 'calculating__choose-item_active');
    // initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // /// /// /// /// ///^^

    // function calcTotal() {                                  // //func расчёта калорийности
    //     if (!sex || !height || !weight || !age || !ratio) {//если значения false то выведится '---' если тру то сработает формула
    //         result.textContent = '---';
    //         return;                             // // ретерн для досрочного завершения функиции
    //     }

    //     if (sex === 'female') {           // //  если выбран жен пол то расчёт будет по одной формуле и выведется на страницу
    //         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    //     } else {                              // // если мужской то по второй формуле
    //         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    //     }
    // };

    // calcTotal();

    // function getStaticInform(selector, activeClass) {                 // // получение статической инфы
    //     const elements = document.querySelectorAll(selector);   // //получаем дивы в родителе (дивы указываем при вызове функ)

    //     elements.forEach(elem => {
    //         elem.addEventListener('click', (e)=> {
    //             if (e.target.getAttribute('data-ratio')) { // // если у элема на котором произ. событие есть аттрибут мы его присваиваем
    //                 ratio = +e.target.getAttribute('data-ratio');   // //  из e.target
    //                 localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
    //             } else {
    //                 sex = e.target.getAttribute('id');
    //                 localStorage.setItem('sex', e.target.getAttribute('id'));
    //             }
    
    //             elements.forEach(elem => {              // // убираем класс актив у дивов которые получали
    //                 elem.classList.remove(activeClass);
    //             });
    
    //             e.target.classList.add(activeClass); // // добавляем тому диву клас на котором произошло событие
    
    //             calcTotal();
    //         });
    //     });
    // };

    // getStaticInform('#gender div', 'calculating__choose-item_active');// 1арг родитель по id 2арг класс активности
    // getStaticInform('.calculating__choose_big div', 'calculating__choose-item_active');// 1арг родитель 2арг класс активности

    // function getDynamicInform(selector) {           // // func по работе с инпутами для получения динамич информ
    //     const input = document.querySelector(selector);     // //получаем нужный инпут

    //     input.addEventListener('input', ()=> { // // обработчик на инпут

    //         if(input.value.match(/\D/g)) {      // // проверям регЭкспом на не числа
    //             input.style.border = '2px solid red'; // // Если в value не число подсвечиваем бордер красным
    //         } else {
    //             input.style.border = 'none';
    //         }

    //         switch(input.getAttribute('id')) { // switch/Case проверяем наши єлем по id. Если совпало то присваеваем input.value
    //             case 'height':                                                                  //то что вписал пользователь
    //                 height = +input.value;
    //                 break;
    //             case 'weight':
    //                 weight = +input.value;
    //                 break;
    //             case 'age':
    //                 age = +input.value;
    //                 break;
    //         }
            
    //         calcTotal();
    //     });
    // };

    // getDynamicInform('#height');
    // getDynamicInform('#weight');
    // getDynamicInform('#age');
}); 
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map