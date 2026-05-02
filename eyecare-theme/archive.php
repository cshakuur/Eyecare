<?php
/**
 * Archive template.
 *
 * @package Eyecare
 */

get_header();
?>

<div class="container inner-page">
    <div class="inner-content">

        <main id="main">
            <header class="archive-header">
                <div class="section-title">
                    <?php
                    if ( is_category() ) {
                        echo '<i class="fas fa-folder title-icon" aria-hidden="true"></i>';
                        single_cat_title();
                    } elseif ( is_tag() ) {
                        echo '<i class="fas fa-tag title-icon" aria-hidden="true"></i>';
                        single_tag_title();
                    } elseif ( is_author() ) {
                        echo '<i class="fas fa-user title-icon" aria-hidden="true"></i>';
                        the_author();
                    } elseif ( is_date() ) {
                        echo '<i class="fas fa-calendar title-icon" aria-hidden="true"></i>';
                        echo get_the_date( 'F Y' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    } elseif ( is_post_type_archive() ) {
                        echo '<i class="fas fa-archive title-icon" aria-hidden="true"></i>';
                        post_type_archive_title();
                    } else {
                        echo '<i class="fas fa-archive title-icon" aria-hidden="true"></i>';
                        esc_html_e( 'Archives', 'eyecare' );
                    }
                    ?>
                </div>
                <?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
            </header>

            <div class="news-grid-dynamic">
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
                <p class="no-posts"><?php esc_html_e( 'No posts found.', 'eyecare' ); ?></p>
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
