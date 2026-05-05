<?php
/**
 * Single post template.
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
            <article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post-article' ); ?>>

                <header class="entry-header">
                    <div class="section-title">
                        <?php the_title( '<h1>', '</h1>' ); ?>
                    </div>
                    <div class="entry-meta">
                        <span><i class="fas fa-calendar-alt" aria-hidden="true"></i> <?php echo get_the_date(); ?></span>
                        <span><i class="fas fa-user" aria-hidden="true"></i> <?php the_author_posts_link(); ?></span>
                        <?php
                        $categories = get_the_category();
                        if ( $categories ) :
                        ?>
                        <span>
                            <i class="fas fa-folder" aria-hidden="true"></i>
                            <?php echo esc_html( $categories[0]->name ); ?>
                        </span>
                        <?php endif; ?>
                        <?php if ( comments_open() ) : ?>
                        <span>
                            <i class="fas fa-comment" aria-hidden="true"></i>
                            <?php comments_number( __( 'No comments', 'eyecare' ), __( '1 comment', 'eyecare' ), __( '% comments', 'eyecare' ) ); ?>
                        </span>
                        <?php endif; ?>
                    </div>

                    <?php if ( has_post_thumbnail() ) : ?>
                    <div class="single-featured-img">
                        <?php the_post_thumbnail( 'large' ); ?>
                    </div>
                    <?php endif; ?>
                </header>

                <div class="entry-content">
                    <?php
                    the_content();
                    wp_link_pages( [
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'eyecare' ),
                        'after'  => '</div>',
                    ] );
                    ?>
                </div>

                <footer class="entry-footer">
                    <?php the_tags( '<div class="post-tags"><i class="fas fa-tags" aria-hidden="true"></i> ', ', ', '</div>' ); ?>
                </footer>

            </article>

            <div class="post-navigation">
                <?php
                the_post_navigation( [
                    'prev_text' => '<span class="nav-subtitle">' . esc_html__( 'Previous', 'eyecare' ) . '</span><span class="nav-title">%title</span>',
                    'next_text' => '<span class="nav-subtitle">' . esc_html__( 'Next', 'eyecare' ) . '</span><span class="nav-title">%title</span>',
                ] );
                ?>
            </div>

            <?php
            if ( comments_open() || get_comments_number() ) {
                comments_template();
            }

            endwhile;
            ?>
        </main>

        <aside class="sidebar">
            <?php get_sidebar(); ?>
        </aside>

    </div>
</div>

<?php get_footer(); ?>
