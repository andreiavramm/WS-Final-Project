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

    const scrollToSection = () => {

    }

    window.addEventListener('scroll', () => {
        navBackgroundOnScroll();
    })

    onNavItemClick();

})();

