/* global $ */

$(function () {
  var target = $('#gridacord-container');
  var newExpandedWidthPct;
  var newRemainingWidthPct;
  var newExpandedHeightPct
  var newRemainingHeightPct;

  var maxRatio = 80;
  var transitionTime = 800;
  var itemsQtd = $('.item', target).length;
  var itemsQtdSquareRoot = Math.sqrt(itemsQtd);
  var itemsQtdSquareRootMinusOne = Math.sqrt(itemsQtd) - 1;
  var itemSize;


  /**
   * TOBEIMPLEMENTED: implement this function
   * @returns {boolean}
   */
  function isGridValid() {
    return true;
  }

  function focusImages(transition) {

    $('.item', target).each(function (ignore, item) {

      var focusX = $(item).attr("data-focus-x");
      var focusY = $(item).attr("data-focus-y");

      $(item).animate({}, {'duration': transition ? transitionTime : 0, 'queue': false});
    });
  }

  function initGrid(itemsQtdSquareRoot) {
    itemSize = (100 / itemsQtdSquareRoot) + '%';

    $('.line', target).css('height', itemSize);
    $('.item', target).css('width', itemSize);
    $('.item img', target).each(function (ignore, value) {
      $(value).css('width', $(this).get(0).naturalWidth).css('height', $(this).get(0).naturalHeight);
    });

    focusImages(false);
  }

  function resizeItems(selectedItemX, selectedItemY) {


    var imgWidth = $('.item img', $('.line', target).eq(selectedItemY)).eq(selectedItemX).width();
    var imgHeight = $('.item img', $('.line', target).eq(selectedItemY)).eq(selectedItemX).height();
    var x, y;

    if (imgWidth > imgHeight) {

      newExpandedWidthPct = maxRatio;
      newRemainingWidthPct = (100 - maxRatio) / itemsQtdSquareRootMinusOne;

      newExpandedHeightPct = maxRatio * (imgHeight / imgWidth);
      newRemainingHeightPct = (100 - newExpandedHeightPct) / itemsQtdSquareRootMinusOne;

      $('.item', $('.line', target).eq(selectedItemY)).eq(selectedItemX).animate(
        {'width': '100%', 'height': '100%'}, {'duration': transitionTime, 'queue': false}
      );

    } else {
      newExpandedHeightPct = maxRatio;

      newRemainingHeightPct = (100 - maxRatio) / itemsQtdSquareRootMinusOne;
      newExpandedWidthPct = maxRatio * (imgWidth / imgHeight);
      newRemainingWidthPct = (100 - newExpandedWidthPct) / itemsQtdSquareRootMinusOne;

      $('.item', $('.line', target).eq(selectedItemY)).eq(selectedItemX).animate(
        {'height': '100%', 'width': '100%'}, {'duration': transitionTime, 'queue': false}
      );
    }

    for (y = 0; y < itemsQtdSquareRoot; y+=1) {

      for (x = 0; x < itemsQtdSquareRoot; x+=1) {


        if (y === selectedItemY && x === selectedItemX) {

          $('.item', $('.line', target).eq(y)).eq(x).animate({'width': newExpandedWidthPct + '%'}, {
            'duration': transitionTime,
            'queue': false
          });

        } else if (y === selectedItemY && x !== selectedItemX) {

          $('.item', $('.line', target).eq(y)).eq(x).animate({'width': newRemainingWidthPct + '%'}, {
            'duration': transitionTime,
            'queue': false
          });

        } else if (y !== selectedItemY && x === selectedItemX) {

          $('.item', $('.line', target).eq(y)).eq(x).animate({'width': newExpandedWidthPct + '%'}, {
            'duration': transitionTime,
            'queue': false
          });

        } else {

          $('.item', $('.line', target).eq(y)).eq(x).animate({'width': newRemainingWidthPct + '%'}, {
            'duration': transitionTime,
            'queue': false
          });
        }

      }

      if (y === selectedItemY) {
        $('.line', target).eq(y).animate({'height': newExpandedHeightPct + '%'}, {
          'duration': transitionTime,
          'queue': false
        });
      } else {

        $('.line', target).eq(y).animate({'height': newRemainingHeightPct + '%'}, {
          'duration': transitionTime,
          'queue': false
        });
      }
    }
  }

  if ( isGridValid() ) {
    initGrid(itemsQtdSquareRoot);

  }


  $('.item', target).hover(function () {

    var index = $('.item', target).index(this);

    var y = Math.floor(index / itemsQtdSquareRoot);
    var x = Math.floor(index % itemsQtdSquareRoot);

    resizeItems(x, y);

  }, function () {

    // $('img',this).css('max-width', 'none').css('max-height', 'none');
    $('img', this).animate({
      'width': $('img', this).get(0).naturalWidth,
      'height': $('img', this).get(0).naturalHeight
    }, {'duration': transitionTime, 'queue': false});
    $('.item', target).animate({'width': itemSize}, {'duration': transitionTime, 'queue': false});
    $('.line', target).animate({'height': itemSize}, {'duration': transitionTime, 'queue': false});
  });

});

