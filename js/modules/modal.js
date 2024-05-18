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

export default modal;
export {closeModal};
export {openModal};
