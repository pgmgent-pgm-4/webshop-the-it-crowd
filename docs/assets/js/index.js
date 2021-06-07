import test from './helpers.js';
import constants from './constants.js';
import subfunctions from './subfunctions.js';

(() => {
    const app = {
        init() {
            this.eventListeners();
            this.cacheElements();
            console.log('ik werk');
            console.log('test:::', test)
            console.log('test:::', constants)
        },
        eventListeners() {

        },
        cacheElements() {

        }
    }
    app.init();
})()