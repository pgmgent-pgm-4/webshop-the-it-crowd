import test from './helpers.js';
import constants from './constants.js';

(() => {
    const app = {
        init() {
            this.eventListeners();
            this.cacheElements();
            this.hamburgerMenu();
            console.log('ik werk');
            console.log('test:::', test)
            console.log('test:::', constants)
        },
        eventListeners() {
            
        },
        cacheElements() {
            this.hamburger = document.querySelector('.nav__hamburger');
            this.navList = document.querySelector('.nav__list');
        },
        hamburgerMenu() {
            this.hamburger.addEventListener('click', (e) => {
                if(this.navList.classList.contains('show-items')) {
                    this.navList.classList.remove('show-items');
                } else {
                    this.navList.classList.add('show-items');
                }
            })
        }
    }
    app.init();
})()