/**
 * Eyecare Theme — JavaScript
 * Handles: slideshow autoplay/navigation, keyboard support, smooth scrolling.
 */
(function () {
    'use strict';

    // =====================================================
    // HERO SLIDESHOW
    // =====================================================
    var slides     = document.querySelectorAll('.slide');
    var dots       = document.querySelectorAll('.dot');
    var slideIndex = 0;

    if ( slides.length > 0 ) {
        function showSlide( index ) {
            if ( index >= slides.length ) index = 0;
            if ( index < 0 )              index = slides.length - 1;

            slides.forEach( function ( s ) { s.classList.remove( 'active-slide' ); } );
            dots.forEach( function ( d ) {
                d.classList.remove( 'active-dot' );
                d.setAttribute( 'aria-selected', 'false' );
            } );

            slides[ index ].classList.add( 'active-slide' );
            if ( dots[ index ] ) {
                dots[ index ].classList.add( 'active-dot' );
                dots[ index ].setAttribute( 'aria-selected', 'true' );
            }

            slideIndex = index;
        }

        // Arrow buttons
        var prevBtn = document.getElementById( 'prevSlide' );
        var nextBtn = document.getElementById( 'nextSlide' );

        if ( prevBtn ) {
            prevBtn.addEventListener( 'click', function () { showSlide( slideIndex - 1 ); } );
        }
        if ( nextBtn ) {
            nextBtn.addEventListener( 'click', function () { showSlide( slideIndex + 1 ); } );
        }

        // Dot indicators
        dots.forEach( function ( dot, i ) {
            dot.addEventListener( 'click', function () { showSlide( i ); } );
        } );

        // Keyboard navigation for accessibility
        document.addEventListener( 'keydown', function ( e ) {
            var slideshow = document.querySelector( '.hero-slideshow' );
            if ( ! slideshow ) return;
            if ( e.key === 'ArrowLeft'  ) showSlide( slideIndex - 1 );
            if ( e.key === 'ArrowRight' ) showSlide( slideIndex + 1 );
        } );

        // Autoplay
        var autoplayInterval = setInterval( function () {
            showSlide( slideIndex + 1 );
        }, 5000 );

        // Pause on hover / focus
        var slideshowEl = document.querySelector( '.hero-slideshow' );
        if ( slideshowEl ) {
            slideshowEl.addEventListener( 'mouseenter', function () {
                clearInterval( autoplayInterval );
            } );
            slideshowEl.addEventListener( 'mouseleave', function () {
                autoplayInterval = setInterval( function () {
                    showSlide( slideIndex + 1 );
                }, 5000 );
            } );
        }
    }

    // =====================================================
    // SMOOTH SCROLL — floating nav anchors
    // =====================================================
    document.querySelectorAll( '.floating-nav a[href]' ).forEach( function ( link ) {
        link.addEventListener( 'click', function ( e ) {
            var href = link.getAttribute( 'href' );
            if ( ! href ) return;

            // Same-page anchor
            if ( href === '#' ) {
                e.preventDefault();
                window.scrollTo( { top: 0, behavior: 'smooth' } );
                return;
            }

            if ( href.charAt( 0 ) === '#' ) {
                var target = document.querySelector( href );
                if ( target ) {
                    e.preventDefault();
                    target.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                }
            }
        } );
    } );

}());
