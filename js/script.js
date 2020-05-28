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

    const transformResponsiveMenu = () => {
        const pageWidth = window.innerWidth;
        const navContainer = document.querySelector('header nav .ct-container');
        const navigation = document.querySelector('header nav .ct-navigation');
        const mobileNavigation = document.querySelector('body > .ct-navigation');

        if (pageWidth <= mobileWidth && navigation) {
            document.body.insertAdjacentElement('afterbegin', navigation);
        } else if (pageWidth > mobileWidth && mobileNavigation) {
            navContainer.insertAdjacentElement('beforeend', mobileNavigation);
        }

    }

    const mobileMenuOpen = () => {
        const menuOpen = document.querySelector('.ct-nav-toggle');

        menuOpen.addEventListener('click', () => {
            const mobileNavigation = document.querySelector('body > .ct-navigation');
            mobileNavigation.classList.toggle('ct-navigation-opened')

        })
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
            if (event.target === prevArrow) {
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

    window.addEventListener('resize', () => {
        transformResponsiveMenu();
    })

    onNavItemClick();
    onTestimonialChange();
    onGalleryImageClick();
    transformResponsiveMenu();
    mobileMenuOpen();

})();

const fetchData = async () => {
    const response = await fetch('http://restcountries.eu/rest/v2/name/ro', {
        method: 'GET'
    });
    return await response.json();
};
const countriesPromise = fetchData();
let filteredResult;

const numberWithSpaces = (number) => {
    return Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(number);
};

const createListeners = () => {
    const acc = document.getElementsByClassName('accordion');
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', function () {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.display === 'block') {
                panel.style.display = 'none';
            } else {
                panel.style.display = 'block';
            }
        });
    }
};

const searchBy = async (event) => {
    const countries = await countriesPromise;
    const value = event.target.value;
    filteredResult = filterResult(countries, value);
}

const searchResult = () => {
    if (filteredResult && filteredResult.length) {
        generateResults(filteredResult);
    }
}

const generateView = async () => {
    const header = document.querySelector('.ct-header-text');
    const container = document.createElement('div');
    container.setAttribute('class', 'panelsContainer');
    container.setAttribute('id', 'container');

    container.innerHTML += `
    <div class="searchContainer">
      <input type="text" class="search" placeholder="Learn more about your destination" onkeydown="searchBy(event)"/>
      <button type="button" onclick="searchResult()">Search</button>
    </div>`;

    header.appendChild(container);
};

const generateResults = (countries) => {
    document.querySelectorAll('.item').forEach(e => e.remove());
    const header = document.querySelector('.ct-header-text');
    const container = document.getElementById('container');

    countries.forEach((country) => {
        const { name,
            capital,
            alpha2Code,
            population,
            region,
            subregion,
            borders,
            flag,
            languages,
            translations,
            latlng,
            timezones,
            regionalBlocs,
            topLevelDomain,
            currencies
        } = country;
        container.innerHTML += `
      <div class="item">
      <button id=${name} class="accordion">
        <img class="countryFlag" src="${flag}" />
        ${name}
        - <b>Capital:</b> ${capital}
      </button>
      <div class="panel">
        <div><b>Location: </b> <a href="https://www.google.com/maps/dir/?api=1&origin=Iasi&destination=${latlng[0]},${latlng[1]}" target="_blank">
          <img src="./img/fonts/signs.svg" class="icon"/>
        </a>
        <div><b>Population: </b> ${numberWithSpaces(population)}</div>
        <div><b>Region: </b>${region}</div>
        <div><b>Subregion: </b>${subregion}</div>
        ${ borders.length ? `<div><b>Borders: </b> ${borders.join(', ')} </div>` : ''}
        <div><b>Region: </b>${region} </div>
        <div><b>Timezone: </b>${timezones.join(', ')} </div>
        <div><b>Languages: </b>${languages.map(l => l.name).join(', ')} </div>
        <div><b>Top level domanin: </b>${topLevelDomain[0]} </div>
        <div><b>Currencies: </b>${currencies.map((c) => c.name ? `${c.code} - ${c.name}` : '').filter(d => d).join(', ')} </div>
        <div><b>GINI index (World Bank estimate): </b>
        <a href="https://data.worldbank.org/indicator/SI.POV.GINI?locations=${alpha2Code}&view=map" target="_blank">
          <img class="icon" src="./img/fonts/bank.png" />
        </a></div>
        ${ regionalBlocs.length ? `<div><b>Regional blocks: </b>${regionalBlocs.map(l => l.name).join(', ')}</div>` : ''}
        <div><b>Translations: </b> ${Object.values(translations).join(', ')}</div>
      </div>
      </div>
      `;
    });
    header.appendChild(container);
    createListeners();
}

const filterResult = (contries, searchBy) => {
    const searchIn = ['name', 'capital'];
    const result = [];
    contries.forEach((country) => {
        searchIn.forEach((field) => {
            if (country[field].toLowerCase().includes(searchBy.toLowerCase())) {
                result.push(country);
            }
        })
    })
    return result;
}

generateView();
