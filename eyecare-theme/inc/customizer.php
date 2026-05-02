<?php
/**
 * Eyecare Theme Customizer Settings
 *
 * @package Eyecare
 */

function eyecare_customizer_register( $wp_customize ) {

    // =================================================
    // PANEL: HERO SLIDESHOW
    // =================================================
    $wp_customize->add_panel( 'eyecare_hero_panel', [
        'title'    => __( 'Hero Slideshow', 'eyecare' ),
        'priority' => 30,
    ] );

    $slide_defaults = [
        1 => [
            'title'   => 'Isaaq Kingdom',
            'tagline' => 'Royal Heritage · Boqortooyada Isaaq',
            'desc'    => "Tolje'lo dynasty · eight kings, one legacy since 14th century",
            'icon'    => 'fas fa-crown',
        ],
        2 => [
            'title'   => 'The Royal Chronicle',
            'tagline' => 'King Harun to King Dhuuh Baraar',
            'desc'    => 'From the first Tolje\'lo ruler to the last sovereign — centuries of leadership',
            'icon'    => 'fas fa-scroll',
        ],
        3 => [
            'title'   => 'Land of Maydh & Ogo',
            'tagline' => 'Cradle of the Isaaq clans',
            'desc'    => 'Where Sheikh Ishaaq settled and the eight sons established their heritage',
            'icon'    => 'fas fa-mountain',
        ],
    ];

    for ( $i = 1; $i <= 3; $i++ ) {
        $wp_customize->add_section( "eyecare_slide_{$i}", [
            'title'  => sprintf( __( 'Slide %d', 'eyecare' ), $i ),
            'panel'  => 'eyecare_hero_panel',
        ] );

        // Background image
        $wp_customize->add_setting( "slide_{$i}_image", [
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
            'transport'         => 'refresh',
        ] );
        $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, "slide_{$i}_image", [
            'label'   => sprintf( __( 'Slide %d Background Image', 'eyecare' ), $i ),
            'section' => "eyecare_slide_{$i}",
        ] ) );

        // Title
        $wp_customize->add_setting( "slide_{$i}_title", [
            'default'           => $slide_defaults[ $i ]['title'],
            'sanitize_callback' => 'sanitize_text_field',
            'transport'         => 'refresh',
        ] );
        $wp_customize->add_control( "slide_{$i}_title", [
            'label'   => sprintf( __( 'Slide %d Title', 'eyecare' ), $i ),
            'section' => "eyecare_slide_{$i}",
            'type'    => 'text',
        ] );

        // Tagline
        $wp_customize->add_setting( "slide_{$i}_tagline", [
            'default'           => $slide_defaults[ $i ]['tagline'],
            'sanitize_callback' => 'sanitize_text_field',
            'transport'         => 'refresh',
        ] );
        $wp_customize->add_control( "slide_{$i}_tagline", [
            'label'   => sprintf( __( 'Slide %d Tagline', 'eyecare' ), $i ),
            'section' => "eyecare_slide_{$i}",
            'type'    => 'text',
        ] );

        // Description
        $wp_customize->add_setting( "slide_{$i}_desc", [
            'default'           => $slide_defaults[ $i ]['desc'],
            'sanitize_callback' => 'sanitize_text_field',
            'transport'         => 'refresh',
        ] );
        $wp_customize->add_control( "slide_{$i}_desc", [
            'label'   => sprintf( __( 'Slide %d Description', 'eyecare' ), $i ),
            'section' => "eyecare_slide_{$i}",
            'type'    => 'text',
        ] );

        // Icon (Font Awesome class)
        $wp_customize->add_setting( "slide_{$i}_icon", [
            'default'           => $slide_defaults[ $i ]['icon'],
            'sanitize_callback' => 'sanitize_text_field',
            'transport'         => 'refresh',
        ] );
        $wp_customize->add_control( "slide_{$i}_icon", [
            'label'       => sprintf( __( 'Slide %d Icon (Font Awesome class)', 'eyecare' ), $i ),
            'section'     => "eyecare_slide_{$i}",
            'type'        => 'text',
            'description' => __( 'E.g. fas fa-crown', 'eyecare' ),
        ] );
    }

    // =================================================
    // PANEL: FRONT PAGE SECTIONS
    // =================================================
    $wp_customize->add_panel( 'eyecare_featured_panel', [
        'title'    => __( 'Front Page Sections', 'eyecare' ),
        'priority' => 40,
    ] );

    // ---- Featured Person / King ----
    $wp_customize->add_section( 'eyecare_king_section', [
        'title' => __( 'Featured Person', 'eyecare' ),
        'panel' => 'eyecare_featured_panel',
    ] );

    $king_fields = [
        'king_name'     => [ 'label' => __( 'Name', 'eyecare' ),          'default' => 'King Dhuuh Baraar',           'type' => 'text' ],
        'king_badge'    => [ 'label' => __( 'Badge Text', 'eyecare' ),     'default' => "Tolje'lo dynasty · last sovereign (early 1700s)", 'type' => 'text' ],
        'king_desc'     => [ 'label' => __( 'Description', 'eyecare' ),    'default' => "King Dhuuh Baraar stands as the final monarch of the historic Isaaq Kingdom. As a ruler of the Tolje'lo dynasty, he embodied the legacy tracing back to Sheikh Isaaq Bin Ahmed. His reign marks the culmination of eight Tolje'lo kings who guided the Isaaq clans from the 13th century.", 'type' => 'textarea' ],
        'king_btn_text' => [ 'label' => __( 'Button Text', 'eyecare' ),    'default' => "Watch elders' traditions",   'type' => 'text' ],
        'king_btn_url'  => [ 'label' => __( 'Button URL', 'eyecare' ),     'default' => '#',                          'type' => 'url' ],
        'king_icon'     => [ 'label' => __( 'Icon (FA class)', 'eyecare' ), 'default' => 'fas fa-user-turban',        'type' => 'text' ],
    ];

    foreach ( $king_fields as $key => $args ) {
        $sanitize = $args['type'] === 'url' ? 'esc_url_raw' : 'sanitize_text_field';
        $wp_customize->add_setting( $key, [
            'default'           => $args['default'],
            'sanitize_callback' => $sanitize,
            'transport'         => 'refresh',
        ] );
        $wp_customize->add_control( $key, [
            'label'   => $args['label'],
            'section' => 'eyecare_king_section',
            'type'    => $args['type'],
        ] );
    }

    // ---- History Cards ----
    $wp_customize->add_section( 'eyecare_history_section', [
        'title' => __( 'History / Stats Cards', 'eyecare' ),
        'panel' => 'eyecare_featured_panel',
    ] );

    $history_defaults = [
        1 => [ 'icon' => 'fas fa-calendar-alt', 'title' => '14th Century',      'desc' => "Establishment after Adal Sultanate's fall — Tolje'lo dynasty takes lead." ],
        2 => [ 'icon' => 'fas fa-flag',          'title' => "8 Tolje'lo Kings",  'desc' => 'From King Harun (1300s) to King Dhuuh Baraar (1700s), centuries of rule.' ],
        3 => [ 'icon' => 'fas fa-people-group',  'title' => '8 Isaaq Clans',     'desc' => "Descended from Sheikh Ishaaq's eight sons, uniting under Tolje'lo." ],
    ];

    for ( $i = 1; $i <= 3; $i++ ) {
        foreach ( [ 'icon', 'title', 'desc' ] as $field ) {
            $wp_customize->add_setting( "history_{$i}_{$field}", [
                'default'           => $history_defaults[ $i ][ $field ],
                'sanitize_callback' => 'sanitize_text_field',
                'transport'         => 'refresh',
            ] );
            $wp_customize->add_control( "history_{$i}_{$field}", [
                'label'   => sprintf( __( 'Card %d %s', 'eyecare' ), $i, ucfirst( $field ) ),
                'section' => 'eyecare_history_section',
                'type'    => $field === 'desc' ? 'textarea' : 'text',
            ] );
        }
    }

    $wp_customize->add_setting( 'history_fact', [
        'default'           => "⏳ The Guurti council & xeer customary law flourished under Tolje'lo.",
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ] );
    $wp_customize->add_control( 'history_fact', [
        'label'   => __( 'History Fact Banner', 'eyecare' ),
        'section' => 'eyecare_history_section',
        'type'    => 'text',
    ] );

    // ---- Heritage Cards ----
    $wp_customize->add_section( 'eyecare_heritage_section', [
        'title' => __( 'Heritage Cards', 'eyecare' ),
        'panel' => 'eyecare_featured_panel',
    ] );

    $heritage_defaults = [
        1 => [ 'icon' => 'fas fa-flag',       'title' => 'Adal Banner',   'desc' => 'Used by Adal & Isaaq on shrines.' ],
        2 => [ 'icon' => 'fas fa-book-quran', 'title' => 'Sheikh Ishaaq', 'desc' => '12th c. arrival, 8 sons = 8 clans.' ],
        3 => [ 'icon' => 'fas fa-tree',       'title' => 'King Harun',    'desc' => "First Tolje'lo ruler (1300s)." ],
    ];

    for ( $i = 1; $i <= 3; $i++ ) {
        foreach ( [ 'icon', 'title', 'desc' ] as $field ) {
            $wp_customize->add_setting( "heritage_{$i}_{$field}", [
                'default'           => $heritage_defaults[ $i ][ $field ],
                'sanitize_callback' => 'sanitize_text_field',
                'transport'         => 'refresh',
            ] );
            $wp_customize->add_control( "heritage_{$i}_{$field}", [
                'label'   => sprintf( __( 'Heritage %d %s', 'eyecare' ), $i, ucfirst( $field ) ),
                'section' => 'eyecare_heritage_section',
                'type'    => $field === 'desc' ? 'textarea' : 'text',
            ] );
        }
    }

    $wp_customize->add_setting( 'lineage_banner', [
        'default'           => 'Ibrahim · Isaag · Yaqut · King Mohammed · King of Isaag — preserved lineage',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ] );
    $wp_customize->add_control( 'lineage_banner', [
        'label'   => __( 'Lineage Banner Text', 'eyecare' ),
        'section' => 'eyecare_heritage_section',
        'type'    => 'text',
    ] );

    // =================================================
    // SECTION: NEWS SETTINGS
    // =================================================
    $wp_customize->add_section( 'eyecare_news_section', [
        'title'    => __( 'News / Blog Settings', 'eyecare' ),
        'priority' => 120,
    ] );

    $wp_customize->add_setting( 'news_count', [
        'default'           => 3,
        'sanitize_callback' => 'absint',
        'transport'         => 'refresh',
    ] );
    $wp_customize->add_control( 'news_count', [
        'label'   => __( 'Number of news posts on homepage', 'eyecare' ),
        'section' => 'eyecare_news_section',
        'type'    => 'number',
    ] );

    $wp_customize->add_setting( 'news_category', [
        'default'           => 0,
        'sanitize_callback' => 'absint',
        'transport'         => 'refresh',
    ] );
    $wp_customize->add_control( 'news_category', [
        'label'       => __( 'Filter by category ID (0 = all)', 'eyecare' ),
        'section'     => 'eyecare_news_section',
        'type'        => 'number',
        'description' => __( 'Enter a category ID to show posts from only that category.', 'eyecare' ),
    ] );

    // =================================================
    // SECTION: FOOTER
    // =================================================
    $wp_customize->add_section( 'eyecare_footer_section', [
        'title'    => __( 'Footer Settings', 'eyecare' ),
        'priority' => 130,
    ] );

    $wp_customize->add_setting( 'footer_site_name', [
        'default'           => 'Isaaq Kingdom',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ] );
    $wp_customize->add_control( 'footer_site_name', [
        'label'   => __( 'Footer Brand Name', 'eyecare' ),
        'section' => 'eyecare_footer_section',
        'type'    => 'text',
    ] );

    $wp_customize->add_setting( 'footer_copyright', [
        'default'           => "© [year] · Tolje'lo Heritage",
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ] );
    $wp_customize->add_control( 'footer_copyright', [
        'label'   => __( 'Copyright Text', 'eyecare' ),
        'section' => 'eyecare_footer_section',
        'type'    => 'text',
    ] );

    $wp_customize->add_setting( 'footer_tagline', [
        'default'           => 'Honouring eight kings, one legacy',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ] );
    $wp_customize->add_control( 'footer_tagline', [
        'label'   => __( 'Footer Tagline', 'eyecare' ),
        'section' => 'eyecare_footer_section',
        'type'    => 'text',
    ] );

    // Social links
    $social_networks = [
        'twitter'   => __( 'Twitter / X URL', 'eyecare' ),
        'instagram' => __( 'Instagram URL', 'eyecare' ),
        'youtube'   => __( 'YouTube URL', 'eyecare' ),
        'email'     => __( 'Email Address', 'eyecare' ),
    ];

    foreach ( $social_networks as $key => $label ) {
        $wp_customize->add_setting( "social_{$key}", [
            'default'           => '',
            'sanitize_callback' => 'sanitize_text_field',
            'transport'         => 'refresh',
        ] );
        $wp_customize->add_control( "social_{$key}", [
            'label'   => $label,
            'section' => 'eyecare_footer_section',
            'type'    => 'text',
        ] );
    }
}
add_action( 'customize_register', 'eyecare_customizer_register' );
