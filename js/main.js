var mainslider = new Swiper(".main-slider", {
  navigation: {
    nextEl: ".main-slider-button-next",
    prevEl: ".main-slider-button-prev",
  },
  mousewheel: true,
  keyboard: true,
});

var product1 = new Swiper(".product1", {
  slidesPerView: 3,
  spaceBetween: 1,
  pagination: {
    el: ".product1-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".product1-button-next",
    prevEl: ".product1-button-prev",
  },
});

var product2 = new Swiper(".product2", {
  slidesPerView: 3,
  spaceBetween: 1,
  pagination: {
    el: ".product2-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".product2-button-next",
    prevEl: ".product2-button-prev",
  },
});

var product3 = new Swiper(".product3", {
  slidesPerView: 3,
  spaceBetween: 50,
  pagination: {
    el: ".product3-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".product3-button-next",
    prevEl: ".product3-button-prev",
  },
});

//video-reviews
function findVideos() {
  let videos = document.querySelectorAll('.video');

  for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  let link = video.querySelector('.video__link');
  let media = video.querySelector('.video__media');
  let button = video.querySelector('.video__button');
  let id = parseMediaURL(media);

  video.addEventListener('click', () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(media) {
  let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)/i; 
  //let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();

var worksslider = new Swiper(".works-slider", {
  pagination: {
    el: ".works-slider-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".works-slider-button-next",
    prevEl: ".works-slider-button-prev",
  },
});

var articlesslider = new Swiper(".articles-slider", {
  slidesPerView: 3,
  spaceBetween: 1,
  pagination: {
    el: ".articles-slider-pagination",
    type: "progressbar",
  },
});

//page/about
var reviewsSlider = new Swiper(".reviews-slider", {
  slidesPerView: 2,
  spaceBetween: 14,
  pagination: {
    el: ".reviews-slider-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".reviews-slider-button-next",
    prevEl: ".reviews-slider-button-prev",
  },
});

// page/listing
var productCardSlider = new Swiper(".product-card-slider", {
  spaceBetween: 4,
  pagination: {
    el: ".product-card-slider-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  navigation: {
    nextEl: ".product-card-slider-button-next",
    prevEl: ".product-card-slider-button-prev",
  },
});

// page/product-card
var articleSlider = new Swiper(".article-slider", {
  spaceBetween: 10,
  rewind: true,
  pagination: {
    el: ".article-slider-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".article-slider-button-next",
    prevEl: ".article-slider-button-prev",
  },
});

//specifications-slider
var specificationsSlider = new Swiper(".specifications-slider", {
  direction: "vertical",
  pagination: {
    el: ".specifications-slider-pagination",
    clickable: true,
  },
});

//popular
var popularSlider = new Swiper(".popular-slider", {
  slidesPerView: 4,
  spaceBetween: 4,
  rewind: true,
  pagination: {
    el: ".popular-slider-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".popular-slider-button-next",
    prevEl: ".popular-slider-button-prev",
  },
});


// ANIM 
function onEntry(entry){
  entry.forEach(change => {
      if(change.isIntersecting){
          change.target.classList.add('show');
      } else{
      change.target.classList.remove('show');
      }
  });
}

let options = {threshold: [0.9] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.anim');
for (let elm of elements){
  observer.observe(elm);
}


//range-slider-price
const priceSliderInit = () => { // создаем функцию инициализации слайдера
  const range = document.getElementById('price'); // Ищем слайдер
  const inputMin = document.getElementById('minPrice'); // Ищем input с меньшим значнием
  const inputMax = document.getElementById('maxPrice'); // Ищем input с большим значнием

  if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

  const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
  
  noUiSlider.create(price, { // инициализируем слайдер
      start: [12900, 1750000], // устанавливаем начальные значения
      connect: true, // указываем что нужно показывать выбранный диапазон
      range: { // устанавливаем минимальное и максимальное значения
        'min': 0,
        'max': 1750000
      },
      step: 1000, // шаг изменения значений
    }
  )
  
  range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs[handle].value = parseInt(values[handle]);
  });
  
  inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([this.value, null]);
  });
  
  inputMax.addEventListener('change', function () { // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([null, this.value]);
  });
  
}

//range-slider-priceMob
const priceMobSliderInit = () => { // создаем функцию инициализации слайдера
  const range = document.getElementById('priceMob'); // Ищем слайдер
  const inputMin = document.getElementById('minPriceMob'); // Ищем input с меньшим значнием
  const inputMax = document.getElementById('maxPriceMob'); // Ищем input с большим значнием

  if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

  const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
  
  noUiSlider.create(priceMob, { // инициализируем слайдер
      start: [12900, 1750000], // устанавливаем начальные значения
      connect: true, // указываем что нужно показывать выбранный диапазон
      range: { // устанавливаем минимальное и максимальное значения
        'min': 0,
        'max': 1750000
      },
      step: 1000, // шаг изменения значений
    }
  )
  
  range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs[handle].value = parseInt(values[handle]);
  });
  
  inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([this.value, null]);
  });
  
  inputMax.addEventListener('change', function () { // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([null, this.value]);
  });
  
}

//range-slider-furnaceVolume
const furnaceVolumeSliderInit = () => { // создаем функцию инициализации слайдера
  const range = document.getElementById('furnaceVolume'); // Ищем слайдер
  const inputMin = document.getElementById('minFurnaceVolume'); // Ищем input с меньшим значнием
  const inputMax = document.getElementById('maxFurnaceVolume'); // Ищем input с большим значнием

  if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

  const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
  
  noUiSlider.create(furnaceVolume, { // инициализируем слайдер
      start: [1, 35], // устанавливаем начальные значения
      connect: true, // указываем что нужно показывать выбранный диапазон
      range: { // устанавливаем минимальное и максимальное значения
        'min': 1,
        'max': 35
      },
      step: 1, // шаг изменения значений
    }
  )
  
  range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs[handle].value = parseInt(values[handle]);
  });
  
  inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([this.value, null]);
  });
  
  inputMax.addEventListener('change', function () { // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([null, this.value]);
  });
  
}

