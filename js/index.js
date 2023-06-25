function templateHightlightInformationProduct(image_urls, price, title) {
  return `
    <img class="image-container" src="${image_urls}">
    <span class="highlighted-product"> HIGHLIGHTED PRODUCT </span>
    <div class="information-product">
      <span class="price-product">$${price}</span>
      <span class="name-product"> ${title} </span>
      <button class="button-view-detail"> <span>VIEW DETAILS</span> <i class="fa-solid fa-chevron-right"></i> </button>
    </div>
  `
}

function templateShowInformationProduct(i, images_urls, price, title, url) {
  return `
    <li class="show-information-product" id="${i}" style="order: ${i}; cursor: pointer">
      <a href="${url}"></a>
      <img src="${images_urls}" alt="">
      <div class="information-product">
        <span class="price-product">$${price}</span>
        <span class="name-product"> ${title} </span>
      </div>
    </li>
    `
}

function templateDontShowInformationProduct(i, images_urls, price, title, url) {
  return `
    <li class="not-show-information-product" id="${i}" style="order: ${i};">
      <a href="${url}"></a>
      <img src="${images_urls}" alt="">
      <div class="information-product">
        <span class="price-product">$${price}</span>
        <span class="name-product"> ${title} </span>
      </div>
    </li>
`
}

function templateCategoryDetail(isShow, title, description) {
  if (isShow) {
    return `
      <div class="category-detail" id="show">
        <span class="text-first">${title}</span>
        <span class="text-second">${description}</span>
      </div>
    `
  } else {
    return `
      <div class="category" id="notShow">
        <span class="text-first">${title}</span>
        <span class="text-second" style="display: none;">${description}</span>
      </div>
    `
  }
}

function openViewDetails(href) {
  window.open(href); 
}

function resizeHeightImageContentSecond() {
  
}

function changeOrderImage(isArrowLeft) {
  const listProduct = document.querySelectorAll("main .content-sixth .products-slider ul li");

  for (let i = 0 ; i < listProduct.length ; i++) {
    let order = Number(listProduct[i].id);
    if ( !isArrowLeft ) {
      if ( order == listProduct.length - 1 ) {
        order = 0;
      } else {
        order = order + 1;
      }
    } else if ( isArrowLeft ) {
      if ( order == 0 ) {
        order = listProduct.length - 1;
      } else {
        order = order - 1;
      }
    }
    listProduct[i].id = order;
    listProduct[i].style = `order: ${order};`;
    if ( order == 0 ) {
      listProduct[i].classList.add("show-information-product");
      listProduct[i].style.cursor = "pointer";
      listProduct[i].classList.remove("not-show-information-product");
    } else {
      listProduct[i].classList.remove("show-information-product");
      listProduct[i].style.cursor = "none";
      listProduct[i].classList.add("not-show-information-product");
    }
  }
}

function addClickArrowButton() {
  const arrowBtns = document.querySelectorAll("main .content-sixth .products-slider i");
  $(arrowBtns[0]).on( "click", function() {
    changeOrderImage(false);
  });
  
  $(arrowBtns[1]).on( "click", function() {
    changeOrderImage(true);
  });
}

function addClickDetailProduct() {
  $( "main .content-sixth .products-slider ul li" ).on( "click", function(e) {
    if (this.id !== '0') {
      e.preventDefault();
    } else {
      openViewDetails(this.childNodes[1].href);
    }
  })
}

function addClickViewDetail(href) {
  $( "main .content-first-second .content-second .information-product .button-view-detail " ).on( "click", function(e) {
    openViewDetails(href);
  } );
}

function addClickDetailDescription() {
  const categoryDescription = document.querySelector("main .content-fifth .details-sections .category-description");
  for (let i = 0 ; i < 3 ; i++) {
    $(categoryDescription.children[i]).on("click", function(e) {
      if (e.currentTarget.id === 'show') {
        e.currentTarget.id = 'notShow';
        e.currentTarget.className = 'category';
        $(`main .content-fifth .picture #${i+1}`).removeClass("picture-detail").addClass("picture");
        $(e.currentTarget.children[1]).css({
          display: 'none',
        })
      } else {
        e.currentTarget.id = 'show';
        e.currentTarget.className = 'category-detail';
        $(`main .content-fifth .picture #${i+1}`).removeClass("picture").addClass("picture-detail");
        $(e.currentTarget.children[1]).css({
          display: 'block',
        })
      }

    })
  }
}

async function logJSONData() {
  const response = await fetch("https://api.apify.com/v2/datasets/qazbsupBTIcwOhVwc/items?token=apify_api_ny9dFQDS5Axnek9GSw4yDidu4e4VjN2GsH5F");
  const jsonData = await response.json();
  console.log(jsonData);
  return(jsonData);
}

async function showData() {
  try {
    const ul = document.querySelector("main .content-sixth .products-slider ul");
    const contentSecond = document.querySelector("main .content-first-second .content-second");
    const categoryDescription = document.querySelector("main .content-fifth .details-sections .category-description");
    const pictureContentFifth = document.querySelector("main .content-fifth .picture");
    const jsonData = await logJSONData();

    let randomNumber = Math.floor(Math.random() * jsonData.length); 
    contentSecond.innerHTML = '';
    contentSecond.innerHTML += templateHightlightInformationProduct(jsonData[randomNumber].images_urls[0], jsonData[randomNumber].price, jsonData[randomNumber].title);
    addClickViewDetail(jsonData[randomNumber].url);
    
    categoryDescription.innerHTML = '';
    pictureContentFifth.innerHTML = '';
    for ( let i = 0 ; i < 3 ; i++ ){
      randomNumber = Math.floor(Math.random() * jsonData.length);
      if ( i == 0 ) {
        pictureContentFifth.innerHTML += `<img class="picture-detail" id="${i+1}" src="${jsonData[randomNumber].images_urls[0]}">`
        categoryDescription.innerHTML += templateCategoryDetail(true, jsonData[randomNumber].title, jsonData[randomNumber].description);
      }
      else {
        pictureContentFifth.innerHTML += `<img class="picture" id="${i+1}" src="${jsonData[randomNumber].images_urls[0]}">`
        categoryDescription.innerHTML += templateCategoryDetail(false, jsonData[randomNumber].title, jsonData[randomNumber].description);
      }
    }
    addClickDetailDescription();

    ul.innerHTML = '';
    for ( let j = 0 ; j < jsonData.length ; j++ ) {
      if ( j == 0 ) {
        ul.innerHTML += templateShowInformationProduct(j, jsonData[j].images_urls[0], jsonData[j].price, jsonData[j].title, jsonData[j].url);
      } else {
        ul.innerHTML += templateDontShowInformationProduct(j, jsonData[j].images_urls[0], jsonData[j].price, jsonData[j].title, jsonData[j].url);
      }
    }
    addClickArrowButton();
    addClickDetailProduct();
  } catch (error) {
    console.log(error);
  }
}

showData();

$( ".navbar .container .container-right .hamburgerIcon" ).on( "click", function() {
  $(".navbar .container .container-right ul").addClass("active");
  $("body").css({
    overflow: 'hidden',
  })
} );

$( ".navbar .container .container-right ul .close " ).on( "click", function() {
  $(".navbar .container .container-right ul").removeClass("active");
  $("body").css({
    overflow: 'auto',
  })
} );

window.addEventListener('resize', function() {
  resizeHeightImageContentSecond();
});

if (screen.width < 920) {
  resizeHeightImageContentSecond();
}
