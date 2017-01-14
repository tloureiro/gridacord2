$(function() {


    var target = $('#gridacord-container');
    var newExpandedWidthPct, newRemainingWidthPct;
    var newExpandedHeightPct, newRemainingHeightPct;

    var maxRatio = 80;
    var transitionTime = 800;
    var itemsQtd = $('.item', target).length;
    var itemsQtdSquareRoot = Math.sqrt(itemsQtd);
    var itemsQtdSquareRootMinusOne = Math.sqrt(itemsQtd) - 1;
    var itemSize;

    initGrid( target, itemsQtdSquareRoot );

    $('.item', target).hover( function() {

        var index = $('.item', target).index(this);

        var y = Math.floor(index / itemsQtdSquareRoot);
        var x = Math.floor(index % itemsQtdSquareRoot);

        resizeItems(x, y);

    }, function() {

        // $('img',this).css('max-width', 'none').css('max-height', 'none');
        $('img',this).animate({'width': $('img',this).get(0).naturalWidth, 'height': $('img',this).get(0).naturalHeight}, {'duration': transitionTime, 'queue': false});
        $('.item', target).animate({'width': itemSize}, {'duration': transitionTime, 'queue': false});
        $('.line', target).animate({'height': itemSize}, {'duration': transitionTime, 'queue': false});
    });

    function initGrid( target, itemsQtdSquareRoot ) {

        itemSize = (100 / itemsQtdSquareRoot) + '%';

        $('.line', target).css('height', itemSize);
        $('.item', target).css('width', itemSize);
        $('.item img', target).each( function(key, value){
            $(value).css('width', $(this).get(0).naturalWidth).css('height', $(this).get(0).naturalHeight);
        });

    }

    function resizeItems( selectedItemX, selectedItemY ) {

        var imgWidth = $('.item img' , $('.line', target).eq(selectedItemY)).eq(selectedItemX).width();
        var imgHeight = $('.item img' , $('.line', target).eq(selectedItemY)).eq(selectedItemX).height();

        if (imgWidth > imgHeight) {

            newExpandedWidthPct = maxRatio;
            newRemainingWidthPct = (100-maxRatio)/itemsQtdSquareRootMinusOne;

            newExpandedHeightPct = maxRatio * (imgHeight / imgWidth);
            newRemainingHeightPct = (100 - newExpandedHeightPct)/itemsQtdSquareRootMinusOne;

            $('.item img' , $('.line', target).eq(selectedItemY)).eq(selectedItemX).animate(
                {'width': '100%', 'height': '100%'}, {'duration': transitionTime, 'queue': false}
            );

        } else {
            newExpandedHeightPct = maxRatio;

            newRemainingHeightPct = (100-maxRatio)/itemsQtdSquareRootMinusOne;
            newExpandedWidthPct = maxRatio * (imgWidth / imgHeight);
            newRemainingWidthPct = (100 - newExpandedWidthPct)/itemsQtdSquareRootMinusOne;

            $('.item img' , $('.line', target).eq(selectedItemY)).eq(selectedItemX).animate(
                {'height': '100%', 'width' : '100%'}, {'duration': transitionTime, 'queue': false}
            );
        }

        for ( var y = 0; y < itemsQtdSquareRoot; y++ ) {

            for ( var x = 0; x < itemsQtdSquareRoot; x++ ) {


                if ( y === selectedItemY && x === selectedItemX ) {

                    $('.item' , $('.line', target).eq(y)).eq(x).animate({'width': newExpandedWidthPct + '%'}, {'duration': transitionTime, 'queue': false});

                } else if ( y === selectedItemY && x !== selectedItemX ) {

                    $('.item' , $('.line', target).eq(y)).eq(x).animate({'width': newRemainingWidthPct + '%'}, {'duration': transitionTime, 'queue': false});

                } else if ( y !== selectedItemY && x === selectedItemX ) {

                    $('.item' , $('.line', target).eq(y)).eq(x).animate({'width': newExpandedWidthPct + '%'}, {'duration': transitionTime, 'queue': false});

                } else {

                    $('.item' , $('.line', target).eq(y)).eq(x).animate({'width': newRemainingWidthPct + '%'}, {'duration': transitionTime, 'queue': false});
                }

            }

            if ( y === selectedItemY ) {
                $('.line', target).eq(y).animate({'height': newExpandedHeightPct + '%'}, {'duration': transitionTime, 'queue': false});
            } else {

                $('.line', target).eq(y).animate({'height': newRemainingHeightPct + '%'}, {'duration': transitionTime, 'queue': false});
            }

        }

    }



});

