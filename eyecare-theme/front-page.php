<?php
/**
 * Front page template — shows all homepage sections.
 *
 * @package Eyecare
 */

get_header();
?>

<main id="main" class="container">

    <!-- ========== FEATURED PERSON SECTION ========== -->
    <section id="king" class="front-section">
        <div class="section-title">
            <i class="fas fa-star title-icon" aria-hidden="true"></i>
            <?php esc_html_e( 'His Royal Majesty', 'eyecare' ); ?>
        </div>

        <div class="king-panel">
            <div class="king-left">
                <?php $king_img = get_theme_mod( 'king_image', '' ); ?>
                <?php if ( $king_img ) : ?>
                    <img src="<?php echo esc_url( $king_img ); ?>" alt="<?php echo esc_attr( get_theme_mod( 'king_name', 'King Dhuuh Baraar' ) ); ?>">
                <?php else : ?>
                    <i class="fas fa-user-turban" aria-hidden="true"></i>
                <?php endif; ?>
            </div>
            <div class="king-right">
                <div class="king-name"><?php echo esc_html( get_theme_mod( 'king_name', 'King Dhuuh Baraar' ) ); ?></div>
                <div class="king-badge">
                    <i class="fas fa-feather" aria-hidden="true"></i>
                    <?php echo esc_html( get_theme_mod( 'king_badge', "Tolje'lo dynasty" ) ); ?>
                </div>
                <p><?php echo esc_html( get_theme_mod( 'king_desc', '' ) ); ?></p>
                <?php
                $btn_url  = get_theme_mod( 'king_btn_url', '#' );
                $btn_text = get_theme_mod( 'king_btn_text', __( 'Learn More', 'eyecare' ) );
                ?>
                <a href="<?php echo esc_url( $btn_url ); ?>" class="btn-king">
                    <i class="fas fa-play" aria-hidden="true"></i>
                    <?php echo esc_html( $btn_text ); ?>
                </a>
            </div>
        </div>
    </section>

    <!-- ========== HISTORY SECTION ========== -->
    <section id="history" class="front-section">
        <div class="section-title">
            <i class="fas fa-landmark title-icon" aria-hidden="true"></i>
            <?php esc_html_e( "The Kingdom's Legacy", 'eyecare' ); ?>
        </div>

        <div class="history-mosaic">
            <?php for ( $i = 1; $i <= 3; $i++ ) : ?>
            <div class="history-card">
                <?php $hist_img = get_theme_mod( "history_{$i}_image", '' ); ?>
                <?php if ( $hist_img ) : ?>
                    <div class="history-card-img-wrap">
                        <img src="<?php echo esc_url( $hist_img ); ?>" alt="<?php echo esc_attr( get_theme_mod( "history_{$i}_title", '' ) ); ?>" class="history-card-img">
                    </div>
                <?php else : ?>
                    <i class="fas fa-landmark history-icon" aria-hidden="true"></i>
                <?php endif; ?>
                <h3><?php echo esc_html( get_theme_mod( "history_{$i}_title", '' ) ); ?></h3>
                <p><?php echo esc_html( get_theme_mod( "history_{$i}_desc", '' ) ); ?></p>
            </div>
            <?php endfor; ?>
        </div>

        <?php $fact = get_theme_mod( 'history_fact', '' ); if ( $fact ) : ?>
        <div class="history-fact-banner"><?php echo esc_html( $fact ); ?></div>
        <?php endif; ?>
    </section>

    <!-- ========== NEWS SECTION ========== -->
    <section id="news" class="front-section">
        <div class="section-title">
            <i class="fas fa-newspaper title-icon" aria-hidden="true"></i>
            <?php esc_html_e( 'Latest Updates', 'eyecare' ); ?>
        </div>

        <div class="news-grid-dynamic">
            <?php
            $news_count = absint( get_theme_mod( 'news_count', 3 ) );
            $news_cat   = absint( get_theme_mod( 'news_category', 0 ) );
            $news_args  = [
                'post_type'      => 'post',
                'posts_per_page' => $news_count,
                'post_status'    => 'publish',
                'ignore_sticky_posts' => true,
            ];
            if ( $news_cat ) {
                $news_args['cat'] = $news_cat;
            }
            $news_query = new WP_Query( $news_args );

            if ( $news_query->have_posts() ) :
                while ( $news_query->have_posts() ) :
                    $news_query->the_post();
                    $categories = get_the_category();
                    $cat_name   = $categories ? $categories[0]->name : __( 'General', 'eyecare' );
                    $thumb_url  = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'eyecare-news' ) : '';
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class( 'news-super' ); ?>>
                <a href="<?php the_permalink(); ?>">
                    <div class="news-img-super"<?php if ( $thumb_url ) echo ' style="background-image:url(' . esc_url( $thumb_url ) . ')"'; ?>>
                        <span class="news-category"><?php echo esc_html( $cat_name ); ?></span>
                    </div>
                    <div class="news-content-super">
                        <h3><?php the_title(); ?></h3>
                        <p><?php the_excerpt(); ?></p>
                    </div>
                </a>
            </article>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
            ?>
            <p class="no-posts"><?php esc_html_e( 'No posts found. Publish some posts to see them here.', 'eyecare' ); ?></p>
            <?php endif; ?>
        </div>

        <?php
        $blog_page_id = get_option( 'page_for_posts' );
        $blog_url     = $blog_page_id ? get_permalink( $blog_page_id ) : home_url( '/' );
        ?>
        <div style="text-align:center; margin-top:2rem;">
            <a href="<?php echo esc_url( $blog_url ); ?>" class="btn-king">
                <?php esc_html_e( 'View All News', 'eyecare' ); ?>
                <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
        </div>
    </section>

    <!-- ========== EVENTS SECTION ========== -->
    <section id="events" class="front-section">
        <div class="section-title">
            <i class="fas fa-calendar-alt title-icon" aria-hidden="true"></i>
            <?php esc_html_e( 'Recent Events', 'eyecare' ); ?>
        </div>

        <div class="event-timeline">
            <?php
            $events_query = new WP_Query( [
                'post_type'      => 'eyecare_event',
                'posts_per_page' => 5,
                'post_status'    => 'publish',
                'orderby'        => 'meta_value_num',
                'meta_key'       => '_eyecare_event_year',
                'order'          => 'DESC',
            ] );

            if ( $events_query->have_posts() ) :
                while ( $events_query->have_posts() ) :
                    $events_query->the_post();
                    $year = get_post_meta( get_the_ID(), '_eyecare_event_year', true );
                    $year = $year ? $year : gmdate( 'Y' );
            ?>
            <div class="event-item-distinct">
                <span class="event-year"><?php echo esc_html( $year ); ?></span>
                <div>
                    <h3><?php the_title(); ?></h3>
                    <p><?php the_excerpt(); ?></p>
                </div>
            </div>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
            ?>
            <div class="event-item-distinct">
                <span class="event-year"><?php echo esc_html( gmdate( 'Y' ) ); ?></span>
                <div>
                    <h3><?php esc_html_e( 'Add Your First Event', 'eyecare' ); ?></h3>
                    <p><?php esc_html_e( 'Go to Events in the WordPress admin panel to add events.', 'eyecare' ); ?></p>
                </div>
            </div>
            <?php endif; ?>
        </div>
    </section>

    <!-- ========== HERITAGE SECTION ========== -->
    <section id="heritage" class="front-section">
        <div class="section-title">
            <i class="fas fa-images title-icon" aria-hidden="true"></i>
            <?php esc_html_e( 'Royal Imagery & Documents', 'eyecare' ); ?>
        </div>

        <div class="heritage-showcase">
            <?php for ( $i = 1; $i <= 3; $i++ ) : ?>
            <div class="heritage-piece">
                <?php $her_img = get_theme_mod( "heritage_{$i}_image", '' ); ?>
                <?php if ( $her_img ) : ?>
                    <div class="heritage-piece-img-wrap">
                        <img src="<?php echo esc_url( $her_img ); ?>" alt="<?php echo esc_attr( get_theme_mod( "heritage_{$i}_title", '' ) ); ?>" class="heritage-piece-img">
                    </div>
                <?php else : ?>
                    <i class="fas fa-landmark" aria-hidden="true"></i>
                <?php endif; ?>
                <h3><?php echo esc_html( get_theme_mod( "heritage_{$i}_title", '' ) ); ?></h3>
                <p><?php echo esc_html( get_theme_mod( "heritage_{$i}_desc", '' ) ); ?></p>
            </div>
            <?php endfor; ?>
        </div>

        <?php $lineage = get_theme_mod( 'lineage_banner', '' ); if ( $lineage ) : ?>
        <div class="lineage-banner-modern">
            <i class="fas fa-crown" aria-hidden="true"></i>
            <?php echo esc_html( $lineage ); ?>
        </div>
        <?php endif; ?>
    </section>

</main>

<?php get_footer(); ?>
