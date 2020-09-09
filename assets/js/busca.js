'use strict';
// search & highlight
// creditos: https://osvaldas.info/examples/real-time-search-in-javascript/
// aprimoramento: victor hugo c godoi

;( function( $, window, document, undefined )
{
    var $container = $( 'article#sumario' );
    if( !$container.length ) return true;

    var $input          = $container.find( 'input[type=search]' ),
        $notfound       = $container.find( '.notfound' ),
        $items          = $container.find( 'li' ),
        $item           = $(),
        itemsIndexed    = [],
        timeouts        = [];

    $items.each( function()
    {
        itemsIndexed.push( $( this ).text().replace( /\s{2,}/g, ' ' ).toLowerCase() );
    });

    $input.on( 'keyup', function( e )
    {
        if( e.keyCode == 13 ) // enter
        {
            $input.trigger( 'blur' );
            return true;
        }

        for (var i in timeouts) {
            clearTimeout(timeouts[i]);
        }

        timeouts = [];

        $items.addClass('is-invisible');

        var searchVal = $.trim( $input.val() ).toLowerCase();
        if( searchVal.length )
        {
            for( var i in itemsIndexed )
            {
                $item = $items.eq( i );
                if( itemsIndexed[ i ].indexOf( searchVal ) != -1 )
                    $item.removeClass( 'is-hidden' );
                else
                    $item.addClass( 'is-hidden' );
            }
        }
        else $items.removeClass( 'is-hidden' );

        var $visibleItems = $items.not('is-hidden'),
            tempoBase     = 300,
            incremento    = 40;

        $visibleItems.each(function(index, el) {
            timeouts.push(setTimeout(function() {
                $(el).removeClass('is-invisible');
            }, tempoBase + incremento * index));
        });


        $notfound.toggleClass( 'is-visible', $items.not( '.is-hidden' ).length == 0 );
    });
})( jQuery, window, document );