'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const TABLET_WIDTH = 720;
    const DESKTOP_WIDTH = 980;
    const PAGE_CLASS = 'page';
    const HIDDEN_CLASS = 'visually-hidden';
    const hiddenClass = 'visually-hidden';
    const menuBtnClassActive = 'active';
    const pageHeaderClass = 'page__header';
    const headerMenuBtnClass = 'header__menu-btn';
    const headerMainClassActive = 'active';
    const headerMainClass = 'header__main';
    const siteNoticeClass = 'site-notice';

    let WINDOW_WIDTH;
    let WINDOW_WIDTH_INNER;
    let windowHeight;
    let pageHeaderHeight;
    let headerMain = document.querySelector(`.${headerMainClass}`);
    let headerMenuBtn = document.querySelector(`.${headerMenuBtnClass}`);
    let siteNotice = document.querySelector(`.${siteNoticeClass}`);
    let siteNoticeIsHidden = siteNotice.classList.contains(hiddenClass);

    function setPageMinHeight() {
        document.querySelector(`.${PAGE_CLASS}`).style.minHeight = `${window.innerHeight}px`;
    }

    let x;
    let big;
    function widthDevice() {
        x = document.documentElement.clientWidth;
        WINDOW_WIDTH = document.documentElement.clientWidth;
        WINDOW_WIDTH_INNER = window.innerWidth;
        setPageMinHeight();
        windowHeight = window.innerHeight;
        if (x >= 980) big = true;
        if (x < 980 && big) {
            delSideItemsCLass('.drop-country__item');
            big = false;
        }
    }

    widthDevice();

    function delSideItemsCLass(itemName) {
        const items = document.querySelectorAll(itemName);

        if (items.length > 0) {
            for (const item of items) {
                item.removeAttribute('style');
            }
        }
    }

    let close720 = x >= 720 ? true : false;
    let close980 = x >= 980 ? true : false;

    window.addEventListener('resize', () => {
        widthDevice();
        replaceLinkLkForMobile();
        if (x < 720 && close720) {
            close720 = false;
            closePopaps();
        }

        if (x >= 720 && !close720) {
            close720 = true;
            closePopaps();
        }

        if (x < 980 && close980) {
            close980 = false;
            closePopaps();
        }
        if (x >= 980 && !close980) {
            close980 = true;
            closePopaps();
        }
    });

    /* Личный кабинет в шапке мобильных */
    function replaceLinkLkForMobile() {
        const headerLkLink = document.querySelector('.header__lk.link-lk');

        if (WINDOW_WIDTH_INNER < DESKTOP_WIDTH) {
            document.querySelector('.header__mobilelk-wrap').append(headerLkLink);
        } else {
            document.querySelector('.header__lk-wrap').append(headerLkLink);
        }
    }
    replaceLinkLkForMobile();

    /* Закрыть уведомление в шапке сайта */
    if (siteNotice && !siteNoticeIsHidden) {
        let siteNoticeBtn = siteNotice.querySelector(`.${siteNoticeClass}__btn`);

        siteNoticeBtn.addEventListener('click', () => {
            siteNotice.classList.add(hiddenClass);
            pageHeaderHeight = window.getComputedStyle(document.querySelector(`.${pageHeaderClass}`)).height;

            // headerFormBlockTop();
        });
    }

    addScrollClass();
    function addScrollClass() {
        const headerMiddle = document.querySelector('.header__middle');
        const headerForm = document.querySelector('.page__header-form');
        window.addEventListener("scroll", function () {
            let scrollTop = window.scrollY;

            if (scrollTop > 60) {
                headerMiddle.classList.add("header__middle--scroll");
            } else {
                headerMiddle.classList.remove("header__middle--scroll");
            }

            if (scrollTop > 260) {
                headerForm.classList.add("header-form--scroll");
            } else {
                headerForm.classList.remove("header-form--scroll");
            }
        });
    }

    /* Кнопка меню */
    const menuBtns = document.querySelectorAll('.header__menu-btn');

    if (menuBtns.length > 0) {
        menuBtns.forEach(menuBtn => {
            menuBtn.addEventListener('click', toggleMenuBtn);

            function toggleMenuBtn() {
                let isActive = this.classList.contains(menuBtnClassActive);

                if (isActive) {
                    this.classList.remove(menuBtnClassActive);
                } else {
                    this.classList.add(menuBtnClassActive);
                }
            }
        });
    }

    /* Кнопка меню в шапке */
    if (headerMenuBtn) {
        headerMenuBtn.addEventListener('click', toggleHeaderMenu);

        function toggleHeaderMenu() {
            let isActive = headerMain.classList.contains(headerMainClassActive);

            if (isActive) {
                headerMain.classList.remove(headerMainClassActive);
                document.querySelector('body').style.overflow = "unset";
            } else {
                headerMain.classList.add(headerMainClassActive);
                document.querySelector('body').style.overflow = "hidden";
                headerMain.setAttribute('style', `top: ${calcHeight()}px; max-height: calc(100vh - ${calcHeight()}px)`);
            }
        }
    }

    /* Подменю шапки */
    const navItemClass = 'nav-item';
    const navItemClassActive = `active`;
    const navItemBtnClass = `${navItemClass}__btn`;
    const navItemBodyClass = `${navItemClass}__body`;
    const navItemBodyInnerClass = `${navItemClass}__body-inner`;
    const navItems = document.querySelectorAll(`.${navItemClass}`);
    const navItemBtns = document.querySelectorAll(`.${navItemBtnClass}`);
    const navItemBodys = document.querySelectorAll(`.${navItemBodyClass}`);

    if (navItemBtns.length > 0) {
        function navItemBodyHidden(elem) {
            if (WINDOW_WIDTH < DESKTOP_WIDTH) {
                elem.style.height = '0';
            } else {
                elem.style.height = "auto";
            }
        }

        function navItemBodyVisible(elem, height) {
            if (WINDOW_WIDTH < DESKTOP_WIDTH) {
                elem.style.height = height;
            }
        }

        function changeNavItemActive() {
            if (WINDOW_WIDTH < DESKTOP_WIDTH) {
                let item = this.closest(`.${navItemClass}`);
                let itemBody = item.querySelector(`.${navItemBodyClass}`);

                let isItemActive = item.classList.contains(navItemClassActive);
                let itemBodyInners = item.querySelectorAll(`.${navItemBodyInnerClass}`);
                for (const itemBodyInner of itemBodyInners) {
                    let itemBodyNeedyHeight = window.getComputedStyle(itemBodyInner).height;

                    if (!isItemActive) {
                        navItemBodys.forEach(item => { navItemBodyHidden(item) });
                        navItems.forEach(item => { item.classList.remove(navItemClassActive) });
                        navItemBodyVisible(itemBody, itemBodyNeedyHeight);
                        item.classList.add(navItemClassActive);
                    }
                    else {
                        navItemBodyHidden(itemBody);
                        item.classList.remove(navItemClassActive);
                    }
                }
            }
        }

        window.addEventListener('load', function () {
            navItemBodys.forEach(item => navItemBodyHidden(item));
            navItemBtns.forEach(item => { item.addEventListener('click', changeNavItemActive) });
        });

        window.addEventListener('resize', function () {
            navItemBodys.forEach(item => navItemBodyHidden(item));
            navItems.forEach(item => item.classList.remove(navItemClassActive));
            navItemBtns.forEach(item => { item.addEventListener('click', changeNavItemActive) });
        });
    }

    // hero-swiper
    const swiperHero = new Swiper('.hero__swiper', {
        wrapperClass: 'hero__swiper-wrapper',
        slideClass: 'hero__slide',
        speed: 400,
        spaceBetween: 0,
        loop: true,

        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },

        pagination: {
            el: '.slider-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.hero .slider-btn--next',
            prevEl: '.hero .slider-btn--prev',
        },
    });

    const swiperSimple = new Swiper('.slider-simple__inner', {
        wrapperClass: 'slider-simple__list',
        slideClass: 'slider-simple__item',
        speed: 400,
        spaceBetween: 0,
        loop: true,

        pagination: {
            el: '.slider-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.slider-simple .slider-btn--next',
            prevEl: '.slider-simple .slider-btn--prev',
        },
    });

    const swiperSale = new Swiper('.sale__swiper', {
        wrapperClass: 'sale__wrapper',
        slideClass: 'sale__slide',
        speed: 400,
        spaceBetween: 15,
        loop: true,

        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },

        navigation: {
            nextEl: '.sale .slider-btn--next',
            prevEl: '.sale .slider-btn--prev',
        },

        pagination: {
            el: '.slider-pagination',
            type: 'bullets',
        },
    });

    if ($('.slider__swiper').length > 0) { //some-slider-wrap-in
        let swiperInstances = [];
        $(".slider__swiper").each(function (index, element) { //some-slider-wrap-in
            const $this = $(this);
            $this.addClass("instance-" + index); //instance need to be unique (ex: some-slider)
            $this.parent().find(".slider-btn--prev").addClass("prev-" + index); //prev must be unique (ex: some-slider-prev)
            $this.parent().find(".slider-btn--next").addClass("next-" + index); //next must be unique (ex: some-slider-next)
            swiperInstances[index] = new Swiper(".instance-" + index, { //instance need to be unique (ex: some-slider)
                wrapperClass: 'slider__list',
                slideClass: 'slider__item',
                speed: 400,
                spaceBetween: 10,
                observer: true,
                observeSlideChildren: true,
                observeParents: true,
                slidesPerView: 'auto',
                spaceBetween: 10,
                watchOverflow: true,
                loop: true,

                navigation: {
                    prevEl: ".prev-" + index,  //prev must be unique (ex: some-slider-prev)
                    nextEl: ".next-" + index, //next must be unique (ex: some-slider-next)
                },
                breakpoints: {

                    720: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                },
            });
        });
    }

    const swiperNews = document.querySelector('.news');

    if (swiperNews) {
        const swiperGallery = new Swiper('.news__slider', {
            wrapperClass: 'news__slider-inner',
            slideClass: 'news__slide',
            observer: true,
            observeSlideChildren: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 10,
            watchOverflow: true,

            breakpoints: {
                720: {
                    spaceBetween: 20,
                },
            },
            navigation: {
                nextEl: '.news .slider-btn--next',
                prevEl: '.news .slider-btn--prev',
            },
        });
    };

    const toursMenuBtn = document.querySelector('.main-content__menu-btn');
    if (toursMenuBtn) {
        const toursCloseMenuBtn = document.querySelector('.tours-popup__menu-btn');
        const toursPopup = document.querySelector('.tours-popup');
        toursMenuBtn.addEventListener('click', () => {
            toursPopup.classList.add('active');
            lockScroll();
        });

        if (toursCloseMenuBtn) {
            toursCloseMenuBtn.addEventListener('click', () => {
                toursPopup.classList.remove('active');
                unLockScroll();
            });
        }
    }

    function lockScroll() {
        const body = document.querySelector('body');
        body.setAttribute('style', 'overflow: hidden');
    }

    function unLockScroll() {
        const body = document.querySelector('body');
        body.removeAttribute('style');
    }

    // табы
    tabsActions('.tabs-menu li > *', 'body', '.tabs-list > *');

    function tabsActions(btns, parrent, body) {
        const tabsMenuBtns = document.querySelectorAll(btns);
        if (tabsMenuBtns.length > 0) {

            const tabsBodyItems = tabsMenuBtns[0].closest(parrent).querySelectorAll(body);
            tabsMenuBtns[0].classList.add('active');

            if (tabsBodyItems.length > 0) {
                tabsBodyItems[0].classList.add('active');
                for (let i = 0; i < tabsMenuBtns.length; i++) {
                    tabsMenuBtns[i].addEventListener('click', function (e) {
                        e.preventDefault();
                        this.classList.toggle

                        if (!this.classList.contains('active')) {
                            for (const i of tabsMenuBtns) {
                                i.classList.remove('active');
                            }
                            this.classList.add('active');
                            for (const item of tabsBodyItems) {
                                item.classList.remove('active');
                            }

                            tabsBodyItems[i].classList.add('active');
                        }
                    });
                }
            }
        }
    }

    // количество ночей
    const formItemNights = $('.form-item--nights');

    if (formItemNights.length > 0) {

        const inputs = $('.form-item--nights .form-item__input');

        $.each(inputs, function (index, input) {
            const inputValue = $(input).val();
            let dayArray = inputValue.split('-');
            let cleanDayArray = [];
            $.each(dayArray, function (index, day) {
                cleanDayArray.push(Number(day.trim()));
            });

            const btns = $(input).closest('.form-item').find('.nights__item-inner');

            if (cleanDayArray[0] < 1) cleanDayArray[0] = 1;
            if (cleanDayArray[1] > btns.length) cleanDayArray[1] = btns.length;

            for (let i = cleanDayArray[0] - 1; i <= cleanDayArray[1] - 1; i++) {
                btns[i].classList.add('nights__item-inner--active');
            }
        });

        for (const formItemNight of formItemNights) {
            const nightsItemBtns = formItemNight.querySelectorAll('.nights__item-inner');

            let activeOneIndex = -1;
            let activeTwoIndex = -1;
            let counter;

            function howMuchActive() {
                counter = 0;
                for (let i = 0; i < nightsItemBtns.length; i++) {
                    if (nightsItemBtns[i].classList.contains('nights__item-inner--active')) {
                        counter++;
                    }
                }
            }

            for (let i = 0; i < nightsItemBtns.length; i++) {
                nightsItemBtns[i].addEventListener('click', function () {
                    howMuchActive();

                    if (counter == 0) {
                        activeOneIndex = this.textContent;
                        activeOneIndex = activeOneIndex.replace(/\s/g, "");
                        activeOneIndex = Number(activeOneIndex);
                    }

                    if (counter > 1) {
                        for (const btn of nightsItemBtns) {
                            btn.classList.remove('nights__item-inner--active');
                            activeOneIndex = this.textContent;
                            activeOneIndex = activeOneIndex.replace(/\s/g, "");
                            activeOneIndex = Number(activeOneIndex);
                            activeTwoIndex = -1;
                            const header = document.querySelector('.header');
                            header.classList.remove('active');
                        }
                        this.classList.add('nights__item-inner--active');
                    } else {
                        this.classList.add('nights__item-inner--active');
                        activeTwoIndex = this.textContent;
                        activeTwoIndex = activeTwoIndex.replace(/\s/g, "");
                        activeOneIndex = Number(activeOneIndex);
                    }

                    howMuchActive();


                    if (counter == 2 && activeOneIndex != -1 && activeTwoIndex != -1) {
                        if (activeTwoIndex < activeOneIndex) {
                            [activeTwoIndex, activeOneIndex] = [activeOneIndex, activeTwoIndex];
                        }

                        //результат тут
                        for (let index = activeOneIndex - 1; index < activeTwoIndex - 1; index++) {
                            nightsItemBtns[index].classList.add('nights__item-inner--active');
                        }

                        const headerForm = this.closest('.header-form');
                        headerForm.classList.remove('active');
                        unLockScroll();
                        const section = this.closest('section');
                        if (section) {
                            section.classList.remove('active');
                        }

                        let startDay = activeOneIndex;
                        let endDay = activeTwoIndex;

                        this.closest('.form-item').querySelector('.form-item__input').value = `${startDay}-${endDay}`
                        this.closest('.form-item').classList.remove('form-item--active');
                    }
                });

                nightsItemBtns[i].addEventListener('mouseover', function () {
                    howMuchActive();
                    if (i < activeOneIndex && activeOneIndex != -1 && counter < 2) {
                        for (let index = i; index < activeOneIndex; index++) {
                            nightsItemBtns[index].classList.add('nights__item-inner--hover');
                        }
                    }
                    if (i > activeOneIndex && activeOneIndex != -1 && counter < 2) {
                        for (let index = activeOneIndex; index < i; index++) {
                            nightsItemBtns[index].classList.add('nights__item-inner--hover');
                        }
                    }
                })

                nightsItemBtns[i].addEventListener('mouseout', function () {
                    for (const item of nightsItemBtns) {
                        item.classList.remove('nights__item-inner--hover');
                    }
                })
            }
        }
    }

    // input-number
    let inputNumbers = document.querySelectorAll('.input-number');

    if (inputNumbers.length > 0) {
        const inputNumberClass = `input-number__input`;
        const inputPlusClass = `input-number__btn--plus`;
        const inputMinusClass = `input-number__btn--minus`;

        inputNumbers.forEach(item => {
            let block = item;
            let input = block.querySelector(`.${inputNumberClass}`);
            let inputVal = +input.value;
            let inputMin = +input.dataset.min;
            let inputMax = +input.dataset.max;
            let plus = block.querySelector(`.${inputPlusClass}`);
            let minus = block.querySelector(`.${inputMinusClass}`);

            let plusHandler = function (evt) {
                evt.preventDefault();
                if (inputVal >= inputMax) return;
                inputVal += 1;
                input.value = inputVal;
                input.dataset.value = inputVal;
            }

            let minusHandler = function (evt) {
                evt.preventDefault();
                if (inputVal <= inputMin) return;
                inputVal -= 1;
                input.value = inputVal;
                input.dataset.value = inputVal;
            }

            plus.addEventListener('click', plusHandler);
            minus.addEventListener('click', minusHandler);
        })
    }

    // select-input
    let searchBlocks = document.querySelectorAll(`.select-input`);

    if (searchBlocks.length > 0) {
        searchBlocks.forEach(item => {
            let searchBlock = item;
            let searchInput = searchBlock.querySelector(`.select-input__input`)
            let searchBtn = searchBlock.querySelector(`.select-input__icon-wrap`)
            let searchItems = searchBlock.querySelectorAll(`.select-input__item`)

            let onSearchItemClick = function () {
                let item = this;
                let itemListWrap = item.closest('.select-input__list-wrap');
                let itemName = item.querySelector('.select-input__item-top');
                let itemNameText = itemName.textContent;
                let closestFilter = item.closest('.select-input');
                let closestInput = closestFilter.querySelector('.select-input__input');
                closestInput.value = itemNameText;
                itemListWrap.classList.remove('.select-input__list-wrap--opened');
                searchItems.forEach(item => item.classList.remove('.select-input__item--active'));
                item.classList.add('.select-input__item--active');
            };

            let showSearchOverlay = function () {
                searchBlocks.forEach(item => item.classList.remove(`select-input--active`));
                searchBlock.classList.add(`select-input--active`);
            };

            let toggleSearchOverlay = function (e) {
                let thisSearch = e.target.closest(`.select-input`);
                let thisSearchIsActive = thisSearch.classList.contains(`select-input--active`);
                searchBlocks.forEach((item) => item.classList.remove(`select-input--active`));

                if (!thisSearchIsActive) {
                    thisSearch.classList.add(`select-input--active`);
                } else {
                    thisSearch.classList.remove(`select-input--active`);
                }
            };

            let onOutsideSearchOverlayClick = function (evt) {
                let e = evt.target;
                let isInsideSearchClick = e.closest('.select-input__list-wrap--opened')
                    || e.closest('.select-input__input')
                    || e.closest('.select-input__icon-wrap');

                if (isInsideSearchClick) {
                    return;
                }

                searchBlock.classList.remove(`select-input--active`);
                evt.stopPropagation();
            };

            searchInput.addEventListener('focus', showSearchOverlay);
            searchInput.addEventListener('input', showSearchOverlay);
            searchBtn.addEventListener('click', toggleSearchOverlay);
            document.addEventListener('click', onOutsideSearchOverlayClick);
            searchItems.forEach(item => item.addEventListener('click', onSearchItemClick));
        })
    };

    /* Элементы главной формы поиска туров */
    // init form-items
    let initFormItems = function () {
        const formItemActiveClass = `form-item--active`;
        let formItems = document.querySelectorAll('.form-item');
        if (formItems.length == 0) return;

        formItems.forEach(block => {
            let blockInput = block.querySelector('input');
            let blockBtnToggle = block.querySelector('.form-item__btn');
            let blockBodyCloseBtns = block.querySelectorAll('.form-item__body-btn--close');

            blockBodyCloseBtns.forEach(item => {
                item.addEventListener('click', function (e) {
                    e.target.closest(`.form-item`).classList.remove(formItemActiveClass);
                    this.closest('.header-form').classList.remove('active');
                    document.querySelector('header').classList.remove('active');
                    unLockScroll();
                })
            })

            function checkInput() {
                let blockInputVal = blockInput.value;
                blockInputVal == false ? block.classList.add('form-item--empty') : block.classList.remove('form-item--empty');
            }

            function setActive() {
                closeActiveItems();
                block.classList.add('form-item--active');
                const header = document.querySelector('header');
                header.classList.add('active');
            }

            function changeActive(e) {
                let thisFormItem = e.target.closest(`.form-item`);
                let thisFormItemIsActive = thisFormItem.classList.contains(formItemActiveClass);
                formItems.forEach((item) => item.classList.remove(formItemActiveClass));
                const headerFormBlock = this.closest('.header-form');
                const header = document.querySelector('header');

                if (!thisFormItemIsActive) {
                    thisFormItem.classList.add(formItemActiveClass);
                    headerFormBlock.classList.add('active');
                    if (x < 980) {
                        lockScroll();
                    }
                    header.classList.add('active');

                } else {
                    thisFormItem.classList.remove(formItemActiveClass);
                    headerFormBlock.classList.remove('active');
                    header.classList.remove('active');
                    unLockScroll();
                }
            }

            function сlickOutside(evt) {
                let e = evt.target;
                let isInsideClick = e.closest('.form-item__body')
                    || e.closest('input')
                    || e.closest('.daterangepicker')
                    || e.closest('.available')
                    || e.closest('.form-item__body-btn')
                    || e.closest('.form-item__btn');

                if (isInsideClick) return;

                closeActiveItems(true);
                evt.stopPropagation();
            };

            window.addEventListener('load', checkInput);
            blockInput.addEventListener('focusin', checkInput);
            blockInput.addEventListener('focusout', checkInput);
            blockInput.addEventListener('focusin', setActive);
            blockBtnToggle.addEventListener('click', changeActive);
            document.addEventListener('click', сlickOutside);
        });
    };

    initFormItems();

    function closeActiveItems(blur = false) {
        let activeBlocks = document.querySelectorAll('.form-item--active');
        if (activeBlocks.length > 0) {
            activeBlocks.forEach(item => {
                item.classList.remove('form-item--active');
                if (blur) {
                    item.querySelector('input').blur();
                    unLockScroll();

                    const forms = document.querySelectorAll('.header-form');
                    for (const form of forms) {
                        form.classList.remove('active');
                    }
                }

                const header = document.querySelector('header');
                if (header) {
                    header.classList.remove('active');
                }
            });


        }
    }

    // календарь
    function initCalendar(parentElem, id) {
        const formCalendarProps = {
            parentEl: parentElem,
            opens: 'center',
            autoApply: true,
            minDate: moment(),
            startDate: moment().add(1, 'week'),
            endDate: moment().add(2, 'week'),
            locale: {
                format: 'DD.MM',
                "applyLabel": "Применить",
                "cancelLabel": "Отмена",
                "fromLabel": "С",
                "daysOfWeek": [
                    "Вс",
                    "Пн",
                    "Вт",
                    "Ср",
                    "Чт",
                    "Пт",
                    "Сб",
                ],
                "monthNames": [
                    "Январь",
                    "Февраль",
                    "Март",
                    "Апрель",
                    "Май",
                    "Июнь",
                    "Июль",
                    "Август",
                    "Сентябрь",
                    "Октябрь",
                    "Ноябрь",
                    "Декабрь"
                ],
                "monthNamesShort": ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                "firstDay": 1
            },
        };

        let calendarInput = $('#' + id);
        calendarInput.daterangepicker(formCalendarProps);

        calendarInput.on('apply.daterangepicker', function (evt, picker) {
            $(this).closest('.form-item').removeClass('.form-item--active');

            const formActive = this.closest('.header-form');
            formActive.classList.remove('active');
            unLockScroll();

            const header = document.querySelector('header');
            if (header) {
                header.classList.remove('active');
            }

        });
    };

    initCalendar('.page__header-form .form-item--calendar .form-item__body', 'header-form-dates');
    initCalendar('.header-form--light .form-item--calendar .form-item__body', 'content-form-dates1');

    const calendarBtns = document.querySelectorAll('.form-item--calendar .form-item__btn');

    for (const calendarBtn of calendarBtns) {
        calendarBtn.addEventListener('click', function () {
            setTimeout(() => {
                if (calendarBtn.closest('.form-item').classList.contains('form-item--active')) {
                    const label = this.closest('.form-item').querySelector('.form-item__wrap');
                    label.click();

                    const header = document.querySelector('.header');
                    if (header) {
                        header.classList.add('active');
                    }

                    if (x < 980) {
                        const formActive = this.closest('.header-form');
                        formActive.classList.add('active');
                        lockScroll();
                    }
                }
            }, 200);
        })
    }

    // высота хеадера либо другого элемента
    function calcHeight(el = '.header') {
        const elHeight = document.querySelector(el).offsetHeight;
        return elHeight;
    }

    // клик по кнопке поворот стрелки и вызов меню dropdown
    selectDropMenu('.filter-bar__btn', '.filter-bar__dropdown', '.filter-bar__menu', '.filter-bar__menu .form-drop-list__link');

    selectDropMenu('.form-select__btn', '.form-select', '.form-select__form-drop-list', '.form-drop-list__link', true);

    selectDropMenu('.search-input__input-btn', '.search-input', '.search-input__form-drop-list', '.search-input__form-drop-list a', true);

    function selectDropMenu(openBtn, parrent, dropMenu, dropMenuBtn, focus = false) {
        const filterBtns = document.querySelectorAll(openBtn),
            dropMenuButtons = document.querySelectorAll(dropMenuBtn),
            dropMenus = document.querySelectorAll(dropMenu);

        if (dropMenus.length > 0) {
            document.addEventListener("click", function (e) {
                const target = e.target;
                let itsMenu;
                let menuIsActive;
                let itsBtnMenu;
                let itsInput;
                let itsInputFocus;

                const labels = document.querySelectorAll(`${parrent} label`);

                if (focus) {
                    for (const i of labels) {
                        itsInput = target == i || i.contains(target);

                        if (itsInput) {
                            itsInputFocus = true;
                        }
                    }
                }

                for (const menu of dropMenus) {
                    itsMenu = target == menu || menu.contains(target);

                    if (menu.classList.contains("active")) {
                        menuIsActive = true;
                    }

                    if (itsMenu) {
                        break;
                    }
                }

                for (const btn of filterBtns) {
                    itsBtnMenu = target == btn || btn.contains(target);
                    if (itsBtnMenu) break;
                }

                if (!itsMenu && !itsBtnMenu && menuIsActive && !itsInputFocus) {
                    for (const btn of filterBtns) {
                        btn.classList.remove('active');
                    }

                    for (const menu of dropMenus) {
                        menu.classList.remove('active');
                    }

                    if (focus) {
                        const inputs = document.querySelectorAll(`${parrent} input`);
                        for (const input of inputs) {
                            input.classList.remove('active');
                        }
                    }
                }
            });

            for (const btn of filterBtns) {
                btn.addEventListener('click', () => {
                    const input = btn.closest(parrent).querySelector(`input`);
                    if (focus) {
                        if (btn.classList.contains('active')) {
                            for (const btn of filterBtns) {
                                btn.classList.remove('active');
                            }
                            input.classList.remove('active');
                        } else {
                            for (const btn of filterBtns) {
                                btn.classList.remove('active');
                            }
                            toggleActiveClass(btn);
                            input.classList.add('active');
                        }
                    }

                    let thisMenu = btn.closest(parrent).querySelector(dropMenu);

                    if (thisMenu.classList.contains('active')) {
                        for (const menu of dropMenus) {
                            menu.classList.remove('active');
                            btn.classList.remove('active');
                        }
                    } else {
                        for (const menu of dropMenus) {
                            menu.classList.remove('active');
                        }
                        for (const btn of filterBtns) {
                            btn.classList.remove('active');
                        }

                        thisMenu.classList.add('active');
                        btn.classList.add('active');
                    }
                });
            }

            for (const btn of dropMenuButtons) {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    setTimeout(() => {
                        let openBtnText = btn.closest(parrent).querySelector(`${openBtn} span`);

                        let fakeSelectInput = btn.closest(parrent).querySelector('input');

                        if (this.hasAttribute('href') || this.hasAttribute('type') && !this.hasAttribute('disabled')) {
                            const thisMenuBtns = this.closest(dropMenu).querySelectorAll(dropMenuBtn);
                            for (const b of thisMenuBtns) {
                                b.classList.remove('active');
                            }

                            toggleActiveClass(this);

                            btn.closest(dropMenu).classList.toggle('active');
                            if (btn.closest(parrent).querySelector(openBtn)) {

                                btn.closest(parrent).querySelector(openBtn).classList.toggle('active');
                            }
                            if (btn.closest(parrent).querySelector('input')) {
                                btn.closest(parrent).querySelector('input').classList.toggle('active');
                            }

                            if (openBtnText) {
                                openBtnText.textContent = btn.textContent;
                            }

                            if (fakeSelectInput !== null) {
                                fakeSelectInput.value = btn.textContent.trim();
                                let blockInputVal = fakeSelectInput.value;
                                blockInputVal.length < 1 ? fakeSelectInput.classList.add('empty') : fakeSelectInput.classList.remove('empty');
                            }
                        }
                    }, 30);
                });
            }

            if (focus) {
                const inputs = document.querySelectorAll(`${parrent} input`);

                for (const i of inputs) {
                    i.addEventListener('focus', function () {
                        setTimeout(() => {
                            this.classList.add('active');
                            if (this.closest(parrent).querySelector(openBtn)) {
                                this.closest(parrent).querySelector(openBtn).classList.add('active');
                            }
                            this.closest(parrent).querySelector(dropMenu).classList.add('active');
                        }, 30);
                    });

                    i.addEventListener('click', function () {
                        setTimeout(() => {
                            for (const menu of dropMenus) {
                                menu.classList.remove('active');
                            }
                            this.closest(parrent).querySelector(dropMenu).classList.add('active');
                        }, 30);
                    });
                }
            }
        }
    }

    function toggleActiveClass(el) {
        el.classList.toggle('active');
    }

    // у инпутов механики
    checkInputValue('.hard-input__input');
    checkInputValue('.form-select__input');

    function checkInputValue(inputs) {
        const blockInputs = document.querySelectorAll(inputs);

        for (const blockInput of blockInputs) {
            window.addEventListener('load', checkInput);
            blockInput.addEventListener('focusin', () => blockInput.classList.remove('empty'));
            blockInput.addEventListener('focusout', checkInput);

            function checkInput() {
                let blockInputVal = blockInput.value;
                blockInputVal.length < 1 ? blockInput.classList.add('empty') : blockInput.classList.remove('empty');
            }
        }
    }

    // закрытие/открытие попапов
    const overlay = document.querySelector('.overlay'),
        popapCloseBtns = document.querySelectorAll('.popap-close-btn');

    // overlay.addEventListener('click', () => closePopaps());

    document.addEventListener('keydown', function (e) {
        if (e.code == 'Escape') {
            closePopaps();
        }
    });

    for (const btn of popapCloseBtns) {
        btn.addEventListener('click', () => closePopaps());
    }

    function closePopaps() {
        const activeCalendarsWrap = document.querySelectorAll('.form-item--calendar.form-item--active')
        for (const wrap of activeCalendarsWrap) {
            const calendar = wrap.querySelector('.daterangepicker');
            calendar.setAttribute('style', 'display: none')
        }

        const activeFormItems = document.querySelectorAll('.form-item.form-item--active');
        for (const item of activeFormItems) {
            item.classList.remove('form-item--active');
        }

        let jsActive = document.querySelectorAll('.js-active.active');
        for (const i of jsActive) {
            i.classList.remove('active');
        }

        const navItemBodys = document.querySelectorAll('.nav-item__body');
        for (const body of navItemBodys) {
            body.removeAttribute('style');
        }

        unLockScroll();
    }

    document.querySelectorAll('[data-indeterminate="indeterminate"').forEach(item => { item.indeterminate = true });

    // фильтр новостей
    let filterCategory = 'all';

    // ПОКАЗАТЬ еще
    showPlusItems('.hotels__btn', '.hotels__list', 4, 4);
    showPlusItems('.news-list-section__btn', '.news-list', 10, 10, true);
    showPlusItems('.news-list-section .btn', '.news-list', 10, 0, true, '.news-list-section');
    showPlusItems('.reviews-list__btn-row', '.reviews-list__inner', 10, 10);

    function showPlusItems(btnName, listName, startShow, plusNumber, filter = false, clear = false, all = false) {
        const list = document.querySelector(listName),
            btns = document.querySelectorAll(btnName);
        let listItems = document.querySelectorAll(`${listName} > *`);

        if (btns.length > 0 && list) {
            for (const btn of btns) {
                let howMuchShowNow = startShow;

                if (howMuchShowNow >= listItems.length) {
                    if (!clear) {
                        btn.classList.add('btn-row--hide');
                    }
                } else {
                    const wrapperName = 'best-wrapper-ever';

                    if (!document.querySelector(`.${wrapperName}`)) {
                        const wrapper = document.createElement('div');
                        wrapper.setAttribute('class', wrapperName);

                        list.parentNode.insertBefore(wrapper, list);
                        wrapper.appendChild(list);
                    }

                    for (const i of listItems) {
                        i.setAttribute('style', 'height: 0; overflow: hidden; margin-bottom: 0; padding: 0; border: 0');
                    }

                    for (let i = 0; i < howMuchShowNow; i++) {
                        listItems[i].removeAttribute('style');
                    }

                    const wrapperNode = document.querySelector(`.${wrapperName}`);

                    let heightList = function () {
                        let height;

                        function heightNow() {
                            window.addEventListener('load', () => {
                                height = list.offsetHeight;
                                wrapperNode.setAttribute('style', `height: ${height}px`);
                            });
                        }

                        heightNow();
                    }

                    heightList();

                    function upgradeHeight() {
                        wrapperNode.setAttribute('style', `height: ${list.offsetHeight}px`);
                    }

                    btn.addEventListener('click', function () {

                        let listItems = document.querySelectorAll(`${listName} > *`);
                        let timeOut = 0;
                        if (clear) {
                            howMuchShowNow = startShow;

                            for (const i of listItems) {
                                i.setAttribute('style', 'height: 0; overflow: hidden; margin-bottom: 0; padding: 0; border: 0');
                            }
                            upgradeHeight();
                            for (const b of btns) {
                                b.classList.remove('active');
                            }
                            this.classList.add('active');
                            timeOut = 600;

                            const btnRow = this.closest(clear).querySelector('.btn-row');
                            btnRow.classList.remove('btn-row--hide');
                        }

                        if (filter) {
                            const newFilter = btn.getAttribute('data-filter-category');
                            if (newFilter) {
                                filterCategory = newFilter.trim();
                            }
                        }

                        if (filterCategory != '') {
                            const listFilterItems = listItems;
                            if (filterCategory != 'all') {
                                listItems = [];

                                for (const item of listFilterItems) {
                                    if (item.getAttribute('data-filter-category').includes(filterCategory)) {
                                        listItems.push(item);
                                    }
                                }
                            }
                        }

                        howMuchShowNow += plusNumber;

                        setTimeout(() => {


                            if (all || howMuchShowNow > listItems.length) {
                                if (!clear) btn.classList.add('btn-row--hide');

                                for (let i = 0; i < listItems.length; i++) {
                                    listItems[i].removeAttribute('style');
                                }

                                upgradeHeight();
                            } else {
                                for (let i = 0; i < howMuchShowNow; i++) {
                                    listItems[i].removeAttribute('style');
                                }

                                btn.classList.add('btn-row--load');
                                upgradeHeight();
                            }
                        }, timeOut);
                    });
                }
            }

        }
    }

    // отправление формы появление плашки
    const formsBtns = document.querySelectorAll('.forms__btn');
    for (const btn of formsBtns) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const alert = this.closest('form').querySelector('.alert--fixed');
            alert.classList.add('active');

            setTimeout(function () {
                alert.classList.remove('active');
            }, 3000);
        })
    }

    // очистка фильтр бара
    $(".empty-result__btn").click(function (e) {
        const inputs = $(this).closest('.tours-in').find('.filter-bar__input');
        const links = $(this).closest('.tours-in').find('.form-drop-list__link');

        $(links).removeClass('active');

        inputs[0].value = 'Без перелета';
        inputs[1].value = 'Все города';
        inputs[2].value = 'Все типы';

    });
});


