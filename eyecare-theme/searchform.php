<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label for="eyecare-search" class="screen-reader-text"><?php esc_html_e( 'Search for:', 'eyecare' ); ?></label>
    <div class="search-form-inner">
        <input type="search"
               id="eyecare-search"
               class="search-field"
               placeholder="<?php esc_attr_e( 'Search&hellip;', 'eyecare' ); ?>"
               value="<?php echo get_search_query(); ?>"
               name="s">
        <button type="submit" class="btn-king">
            <i class="fas fa-search" aria-hidden="true"></i>
            <?php esc_html_e( 'Search', 'eyecare' ); ?>
        </button>
    </div>
</form>