//range-slider-furnaceVolumeMob
const furnaceVolumeMobSliderInit = () => { // создаем функцию инициализации слайдера
  const range = document.getElementById('furnaceVolumeMob'); // Ищем слайдер
  const inputMin = document.getElementById('minFurnaceVolumeMob'); // Ищем input с меньшим значнием
  const inputMax = document.getElementById('maxFurnaceVolumeMob'); // Ищем input с большим значнием

  if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

  const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
  
  noUiSlider.create(furnaceVolumeMob, { // инициализируем слайдер
      start: [1, 35], // устанавливаем начальные значения
      connect: true, // указываем что нужно показывать выбранный диапазон
      range: { // устанавливаем минимальное и максимальное значения
        'min': 1,
        'max': 35
      },
      step: 1, // шаг изменения значений
    }
  )
  
  range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs[handle].value = parseInt(values[handle]);
  });
  
  inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([this.value, null]);
  });
  
  inputMax.addEventListener('change', function () { // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([null, this.value]);
  });
  
}

//range-slider-consumption
const consumptionSliderInit = () => { // создаем функцию инициализации слайдера
  const range = document.getElementById('consumption'); // Ищем слайдер
  const inputMin = document.getElementById('minConsumption'); // Ищем input с меньшим значнием
  const inputMax = document.getElementById('maxConsumption'); // Ищем input с большим значнием

  if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

  const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
  
  noUiSlider.create(consumption, { // инициализируем слайдер
      start: [1, 12], // устанавливаем начальные значения
      connect: true, // указываем что нужно показывать выбранный диапазон
      range: { // устанавливаем минимальное и максимальное значения
        'min': 1,
        'max': 12
      },
      step: 1, // шаг изменения значений
    }
  )
  
  range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs[handle].value = parseInt(values[handle]);
  });
  
  inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([this.value, null]);
  });
  
  inputMax.addEventListener('change', function () { // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([null, this.value]);
  });
  
}

//range-slider-consumptionMob
const consumptionMobSliderInit = () => { // создаем функцию инициализации слайдера
  const range = document.getElementById('consumptionMob'); // Ищем слайдер
  const inputMin = document.getElementById('minConsumptionMob'); // Ищем input с меньшим значнием
  const inputMax = document.getElementById('maxConsumptionMob'); // Ищем input с большим значнием

  if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

  const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
  
  noUiSlider.create(consumptionMob, { // инициализируем слайдер
      start: [1, 12], // устанавливаем начальные значения
      connect: true, // указываем что нужно показывать выбранный диапазон
      range: { // устанавливаем минимальное и максимальное значения
        'min': 1,
        'max': 12
      },
      step: 1, // шаг изменения значений
    }
  )
  
  range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs[handle].value = parseInt(values[handle]);
  });
  
  inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([this.value, null]);
  });
  
  inputMax.addEventListener('change', function () { // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([null, this.value]);
  });
  
}

//range-slider-firingLine
const firingLineSliderInit = () => { // создаем функцию инициализации слайдера
  const range = document.getElementById('firingLine'); // Ищем слайдер
  const inputMin = document.getElementById('minFiringLine'); // Ищем input с меньшим значнием
  const inputMax = document.getElementById('maxFiringLine'); // Ищем input с большим значнием

  if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

  const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
  
  noUiSlider.create(firingLine, { // инициализируем слайдер
      start: [0, 2500], // устанавливаем начальные значения
      connect: true, // указываем что нужно показывать выбранный диапазон
      range: { // устанавливаем минимальное и максимальное значения
        'min': 100,
        'max': 2500
      },
      step: 10, // шаг изменения значений
    }
  )
  
  range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs[handle].value = parseInt(values[handle]);
  });
  
  inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([this.value, null]);
  });
  
  inputMax.addEventListener('change', function () { // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([null, this.value]);
  });
  
}

//range-slider-firingLineMob
const firingLineMobSliderInit = () => { // создаем функцию инициализации слайдера
  const range = document.getElementById('firingLineMob'); // Ищем слайдер
  const inputMin = document.getElementById('minFiringLineMob'); // Ищем input с меньшим значнием
  const inputMax = document.getElementById('maxFiringLineMob'); // Ищем input с большим значнием

  if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

  const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
  
  noUiSlider.create(firingLineMob, { // инициализируем слайдер
      start: [0, 2500], // устанавливаем начальные значения
      connect: true, // указываем что нужно показывать выбранный диапазон
      range: { // устанавливаем минимальное и максимальное значения
        'min': 100,
        'max': 2500
      },
      step: 10, // шаг изменения значений
    }
  )
  
  range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs[handle].value = parseInt(values[handle]);
  });
  
  inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([this.value, null]);
  });
  
  inputMax.addEventListener('change', function () { // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([null, this.value]);
  });
  
}

const init = () => {
  priceSliderInit()
  priceMobSliderInit() 
  furnaceVolumeSliderInit()
  furnaceVolumeMobSliderInit()
  consumptionSliderInit()
  consumptionMobSliderInit()
  firingLineSliderInit()
  firingLineMobSliderInit()
   // запускаем функцию инициализации слайдера
}

window.addEventListener('DOMContentLoaded', init) // запускаем функцию init, когда документ будет загружен и готов к взаимодействию
