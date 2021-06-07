import * as helpers from './helpers.js';
import * as constants from './constants.js';
import * as subfunctions from './subfunctions.js';

(() => {
    const app = {
        init() {
            this.cacheElements();
            this.eventListeners();
        },
        eventListeners() {
            if(this.$navBottomItems !== null){
                //add eventlistener for each dropdown action
                this.$navBottomItems.forEach($navBottomItem => {
                    $navBottomItem.addEventListener('click', e => {

                        // hide the other dropdown menus and unhide relevant menu
                        document.querySelectorAll(`.nav__bottom__dropdown`).forEach($dropDownMenu => {
                            let tohide = $dropDownMenu.classList[1] //get dropDownMenu class

                            if ($dropDownMenu.classList[1] === $navBottomItem.classList[1]){
                                document.querySelector(`.nav__bottom__dropdown.${tohide}`).classList.toggle('hide');
                                document.querySelectorAll(`.nav__bottom--item.${tohide} svg`).forEach(svg => {
                                    svg.classList.toggle('hide');
                                })
                            } else {
                                document.querySelector(`.nav__bottom__dropdown.${tohide}`).classList.add('hide')
                                document.querySelector(`.nav__bottom--item.${tohide} .arrow--up`).classList.add('hide')
                                document.querySelector(`.nav__bottom--item.${tohide} .arrow--down`).classList.remove('hide')
                            }
                            return
                        })                        
                    })
                })
            }

            if(this.$navBottomMobile !== null) {
                this.$navBottomMobile.addEventListener('click', e => {
                    this.$navBottomList.classList.toggle('show')
                    this.$navBottomMobile.querySelectorAll('svg').forEach(svg => {
                        svg.classList.toggle('hide')
                    })
                })
            }

        },
        cacheElements() {
           this.$navBottomList = document.querySelector('.nav__bottom__items') || null;
           this.$navBottomItems = document.querySelectorAll('.nav__bottom--item') || null;
           this.$navBottomMobile = document.querySelector('.nav__bottom__mobile') || null;
        }
    }
    app.init();
})()
