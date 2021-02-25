$(document).ready(function () {
  if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    $('.slick-slider:not(.init)').addClass('init').slick({
      variableWidth: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      focusOnSelect: true,
      infinite: false,
      useTransform: false
    });
  } else {
    $('.slick-slider:not(.init)').addClass('init').slick({
      variableWidth: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      focusOnSelect: true,
      infinite: false
    });
  }
    sliderSponsors();
    takeaLook();
    teamDasboardSlider();
    tebleColapser();
    tableSlider();

});

$(document).on('redraw', function () {
  if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    $('.slick-slider:not(.init)').addClass('init').slick({
      variableWidth: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      focusOnSelect: true,
      infinite: false,
      useTransform: false
    });
  } else {
    $('.slick-slider:not(.init)').addClass('init').slick({
      variableWidth: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      focusOnSelect: true,
      infinite: false
    });
  }
    sliderSponsors();
    takeaLook();
    teamDasboardSlider();
    tebleColapser();
    tableSlider();
});

/*************
 * TAKE A LOOK - tabs
 */
var teamDasboardSlider = function () {
    $('.team-widget__slider:not(.init)').each(function () {
        var _me = $(this);
        _me.addClass('init');
        _me.slick({
            variableWidth: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            focusOnSelect: true,
            infinite: false
        });
    });
    $('.team-widget__str-slider__wrp:not(.init)').each(function () {
        var _me = $(this);
        _me.addClass('init');
        _me.slick({
            variableWidth: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            focusOnSelect: true,
            infinite: false
        });
    })

};
/*************
 * TAKE A LOOK - tabs
 */
var takeaLook = function () {
    $('.landing__look:not(.init)').each(function () {
        var _me = $(this);
        _me.addClass('init');
        _me.find('.landing__tab').each(function () {
            var _meBt = $(this);
            _meBt.on('click', function () {
                var _last = _me.find('.landing__tab.active').parent().index();
                var _akt = _meBt.parent().index();
                _me.find('.landing__tab.active').removeClass('active');
                _me.find('.cta_wrap .cta_button').removeClass('active');
                _me.find('.cta_wrap .cta_button').eq(_akt).addClass('active');
                _meBt.addClass('active');

                var _oldImg = _me.find('.landing__look__img.pc img').eq(_last);
                var _newImg = _me.find('.landing__look__img.pc img').eq(_akt);

                var _newX = -100;
                var _scaleMin = 0.85;
                var _scaleMax = 1.15;

                if (_last > _akt) {
                    _newX = 100;
                    _scaleMin = 1.15;
                    _scaleMax = 0.85;
                }

                TweenMax.fromTo(
                    _oldImg, 0.4,
                    {
                        x: 0, alpha: 1, scale: 1
                    },
                    {
                        x: _newX, alpha: 0, scale: _scaleMin,
                        ease: Power2.easeInOut
                    }
                );

                TweenMax.fromTo(
                    _newImg, 0.4,
                    {
                        x: _newX * -1, alpha: 0, scale: _scaleMax
                    },
                    {
                        x: 0, alpha: 1, scale: 1,
                        ease: Power2.easeInOut
                    }
                );
                //mt
                var _oldImgMT = _me.find('.landing__look__img.mobile img').eq(_last);
                var _newImgMT = _me.find('.landing__look__img.mobile img').eq(_akt);

                TweenMax.fromTo(
                    _oldImgMT, 0.4,
                    {
                        x: 0, alpha: 1, scale: 1
                    },
                    {
                        x: 0, alpha: 0, scale: _scaleMin,
                        ease: Power2.easeInOut
                    }
                );

                TweenMax.fromTo(
                    _newImgMT, 0.4,
                    {
                        x: 0, alpha: 0, scale: _scaleMax
                    },
                    {
                        x: 0, alpha: 1, scale: 1,
                        ease: Power2.easeInOut
                    }
                );


                return false;
            });
        });
    });
};
/*************
 * Sponsor slider
 */
var sliderSponsors = function () {
    $('.landing__sponsors__slider__wrapper:not(.init)').each(function () {
        var _me = $(this);
        _me.addClass('init');
        _me.find('.sponsors-left').on('click', function () {
            var _index = _me.find('.landing__sponsors__slick__item.active').index();
            var _indexNext = _index - 1;
            if (_indexNext < 0) {
                _indexNext = 0;
            }
            scrollSponsorsTo(_indexNext, _me);
            return false;
        });
        _me.find('.sponsors-right').on('click', function () {
            var _index = _me.find('.landing__sponsors__slick__item.active').index();
            var _indexNext = _index + 1;
            if (_indexNext >= _me.find('.landing__sponsors__slick__item').length) {
                _indexNext = _me.find('.landing__sponsors__slick__item').length - 1;
            }
            scrollSponsorsTo(_indexNext, _me);
            return false;
        });
        _me.find('.landing__sponsors__slick__item').on('click', function () {
            var _index = $(this).index();
            scrollSponsorsTo(_index, _me);
            return false;
        });
        scrollSponsorsTo(_me.find('.landing__sponsors__slick__item').length - 1, _me);
    });
};

