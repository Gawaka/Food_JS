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

export default tabs;