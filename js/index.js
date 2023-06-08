let ulProduct = document.querySelectorAll("main .content-sixth .products-slider ul");
const liProduct = document.querySelectorAll("main .content-sixth .products-slider ul li");
const arrowBtns = document.querySelectorAll("main .content-sixth .products-slider i");
let i = 1;

/* 
async function logJSONData(ulProduct) {
  const response = await fetch("https://api.apify.com/v2/datasets/1W3B2jxQ97xrcYr1e/items?token=apify_api_ny9dFQDS5Axnek9GSw4yDidu4e4VjN2GsH5F");
  const jsonData = await response.json();
  console.log(jsonData)
  ulProduct.innerHTML = ''
  for ( let i = 0 ; i < jsonData.length ; i++ ) {
    if ( i == 1 ) {
      ulProduct.innerHTML += `
        <li class="order-${i} show-information-product">
          <img src="${jsonData[i].images_urls[0]}" alt="">
          <div class="information-product">
            <span class="price-product">$329</span>
            <span class="name-product"> Pösht Sofa </span>
          </div>
        </li>
      `
    } else {
      ulProduct.innerHTML += `
        <li class="order-${i}">
          <img src="${jsonData[i].images_urls[0]}" alt="">
          <div class="information-product">
            <span class="price-product">$329</span>
            <span class="name-product"> Pösht Sofa </span>
          </div>
        </li>
      `
    }
  }
}

logJSONData(ulProduct);
*/

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

$(arrowBtns[0]).on( "click", function() {
  if (screen.width >= 920) {
    if (i - 1 < 0) {
      $(liProduct[liProduct.length - 1]).css("order", 1);
      $(liProduct[liProduct.length - 1]).addClass('show-information-product');
    } else {
      $(liProduct[i-1]).css("order", 1);
      $(liProduct[i-1]).addClass('show-information-product');
    }

    $(liProduct[i]).css("order", 2);
    $(liProduct[i]).removeClass('show-information-product');

    i += i == 0 ? liProduct.length - 1 : -1;

    if (i - 1 < 0) {
      $(liProduct[liProduct.length - 1]).css("order", 0);
    } else {
      $(liProduct[i-1]).css("order", 0);
    }
  } else {
    if (i - 1 < 0) {
      $(liProduct[liProduct.length - 1]).css("order", 1);
      $(liProduct[liProduct.length - 1]).addClass('show-information-product');
    } else {
      $(liProduct[i-1]).css("order", 1);
      $(liProduct[i-1]).addClass('show-information-product');
    }

    $(liProduct[i]).css("order", 2);
    $(liProduct[i]).removeClass('show-information-product');

    i += i == 0 ? liProduct.length - 1 : -1;

    $(liProduct[i]).css("order", 0);
    $(liProduct[i-1]).css("display", "block");
  }
})

$(arrowBtns[1]).on( "click", function() {
  if (screen.width >= 920) {
    if (i - 1 < 0) {
      $(liProduct[liProduct.length - 1]).css("order", 2);
    } else {
      $(liProduct[i-1]).css("order", 2);
    }

    $(liProduct[i]).removeClass('show-information-product');
    $(liProduct[i]).css("order", 0);

    i += i == liProduct.length - 1 ? -liProduct.length + 1 : +1;

    $(liProduct[i]).addClass('show-information-product');
    $(liProduct[i]).css("order", 1);
  } else {
    if (i - 1 < 0) {
      $(liProduct[liProduct.length - 1]).css("order", 2);
      $(liProduct[liProduct.length - 1]).css("display", "block");
    } else {
      $(liProduct[i-1]).css("order", 2);
      $(liProduct[i-1]).css("display", "block");
    }

    $(liProduct[i]).removeClass('show-information-product');
    $(liProduct[i]).css("order", 1);
    $(liProduct[i]).css("display", "none");
    
    i += i == liProduct.length - 1 ? -liProduct.length + 1 : +1;

    $(liProduct[i]).addClass('show-information-product');
    $(liProduct[i]).css("order", 1);
  }
});