var scrollSponsorsTo = function (_index, _me) {
    var _ww = _me.find('.landing__sponsors__slick__item:not(.active)').first().width();
    _me.find('.landing__sponsors__slick__item.active .in').css('background-color', 'transparent');
    _me.find('.landing__sponsors__slick__item.active').removeClass('active')
    var _length = _me.find('.landing__sponsors__slick__item').length;
    var _meActive = _me.find('.landing__sponsors__slick__item').eq(_index);
    _meActive.addClass('active').find('.in').css('background-color', _meActive.attr('data-bg-color'));
    var _newX = (_length - 1 - _index) * _ww;
    _me.find('.scrollable').css('transform', 'translateX(' + _newX + 'px)');
    _me.find('.landing__sponsors__slick__item.ishiden').removeClass('ishiden');
    for (var a = _index + 1; a < _length; a++) {
        _me.find('.landing__sponsors__slick__item').eq(a).addClass('ishiden');
    }
    if (_index >= _length - 1) {
        _me.find('.sponsors-right').addClass('inactive');
    } else {
        _me.find('.sponsors-right.inactive').removeClass('inactive');
    }
    if (_index <= 0) {
        _me.find('.sponsors-left').addClass('inactive');
    } else {
        _me.find('.sponsors-left.inactive').removeClass('inactive');
    }
};


var tebleColapser = function () {
    $('.colapse-folder:not(.init)').each(function () {
        var _me = $(this);
        _me.find('.title').bind('click', function () {
            var _hideContent = _me.attr('data-colapse');
            if (_me.hasClass('colapsed')) {
                _me.removeClass('colapsed');
                $('.' + _hideContent).removeClass('colapsed');
            } else {
                _me.addClass('colapsed');
                $('.' + _hideContent).addClass('colapsed');
            }
            return false;
        });
    });
};


var tableSlider = function () {
    /*scrollable table -- start -- v1*/
    $('.mt-scrollable-table:not(.init)').each(function () {
        var meTable = $(this);
        meTable.addClass('init');
        meTable.find('tr').each(function () {
            var meTableRow = $(this);
            meTableRow.find('th').each(function () {
                var meTableCell = $(this);
                if (meTableCell.index() > 0) {
                    $('<a href="#" class="mt-scrollable-left"></a>').prependTo(meTableCell);
                    $('<a href="#" class="mt-scrollable-right"></a>').appendTo(meTableCell);
                    if (meTableCell.index() === 1) {
                        meTableCell.addClass('active');
                    } else {
                        meTableCell.addClass('non-active');
                    }
                }
            });
            meTableRow.find('td').each(function () {
                const meTableCell = $(this);
                if (meTableCell.index() === 1) {
                    meTableCell.addClass('active').removeClass('non-active');
                } else if (meTableCell.index() > 1) {
                    meTableCell.addClass('non-active').removeClass('active');
                }
            });
        });
        meTable.find('.mt-scrollable-left').bind('click', function () {
            var newIndex = meTable.find('th.active').index() - 1;
            if (newIndex < 1) {
                newIndex = meTable.find('th').length - 1;
            }
            meTable.find('th, td').each(function () {
                var meTableCell = $(this);
                if (meTableCell.index() > 0) {
                    if (meTableCell.index() === newIndex) {
                        meTableCell.addClass('active').removeClass('non-active');
                    } else {
                        meTableCell.addClass('non-active').removeClass('active');
                    }
                }
            });
            return false;
        });
        meTable.find('.mt-scrollable-right').bind('click', function () {
            var newIndex = meTable.find('th.active').index() + 1;
            if (newIndex >= meTable.find('th').length) {
                newIndex = 1;
            }
            meTable.find('th, td').each(function () {
                var meTableCell = $(this);
                if (meTableCell.index() > 0) {
                    if (meTableCell.index() === newIndex) {
                        meTableCell.addClass('active').removeClass('non-active');
                    } else {
                        meTableCell.addClass('non-active').removeClass('active');
                    }
                }
            });
            return false;
        });
    });
    /*scrollable table -- end*/
};
/*
function handle_mousedown(e){
    window.my_dragging = {};
    my_dragging.pageX0 = e.pageX;
    my_dragging.elem = this;
    my_dragging.offset0 = $(this).offset();
    function handle_dragging(e){
        var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
        $(my_dragging.elem).offset({left: left}).addClass('now-timer');
    }
    function handle_mouseup(e){
        $('.now-timer').removeClass('now-timer')
        $('body')
            .off('mousemove', handle_dragging)
            .off('mouseup', handle_mouseup);
    }
    $('body')
        .on('mouseup', handle_mouseup)
        .on('mousemove', handle_dragging);
}
*/
