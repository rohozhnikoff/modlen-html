
var ready = function() {

    $(window).load(function() {
        $('#container').masonry({
            // указываем элемент-контейнер в котором расположены блоки для динамической верстки
            itemSelector: '.item',
            isFitWidth: true,
            columnWidth: 315,
            // указываем класс элемента являющегося блоком в нашей сетке
            singleMode: false,
            // true - если у вас все блоки одинаковой ширины
            isResizable: true,
            // перестраивает блоки при изменении размеров окна
            isAnimated: true,
            // анимируем перестроение блоков
            animationOptions: {
                queue: false,
                duration: 500
            }
            // опции анимации - очередь и продолжительность анимации
        });

    });

    $(function() {


        // Схлопываем заказ
        var closed = $('.order-info__icon');

        closed.click(function() {
            $('#closed').slideToggle(800);

            if (closed.hasClass('fa-plus-square-o')) {
                closed.removeClass('fa-plus-square-o');
            } else {
                closed.addClass('fa-plus-square-o');
            }
        });


        //Скриваем/показываем пароль
        var pass = $('#pass'),
            eye = $('.input-wrap__eye');

        eye.click(function(e) {
            e.preventDefault();
            if (pass.attr('type') === ('password')) {
                pass.attr('type', 'text');
            } else {
                pass.attr('type', 'password')
            }
        });

        //Выбираем цвет

        var color = $('.color-choice__item'),
            colorin = 'color-choice__item_active',
            link = $('.color-choice__link');

        color.click(function() {
            $(this).addClass('color-choice__item_active');
            $(this).siblings().removeClass(colorin);
        });


        var cvc = $('.payment__input-cvv');
        $(cvc).focus(function() {
            $('.payment__arrow').show();
            $('.payment__bank-card').addClass('payment__bank-card_code');
            $('.payment__card-description').show();

        });
        cvc.blur(function() {
            $('.payment__bank-card').removeClass('payment__bank-card_code');
            $('.payment__arrow').hide();
            $('.payment__card-description').hide();

        });




        $('.method-list__item').click(function(ev) {
            ev.preventDefault();

            var item = $(this).closest('.method-list__item'),
                tabs = $('.payment__card'),
                itemPos = item.data('class');
            console.log(itemPos, 1);
            tabs.filter('.payment__card_' + itemPos)
                .addClass('active')
                .siblings().removeClass('active');
            item
                .addClass('method-list__item_active')
                .siblings().removeClass('method-list__item_active');
        });
    });




    //$(function(){
    //   $('.tabs-control__link').click(function(e){
    //       e.preventDefault();
    //
    //       var item = $(this).closest('.tabs-control__item'),
    //           tabitem = $('.tabs-content__item'),
    //           itemPos = item.data('class');
    //
    //       console.log(itemPos);
    //   })
    //
    //});

    //Масонри бл
    //var container = document.querySelector('#container');
    //var msnry = new Masonry( container, {
    //    // options
    //    columnWidth: 200,
    //    itemSelector: '.item'
    //});



    var like = $('.head__cart-circle'),
        numb = like.text(), //забираем строку
        numint = parseInt(numb); //приводим к числу

    like.each(function addLikes() {
        if (numint >= 1) { // Если равно или больше 1, добавляем класс
            like.addClass("active");
        } else {
            like.removeClass("active"); //В другом случае, убираем
        }
    });


    // Валюта
    var cur = $('.currency__text');

    cur.click(function(e) {
        e.preventDefault();
        cur.siblings().removeClass('active');
        $(this).addClass('active');
    });

    //Навигация шапки горизониальная

    var navi = $('.navi-list__item'),
        navLink = $('.navi-list__link');

    navi.click(function(e) {
        e.preventDefault();
        navi.siblings().removeClass('active');
        $(this).addClass('active');
    });

    //popup
    $('a.login_modal_a').click(function(ev) {
        ev.preventDefault();
        $(this).next().click();
    });


    var popupLink = $('.head__my-link'),
        popup = $('.pop-up-sign'),
        head = $('.wrapper'),
        footer = $('.foot'),
        close = $('.popup-sign__close'),
        blur = 'blurJS';

    popupLink.click(function(e) {
        if (popupLink.text() == 'My Modlen') {
            e.preventDefault();
            popup.addClass('active');
            head
                .add(head)
                .add(footer)
                .addClass(blur)
        }
    });
    close.click(function(e) {
        e.preventDefault();
        popup.removeClass('active');
        head
            .add(head)
            .add(footer)
            .removeClass(blur)
    })


    //gallery in property
    var gallery = $('.property__img img');

    gallery.click(function(e) {
        e.preventDefault();
        var link = $(this),
            img = link.find('img'),
            src = img.attr('src'),
            imgLarge = $('.property__large-img img');


        imgLarge.attr('src', src);
        $('.property__large-img').show();

        imgLarge.click(function() {
            imgLarge.attr('src', 'none');
            $('.property__large-img').hide();
        });
    });

    //Options
    var items = $('.measure-list').find('input'),
        active = 'measure-list__item_blue',
        wrongItem = 'measure-list__item_error',
        wrongLabel = 'measure-list__label_error',
        wrongInput = 'measure-list__input_error',
        activeInput = 'measure-list__input_blue',
        img = $('.option__mirror-img').find('img'),
        imgText = $('.option__mirror-info'),
        imgTextA = $('.option__videoguide'),
        arrow = $('<span>').addClass('measure-list__arrow'),
        x = 110,
        text = {};

    $.getJSON('../../js/options.json', function(data) {
        text = data;
    });

    items.on('focus', function(ev) {
        var parent = $(this).addClass(activeInput).parent().addClass(active),
            lab = parent.find('label'),
            src = 'img/options/' + lab.attr('for') + '.jpg';
        img.attr('src', src);
        img.load(function() {
            var hFull = img.height(),
                index = parseInt(parent.find('span').text()),
                y = Math.round(hFull * index / 16) + $(this).offset().top - parent.offset().top - 15,
                alpha = Math.round(-Math.atan2(y, x) * 180 / Math.PI - 180);

            //
            if (lab.attr('for') != 'Name' && lab.attr('for') != 'Age') {
                arrow.css({
                    'width': Math.round(Math.sqrt(x * x + y * y)),
                    'transform': 'rotate(' + alpha + 'deg)'
                }).appendTo(parent);
            }
            $(this).off();
        });
        imgText.html(text[lab.attr('for')].text);
        imgTextA.attr('href', text[lab.attr('for')].url);
    });

    items.on('blur', function(ev) {
        var parent = $(this).parent().removeClass(active);
        if (!validateOption($(this))) {
            parent.addClass(wrongItem);
            $(this).addClass(wrongInput).removeClass(activeInput);
            parent.find('label').addClass(wrongLabel);
        } else {
            parent.removeClass(wrongItem);
            $(this).removeClass(wrongInput).removeClass(activeInput);
            parent.find('label').removeClass(wrongLabel);
        }
    });
    //masonry
};

