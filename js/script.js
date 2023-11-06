const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');
const menuOverlay = document.querySelector('.menu__overlay');

function toggleMenu() {
    menu.classList.add('active');
}

function closeMenu() {
    menu.classList.remove('active');
}

function handleKeyPress(e) {
    if (e.key === 'Escape') {
        closeMenu();
    }
}

function handleMenuOverlayClick(e) {
    if (e.target === menuOverlay) {
        closeMenu();
    }
}

hamburger.addEventListener('click', toggleMenu);
closeElem.addEventListener('click', closeMenu);
document.addEventListener("keydown", handleKeyPress);
document.addEventListener('click', handleMenuOverlayClick);

// % автомат счет
const counters = document.querySelectorAll('.usage__percentage-percent'),
    lines = document.querySelectorAll('.usage__percentage-scale span');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;

});

const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });


    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.4;

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) :
                        Math.min(widthTop + progress / speed, widthTop + toBlock));

                document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }

            }
        });
    });

    const element = document.documentElement,
        body = document.body

    const calcScroll = () => {
        upElem.addEventListener('click', function (event) {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop)

            if (this.hash !== '') {
                event.preventDefault()
                let hashElement = document.querySelector(this.hash),
                    hashElementTop = 0;

                while (hashElement.offsetParent) {
                    hashElementTop += hashElement.offsetTop
                    hashElement = hashElement.offsetParent
                }
                hashElementTop = Math.round(hashElementTop)
                smoothScroll(scrollTop, hashElementTop, this.hash)

            }
        })
    }

    const smoothScroll = (from, to, hash) => {
        let timeInterval = 1,
            prevScrollTop,
            speed

        if (to > from) {
            speed = 30;
        } else {
            speed = - 30;
        }

        let move = setInterval(function () {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop)
            if (
                prevScrollTop === scrollTop ||
                (to > from && scrollTop >= to) ||
                (to < from && scrollTop <= to)
            ) {
                clearInterval(move)
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash)
            } else {
                body.scrollTop += speed
                element.scrollTop += speed
                prevScrollTop = scrollTop
            }
        }, timeInterval)
    }
    calcScroll()
};



scrolling('.pageup');

function showOverlay(overlay) {
    overlay.style.display = 'block';
}

function hideOverlay(overlay) {
    overlay.style.display = 'none';
}

const portfolioItems = document.querySelectorAll('.portfolio__item');

portfolioItems.forEach((item) => {
    const overlay = item.querySelector('.portfolio__overlay');

    item.addEventListener('mouseover', () => {
        showOverlay(overlay);
    });

    item.addEventListener('mouseout', () => {
        hideOverlay(overlay);
    });
});




const form = document.querySelector('#subscription_form');
const popup = document.querySelector('#popup');
const popupTitle = document.querySelector('.popup__form_title');
const popupSubtitle = document.querySelector('.popup__form_subtitle');
const popupCloseBtnUp = document.querySelector('.popup__form_close');
const popupCloseBtnDown = document.querySelector('.popup__form_btn');
const popupCloseOverlay = document.querySelector('.popup__wrapper');
const emailInput = document.querySelector('#email_input');

function showPopup(className) {
    popup.classList.add(className);
    document.body.classList.add('popup-open');
}

function closePopup() {
    popup.style.display = 'none';
    document.body.classList.remove('popup-open');
    form.reset();
}

function getSuccessPopup() {
    popupTitle.textContent = 'Success';
    popupSubtitle.textContent = 'Thanks, I will contact you';
    showPopup('active');
}

function getErrorPopup(message) {
    popupTitle.textContent = 'Error!';
    popupSubtitle.textContent = message || 'Please try again later';
    showPopup('active');
}

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Form submitted');

    if (!emailInput.validity.valid) {
        getErrorPopup('Please check your email');
        return;
    }

    const form = event.target,
        formData = new FormData(form),
        email = emailInput.value;

    if (!isValidEmail(email)) {
        getErrorPopup('Invalid email format');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                getSuccessPopup();
            } else {
                getErrorPopup();
            }
        }
    };

    xhr.send(formData);
});

popupCloseBtnUp.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
});

popupCloseBtnDown.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
});

popupCloseOverlay.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target === popupCloseOverlay) {
        closePopup();
    }
});
