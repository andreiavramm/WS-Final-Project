(() => {
    const mobileWidth = 680;

    const navBackgroundOnScroll = () => {
        const pageWidth = window.innerWidth;
        const boddyOffset = document.body.scrollTop || document.documentElement.scrollTop;
        const navigation = document.querySelector('header nav');

        if (pageWidth > mobileWidth) {
            boddyOffset > 0 ? navigation.classList.add('ct-nav-scroll') : navigation.classList.remove('ct-nav-scroll');
        }
    }

    const onNavItemClick = () => {
        const navItemList = document.querySelectorAll('.ct-section-link');
        const navItems = [...navItemList];

        navItems.forEach(item => {
            item.addEventListener('click', event => {
                event.preventDefault();

                const sectionId = event.target.getAttribute('href') || event.target.dataset.href;

                scrollToSection(sectionId);
            })
        })
    }

    const scrollToSection = sectionId => {
        let sectionPosition, sectionOffset;
        const navigationHeight = document.querySelector('header nav').offsetHeight;
        const pageWidth = window.innerWidth;

        if (sectionId !== '#') {
            sectionOffset = document.querySelector(sectionId).offsetTop;
            sectionPosition = pageWidth > mobileWidth ? sectionOffset - navigationHeight : sectionOffset;
        } else {
            sectionPosition = 0;
        }

        window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': sectionPosition
        })
    }

    const onTestimonialChange = () => {
        let lastChild, firstChild;
        const prevArrow = document.querySelector('#ct-testimonials-previous');
        const nextArrow = document.querySelector('#ct-testimonials-next');
        const testimonials = document.querySelector('.ct-testimonials ul');

        document.addEventListener('click', () => {
            if(event.target === prevArrow) {
                lastChild = testimonials.lastElementChild;
                testimonials.insertAdjacentElement('afterbegin', lastChild);
            } else if (event.target === nextArrow) {
                firstChild = testimonials.firstElementChild;
                testimonials.insertAdjacentElement('beforeend', firstChild);
            }
        })
    }

    const onGalleryImageClick = () => {
        const galleryImageList = document.querySelectorAll('#ct-gallery li');
        const galleryImages = [...galleryImageList];

        galleryImages.forEach(image => {
            image.addEventListener('click', event => {
                galleryImageOpen(event.target);
            })
        })
    }

    const galleryImageOpen = (image) => {
        const imageSrc = image.getAttribute('src');
        const openedImage = `<div class="ct-backdrop"><img src="${imageSrc}" alt="" />
                            <span class="ct-backdrop-close">X</span></div>`;
        document.body.insertAdjacentHTML('beforeend', openedImage);
        galleryImageClose();
    }

    const galleryImageClose = () => {
        const closeButton = document.querySelector('.ct-backdrop-close');

        closeButton.addEventListener('click', () => {
            const backdrop = document.querySelector('.ct-backdrop');
            backdrop.remove();
        })
    }

    window.addEventListener('scroll', () => {
        navBackgroundOnScroll();
    })

    onNavItemClick();
    onTestimonialChange();
    onGalleryImageClick();    

})();

