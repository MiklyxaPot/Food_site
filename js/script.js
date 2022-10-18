window.addEventListener('DOMContentLoaded', () => {
   // =================TABS===============
   const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
         // item.style.display = 'none';
         // скрываем все классы 
      });
      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
         // удаляем класс активности
      });
   }
   function showTabContent(i = 0) {
      // tabsContent[i].style.display = 'block';
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');

      tabs[i].classList.add('tabheader__item_active');
      // назначаем стиль блок и добавляем его к нужному блоку
   }
   // при начале открытия строницы  мы скрываем все блоки 
   // и показываем нужный
   hideTabContent();
   showTabContent();
   // если функция вызывается безаргумента по умочантюзапишится то что прописали вверху i = 0
   tabsParent.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.classList.contains('tabheader__item')) {
         // при клике нужно определить к кокому номеру мы кликнули и  записатьв функцию показатьконтент
         // это можно сделатьметобом перебора, 
         tabs.forEach((item, i) => {
            // item элемент который перебираем, i его номер
            if (target == item) {
               hideTabContent();
               showTabContent(i);
               //  если при переборе  item который совпал c target, то запускаются функции, и i номер 
               // элемента записывается
            }
         });
      }
   });

   // =========================TIMER====================

   const deadLine = '2022-12-11';//дата конца

   function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()); //от конечной датымы отнимаем текушюю
      let days, hours, minutes, seconds;
      if (t <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
         days = Math.floor(t / (1000 * 60 * 60 * 24)),// получаем дни полученное число делим на количествло милисикунд
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),// оператор % делит на число и возврашает остаток(50\24= 2.08 вернет 08)
            minutes = Math.floor((t / 1000 / 60) % 60),//минуты это остаток от деления на 60
            seconds = Math.floor((t / 1000) % 60);
      }

      return {
         'total': t,// total этосвойство ; тут записывается сколько время осталось в милисикундах
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      }
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }
   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),//к коому классу обрашаемся, сюдазапишится
         days = document.querySelector('#days'),
         hours = document.querySelector('#hours'),
         minutes = document.querySelector('#minutes'),
         seconds = document.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);// будет запускать эту функцию каждую секунду 
      updateClock();
      function updateClock() {
         const t = getTimeRemaining(endtime);

         days.innerHTML = getZero(t.days),
            hours.innerHTML = getZero(t.hours),
            minutes.innerHTML = getZero(t.minutes),
            seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);//когда время выщло таймер остановится, не будет обновлятся
         }

      }

   }
   setClock('.timer', deadLine);

   // =========================MODAL====================
   // const modalOpen = document.querySelector('data-modal');
   //    modalOpen.addEventListener('click', (e) =>{
   //       e.target.style.display = "block";
   //    })
   const modalTrigger = document.querySelectorAll('[data-modal]');
   const modal = document.querySelector('.modal');
   const modalClose = document.querySelector('[data-close]');

   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimeId);//если уже произошло сробатывание этой функции то автоматическое открытие modalTimeId не произойдет, оно очистится

   }

   modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);


   });
   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
   }

   modalClose.addEventListener('click', closeModal);

   modal.addEventListener('click', (e) => {
      if (e.target === modal) {//когдапользователь кликнулна обвертку окна, но не само окно , то выполняется условие
         closeModal();
      }
   })

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   });

   const modalTimeId = setTimeout(openModal, 3000);

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }
   // когда проискодит событие скрол до конца выпоняется условие и запускается openModal, после этого удаляется обработчик события скрола
   window.addEventListener('scroll', showModalByScroll);

   // =======================CHAMGE CART==========================
   // ДЕЛАЕМ КАРТОЧКИ ДИНОМИЧЕСКИ

   class MenuCard {
      constructor(src, alt, title, descr, praice, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.praice = praice;
         this.classes = classes;//добавили рест опретор который будет собирать новые классы в массив
         this.parent = document.querySelector(parentSelector);//сюда будет передаватся элемент который мы будет задавать в настройках
         this.transfer = 63;
         this.changeToRub();//когда сююда дойдет код он вызовет этотметод . он поститает и перезапишит  praice;
      }

      changeToRub() {
         this.praice = this.praice * this.transfer;
      }

      render() {
         const element = document.createElement('div');
         if(this.classes.length === 0){
            this.element = 'menu__item';
            element.classList.add(this.element)
         }else {
           this.classes.forEach(className => element.classList.add(className));//перебираем масив classes находим каждый элемент className  и добавляем его(это классы) в element  
         }         
         element.innerHTML = `
               <img src=${this.src} alt=${this.alt}>
               <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                   <div class="menu__item-cost">Цена:</div>
                   <div class="menu__item-total"><span>${this.praice}</span> рубль/день</div>`;
         this.parent.append(element);//метод append помешает заданый элемент в  ново созданфй элемент
      }
   }
   new MenuCard(//сюда передаем аргументы с кода html
   "img/tabs/vegy.jpg",//передавать в ""
   "vegy",
   "Меню 'Фитнес'",
   "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
   10,
   '.menu .container'//родительский селектор
   ).render();//такая запись без const div= ТОже верна, она вызоветсятолбк в конструкторе потом удалится таккак нет ссылок на нее больше

   new MenuCard(//сюда передаем аргументы с кода html
   "img/tabs/post.jpg"  ,//передавать в ""
   "post",
   'Меню "Постное"',
   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
   7,
   '.menu .container'//родительский селектор
   ).render();
   new MenuCard(//сюда передаем аргументы с кода html
   "img/tabs/elite.jpg",//передавать в ""
   "elite",
   'Меню “Премиум”',
'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
   9,
   '.menu .container'//родительский селектор
   ).render();
   
});

