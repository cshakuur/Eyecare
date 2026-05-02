<?php
/**
 * Eyecare Theme Functions
 *
 * @package Eyecare
 */

// =====================================================
// THEME SETUP
// =====================================================
function eyecare_setup() {
    load_theme_textdomain( 'eyecare', get_template_directory() . '/languages' );

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', [
        'height'      => 80,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ] );
    add_theme_support( 'html5', [
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script',
    ] );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'customize-selective-refresh-widgets' );

    register_nav_menus( [
        'primary' => __( 'Primary Menu', 'eyecare' ),
        'footer'  => __( 'Footer Menu', 'eyecare' ),
    ] );

    add_image_size( 'eyecare-news', 600, 400, true );
    add_image_size( 'eyecare-hero', 1920, 1080, true );
}
add_action( 'after_setup_theme', 'eyecare_setup' );

// =====================================================
// ENQUEUE SCRIPTS & STYLES
// =====================================================
function eyecare_scripts() {
    // Google Fonts
    wp_enqueue_style(
        'eyecare-google-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap',
        [],
        null
    );

    // Font Awesome
    wp_enqueue_style(
        'font-awesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
        [],
        '6.0.0-beta3'
    );

    // Main stylesheet
    wp_enqueue_style(
        'eyecare-style',
        get_stylesheet_uri(),
        [ 'font-awesome' ],
        wp_get_theme()->get( 'Version' )
    );

    // Theme JS
    wp_enqueue_script(
        'eyecare-theme',
        get_template_directory_uri() . '/js/theme.js',
        [],
        wp_get_theme()->get( 'Version' ),
        true
    );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'eyecare_scripts' );

// =====================================================
// WIDGET AREAS
// =====================================================
function eyecare_widgets_init() {
    register_sidebar( [
        'name'          => __( 'Primary Sidebar', 'eyecare' ),
        'id'            => 'sidebar-1',
        'description'   => __( 'Add widgets here.', 'eyecare' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ] );

    register_sidebar( [
        'name'          => __( 'Footer Widgets', 'eyecare' ),
        'id'            => 'footer-1',
        'description'   => __( 'Footer widget area.', 'eyecare' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ] );
}
add_action( 'widgets_init', 'eyecare_widgets_init' );

// =====================================================
// CUSTOM POST TYPE: EVENTS
// =====================================================
function eyecare_register_cpts() {
    register_post_type( 'eyecare_event', [
        'labels'             => [
            'name'          => __( 'Events', 'eyecare' ),
            'singular_name' => __( 'Event', 'eyecare' ),
            'add_new_item'  => __( 'Add New Event', 'eyecare' ),
            'edit_item'     => __( 'Edit Event', 'eyecare' ),
            'new_item'      => __( 'New Event', 'eyecare' ),
            'view_item'     => __( 'View Event', 'eyecare' ),
            'search_items'  => __( 'Search Events', 'eyecare' ),
            'not_found'     => __( 'No events found.', 'eyecare' ),
            'all_items'     => __( 'All Events', 'eyecare' ),
            'menu_name'     => __( 'Events', 'eyecare' ),
        ],
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'query_var'          => true,
        'rewrite'            => [ 'slug' => 'events' ],
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_icon'          => 'dashicons-calendar-alt',
        'supports'           => [ 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ],
    ] );
}
add_action( 'init', 'eyecare_register_cpts' );

// Meta box: Event Year
function eyecare_add_event_meta_boxes() {
    add_meta_box(
        'eyecare_event_year',
        __( 'Event Year', 'eyecare' ),
        'eyecare_event_year_cb',
        'eyecare_event',
        'side',
        'high'
    );
}
add_action( 'add_meta_boxes', 'eyecare_add_event_meta_boxes' );

function eyecare_event_year_cb( $post ) {
    wp_nonce_field( 'eyecare_event_year_nonce', 'eyecare_event_year_nonce' );
    $year = get_post_meta( $post->ID, '_eyecare_event_year', true );
    echo '<label for="eyecare_event_year">' . esc_html__( 'Year displayed on timeline', 'eyecare' ) . '</label><br><br>';
    echo '<input type="text" id="eyecare_event_year" name="eyecare_event_year" value="'
        . esc_attr( $year ? $year : gmdate( 'Y' ) )
        . '" style="width:100%">';
}

function eyecare_save_event_meta( $post_id ) {
    if ( ! isset( $_POST['eyecare_event_year_nonce'] )
        || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['eyecare_event_year_nonce'] ) ), 'eyecare_event_year_nonce' )
    ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }
    if ( isset( $_POST['eyecare_event_year'] ) ) {
        update_post_meta(
            $post_id,
            '_eyecare_event_year',
            sanitize_text_field( wp_unslash( $_POST['eyecare_event_year'] ) )
        );
    }
}
add_action( 'save_post_eyecare_event', 'eyecare_save_event_meta' );

// =====================================================
// EXCERPT LENGTH
// =====================================================
function eyecare_excerpt_length( $length ) {
    return 22;
}
add_filter( 'excerpt_length', 'eyecare_excerpt_length' );

function eyecare_excerpt_more( $more ) {
    return '&hellip;';
}
add_filter( 'excerpt_more', 'eyecare_excerpt_more' );

// =====================================================
// FALLBACK NAVIGATION (used when no menu is assigned)
// =====================================================
function eyecare_default_nav() {
    $links = [
        home_url( '/' )    => __( 'Home', 'eyecare' ),
        '#king'            => __( 'Featured', 'eyecare' ),
        '#history'         => __( 'History', 'eyecare' ),
        '#heritage'        => __( 'Heritage', 'eyecare' ),
        '#news'            => __( 'News', 'eyecare' ),
        '#events'          => __( 'Events', 'eyecare' ),
    ];
    foreach ( $links as $url => $label ) {
        printf(
            '<a href="%s">%s</a>',
            esc_url( $url ),
            esc_html( $label )
        );
    }
}

// =====================================================
// INCLUDE CUSTOMIZER
// =====================================================
require get_template_directory() . '/inc/customizer.php';
