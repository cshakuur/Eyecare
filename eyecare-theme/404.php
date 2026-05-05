<?php
/**
 * 404 Not Found template.
 *
 * @package Eyecare
 */

get_header();
?>

<div class="container">
    <main id="main" class="error-404 not-found">
        <i class="fas fa-crown error-icon" aria-hidden="true"></i>
        <h1>404</h1>
        <p><?php esc_html_e( "The page you're looking for could not be found.", 'eyecare' ); ?></p>

        <?php get_search_form(); ?>

        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-king" style="margin-top:1rem;">
            <i class="fas fa-home" aria-hidden="true"></i>
            <?php esc_html_e( 'Return Home', 'eyecare' ); ?>
        </a>
    </main>
</div>

<?php get_footer(); ?>
