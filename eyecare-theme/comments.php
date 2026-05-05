<?php
/**
 * Comments template.
 *
 * @package Eyecare
 */

if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="comments-area">

    <?php if ( have_comments() ) : ?>
    <h2 class="comments-title">
        <?php
        $comments_count = get_comments_number();
        if ( '1' === $comments_count ) {
            printf(
                /* translators: %s: post title */
                esc_html__( 'One Comment on &ldquo;%s&rdquo;', 'eyecare' ),
                get_the_title()
            );
        } else {
            printf(
                /* translators: 1: number of comments, 2: post title */
                esc_html( _n( '%1$s Comment on &ldquo;%2$s&rdquo;', '%1$s Comments on &ldquo;%2$s&rdquo;', $comments_count, 'eyecare' ) ),
                number_format_i18n( $comments_count ),
                get_the_title()
            );
        }
        ?>
    </h2>

    <ol class="comment-list">
        <?php
        wp_list_comments( [
            'style'       => 'ol',
            'short_ping'  => true,
            'avatar_size' => 50,
        ] );
        ?>
    </ol>

    <?php
    the_comments_pagination( [
        'prev_text' => esc_html__( 'Older Comments', 'eyecare' ),
        'next_text' => esc_html__( 'Newer Comments', 'eyecare' ),
    ] );
    ?>

    <?php endif; ?>

    <?php if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) : ?>
    <p class="no-comments"><?php esc_html_e( 'Comments are closed.', 'eyecare' ); ?></p>
    <?php endif; ?>

    <?php
    comment_form( [
        'title_reply_before' => '<h2 id="reply-title" class="comment-reply-title">',
        'title_reply_after'  => '</h2>',
    ] );
    ?>

</div>
