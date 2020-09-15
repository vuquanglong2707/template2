$(document).ready(function() {
    $.ajax({
        url: 'http://45.118.145.91:9999/pos/api/product/detail?shop_token=AmlWspRNhvjO7z4iPD0eWekLLUeODOYt&warehouseId=1&productID=2',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var objProduct = data.body;
            // alert(objProduct.name);
            var lstImages = objProduct.images;
            var Name_product = objProduct.name;
            var titles = objProduct.desc;
            var Pricess = objProduct.originPrice;
            var Pri = objProduct.variants;
            var Pric = Pri[0].price;

            var videotest;
            ///////////Set ảnh auto slide
            for (var k = 0; k < lstImages.length; k++) {
                if (k === 0) {
                    $(".slider-single").append(`
                    <div>
                        <img src="http://45.118.145.91:9999${lstImages[0]}" alt="">
                    </div>
                    `);
                    $(".slider-nav").append(`
                    <div>
                        <img src="http://45.118.145.91:9999${lstImages[0]}" alt="">
                    </div>
                     `);
                } else {
                    $(".slider-single").append(`
                        <div>
                            <img src="http://45.118.145.91:9999${lstImages[k]}" alt="">
                        </div>
                    `);
                    $(".slider-nav").append(`
                        <div>
                            <img src="http://45.118.145.91:9999${lstImages[k]}" alt="">
                        </div>
                     `);
                }
            }
            $('.slider-single').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: false,
                adaptiveHeight: true,
                infinite: false,
                useTransform: true,
                speed: 400,
                cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
            });

            $('.slider-nav')
                .on('init', function(event, slick) {
                    $('.slider-nav .slick-slide.slick-current').addClass('is-active');
                })
                .slick({
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    dots: false,
                    focusOnSelect: false,
                    infinite: false,
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5,
                        }
                    }, {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                        }
                    }, {
                        breakpoint: 420,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    }]
                });

            $('.slider-single').on('afterChange', function(event, slick, currentSlide) {
                $('.slider-nav').slick('slickGoTo', currentSlide);
                var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
                $('.slider-nav .slick-slide.is-active').removeClass('is-active');
                $(currrentNavSlideElem).addClass('is-active');
            });

            $('.slider-nav').on('click', '.slick-slide', function(event) {
                event.preventDefault();
                var goToSingleSlide = $(this).data('slick-index');

                $('.slider-single').slick('slickGoTo', goToSingleSlide);
            });
            ///Scroll
            $(function() {
                $('a[href*=#]').on('click', function(e) {
                    e.preventDefault();
                    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500, 'linear');
                });
            });

        }
    });

});