function validateOption($el) {
    var value = parseInt($el.val());
    if ($el.parent().find('label').text().indexOf('name') != -1) return true;
    return !(isNaN(value) || value < 1 || value > 250)
};

$(document).ready(ready);
$(document).on('page:load', ready);

$(function() {
    $("form#new_user").bind("ajax:success", function(e, data, status, xhr) {
        if (data.success) {
            $('.popup-sign__close').click();
            return $('.head__my-link u').text(data.user.email);
        } else {
            return alert('failure!');
        }
    });
    return $("form#user_form_main").bind("ajax:success", function(e, data, status, xhr) {
        if (data.success) {
            $('.head__my-link u').text(data.user.email);
            return $('.option-sign-in').remove();
        } else {
            return alert('failure!');
        }
    });



});


$(function() {
    var card = $('.payment__input-num');

    card.keypress(function(e) {

        var value = $(this).val().length;
        var thisVal = card.attr('maxlength');

        if (value >= thisVal) {
            $(this).next(':input').focus()
        }
    });

});



$(function() {
    $('.item').imagesLoaded()
        .always(function(instance) {
            console.log('all images loaded');
        })
        .done(function(instance) {
            console.log('all images successfully loaded');

            $('.more-btn').click(function(e) {
                e.preventDefault();
                var imgs = $('#putinHuilo').find('img');

                imgs.attr('src', function() {
                    return $(this).data('src');
                });
                $('#putinHuilo').toggle('display', 'block')({});
            });
            $.DrLazyload();
            checHeartNum();
        })
        .fail(function() {
            console.log('all images loaded, at least one is broken');
        })
        .progress(function(instance, image) {
            var result = image.isLoaded ? 'loaded' : 'broken';
            console.log('image is ' + result + ' for ' + image.img.src);
        });
});

//ПРоверка на цифру в сердечке.
//
//$(function(){
//	function checHeartNum() {
//		var like = $('.like-this__heart'),
//			numb = like.text(), //забираем строку
//			numint = parseInt(numb);//приводим к числу
//
//		if(numint >= 1){ // Если равно или больше 1, добавляем класс todo: не работает
//			like.addClass("active");
//		}
//		else{
//			like.removeClass("active");//В другом случае, убираем
//		}
//
//	}
//})