window.addEventListener('load', () => {
    // закрытие календаря
    const daterangepickerNode = document.querySelectorAll('.daterangepicker');
    if (daterangepickerNode.length > 0) {
        for (const node of daterangepickerNode) {
            let observer = new MutationObserver(mutationRecords => {
                const observerMutStyle = node.getAttribute('style');
                setTimeout(closeCalendar, 250);

                function closeCalendar() {
                    if (observerMutStyle.includes('none')) {
                        const calendarBody = document.querySelectorAll('.form-item--calendar');
                        for (const body of calendarBody) {
                            body.classList.remove('form-item--active');
                        }
                        const headerForms = document.querySelectorAll('.header-form');
                        for (const headerForm of headerForms) {
                            headerForm.classList.remove('active');
                        }

                        const header = document.querySelector('header');
                        if (header) {
                            header.classList.remove('active');
                        }

                        unLockScroll();
                    }
                }
            });

            observer.observe(node, {
                attributes: true,
            });
        }
    }

    function unLockScroll() {
        const body = document.querySelector('body');
        body.removeAttribute('style');
    }

    // контентный аккардион обнуление высоты
    const accordionHideboxs = document.querySelectorAll('.accordion > li > div');
    if (accordionHideboxs.length > 0) {
        for (const box of accordionHideboxs) {
            box.setAttribute('height-content', box.offsetHeight);
            box.setAttribute('style', 'height: 0; padding-top: 0; padding-bottom: 0');
        }
    }

    // аккардионы селекты (всплывашки)
    accardionOn('.accordion > li > *:first-child', '.accordion > li', '.accordion > li > div', '.open-all', 16, 24, true, true);
    accardionOn('.aside-list__link--menu', 'li', '.aside-list__hide-box');
    accardionOn('.currency__choice-btn', '.currency__choice', '.currency__hide-box');
    accardionOn('.header-form__formclose-btn', '.header-form__wrapper', '.header-form__container');

    function accardionOn(selectorBtn, selectorParrent, selectorHideBox, openAllBtn = '', paddingTop = '', paddingBottom = '', data = false, noHideAll = false) {
        const accordionBtns = document.querySelectorAll(selectorBtn);

        if (accordionBtns.length > 0) {
            for (const btn of accordionBtns) {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    const hideBox = this.closest(selectorParrent).querySelector(selectorHideBox);
                    let hideBoxHeight;

                    if (data) {
                        hideBoxHeight = hideBox.getAttribute('height-content');
                    } else {
                        hideBoxHeight = hideBox.querySelector(`${selectorHideBox} > *`).offsetHeight;
                    }

                    this.classList.toggle('active');

                    if (this.classList.contains('active')) {
                        if (!noHideAll) {
                            const hideBoxes = document.querySelectorAll(selectorHideBox);
                            for (const i of hideBoxes) {
                                i.setAttribute('style', `height: 0; padding-top: 0; padding-bottom: 0`);
                                i.classList.remove('active');
                            }

                            for (const btn of accordionBtns) {
                                btn.classList.remove('active');
                            }
                        }

                        hideBox.setAttribute('style', `height: ${Number(hideBoxHeight) + Number(paddingTop) + Number(paddingBottom)}px; padding-bottom: ${paddingBottom}px; padding-top: ${paddingTop}px`);
                        hideBox.classList.add('active');
                        this.classList.add('active');
                    } else {
                        if (!noHideAll) {
                            const hideBoxes = document.querySelectorAll(selectorHideBox);
                            for (const i of hideBoxes) {
                                i.classList.remove('active');
                                if (data) {
                                    i.setAttribute('style', `height: 0; padding-top: 0; padding-bottom: 0;`);
                                } else {
                                    i.setAttribute('style', `height: 0;`);
                                }

                                for (const btn of accordionBtns) {
                                    btn.classList.remove('active');
                                }
                            }
                        }

                        if (data) {
                            hideBox.setAttribute('style', `height: 0; padding-top: 0; padding-bottom: 0;`);
                        } else {
                            hideBox.setAttribute('style', `height: 0;`);
                        }

                        this.classList.remove('active')
                    }
                })
            }

            if (openAllBtn !== '') {

                const openBtn = document.querySelector(openAllBtn);
                openBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    openBtn.classList.toggle('active');
                    const hideBoxes = document.querySelectorAll(selectorHideBox);

                    if (openBtn.classList.contains('active')) {
                        openBtn.textContent = 'Свернуть все';
                        let hideBoxHeight;

                        for (const hideBox of hideBoxes) {
                            if (data) {
                                hideBoxHeight = hideBox.getAttribute('height-content');
                            } else {
                                hideBoxHeight = hideBox.querySelector(`${selectorHideBox} > *`).offsetHeight;
                            }
                            hideBox.setAttribute('style', `height: ${Number(hideBoxHeight) + Number(paddingTop) + Number(paddingBottom)}px; padding-bottom: ${paddingTop}px; padding-top: ${paddingBottom}px`);
                            hideBox.classList.add('active');
                        }

                        for (const btn of accordionBtns) {
                            btn.classList.add('active');
                        }

                    } else {
                        openBtn.textContent = 'Раскрыть всё';
                        for (const hideBox of hideBoxes) {
                            hideBox.setAttribute('style', `height: 0; padding-top: 0; padding-bottom: 0;`);
                            hideBox.classList.remove('active');
                        }

                        const allSelectors = document.querySelectorAll(selectorBtn);
                        for (const selector of allSelectors) {
                            selector.classList.remove('active');
                        }

                    }
                })
            }
        }
    }

    // круглый список стран в выпадашке
    circleContentList();

    function circleContentList() {
        if (document.documentElement.clientWidth >= 980) {
            const dropCountry = document.querySelector('.drop-country');
            const dropCountryItems = document.querySelectorAll('.drop-country__item');

            //высчитывает ширину строки
            function calcWidthRow(percent) {
                let width = percent * dropCountry.offsetWidth;
                return width;
            }

            // высчитываю длинну каждого элемента, сумму и половину
            let itemWidthArray = [],
                summ = 0;

            for (const item of dropCountryItems) {
                itemWidthArray.push(item.offsetWidth);
                summ += item.offsetWidth;
            }

            // подсчеты количества строк
            let maxPercent = 1,
                minPercent = 0.4,
                startPercent = 0.4,
                step = 0.40;

            let startRowItem = 0,
                iteration = 0,

                currentItem = 0,
                maxWidthRowCount = 2;

            if (startPercent < minPercent) startPercent = minPercent;

            for (let i = 0; currentItem < itemWidthArray.length; i++) {

                let numberItem = 0,
                    rowSumm = 0;
                rowSumm = 0;
                iteration++;
                currentItem = startRowItem;

                while (rowSumm < calcWidthRow(startPercent) - 90) {
                    rowSumm += itemWidthArray[currentItem];
                    currentItem++;
                    numberItem++;
                }

                if (dropCountryItems[startRowItem]) {
                    // dropCountryItems[startRowItem].classList.add('drop-country__item--left');
                }

                rowSumm = rowSumm - itemWidthArray[startRowItem + numberItem - 2] - itemWidthArray[startRowItem];

                let difference = itemWidthArray[startRowItem + numberItem - 2] - itemWidthArray[startRowItem];

                difference = Math.abs(difference / 1);

                if (dropCountryItems[startRowItem]) {
                    itemWidthArray[startRowItem + numberItem - 2] > itemWidthArray[startRowItem] ?
                        dropCountryItems[startRowItem].setAttribute('style', `width: calc((100% - ${rowSumm + difference}px + 28px) / 2);justify-content: flex-end;`) :
                        dropCountryItems[startRowItem].setAttribute('style', `width: calc((100% - ${rowSumm - difference}px + 28px) / 2);justify-content: flex-end;`);
                }

                if (dropCountryItems[startRowItem + numberItem - 2]) {
                    itemWidthArray[startRowItem + numberItem - 2] > itemWidthArray[startRowItem] ?
                        dropCountryItems[startRowItem + numberItem - 2].setAttribute('style', `width: calc((100% - ${rowSumm - difference}px + 28px) / 2); justify-content: flex-start;`) :
                        dropCountryItems[startRowItem + numberItem - 2].setAttribute('style', `width: calc((100% - ${rowSumm + difference}px + 28px) / 2); justify-content: flex-start;`);
                }

                startRowItem = startRowItem + numberItem - 1;
                if (startRowItem <= dropCountryItems.length / 2) {
                    if (startPercent < maxPercent) {
                        step = step / 1.9;
                        startPercent = startPercent + step;
                    } else {
                        startPercent = maxPercent;
                        maxWidthRowCount++;
                    }
                } else {
                    maxWidthRowCount--;
                }

                if (maxWidthRowCount <= 0 && startRowItem > dropCountryItems.length / 2) {
                    step = step * 1.6;
                    startPercent = startPercent - step;
                    if (startPercent <= minPercent) {
                        startPercent = minPercent;
                    }
                }
            }
        }
    }

    /* Плавный скролл к элементу */
    document.querySelectorAll('a[href^="#"').forEach(link => {
        if (link.getAttribute('href').length > 1) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                let href = this.getAttribute('href').substring(1);
                const scrollTarget = document.getElementById(href);
                if (scrollTarget) {
                    // const topOffset = document.querySelector('.scrollto').offsetHeight; // если нужен отступ сверху
                    const topOffset = 50;
                    const elementPosition = scrollTarget.getBoundingClientRect().top;
                    const offsetPosition = elementPosition - topOffset - 70;

                    window.scrollBy({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    const tabs = scrollTarget.closest('.tabs-menu');
                    if (tabs) scrollTarget.click();
                }
            });
        }
    });

    // поиск по селекту
    findInSelect('#header-form-from', '.form-item', '.cities a', '.form-item__no-result');
    findInSelect('#header-form-to', '.form-item', '.cities a', '.form-item__no-result');
    findInSelect('#content-form-from', '.form-item', '.cities a', '.form-item__no-result');
    findInSelect('.form-select__input', '.form-select', '.form-drop-list__link', '.form-drop-list__no-result');
    findInSelect('.search-input__search', '.search-input', '.form-drop-list__link', '.form-drop-list__no-result');

    function findInSelect(id, parrent, itemList, messageNotFound) {
        let input = $(id);

        if (input) {
            const list = input.closest(parrent).find(itemList);
            const message = input.closest(parrent).find(messageNotFound);

            $.each(input, function (index, inp) {
                if ($(inp).val() != '') {
                    let inpValue = $(inp).val();
                    inpValue = inpValue.trim();

                    $.each(list, function (index, value) {
                        const valueClean = value.textContent.trim();
                        if (valueClean.toLowerCase() == inpValue.toLowerCase()) {
                            list[index].classList.add('active');
                        }
                    });
                }
            });

            $(id).on("input", function (ev) {
                message.addClass('d-none');
                const inputWord = $(ev.target).val();

                if (inputWord != '') {
                    let count = 0;
                    $.each(list, function (index, value) {
                        value.classList.add('d-none');
                        if (value.textContent.toLowerCase().includes(inputWord.toLowerCase())) {
                            value.classList.remove('d-none');
                            count++;
                        }
                    });

                    if (count == 0) {
                        message.removeClass('d-none');
                    }
                } else {
                    $.each(list, function (index, value) {
                        value.classList.remove('d-none');
                        message.addClass('d-none');
                    });
                }
            });

            $.each(list, function (index, value) {
                $(value).click(function (e) {
                    e.preventDefault();
                    unLockScroll();

                    $('.header-form').removeClass('active');

                    if ($(this).attr('href')) {
                        const thisMenuLinks = $(this).closest(parrent).find(itemList);

                        $.each(thisMenuLinks, function (index, val) {
                            $(val).removeClass('active');
                        });
                        $(this).addClass('active');

                        const inp = $(this).closest(parrent).find('input');
                        inp.val(this.textContent.trim());
                        $(this).closest(parrent).removeClass('form-item--active');
                        $(this).closest(parrent).removeClass('form-item--empty');

                        $('.header').removeClass('active');
                    }
                });
            });
        }
    }

    // выпадашка в главной форме добавление детей
    addChilds();

    function addChilds() {
        const inputsChilds = $('.input-number__input--child');

        // $.each(inputsChilds, function (index, inputsChild) {
        const inputsBtns = $('.input-number__btn')

        $.each(inputsBtns, function (index, inputsBtn) {

            $(inputsBtn).click(function () {
                let thisInput = $(this).closest('.input-number').find('.input-number__input--child');
                if ((thisInput.length > 0)) {

                    const childRows = $(this).closest('.members').find('.members__row');
                    const childRowsWrapper = $(this).closest('.members').find('.members__add');
                    childRowsWrapper.attr('style', `height: ${childRowsWrapper.find('.members__add-inner').height()}px`);

                    let countChild = Number($(thisInput).val());

                    let count = 0;

                    $.each(childRows, function (index, childRow) {
                        $(childRow).addClass('d-none');
                    });

                    while (count < countChild) {
                        $(childRows[count]).removeClass('d-none');
                        count++;
                    }

                    childRowsWrapper.attr('style', `overflow: hidden; height: ${childRowsWrapper.find('.members__add-inner').height()}px`);

                    setTimeout(() => {
                        childRowsWrapper.attr('style', `overflow: unset; height: ${childRowsWrapper.find('.members__add-inner').height()}px`);
                    }, 1000);

                }
            });
        });
        // });
    }

    // выпадашка в главной форме количество людей передать значение в текст
    chengeHowManyPeople();

    function chengeHowManyPeople() {
        const inputsBtns = $('.input-number__btn');

        if (inputsBtns.length > 0) {

            function change(btn) {
                const howManyInput = $(btn).closest('.form-item').find('.form-item__input');
                const howManyPeopleInputs = $(btn).closest('.form-item').find('.input-number__input');
                let summ = 0;

                $.each(howManyPeopleInputs, function (index, input) {
                    summ += Number($(input).val());
                });

                const lastNumber = summ.toString().slice(-1);
                let word;

                if ((lastNumber == 4 || lastNumber == 3 || lastNumber == 2) && !(summ == 11 || summ == 12 || summ == 13 || summ == 14)) {
                    word = 'человека'
                } else {
                    word = 'человек'
                }

                $(howManyInput).val(summ + ' ' + word);
            }

            $.each(inputsBtns, function (index, btn) {
                change(btn);

                $(btn).click(function () {
                    change(this);
                });
            });
        }
    }

    if (location.href.includes('#')) {
        const urlId = location.href.split('#')[1];
        const idBtn = document.getElementById(urlId);
        if (idBtn) {
            idBtn.click();
            const topOffset = 50;
            const elementPosition = idBtn.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset - 70;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
});
