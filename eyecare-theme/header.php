<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<?php if ( is_front_page() && ! is_paged() ) : ?>

<!-- ========== HERO SLIDESHOW (front page only) ========== -->
<section class="hero-slideshow" aria-label="<?php esc_attr_e( 'Hero slideshow', 'eyecare' ); ?>">
    <div class="slides-container">

        <?php for ( $i = 1; $i <= 3; $i++ ) :
            $img    = get_theme_mod( "slide_{$i}_image", '' );
            $title  = get_theme_mod( "slide_{$i}_title", '' );
            $tagline = get_theme_mod( "slide_{$i}_tagline", '' );
            $desc   = get_theme_mod( "slide_{$i}_desc", '' );
            $icon   = get_theme_mod( "slide_{$i}_icon", 'fas fa-crown' );
            $active = ( 1 === $i ) ? ' active-slide' : '';
            $style  = $img ? ' style="background-image:url(' . esc_url( $img ) . ')"' : '';
        ?>
        <div class="slide slide<?php echo esc_attr( $i . $active ); ?>"<?php echo $style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
            <div class="slide-content">
                <h2><i class="<?php echo esc_attr( $icon ); ?>"></i> <?php echo esc_html( $title ); ?></h2>
                <div class="slide-tagline"><?php echo esc_html( $tagline ); ?></div>
                <div class="slide-desc"><?php echo esc_html( $desc ); ?></div>
            </div>
        </div>
        <?php endfor; ?>

        <button class="slide-arrow prev" id="prevSlide" aria-label="<?php esc_attr_e( 'Previous slide', 'eyecare' ); ?>">
            <i class="fas fa-chevron-left" aria-hidden="true"></i>
        </button>
        <button class="slide-arrow next" id="nextSlide" aria-label="<?php esc_attr_e( 'Next slide', 'eyecare' ); ?>">
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
        </button>

        <div class="slide-indicators" role="tablist" aria-label="<?php esc_attr_e( 'Slide indicators', 'eyecare' ); ?>">
            <?php for ( $i = 0; $i < 3; $i++ ) : ?>
            <button class="dot<?php echo 0 === $i ? ' active-dot' : ''; ?>"
                    data-index="<?php echo esc_attr( $i ); ?>"
                    role="tab"
                    aria-selected="<?php echo 0 === $i ? 'true' : 'false'; ?>"
                    aria-label="<?php echo esc_attr( sprintf( __( 'Go to slide %d', 'eyecare' ), $i + 1 ) ); ?>">
            </button>
            <?php endfor; ?>
        </div>
    </div>
</section>

<!-- Floating Navigation -->
<nav class="floating-nav" aria-label="<?php esc_attr_e( 'Primary navigation', 'eyecare' ); ?>">
    <?php
    wp_nav_menu( [
        'theme_location' => 'primary',
        'container'      => false,
        'items_wrap'     => '<ul>%3$s</ul>',
        'fallback_cb'    => 'eyecare_default_nav',
    ] );
    ?>
</nav>

<?php else : ?>

<!-- Inner-page sticky header -->
<header class="site-header">
    <div class="container">
        <div class="site-branding">
            <?php if ( has_custom_logo() ) :
                the_custom_logo();
            else : ?>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-title-link" rel="home">
                    <?php bloginfo( 'name' ); ?>
                </a>
            <?php endif; ?>
        </div>

        <nav class="site-nav" aria-label="<?php esc_attr_e( 'Primary navigation', 'eyecare' ); ?>">
            <?php
            wp_nav_menu( [
                'theme_location' => 'primary',
                'container'      => false,
                'items_wrap'     => '<ul>%3$s</ul>',
                'fallback_cb'    => false,
            ] );
            ?>
        </nav>
    </div>
</header>

<?php endif; ?>
