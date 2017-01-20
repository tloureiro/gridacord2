/* global $ */

$(function () {
  var target = $('#gridacord-container');
  var newExpandedWidthPct;
  var newRemainingWidthPct;
  var newExpandedHeightPct;
  var newRemainingHeightPct;

  var maxRatio = 80;
  var transitionTime = 800;
  var itemsQtd = $('.item', target).length;
  var itemsQtdSquareRoot = Math.sqrt(itemsQtd);
  var itemsQtdSquareRootMinusOne = Math.sqrt(itemsQtd) - 1;
  var itemSizePct;
  var itemSizePixels;

  /**
   * TODO: implement this function
   * @returns {boolean}
   */
  function isGridValid() {
    return true;
  }

  function focusImages(transition) {
    $('.item', target).each(function (ignore, item) {
      var focusX = $(item).attr('data-focus-x') ? $(item).attr('data-focus-x') : 50;
      var focusY = $(item).attr('data-focus-y') ? $(item).attr('data-focus-y') : 50;
      var newImageFocusX;
      var newImageFocusY;

      newImageFocusX = ($('img', item).eq(0).width() * (focusX / 100)) - (itemSizePixels / 2);
      newImageFocusY = ($('img', item).eq(0).height() * (focusY / 100)) - (itemSizePixels / 2);

      $('img', item).animate({ top: '-' + newImageFocusY + 'px',
        left: '-' + newImageFocusX + 'px' }, { duration: transition ? transitionTime : 0, queue: false });
    });
  }

  function unfocusImages() {
    $('.item', target).each(function (index, item) {
      $('img', item).animate({ top: '0px', left: '0px' }, { duration: transitionTime, queue: false });
    });
  }

  function initGrid() {

    var maxImageWidthHeight;

    itemSizePct = (100 / itemsQtdSquareRoot) + '%';
    itemSizePixels = $('.item', target).eq(0).width();

    maxImageWidthHeight = (itemSizePixels * itemsQtdSquareRoot) * (maxRatio / 100);

    $('.line', target).css('height', itemSizePct);
    $('.item', target).css('width', itemSizePct);
    $('.item img', target).each(function (ignore, value) {
      if ($(value).get(0).naturalWidth > maxImageWidthHeight &&
            $(value).get(0).naturalWidth >= $(value).get(0).naturalHeight) {
        $(value).css('width', maxImageWidthHeight);
      }

      if ($(value).get(0).naturalHeight > maxImageWidthHeight &&
            $(value).get(0).naturalHeight > $(value).get(0).naturalWidth) {
        $(value).css('height', maxImageWidthHeight);
      }
    });

    focusImages(false);
  }

  function resizeItemsFocus(selectedItemX, selectedItemY) {
    var imgWidth = $('.item img', $('.line', target).eq(selectedItemY)).eq(selectedItemX).width();
    var imgHeight = $('.item img', $('.line', target).eq(selectedItemY)).eq(selectedItemX).height();
    var x;
    var y;

    if (imgWidth > imgHeight) {
      newExpandedWidthPct = maxRatio;
      newRemainingWidthPct = (100 - maxRatio) / itemsQtdSquareRootMinusOne;

      newExpandedHeightPct = maxRatio * (imgHeight / imgWidth);
      newRemainingHeightPct = (100 - newExpandedHeightPct) / itemsQtdSquareRootMinusOne;

      $('.item', $('.line', target).eq(selectedItemY)).eq(selectedItemX).animate(
        { width: '100%', height: '100%' }, { duration: transitionTime, queue: false }
      );
    } else {
      newExpandedHeightPct = maxRatio;

      newRemainingHeightPct = (100 - maxRatio) / itemsQtdSquareRootMinusOne;
      newExpandedWidthPct = maxRatio * (imgWidth / imgHeight);
      newRemainingWidthPct = (100 - newExpandedWidthPct) / itemsQtdSquareRootMinusOne;

      $('.item', $('.line', target).eq(selectedItemY)).eq(selectedItemX).animate(
        { height: '100%', width: '100%' }, { duration: transitionTime, queue: false }
      );
    }

    focusImages(true);

    for (y = 0; y < itemsQtdSquareRoot; y += 1) {
      for (x = 0; x < itemsQtdSquareRoot; x += 1) {
        if (y === selectedItemY && x === selectedItemX) {
          $('.item', $('.line', target).eq(y)).eq(x).animate({ width: newExpandedWidthPct + '%' }, {
            duration: transitionTime,
            queue: false
          });
        } else if (y === selectedItemY && x !== selectedItemX) {
          $('.item', $('.line', target).eq(y)).eq(x).animate({ width: newRemainingWidthPct + '%' }, {
            duration: transitionTime,
            queue: false
          });
        } else if (y !== selectedItemY && x === selectedItemX) {
          $('.item', $('.line', target).eq(y)).eq(x).animate({ width: newExpandedWidthPct + '%' }, {
            duration: transitionTime,
            queue: false
          });
        } else {
          $('.item', $('.line', target).eq(y)).eq(x).animate({ width: newRemainingWidthPct + '%' }, {
            duration: transitionTime,
            queue: false
          });
        }
      }

      if (y === selectedItemY) {
        $('.line', target).eq(y).animate({ height: newExpandedHeightPct + '%' }, {
          duration: transitionTime,
          queue: false
        });
      } else {
        $('.line', target).eq(y).animate({ height: newRemainingHeightPct + '%' }, {
          duration: transitionTime,
          queue: false
        });
      }
    }
  }

  if (isGridValid()) {
    initGrid(itemsQtdSquareRoot);
  }

  $('.item', target).hover(function () {
    var index = $('.item', target).index(this);

    var y = parseInt(index / itemsQtdSquareRoot, 10);
    var x = parseInt(index % itemsQtdSquareRoot, 10);

    resizeItemsFocus(x, y);
    unfocusImages();
  }, function () {
    focusImages(true);

    //TODO move this to a function
    $('.item', target).animate({ width: itemSizePct }, { duration: transitionTime, queue: false });
    $('.line', target).animate({ height: itemSizePct }, { duration: transitionTime, queue: false });
  });

});

