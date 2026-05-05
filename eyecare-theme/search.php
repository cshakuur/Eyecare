<?php
/**
 * Search results template.
 *
 * @package Eyecare
 */

get_header();
?>

<div class="container inner-page">
    <div class="inner-content">

        <main id="main">
            <div class="section-title">
                <i class="fas fa-search title-icon" aria-hidden="true"></i>
                <?php
                printf(
                    /* translators: %s: search query */
                    esc_html__( 'Search Results for: %s', 'eyecare' ),
                    '<span>' . get_search_query() . '</span>'
                );
                ?>
            </div>

            <?php get_search_form(); ?>

            <div class="news-grid-dynamic" style="margin-top:2rem;">
                <?php
                if ( have_posts() ) :
                    while ( have_posts() ) :
                        the_post();
                        $categories = get_the_category();
                        $post_type  = get_post_type();
                        $cat_name   = $categories
                            ? $categories[0]->name
                            : get_post_type_object( $post_type )->labels->singular_name;
                        $thumb_url  = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'eyecare-news' ) : '';
                ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class( 'news-super' ); ?>>
                    <a href="<?php the_permalink(); ?>">
                        <div class="news-img-super"<?php if ( $thumb_url ) echo ' style="background-image:url(' . esc_url( $thumb_url ) . ')"'; ?>>
                            <span class="news-category"><?php echo esc_html( $cat_name ); ?></span>
                        </div>
                        <div class="news-content-super">
                            <h2><?php the_title(); ?></h2>
                            <p><?php the_excerpt(); ?></p>
                        </div>
                    </a>
                </article>
                <?php
                    endwhile;
                else :
                ?>
                <p class="no-posts">
                    <?php
                    printf(
                        /* translators: %s: search query */
                        esc_html__( 'No results for "%s". Try different keywords.', 'eyecare' ),
                        get_search_query()
                    );
                    ?>
                </p>
                <?php endif; ?>
            </div>

            <div class="pagination">
                <?php
                the_posts_pagination( [
                    'mid_size'  => 2,
                    'prev_text' => '<i class="fas fa-chevron-left"></i> ' . esc_html__( 'Prev', 'eyecare' ),
                    'next_text' => esc_html__( 'Next', 'eyecare' ) . ' <i class="fas fa-chevron-right"></i>',
                ] );
                ?>
            </div>
        </main>

        <aside class="sidebar">
            <?php get_sidebar(); ?>
        </aside>

    </div>
</div>

<?php get_footer(); ?>
