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

export default slider;