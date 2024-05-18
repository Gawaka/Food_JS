import { getResource } from "./services/services";

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

export default menuCards;