<?php
/**
 * Single page template.
 *
 * @package Eyecare
 */

get_header();
?>

<div class="container inner-page">
    <div class="inner-content">

        <main id="main">
            <?php
            while ( have_posts() ) :
                the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class( 'page-article' ); ?>>

                <header class="entry-header">
                    <div class="section-title">
                        <?php the_title( '<h1>', '</h1>' ); ?>
                    </div>
                </header>

                <?php if ( has_post_thumbnail() ) : ?>
                <div class="page-featured-img">
                    <?php the_post_thumbnail( 'large' ); ?>
                </div>
                <?php endif; ?>

                <div class="entry-content">
                    <?php
                    the_content();
                    wp_link_pages( [
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'eyecare' ),
                        'after'  => '</div>',
                    ] );
                    ?>
                </div>

            </article>

            <?php
            if ( comments_open() || get_comments_number() ) {
                comments_template();
            }

            endwhile;
            ?>
        </main>

        <?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
        <aside class="sidebar">
            <?php get_sidebar(); ?>
        </aside>
        <?php endif; ?>

    </div>
</div>

<?php get_footer(); ?>
