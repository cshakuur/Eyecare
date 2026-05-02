<footer class="footer-attractive">
    <div class="footer-flex-attractive">
        <div class="footer-brand">
            <?php echo esc_html( get_theme_mod( 'footer_site_name', get_bloginfo( 'name' ) ) ); ?>
            <i class="fas fa-crown" aria-hidden="true"></i>
        </div>

        <div class="social-icons">
            <?php
            $twitter   = get_theme_mod( 'social_twitter',   '' );
            $instagram = get_theme_mod( 'social_instagram', '' );
            $youtube   = get_theme_mod( 'social_youtube',   '' );
            $email     = get_theme_mod( 'social_email',     '' );

            if ( $twitter ) : ?>
                <a href="<?php echo esc_url( $twitter ); ?>" aria-label="<?php esc_attr_e( 'Twitter', 'eyecare' ); ?>" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-twitter" aria-hidden="true"></i>
                </a>
            <?php endif;
            if ( $instagram ) : ?>
                <a href="<?php echo esc_url( $instagram ); ?>" aria-label="<?php esc_attr_e( 'Instagram', 'eyecare' ); ?>" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-instagram" aria-hidden="true"></i>
                </a>
            <?php endif;
            if ( $youtube ) : ?>
                <a href="<?php echo esc_url( $youtube ); ?>" aria-label="<?php esc_attr_e( 'YouTube', 'eyecare' ); ?>" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-youtube" aria-hidden="true"></i>
                </a>
            <?php endif;
            if ( $email ) : ?>
                <a href="mailto:<?php echo esc_attr( $email ); ?>" aria-label="<?php esc_attr_e( 'Email', 'eyecare' ); ?>">
                    <i class="fas fa-envelope" aria-hidden="true"></i>
                </a>
            <?php endif; ?>
        </div>

        <div class="footer-copy">
            <?php echo esc_html( get_theme_mod( 'footer_copyright', '&copy; ' . gmdate( 'Y' ) ) ); ?>
        </div>
    </div>

    <?php $tagline = get_theme_mod( 'footer_tagline', '' ); if ( $tagline ) : ?>
    <p class="footer-tagline"><?php echo esc_html( $tagline ); ?></p>
    <?php endif; ?>

    <?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
    <div class="container footer-widgets">
        <?php dynamic_sidebar( 'footer-1' ); ?>
    </div>
    <?php endif; ?>
</footer>

<?php wp_footer(); ?>
</body>
</html>
