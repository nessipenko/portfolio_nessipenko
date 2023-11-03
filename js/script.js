const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close'),
    menuOverlay = document.querySelector('.menu__overlay');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');

});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});
document.addEventListener("keydown", (e) => {
    if (e.key == 'Escape') {
        menu.classList.remove('active');
    }
});

document.addEventListener('click', (e) => {
    if (e.target == menuOverlay) {
        menu.classList.remove('active');
    }
});



// % автомат счет
const counters = document.querySelectorAll('.usage__percentage-percent'),
    lines = document.querySelectorAll('.usage__percentage-scale span');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;

});

$('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function () {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
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

const portfolioItems = document.querySelectorAll('.portfolio__item');

portfolioItems.forEach((item) => {
    item.addEventListener('mouseover', () => {
        const overlay = item.querySelector('.portfolio__overlay');
        overlay.style.display = 'block';
    });

    item.addEventListener('mouseout', () => {
        const overlay = item.querySelector('.portfolio__overlay');
        overlay.style.display = 'none';
    });
});