import * as helpers from './helpers.js';
import * as constants from './constants.js';
import * as subfunctions from './subfunctions.js';

(() => {
    const app = {
        init() {
            this.cacheElements();
            this.eventListeners();
            this.hamburgerMenu();
            this.dropDownMenu();
            this.getProducts();
            this.getDetail();
            this.login();
            this.register();
            this.checkLogin();
            this.getBasket();
        },
        eventListeners() {

        },
        cacheElements() {
            //dropdown elements
           this.$navBottomList = document.querySelector('.nav__bottom__items') || null;
           this.$navBottomItems = document.querySelectorAll('.nav__bottom--item') || null;
           this.$navBottomMobile = document.querySelector('.nav__bottom__mobile') || null;
           //hamburger elements
           this.$hamburger = document.querySelector('.nav__hamburger') || null;
           this.$navList = document.querySelector('.nav__list') || null;
           //dynamic data
           this.$homeList = document.querySelector('.list') || null; 
           this.$detailPage = document.querySelector('.detail') || null;
           this.$overviewList = document.querySelector('.list-page__items') || null;
           this.$listResults = document.querySelector('.list-results') || null;
           //filtering
           this.$sunlight = document.querySelectorAll('.sunlight') || null;
           //login
           this.$loginForm = document.querySelector('.registration__log-in form') || null;
           this.$registerForm = document.querySelector('.registration__register form') || null;
           //add to cart - checkout
           this.$addToCart = document.querySelector('.detail__info__right__amount') || null;

        },
        checkLogin() {
            let currentUser = this.getCurrentUser() || 'no';
            if(currentUser !== 'no') {
                document.querySelector('.nav__list-item:last-child a').innerHTML = "Logout"
                document.querySelector('.nav__list-item:last-child a').addEventListener('click', e => {
                    localStorage.setItem('currentUser', 'no');
                    document.querySelector('.nav__list-item:last-child a').innerHTML = "Log in"
                })
            }
            if(currentUser === 'no') {
                document.querySelector('.nav__list-item:last-child a').innerHTML = "Log in"
            }
        },
        register() {
            if(this.$registerForm) {
                console.log(this.$registerForm);
                this.$registerForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleRegister(e);
 
                    console.log('target', e.target)
                })
            }
        },
        async handleRegister() {
            const user = {
                "userName": document.querySelector('#register-email').value,
                "password": document.querySelector('#register-password').value,
                "email": document.querySelector('#register-password').value
            }

            const options = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            let response = await fetch("http://127.0.0.1:6001/api/users", options)
            let data = await response.json();
            console.log(data)
        },
        login() {
            if (this.$loginForm) {
                console.log(this.$loginForm)
                this.$loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleLogin(e);
 
                    console.log('target', e.target)
                })
            }
        },
        async handleLogin() {
            const user = {
                "username": document.querySelector('#login-email').value,
                "password": document.querySelector('#login-password').value
            }

            const options = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            let response = await fetch("http://127.0.0.1:6001/auth/login", options)
            let data = await response.json();
            console.log(data);
            if(data.succes) {
                // save JWT to localstorage and user object
                localStorage.setItem('token', data.token); 
                localStorage.setItem('currentUser', JSON.stringify(data.user)); 
                document.querySelector('.nav__list-item:last-child a').innerHTML = "Logout"
                document.querySelector('.nav__list-item:last-child a').addEventListener('click', e => {
                    localStorage.setItem('currentUser', 'no');
                    document.querySelector('.nav__list-item:last-child a').innerHTML = "Log in"
                })
            }
        },
        getTokenJwt() {
            return localStorage.getItem('token');
        },
        getCurrentUser() {
            if(localStorage.getItem('currentUser') !== 'no'){
                return JSON.parse(localStorage.getItem('currentUser'));
            }
        },
        hamburgerMenu() {
            this.$hamburger.addEventListener('click', (e) => {
                if(this.$navList.classList.contains('show-items')) {
                    this.$navList.classList.remove('show-items');
                } else {
                    this.$navList.classList.add('show-items');
                }
            })
        },
        dropDownMenu() {
           /**
            * add eventlisteners
            */
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
        async getProducts() {
            if (this.$homeList !== null) {
                const response = await fetch(`${constants.BASE_URL}/products`);
                const data = await response.json();
                this.createProductHtml(data);
            }
            if (this.$overviewList !== null) {
                const response = await fetch(`${constants.BASE_URL}/products`);
                const data = await response.json();
                this.createOverviewHtml(data);
            }
        },

        createProductHtml(products) {
            let tempStr = '';

            for (let i = 0; i < 20; i++) {
                tempStr += `
                <li class="list__item">
                    <a class="list__item__link" href="/detail?id=${products[i].id}">
                        <div class="list__item__link__top">
                            <svg xmlns="http://www.w3.org/2000/svg" width="34.355" height="30.348" viewBox="0 0 34.355 30.348">
                                <path id="Icon_feather-heart" data-name="Icon feather-heart" d="M31.26,6.915a8.25,8.25,0,0,0-11.67,0L18,8.505l-1.59-1.59A8.252,8.252,0,1,0,4.74,18.585l1.59,1.59L18,31.845l11.67-11.67,1.59-1.59a8.25,8.25,0,0,0,0-11.67Z" transform="translate(-0.823 -2.997)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                            </svg>

                            <figure class="list__item__link__top__img-wrapper">
                                <img src="../assets/img/plant-card.png">
                            </figure>
                        </div>

                        <div class="list__item__link__bottom">
                            <h3>${products[i].name}</h3>
                            <div class="list__item__link__bottom__price ">
                                <h3>€${products[i].price}</h3>
                                <svg id=${products[i].id} class="" xmlns="http://www.w3.org/2000/svg" width="35.399" height="29.829" viewBox="0 0 35.399 29.829">
                                    <g id="shopping-cart_1_" data-name="shopping-cart (1)" transform="translate(0 -40.283)">
                                        <path id="Path_27" data-name="Path 27" d="M34.874,50.293a2.446,2.446,0,0,0-1.924-.923H26.132l-3.7-8.465a1.037,1.037,0,1,0-1.9.83l3.334,7.635H11.53l3.334-7.635a1.037,1.037,0,1,0-1.9-.83l-3.7,8.465H2.45a2.446,2.446,0,0,0-1.924.923,2.388,2.388,0,0,0-.465,2.031L3.7,68.226A2.43,2.43,0,0,0,6.09,70.112H29.309A2.43,2.43,0,0,0,31.7,68.226l3.641-15.9a2.388,2.388,0,0,0-.465-2.031ZM29.309,68.038H6.09a.371.371,0,0,1-.367-.275l-3.641-15.9a.317.317,0,0,1,.065-.275.377.377,0,0,1,.3-.141H8.361l-.272.622a1.037,1.037,0,1,0,1.9.83l.634-1.452h14.15l.634,1.452a1.037,1.037,0,0,0,1.9-.83l-.272-.622H32.95a.377.377,0,0,1,.3.141.317.317,0,0,1,.065.275l-3.641,15.9a.371.371,0,0,1-.367.275Z" transform="translate(0)" fill="#c75313"/>
                                        <path id="Path_28" data-name="Path 28" d="M152.037,266.717A1.037,1.037,0,0,0,151,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,152.037,266.717Z" transform="translate(-140.56 -210.779)" fill="#c75313"/>
                                        <path id="Path_29" data-name="Path 29" d="M242.037,266.717A1.037,1.037,0,0,0,241,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,242.037,266.717Z" transform="translate(-224.337 -210.779)" fill="#c75313"/>
                                        <path id="Path_30" data-name="Path 30" d="M332.037,266.717A1.037,1.037,0,0,0,331,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,332.037,266.717Z" transform="translate(-308.115 -210.779)" fill="#c75313"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </a>

                    <div class="list__item__hovered">
                        <h3 class="list__item__hovered__title">${products[i].name}</h3>
                        <div class="list__item__hovered__price">
                            <h3>€${products[i].price}</h3>
                            <svg id=${products[i].id} class="" xmlns="http://www.w3.org/2000/svg" width="35.399" height="29.829" viewBox="0 0 35.399 29.829">
                                <g id="shopping-cart_1_" data-name="shopping-cart (1)" transform="translate(0 -40.283)">
                                    <path id="Path_27" data-name="Path 27" d="M34.874,50.293a2.446,2.446,0,0,0-1.924-.923H26.132l-3.7-8.465a1.037,1.037,0,1,0-1.9.83l3.334,7.635H11.53l3.334-7.635a1.037,1.037,0,1,0-1.9-.83l-3.7,8.465H2.45a2.446,2.446,0,0,0-1.924.923,2.388,2.388,0,0,0-.465,2.031L3.7,68.226A2.43,2.43,0,0,0,6.09,70.112H29.309A2.43,2.43,0,0,0,31.7,68.226l3.641-15.9a2.388,2.388,0,0,0-.465-2.031ZM29.309,68.038H6.09a.371.371,0,0,1-.367-.275l-3.641-15.9a.317.317,0,0,1,.065-.275.377.377,0,0,1,.3-.141H8.361l-.272.622a1.037,1.037,0,1,0,1.9.83l.634-1.452h14.15l.634,1.452a1.037,1.037,0,0,0,1.9-.83l-.272-.622H32.95a.377.377,0,0,1,.3.141.317.317,0,0,1,.065.275l-3.641,15.9a.371.371,0,0,1-.367.275Z" transform="translate(0)" fill="#c75313"/>
                                    <path id="Path_28" data-name="Path 28" d="M152.037,266.717A1.037,1.037,0,0,0,151,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,152.037,266.717Z" transform="translate(-140.56 -210.779)" fill="#c75313"/>
                                    <path id="Path_29" data-name="Path 29" d="M242.037,266.717A1.037,1.037,0,0,0,241,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,242.037,266.717Z" transform="translate(-224.337 -210.779)" fill="#c75313"/>
                                    <path id="Path_30" data-name="Path 30" d="M332.037,266.717A1.037,1.037,0,0,0,331,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,332.037,266.717Z" transform="translate(-308.115 -210.779)" fill="#c75313"/>
                                </g>
                            </svg>
                        </div>

                    <div class="list__item__hovered__icons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="43.375" height="37.512" viewBox="0 0 43.375 37.512">
                            <g id="cloudy" transform="translate(0 -34.603)">
                                <path id="Path_31" data-name="Path 31" d="M34.7,119a11.965,11.965,0,0,0-.655-3.2,8.737,8.737,0,1,0-13.657-7.833,12.039,12.039,0,0,0-8.178,5.867,9.246,9.246,0,1,0-2.968,18H25.631a.847.847,0,1,0,0-1.694H9.246a7.552,7.552,0,1,1,7.117-10.069.847.847,0,0,0,1.6-.565,9.289,9.289,0,0,0-4.192-4.98,10.352,10.352,0,0,1,19.236,4.476,6.412,6.412,0,0,0-2.619.97.847.847,0,1,0,.92,1.423,4.752,4.752,0,1,1,2.576,8.746H32.408a.847.847,0,0,0,0,1.694h1.474A6.447,6.447,0,0,0,34.7,119Zm-12.02-11.25c-.191,0-.381.006-.571.015a7.043,7.043,0,1,1,11.243,6.45A12.057,12.057,0,0,0,22.684,107.753Z" transform="translate(0 -59.73)"/>
                                <circle id="Ellipse_6" data-name="Ellipse 6" cx="0.847" cy="0.847" r="0.847" transform="translate(28.173 70.42)"/>
                                <path id="Path_32" data-name="Path 32" d="M288.974,38.185a.847.847,0,0,0,1.629-.466l-.716-2.5a.847.847,0,0,0-1.629.466Z" transform="translate(-263.808 0)"/>
                                <path id="Path_33" data-name="Path 33" d="M189.925,114.66l2.275,1.262a.847.847,0,1,0,.822-1.482l-2.275-1.262a.847.847,0,0,0-.822,1.482Z" transform="translate(-173.436 -71.822)"/>
                                <path id="Path_34" data-name="Path 34" d="M454.343,259.442l-2.275-1.262a.847.847,0,1,0-.822,1.482l2.275,1.262a.847.847,0,1,0,.822-1.481Z" transform="translate(-412.619 -204.539)"/>
                                <path id="Path_35" data-name="Path 35" d="M466.633,148.285a.847.847,0,0,0-1.048-.581l-2.5.716a.847.847,0,1,0,.466,1.629l2.5-.716A.847.847,0,0,0,466.633,148.285Z" transform="translate(-423.291 -103.49)"/>
                                <path id="Path_36" data-name="Path 36" d="M399.063,52.8a.847.847,0,0,0,1.152-.33l1.262-2.275A.847.847,0,0,0,400,49.371l-1.262,2.275A.847.847,0,0,0,399.063,52.8Z" transform="translate(-364.857 -13.118)"/>
                            </g>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35.522" height="37.512" viewBox="0 0 35.522 37.512">
                            <g id="drop" transform="translate(-13.578)">
                                <g id="Group_1" data-name="Group 1" transform="translate(23.089 0)">
                                <path id="Path_37" data-name="Path 37" d="M156.394,37.512a12.982,12.982,0,0,1-11.13-19.665L155.766.355a.733.733,0,0,1,1.256,0l4.65,7.744a.733.733,0,0,1-1.256.754l-4.021-6.7L146.52,18.6a11.517,11.517,0,1,0,19.748,0l-2.835-4.722a.733.733,0,0,1,1.256-.754l2.835,4.722a12.983,12.983,0,0,1-11.13,19.665Z" transform="translate(-143.388 0)"/>
                                </g>
                                <g id="Group_2" data-name="Group 2" transform="translate(41.52 10.256)">
                                <circle id="Ellipse_7" data-name="Ellipse 7" cx="0.733" cy="0.733" r="0.733"/>
                                </g>
                                <g id="Group_3" data-name="Group 3" transform="translate(13.578 8.557)">
                                <path id="Path_38" data-name="Path 38" d="M17.88,128.737a4.294,4.294,0,0,1-3.682-6.505l3.054-5.086a.733.733,0,0,1,1.256,0l3.054,5.086a4.294,4.294,0,0,1-3.682,6.505Zm0-9.79-2.425,4.04a2.829,2.829,0,1,0,4.851,0Z" transform="translate(-13.578 -116.791)"/>
                                </g>
                                <g id="Group_4" data-name="Group 4" transform="translate(22.231 0)">
                                <path id="Path_39" data-name="Path 39" d="M134.544,7.728a2.861,2.861,0,0,1-2.453-4.334L133.916.356a.733.733,0,0,1,1.256,0L137,3.394a2.861,2.861,0,0,1-2.453,4.334Zm0-5.572-1.2,1.993a1.4,1.4,0,1,0,2.393,0Z" transform="translate(-131.678 0)"/>
                                </g>
                            </g>
                        </svg>
                        <svg id="Icons" height="512" viewBox="0 0 74 74" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m47.984 72h-26.153a1 1 0 0 1 -.984-.823l-4.708-26.154a1 1 0 0 1 .984-1.177h35.569a1 1 0 0 1 .984 1.177l-4.707 26.154a1 1 0 0 1 -.985.823zm-25.317-2h24.481l4.352-24.154h-33.181z"/><path d="m55.787 45.846h-41.759a1.569 1.569 0 0 1 -1.567-1.567v-5.557a1.569 1.569 0 0 1 1.567-1.566h41.759a1.569 1.569 0 0 1 1.567 1.566v5.558a1.569 1.569 0 0 1 -1.567 1.566zm-41.326-2h40.893v-4.691h-40.893z"/><path d="m35.411 39.155h-.076a1 1 0 0 1 -.922-1.072 33.813 33.813 0 0 1 1.066-6.258 34.7 34.7 0 0 1 12.472-18.684 1 1 0 0 1 1.216 1.588 32.7 32.7 0 0 0 -11.755 17.608 31.865 31.865 0 0 0 -1 5.893 1 1 0 0 1 -1.001.925z"/><path d="m47.743 27.387a18.118 18.118 0 0 1 -8.456-2.473 1 1 0 0 1 -.44-.474c-.132-.3-3.2-7.362.688-13.62 3.365-5.407 10.765-8.375 21.996-8.82a.981.981 0 0 1 .744.29 1 1 0 0 1 .295.742c-.023.727-.676 17.869-9.5 22.956a10.488 10.488 0 0 1 -5.327 1.399zm-7.189-4.065c4.578 2.382 8.45 2.7 11.512.935 6.688-3.857 8.148-16.423 8.434-20.205-9.9.554-16.374 3.179-19.262 7.809-2.913 4.675-1.183 10.124-.685 11.46z"/><path d="m36.445 33.084a1 1 0 0 1 -.924-.617 22.739 22.739 0 0 0 -12.577-12.416 1 1 0 1 1 .744-1.856 24.74 24.74 0 0 1 13.68 13.505 1 1 0 0 1 -.923 1.384z"/><path d="m24.359 28.665a7.6 7.6 0 0 1 -1.887-.24c-7.1-1.814-10.841-13.456-11-13.951a1 1 0 0 1 .728-1.274c7.8-1.851 13.464-1.219 16.843 1.878 3.936 3.608 3.173 9.126 3.139 9.36a1 1 0 0 1 -.3.575c-2.524 2.429-5.047 3.652-7.523 3.652zm-10.611-13.765c1.045 2.783 4.3 10.33 9.222 11.585 2.277.58 4.72-.315 7.263-2.665.079-1.117.116-4.844-2.555-7.281-2.715-2.474-7.399-3.025-13.93-1.639z"></svg>
                    </div>
                </div>
            </li>
            `
            }

            this.$homeList.innerHTML = tempStr;
        },

        createOverviewHtml(products) {
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const productCategory = params.get('category');
            const productSunlight = params.get('sunlight');
            let categoriesToFilter = productCategory.split('-');

            //Filtering
            this.$sunlight.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();

                    params.set('sunlight', e.target.value);
                    window.location.search = params;
                })
            });

            //Filtering products array
            if (productCategory) {
                let filteredProducts = [];
                products.forEach(product => {
                    product.ProductCategory.forEach(category => {
                        if (categoriesToFilter.includes(category.category.name)) {
                            filteredProducts.push(product);
                        }
                    })
                })
                products = filteredProducts;
            }
            if (productSunlight) {
                let filteredProducts = [];
                products.forEach(product => {
                    product.ProductCategory.forEach(category => {
                        if (category.category.name === productSunlight) {
                            filteredProducts.push(product);
                        }
                    })
                })
                products = filteredProducts;
            }

            let tempStr = '';

            products.forEach(product => {
                tempStr += `
                <li class="list__item">
                    <a class="list__item__link" href="/detail?id=${product.id}">
                        <div class="list__item__link__top">
                            <svg xmlns="http://www.w3.org/2000/svg" width="34.355" height="30.348" viewBox="0 0 34.355 30.348">
                                <path id="Icon_feather-heart" data-name="Icon feather-heart" d="M31.26,6.915a8.25,8.25,0,0,0-11.67,0L18,8.505l-1.59-1.59A8.252,8.252,0,1,0,4.74,18.585l1.59,1.59L18,31.845l11.67-11.67,1.59-1.59a8.25,8.25,0,0,0,0-11.67Z" transform="translate(-0.823 -2.997)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                            </svg>

                            <figure class="list__item__link__top__img-wrapper">
                                <img src="../assets/img/plant-card.png">
                            </figure>
                        </div>

                        <div class="list__item__link__bottom">
                            <h3>${product.name}</h3>
                            <div class="list__item__link__bottom__price">
                                <h3>€${product.price}</h3>
                                <svg id=${product.id} class="" xmlns="http://www.w3.org/2000/svg" width="35.399" height="29.829" viewBox="0 0 35.399 29.829">
                                    <g id="shopping-cart_1_" data-name="shopping-cart (1)" transform="translate(0 -40.283)">
                                        <path id="Path_27" data-name="Path 27" d="M34.874,50.293a2.446,2.446,0,0,0-1.924-.923H26.132l-3.7-8.465a1.037,1.037,0,1,0-1.9.83l3.334,7.635H11.53l3.334-7.635a1.037,1.037,0,1,0-1.9-.83l-3.7,8.465H2.45a2.446,2.446,0,0,0-1.924.923,2.388,2.388,0,0,0-.465,2.031L3.7,68.226A2.43,2.43,0,0,0,6.09,70.112H29.309A2.43,2.43,0,0,0,31.7,68.226l3.641-15.9a2.388,2.388,0,0,0-.465-2.031ZM29.309,68.038H6.09a.371.371,0,0,1-.367-.275l-3.641-15.9a.317.317,0,0,1,.065-.275.377.377,0,0,1,.3-.141H8.361l-.272.622a1.037,1.037,0,1,0,1.9.83l.634-1.452h14.15l.634,1.452a1.037,1.037,0,0,0,1.9-.83l-.272-.622H32.95a.377.377,0,0,1,.3.141.317.317,0,0,1,.065.275l-3.641,15.9a.371.371,0,0,1-.367.275Z" transform="translate(0)" fill="#c75313"/>
                                        <path id="Path_28" data-name="Path 28" d="M152.037,266.717A1.037,1.037,0,0,0,151,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,152.037,266.717Z" transform="translate(-140.56 -210.779)" fill="#c75313"/>
                                        <path id="Path_29" data-name="Path 29" d="M242.037,266.717A1.037,1.037,0,0,0,241,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,242.037,266.717Z" transform="translate(-224.337 -210.779)" fill="#c75313"/>
                                        <path id="Path_30" data-name="Path 30" d="M332.037,266.717A1.037,1.037,0,0,0,331,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,332.037,266.717Z" transform="translate(-308.115 -210.779)" fill="#c75313"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </a>

                    <div class="list__item__hovered">
                        <h3 class="list__item__hovered__title">${product.name}</h3>
                        <div class="list__item__hovered__price">
                            <h3>€${product.price}</h3>
                            <svg id=${product.id} class="" xmlns="http://www.w3.org/2000/svg" width="35.399" height="29.829" viewBox="0 0 35.399 29.829">
                                <g id="shopping-cart_1_" data-name="shopping-cart (1)" transform="translate(0 -40.283)">
                                    <path id="Path_27" data-name="Path 27" d="M34.874,50.293a2.446,2.446,0,0,0-1.924-.923H26.132l-3.7-8.465a1.037,1.037,0,1,0-1.9.83l3.334,7.635H11.53l3.334-7.635a1.037,1.037,0,1,0-1.9-.83l-3.7,8.465H2.45a2.446,2.446,0,0,0-1.924.923,2.388,2.388,0,0,0-.465,2.031L3.7,68.226A2.43,2.43,0,0,0,6.09,70.112H29.309A2.43,2.43,0,0,0,31.7,68.226l3.641-15.9a2.388,2.388,0,0,0-.465-2.031ZM29.309,68.038H6.09a.371.371,0,0,1-.367-.275l-3.641-15.9a.317.317,0,0,1,.065-.275.377.377,0,0,1,.3-.141H8.361l-.272.622a1.037,1.037,0,1,0,1.9.83l.634-1.452h14.15l.634,1.452a1.037,1.037,0,0,0,1.9-.83l-.272-.622H32.95a.377.377,0,0,1,.3.141.317.317,0,0,1,.065.275l-3.641,15.9a.371.371,0,0,1-.367.275Z" transform="translate(0)" fill="#c75313"/>
                                    <path id="Path_28" data-name="Path 28" d="M152.037,266.717A1.037,1.037,0,0,0,151,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,152.037,266.717Z" transform="translate(-140.56 -210.779)" fill="#c75313"/>
                                    <path id="Path_29" data-name="Path 29" d="M242.037,266.717A1.037,1.037,0,0,0,241,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,242.037,266.717Z" transform="translate(-224.337 -210.779)" fill="#c75313"/>
                                    <path id="Path_30" data-name="Path 30" d="M332.037,266.717A1.037,1.037,0,0,0,331,267.754v7.605a1.037,1.037,0,0,0,2.074,0v-7.605A1.037,1.037,0,0,0,332.037,266.717Z" transform="translate(-308.115 -210.779)" fill="#c75313"/>
                                </g>
                            </svg>
                        </div>

                    <div class="list__item__hovered__icons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="43.375" height="37.512" viewBox="0 0 43.375 37.512">
                            <g id="cloudy" transform="translate(0 -34.603)">
                                <path id="Path_31" data-name="Path 31" d="M34.7,119a11.965,11.965,0,0,0-.655-3.2,8.737,8.737,0,1,0-13.657-7.833,12.039,12.039,0,0,0-8.178,5.867,9.246,9.246,0,1,0-2.968,18H25.631a.847.847,0,1,0,0-1.694H9.246a7.552,7.552,0,1,1,7.117-10.069.847.847,0,0,0,1.6-.565,9.289,9.289,0,0,0-4.192-4.98,10.352,10.352,0,0,1,19.236,4.476,6.412,6.412,0,0,0-2.619.97.847.847,0,1,0,.92,1.423,4.752,4.752,0,1,1,2.576,8.746H32.408a.847.847,0,0,0,0,1.694h1.474A6.447,6.447,0,0,0,34.7,119Zm-12.02-11.25c-.191,0-.381.006-.571.015a7.043,7.043,0,1,1,11.243,6.45A12.057,12.057,0,0,0,22.684,107.753Z" transform="translate(0 -59.73)"/>
                                <circle id="Ellipse_6" data-name="Ellipse 6" cx="0.847" cy="0.847" r="0.847" transform="translate(28.173 70.42)"/>
                                <path id="Path_32" data-name="Path 32" d="M288.974,38.185a.847.847,0,0,0,1.629-.466l-.716-2.5a.847.847,0,0,0-1.629.466Z" transform="translate(-263.808 0)"/>
                                <path id="Path_33" data-name="Path 33" d="M189.925,114.66l2.275,1.262a.847.847,0,1,0,.822-1.482l-2.275-1.262a.847.847,0,0,0-.822,1.482Z" transform="translate(-173.436 -71.822)"/>
                                <path id="Path_34" data-name="Path 34" d="M454.343,259.442l-2.275-1.262a.847.847,0,1,0-.822,1.482l2.275,1.262a.847.847,0,1,0,.822-1.481Z" transform="translate(-412.619 -204.539)"/>
                                <path id="Path_35" data-name="Path 35" d="M466.633,148.285a.847.847,0,0,0-1.048-.581l-2.5.716a.847.847,0,1,0,.466,1.629l2.5-.716A.847.847,0,0,0,466.633,148.285Z" transform="translate(-423.291 -103.49)"/>
                                <path id="Path_36" data-name="Path 36" d="M399.063,52.8a.847.847,0,0,0,1.152-.33l1.262-2.275A.847.847,0,0,0,400,49.371l-1.262,2.275A.847.847,0,0,0,399.063,52.8Z" transform="translate(-364.857 -13.118)"/>
                            </g>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35.522" height="37.512" viewBox="0 0 35.522 37.512">
                            <g id="drop" transform="translate(-13.578)">
                                <g id="Group_1" data-name="Group 1" transform="translate(23.089 0)">
                                <path id="Path_37" data-name="Path 37" d="M156.394,37.512a12.982,12.982,0,0,1-11.13-19.665L155.766.355a.733.733,0,0,1,1.256,0l4.65,7.744a.733.733,0,0,1-1.256.754l-4.021-6.7L146.52,18.6a11.517,11.517,0,1,0,19.748,0l-2.835-4.722a.733.733,0,0,1,1.256-.754l2.835,4.722a12.983,12.983,0,0,1-11.13,19.665Z" transform="translate(-143.388 0)"/>
                                </g>
                                <g id="Group_2" data-name="Group 2" transform="translate(41.52 10.256)">
                                <circle id="Ellipse_7" data-name="Ellipse 7" cx="0.733" cy="0.733" r="0.733"/>
                                </g>
                                <g id="Group_3" data-name="Group 3" transform="translate(13.578 8.557)">
                                <path id="Path_38" data-name="Path 38" d="M17.88,128.737a4.294,4.294,0,0,1-3.682-6.505l3.054-5.086a.733.733,0,0,1,1.256,0l3.054,5.086a4.294,4.294,0,0,1-3.682,6.505Zm0-9.79-2.425,4.04a2.829,2.829,0,1,0,4.851,0Z" transform="translate(-13.578 -116.791)"/>
                                </g>
                                <g id="Group_4" data-name="Group 4" transform="translate(22.231 0)">
                                <path id="Path_39" data-name="Path 39" d="M134.544,7.728a2.861,2.861,0,0,1-2.453-4.334L133.916.356a.733.733,0,0,1,1.256,0L137,3.394a2.861,2.861,0,0,1-2.453,4.334Zm0-5.572-1.2,1.993a1.4,1.4,0,1,0,2.393,0Z" transform="translate(-131.678 0)"/>
                                </g>
                            </g>
                        </svg>
                        <svg id="Icons" height="512" viewBox="0 0 74 74" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m47.984 72h-26.153a1 1 0 0 1 -.984-.823l-4.708-26.154a1 1 0 0 1 .984-1.177h35.569a1 1 0 0 1 .984 1.177l-4.707 26.154a1 1 0 0 1 -.985.823zm-25.317-2h24.481l4.352-24.154h-33.181z"/><path d="m55.787 45.846h-41.759a1.569 1.569 0 0 1 -1.567-1.567v-5.557a1.569 1.569 0 0 1 1.567-1.566h41.759a1.569 1.569 0 0 1 1.567 1.566v5.558a1.569 1.569 0 0 1 -1.567 1.566zm-41.326-2h40.893v-4.691h-40.893z"/><path d="m35.411 39.155h-.076a1 1 0 0 1 -.922-1.072 33.813 33.813 0 0 1 1.066-6.258 34.7 34.7 0 0 1 12.472-18.684 1 1 0 0 1 1.216 1.588 32.7 32.7 0 0 0 -11.755 17.608 31.865 31.865 0 0 0 -1 5.893 1 1 0 0 1 -1.001.925z"/><path d="m47.743 27.387a18.118 18.118 0 0 1 -8.456-2.473 1 1 0 0 1 -.44-.474c-.132-.3-3.2-7.362.688-13.62 3.365-5.407 10.765-8.375 21.996-8.82a.981.981 0 0 1 .744.29 1 1 0 0 1 .295.742c-.023.727-.676 17.869-9.5 22.956a10.488 10.488 0 0 1 -5.327 1.399zm-7.189-4.065c4.578 2.382 8.45 2.7 11.512.935 6.688-3.857 8.148-16.423 8.434-20.205-9.9.554-16.374 3.179-19.262 7.809-2.913 4.675-1.183 10.124-.685 11.46z"/><path d="m36.445 33.084a1 1 0 0 1 -.924-.617 22.739 22.739 0 0 0 -12.577-12.416 1 1 0 1 1 .744-1.856 24.74 24.74 0 0 1 13.68 13.505 1 1 0 0 1 -.923 1.384z"/><path d="m24.359 28.665a7.6 7.6 0 0 1 -1.887-.24c-7.1-1.814-10.841-13.456-11-13.951a1 1 0 0 1 .728-1.274c7.8-1.851 13.464-1.219 16.843 1.878 3.936 3.608 3.173 9.126 3.139 9.36a1 1 0 0 1 -.3.575c-2.524 2.429-5.047 3.652-7.523 3.652zm-10.611-13.765c1.045 2.783 4.3 10.33 9.222 11.585 2.277.58 4.72-.315 7.263-2.665.079-1.117.116-4.844-2.555-7.281-2.715-2.474-7.399-3.025-13.93-1.639z"></svg>
                    </div>
                </div>
            </li>
            `
            })

            this.$overviewList.innerHTML = `<ul class="list">${tempStr}</ul>`;
            this.$listResults.innerHTML = products.length;
        },

        async getDetail() {
            if (this.$detailPage !== null) {
                const search = window.location.search;
                const params = new URLSearchParams(search);
                const productId = params.get('id');
            
                const response = await fetch(`${constants.BASE_URL}/products/${productId}`);
                const data = await response.json();
    
                this.createDetailHtml(data);
            }
        },

        async createDetailHtml(product) {
            let tempStr = `
            <section class="detail__info">
            <div class="detail__info__right__title--mobile detail__info__right__title">
                <h2>${product.name}</h2>
                <div class="stars">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="none" stroke="#fdbb38" stroke-width="1"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="none" stroke="#fdbb38" stroke-width="1"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="none" stroke="#fdbb38" stroke-width="1"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="none" stroke="#fdbb38" stroke-width="1"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="none" stroke="#fdbb38" stroke-width="1"/></svg>
                </div>
    
                <p>${product.name}</p>
            </div>
    
            <figure class="detail__info__left">
                <img src="../assets/img/plant-card.png">
            </figure>
            
            <section class="detail__info__right">
                <div class="detail__info__right__title--desktop detail__info__right__title">
                    <h2 id="add-to-cart-product" data-id="${product.id}">${product.name}</h2>
                    <div class="stars">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="none" stroke="#fdbb38" stroke-width="1"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="none" stroke="#fdbb38" stroke-width="1"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="none" stroke="#fdbb38" stroke-width="1"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="none" stroke="#fdbb38" stroke-width="1"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="none" stroke="#fdbb38" stroke-width="1"/></svg>
                    </div>
    
                    <p>${product.name}</p>
                </div>
    
                <div class="detail__info__right__stats">
                    <div class="detail__info__right__stats__icons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="43.375" height="37.512" viewBox="0 0 43.375 37.512">
                            <g id="cloudy" transform="translate(0 -34.603)">
                                <path id="Path_31" data-name="Path 31" d="M34.7,119a11.965,11.965,0,0,0-.655-3.2,8.737,8.737,0,1,0-13.657-7.833,12.039,12.039,0,0,0-8.178,5.867,9.246,9.246,0,1,0-2.968,18H25.631a.847.847,0,1,0,0-1.694H9.246a7.552,7.552,0,1,1,7.117-10.069.847.847,0,0,0,1.6-.565,9.289,9.289,0,0,0-4.192-4.98,10.352,10.352,0,0,1,19.236,4.476,6.412,6.412,0,0,0-2.619.97.847.847,0,1,0,.92,1.423,4.752,4.752,0,1,1,2.576,8.746H32.408a.847.847,0,0,0,0,1.694h1.474A6.447,6.447,0,0,0,34.7,119Zm-12.02-11.25c-.191,0-.381.006-.571.015a7.043,7.043,0,1,1,11.243,6.45A12.057,12.057,0,0,0,22.684,107.753Z" transform="translate(0 -59.73)"/>
                                <circle id="Ellipse_6" data-name="Ellipse 6" cx="0.847" cy="0.847" r="0.847" transform="translate(28.173 70.42)"/>
                                <path id="Path_32" data-name="Path 32" d="M288.974,38.185a.847.847,0,0,0,1.629-.466l-.716-2.5a.847.847,0,0,0-1.629.466Z" transform="translate(-263.808 0)"/>
                                <path id="Path_33" data-name="Path 33" d="M189.925,114.66l2.275,1.262a.847.847,0,1,0,.822-1.482l-2.275-1.262a.847.847,0,0,0-.822,1.482Z" transform="translate(-173.436 -71.822)"/>
                                <path id="Path_34" data-name="Path 34" d="M454.343,259.442l-2.275-1.262a.847.847,0,1,0-.822,1.482l2.275,1.262a.847.847,0,1,0,.822-1.481Z" transform="translate(-412.619 -204.539)"/>
                                <path id="Path_35" data-name="Path 35" d="M466.633,148.285a.847.847,0,0,0-1.048-.581l-2.5.716a.847.847,0,1,0,.466,1.629l2.5-.716A.847.847,0,0,0,466.633,148.285Z" transform="translate(-423.291 -103.49)"/>
                                <path id="Path_36" data-name="Path 36" d="M399.063,52.8a.847.847,0,0,0,1.152-.33l1.262-2.275A.847.847,0,0,0,400,49.371l-1.262,2.275A.847.847,0,0,0,399.063,52.8Z" transform="translate(-364.857 -13.118)"/>
                            </g>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35.522" height="37.512" viewBox="0 0 35.522 37.512">
                            <g id="drop" transform="translate(-13.578)">
                                <g id="Group_1" data-name="Group 1" transform="translate(23.089 0)">
                                <path id="Path_37" data-name="Path 37" d="M156.394,37.512a12.982,12.982,0,0,1-11.13-19.665L155.766.355a.733.733,0,0,1,1.256,0l4.65,7.744a.733.733,0,0,1-1.256.754l-4.021-6.7L146.52,18.6a11.517,11.517,0,1,0,19.748,0l-2.835-4.722a.733.733,0,0,1,1.256-.754l2.835,4.722a12.983,12.983,0,0,1-11.13,19.665Z" transform="translate(-143.388 0)"/>
                                </g>
                                <g id="Group_2" data-name="Group 2" transform="translate(41.52 10.256)">
                                <circle id="Ellipse_7" data-name="Ellipse 7" cx="0.733" cy="0.733" r="0.733"/>
                                </g>
                                <g id="Group_3" data-name="Group 3" transform="translate(13.578 8.557)">
                                <path id="Path_38" data-name="Path 38" d="M17.88,128.737a4.294,4.294,0,0,1-3.682-6.505l3.054-5.086a.733.733,0,0,1,1.256,0l3.054,5.086a4.294,4.294,0,0,1-3.682,6.505Zm0-9.79-2.425,4.04a2.829,2.829,0,1,0,4.851,0Z" transform="translate(-13.578 -116.791)"/>
                                </g>
                                <g id="Group_4" data-name="Group 4" transform="translate(22.231 0)">
                                <path id="Path_39" data-name="Path 39" d="M134.544,7.728a2.861,2.861,0,0,1-2.453-4.334L133.916.356a.733.733,0,0,1,1.256,0L137,3.394a2.861,2.861,0,0,1-2.453,4.334Zm0-5.572-1.2,1.993a1.4,1.4,0,1,0,2.393,0Z" transform="translate(-131.678 0)"/>
                                </g>
                            </g>
                        </svg>
                        <svg id="Icons" height="512" viewBox="0 0 74 74" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m47.984 72h-26.153a1 1 0 0 1 -.984-.823l-4.708-26.154a1 1 0 0 1 .984-1.177h35.569a1 1 0 0 1 .984 1.177l-4.707 26.154a1 1 0 0 1 -.985.823zm-25.317-2h24.481l4.352-24.154h-33.181z"/><path d="m55.787 45.846h-41.759a1.569 1.569 0 0 1 -1.567-1.567v-5.557a1.569 1.569 0 0 1 1.567-1.566h41.759a1.569 1.569 0 0 1 1.567 1.566v5.558a1.569 1.569 0 0 1 -1.567 1.566zm-41.326-2h40.893v-4.691h-40.893z"/><path d="m35.411 39.155h-.076a1 1 0 0 1 -.922-1.072 33.813 33.813 0 0 1 1.066-6.258 34.7 34.7 0 0 1 12.472-18.684 1 1 0 0 1 1.216 1.588 32.7 32.7 0 0 0 -11.755 17.608 31.865 31.865 0 0 0 -1 5.893 1 1 0 0 1 -1.001.925z"/><path d="m47.743 27.387a18.118 18.118 0 0 1 -8.456-2.473 1 1 0 0 1 -.44-.474c-.132-.3-3.2-7.362.688-13.62 3.365-5.407 10.765-8.375 21.996-8.82a.981.981 0 0 1 .744.29 1 1 0 0 1 .295.742c-.023.727-.676 17.869-9.5 22.956a10.488 10.488 0 0 1 -5.327 1.399zm-7.189-4.065c4.578 2.382 8.45 2.7 11.512.935 6.688-3.857 8.148-16.423 8.434-20.205-9.9.554-16.374 3.179-19.262 7.809-2.913 4.675-1.183 10.124-.685 11.46z"/><path d="m36.445 33.084a1 1 0 0 1 -.924-.617 22.739 22.739 0 0 0 -12.577-12.416 1 1 0 1 1 .744-1.856 24.74 24.74 0 0 1 13.68 13.505 1 1 0 0 1 -.923 1.384z"/><path d="m24.359 28.665a7.6 7.6 0 0 1 -1.887-.24c-7.1-1.814-10.841-13.456-11-13.951a1 1 0 0 1 .728-1.274c7.8-1.851 13.464-1.219 16.843 1.878 3.936 3.608 3.173 9.126 3.139 9.36a1 1 0 0 1 -.3.575c-2.524 2.429-5.047 3.652-7.523 3.652zm-10.611-13.765c1.045 2.783 4.3 10.33 9.222 11.585 2.277.58 4.72-.315 7.263-2.665.079-1.117.116-4.844-2.555-7.281-2.715-2.474-7.399-3.025-13.93-1.639z"></svg>
                    </div>
    
                    <div class="detail__info__right__stats__measurements">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="18.599" viewBox="0 0 8 18.599"><path id="Icon_awesome-arrows-alt-v" data-name="Icon awesome-arrows-alt-v" d="M8.384,13.729H6.711V4.87H8.384A.872.872,0,0,0,9,3.382L5.874.255a.872.872,0,0,0-1.233,0L1.515,3.382A.872.872,0,0,0,2.132,4.87H3.8v8.859H2.132a.872.872,0,0,0-.617,1.488l3.126,3.126a.872.872,0,0,0,1.233,0L9,15.218a.872.872,0,0,0-.616-1.488Z" transform="translate(-1.258 0)"/></svg>
                            <p>35cm</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 17 24"><text id="Ø" transform="translate(0 20)" font-size="20" font-family="Lato-Bold, Lato" font-weight="700"><tspan x="0" y="0">Ø</tspan></text></svg>
                            <p>20cm</p>
                        </div>
                    </div>
                </div>
    
                <form class="form">
                    <label for="pot">Pot</label>
                    <select for="pot">
                        <option value="Select a pot...">Select a pot...</option>
                        <option value="ceremic">Ceremic</option>
                    </select>
                </form>
    
                <div class="detail__info__right__price">
                    <h3>Price</h3>
                    <h3 id="add-to-cart-price">€${product.price}</h3>
                </div>
    
                <div class="detail__info__right__amount">
                    <input id="add-to-cart-amount" type="number" value="1" min="1" max="99">
                    <button id="add-to-cart" class="button--primary">Add to cart</button>
                </div>
    
                <div class="detail__info__right__extra">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22.546" height="22.547" viewBox="0 0 22.546 22.547">
                            <g id="leaf" transform="translate(-0.004)">
                                <path id="Path_9" data-name="Path 9" d="M22.512.317A.512.512,0,0,0,22.038,0C2.156,0,0,8.242,0,11.786c0,4.6,3.5,7.686,8.711,7.686,6.581,0,7.959-6.262,8.7-9.626A17.353,17.353,0,0,1,22.4.874.512.512,0,0,0,22.512.317Z" transform="translate(0)" fill="#009063"/>
                                <path id="Path_10" data-name="Path 10" d="M.516,124.086A.512.512,0,0,1,0,123.574c0-3.047,5.283-12.823,13.612-16.859a.512.512,0,0,1,.447.922h0c-8.411,4.076-13.034,13.541-13.034,15.936A.512.512,0,0,1,.516,124.086Z" transform="translate(0 -101.539)" fill="#415342"/>
                            </g>
                        </svg>
                        <p>Free delivery from €100.</p>
                    </div>
    
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22.546" height="22.547" viewBox="0 0 22.546 22.547">
                            <g id="leaf" transform="translate(-0.004)">
                                <path id="Path_9" data-name="Path 9" d="M22.512.317A.512.512,0,0,0,22.038,0C2.156,0,0,8.242,0,11.786c0,4.6,3.5,7.686,8.711,7.686,6.581,0,7.959-6.262,8.7-9.626A17.353,17.353,0,0,1,22.4.874.512.512,0,0,0,22.512.317Z" transform="translate(0)" fill="#009063"/>
                                <path id="Path_10" data-name="Path 10" d="M.516,124.086A.512.512,0,0,1,0,123.574c0-3.047,5.283-12.823,13.612-16.859a.512.512,0,0,1,.447.922h0c-8.411,4.076-13.034,13.541-13.034,15.936A.512.512,0,0,1,.516,124.086Z" transform="translate(0 -101.539)" fill="#415342"/>
                            </g>
                        </svg>
                        <p>Free return within 4 days.</p>
                    </div>
                </div>
            </section>
        </section>
    
        <section class="detail__care">
            <div class="detail__care__title">
                <h2>Plant care</h2>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22.546" height="22.547" viewBox="0 0 22.546 22.547">
                        <g id="leaf" transform="translate(-0.004)">
                            <path id="Path_9" data-name="Path 9" d="M22.512.317A.512.512,0,0,0,22.038,0C2.156,0,0,8.242,0,11.786c0,4.6,3.5,7.686,8.711,7.686,6.581,0,7.959-6.262,8.7-9.626A17.353,17.353,0,0,1,22.4.874.512.512,0,0,0,22.512.317Z" transform="translate(0)" fill="#009063"/>
                            <path id="Path_10" data-name="Path 10" d="M.516,124.086A.512.512,0,0,1,0,123.574c0-3.047,5.283-12.823,13.612-16.859a.512.512,0,0,1,.447.922h0c-8.411,4.076-13.034,13.541-13.034,15.936A.512.512,0,0,1,.516,124.086Z" transform="translate(0 -101.539)" fill="#415342"/>
                        </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22.546" height="22.547" viewBox="0 0 22.546 22.547">
                        <g id="leaf" transform="translate(-0.004)">
                            <path id="Path_9" data-name="Path 9" d="M22.512.317A.512.512,0,0,0,22.038,0C2.156,0,0,8.242,0,11.786c0,4.6,3.5,7.686,8.711,7.686,6.581,0,7.959-6.262,8.7-9.626A17.353,17.353,0,0,1,22.4.874.512.512,0,0,0,22.512.317Z" transform="translate(0)" fill="#009063"/>
                            <path id="Path_10" data-name="Path 10" d="M.516,124.086A.512.512,0,0,1,0,123.574c0-3.047,5.283-12.823,13.612-16.859a.512.512,0,0,1,.447.922h0c-8.411,4.076-13.034,13.541-13.034,15.936A.512.512,0,0,1,.516,124.086Z" transform="translate(0 -101.539)" fill="#415342"/>
                        </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22.546" height="22.547" viewBox="0 0 22.546 22.547">
                        <g id="leaf" transform="translate(-0.004)">
                            <path id="Path_9" data-name="Path 9" d="M22.512.317A.512.512,0,0,0,22.038,0C2.156,0,0,8.242,0,11.786c0,4.6,3.5,7.686,8.711,7.686,6.581,0,7.959-6.262,8.7-9.626A17.353,17.353,0,0,1,22.4.874.512.512,0,0,0,22.512.317Z" transform="translate(0)" fill="#009063"/>
                            <path id="Path_10" data-name="Path 10" d="M.516,124.086A.512.512,0,0,1,0,123.574c0-3.047,5.283-12.823,13.612-16.859a.512.512,0,0,1,.447.922h0c-8.411,4.076-13.034,13.541-13.034,15.936A.512.512,0,0,1,.516,124.086Z" transform="translate(0 -101.539)" fill="#415342"/>
                        </g>
                    </svg>
                </div>
            </div>
    
            <article class="detail__care__content">
                <div class="detail__care__content__light">
                    <svg id="Group_4" data-name="Group 4" xmlns="http://www.w3.org/2000/svg" width="48.431" height="48.431" viewBox="0 0 48.431 48.431">
                        <circle id="Ellipse_4" data-name="Ellipse 4" cx="12.528" cy="12.528" r="12.528" transform="translate(11.687 12.107)" fill="none" stroke="#fdbb38" stroke-miterlimit="10" stroke-width="3"/>
                        <line id="Line_6" data-name="Line 6" y2="6.107" transform="translate(24.11)" fill="none" stroke="#fdbb38" stroke-miterlimit="10" stroke-width="3"/>
                        <line id="Line_7" data-name="Line 7" y2="6.107" transform="translate(24.11 42.324)" fill="none" stroke="#fdbb38" stroke-miterlimit="10" stroke-width="3"/>
                        <line id="Line_8" data-name="Line 8" x2="6.107" transform="translate(0 24.32)" fill="none" stroke="#fdbb38" stroke-miterlimit="10" stroke-width="3"/>
                        <line id="Line_9" data-name="Line 9" x2="6.107" transform="translate(42.324 24.32)" fill="none" stroke="#fdbb38" stroke-miterlimit="10" stroke-width="3"/>
                        <line id="Line_10" data-name="Line 10" y1="4.317" x2="4.317" transform="translate(6.462 36.915)" fill="none" stroke="#fdbb38" stroke-miterlimit="10" stroke-width="3"/>
                        <line id="Line_11" data-name="Line 11" y1="4.317" x2="4.317" transform="translate(36.389 6.986)" fill="none" stroke="#fdbb38" stroke-miterlimit="10" stroke-width="3"/>
                        <line id="Line_12" data-name="Line 12" x2="4.317" y2="4.317" transform="translate(7.093 6.355)" fill="none" stroke="#fdbb38" stroke-miterlimit="10" stroke-width="3"/>
                        <line id="Line_13" data-name="Line 13" x2="4.317" y2="4.317" transform="translate(37.02 36.284)" fill="none" stroke="#fdbb38" stroke-miterlimit="10" stroke-width="3"/>
                    </svg>
                    <p>${product.synopsis}</p>
                </div>
    
                <div class="detail__care__content__water">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40.01" height="40.991" viewBox="0 0 40.01 40.991">
                        <g id="Component_27_1" data-name="Component 27 – 1" transform="translate(1.499 2.161)">
                            <path id="Path_55" data-name="Path 55" d="M802.107,361.453a11.3,11.3,0,1,1-22.607,0c0-6.244,11.3-17.953,11.3-17.953S802.107,355.21,802.107,361.453Z" transform="translate(-765.096 -335.427)" fill="none" stroke="#257c81" stroke-miterlimit="10" stroke-width="3"/>
                            <path id="Path_56" data-name="Path 56" d="M792.327,353.693a6.413,6.413,0,0,1-12.826,0c0-3.542,6.413-10.193,6.413-10.193S792.327,350.144,792.327,353.693Z" transform="translate(-779.5 -343.5)" fill="none" stroke="#257c81" stroke-miterlimit="10" stroke-width="3"/>
                        </g>
                    </svg>
                    <p>${product.description}</p>
                </div>
            </article>
        </section>
    
        <section class="detail__reviews">
            <h2>Reviews (${product.review.length})</h2>
    
            ${product.review && product.review.map(review => {
                return `
                <article class="detail__reviews__review">
                    <div class="detail__reviews__review--info">
                        <div class="stars">
                            ${`<svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="#FDBB38" stroke="#fdbb38" stroke-width="1"/></svg>`.repeat(review.score/2)}
                            ${`<svg xmlns="http://www.w3.org/2000/svg" width="21.999" height="20.499" viewBox="0 0 21.999 20.499"><path id="Icon_ionic-ios-star" data-name="Icon ionic-ios-star" d="M22.452,10.125H15.557l-2.1-6.253a.759.759,0,0,0-1.425,0l-2.1,6.253H3a.752.752,0,0,0-.75.75A.551.551,0,0,0,2.264,11a.721.721,0,0,0,.314.53l5.667,3.994L6.07,21.848a.752.752,0,0,0,.258.844.725.725,0,0,0,.422.183.919.919,0,0,0,.469-.169l5.531-3.942,5.531,3.942a.878.878,0,0,0,.469.169.673.673,0,0,0,.417-.183.743.743,0,0,0,.258-.844l-2.175-6.323,5.62-4.031.136-.117a.786.786,0,0,0,.244-.5A.794.794,0,0,0,22.452,10.125Z" transform="translate(-1.75 -2.875)" fill="none" stroke="#fdbb38" stroke-width="1"/></svg>`.repeat(5.5 - review.score/2)}
                        </div>
                        <div>
                            <p class="detail__reviews__review--info__name">${review.Profile.firstName} ${review.Profile.lastName}</p>
                            <p>${review.createdAt.split('T')[0]}</p>
                        </div>
                    </div>
                    <div class="detail__reviews__review--message">
                        <p>${review.description}</p>
                    </div>
                </article>
                `
            }).join('')}
        </section>
        <div>
            <input id="review-score" type="number" min="0" max="10" value="0" />
            <input id="review-text" type="text" />
            <button id="button-add-review">add review</button>
        </div>
            `
            this.$detailPage.innerHTML = tempStr;

            
        let user = this.getCurrentUser()
        if (user) {
             let userResponse = await fetch(`http://127.0.0.1:6001/api/users/${user.id}`);
        let userData = await userResponse.json();
        document.querySelector('#button-add-review').addEventListener('click', async (e) => {
            let review = {
                score: document.querySelector('#review-score').value,
                description: document.querySelector('#review-text').value,
                productId: product.id,
                profileId: userData.Profile.id
            }

            const options = {
                method: 'POST',
                body: JSON.stringify(review),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + this.getTokenJwt()
                }
            }
            let response = await fetch("http://127.0.0.1:6001/api/reviews", options)
            let data = await response.json();
            console.log(data)
            this.getDetail();
        })
        
    }
       

        document.querySelector('#add-to-cart').addEventListener('click', (e) => {
            this.handleAddToOrder(e);
        })
        },
        async handleAddToOrder(e) {
            let currentUser = this.getCurrentUser()
          
            let userResponse = await fetch(`http://127.0.0.1:6001/api/users/${currentUser.id}`);
            let userData = await userResponse.json();
            let order = {
                orderState: 1,
                profileId: userData.Profile.id,
                OrderProduct: [{
                    productPrice: document.querySelector('#add-to-cart-price').innerText.split('€').join(''),
                    productAmount: document.querySelector('#add-to-cart-amount').value,
                    productId: document.querySelector('#add-to-cart-product').dataset.id
                }]
            }
            console.log("order", order)

            const options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + this.getTokenJwt()
                }
            }
            let response = await fetch("http://127.0.0.1:6001/api/orders", options)
            let data = await response.json();
            console.log(data)
            this.getBasket();
        },
        async getBasket() {
            //get profile info of user
            let user = this.getCurrentUser();
            if(!user){
                return
            }
            let responseUser = await fetch(`http://127.0.0.1:6001/api/users/${user.id}`);
            let dataUser = await responseUser.json();

            let orders = []; //orders for basket - checkout
            console.log('get that', dataUser.Profile.order)
            dataUser.Profile.order.forEach(o => {
                if(o.orderState === 1) {
                    orders.push(o.id)
                }
            })
            console.log(orders) // all the baskets

            this.ordersDetails = []
            orders.forEach( async order => {
                let responseOrderProduct = await fetch(`http://127.0.0.1:6001/api/orders/${order}`)
                let dataOrderProduct = await responseOrderProduct.json()
                if (dataOrderProduct.OrderProduct[0]) {
                    let product = dataOrderProduct.OrderProduct[0].Product
                    product.productAmount = dataOrderProduct.OrderProduct[0].productAmount
                    if(document.querySelector('.product__card-container')) {
                        document.querySelector('.product__card-container').innerHTML += `
                   
                    <div class="product__top__card">
                        <figure class="product__top__card--img">
                            <img src="../assets/img/plant-card.png">
                        </figure>

                        <section class="product__top__card--content">
                            <div class="product__top__card--content__top">
                                <div>
                                    <h3>${product.name}</h3>
                                    <span>X</span>
                                </div>

                                <div>
                                    <p>Plant: <span>${product.name}</span></p>
                                    <span>€${product.price}</span>
                                </div>

                                <div>
                                    <p>Pot: <span>Ceramic</span></p>
                                    <span>€5</span>
                                </div>
                            </div>

                            <div class="product__top__card--content__bottom">
                                <input type="number" value="${product.productAmount}" min="1" max="100">
                                <span>€${(product.price + 5) * product.productAmount}</span>
                            </div>
                        </section>
                    </div>
                    `
                }}
            })
            document.querySelector('#shopping-cart-amount').innerHTML = orders.length
        }
    }
    app.init();
})()
