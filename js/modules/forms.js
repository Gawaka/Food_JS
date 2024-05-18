import {closeModal, openModal} from './modal';
import {postData} from './services/services';

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
            postData('http://localhost:3001/requests', json)        // // обрабатываем ответ с помошью then и catch
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
        openModal('.modal', modalTimerId);                            // // Когда срабатывает функция STM, в ней срабатывает openModal()

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
            closeModal('.modal');
        }, 4000);
    };
}

export default forms;