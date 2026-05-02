<?php
/**
 * Eyecare Theme — One-Click Demo Data Importer
 *
 * Accessible via Appearance → Demo Import in the WP admin.
 *
 * Creates:
 *   - 6 post categories
 *   - 6 sample news posts (one per category)
 *   - 3 pages  (Home, About, Contact)
 *   - 5 events (eyecare_event CPT) with Year meta
 *   - Primary navigation menu
 *   - All Customizer / theme_mod defaults
 *   - Sets front-page reading option
 *
 * @package Eyecare
 */

// ─── Admin menu page ─────────────────────────────────────────────────────────
add_action( 'admin_menu', function () {
    add_theme_page(
        __( 'Import Demo Data', 'eyecare' ),
        __( 'Demo Import', 'eyecare' ),
        'manage_options',
        'eyecare-demo-import',
        'eyecare_demo_import_page'
    );
} );

// ─── First-activation admin notice ───────────────────────────────────────────
add_action( 'admin_notices', function () {
    if ( get_option( 'eyecare_demo_imported' ) ) {
        return;
    }
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }
    $url = admin_url( 'themes.php?page=eyecare-demo-import' );
    echo '<div class="notice notice-info is-dismissible"><p>';
    printf(
        /* translators: %s: demo import page link */
        esc_html__( 'Welcome to Eyecare! %s to populate your site with sample content instantly.', 'eyecare' ),
        '<a href="' . esc_url( $url ) . '" class="button button-primary">' . esc_html__( 'Import Demo Data', 'eyecare' ) . '</a>'
    );
    echo '</p></div>';
} );

// ─── Admin page callback ──────────────────────────────────────────────────────
function eyecare_demo_import_page() {
    $imported = (bool) get_option( 'eyecare_demo_imported' );

    echo '<div class="wrap" style="max-width:780px">';
    echo '<h1>' . esc_html__( 'Eyecare Theme — Import Demo Data', 'eyecare' ) . '</h1>';

    if ( $imported ) {
        echo '<div class="notice notice-success inline"><p>'
            . esc_html__( '✅  Demo data has already been imported.', 'eyecare' )
            . '</p></div>';
    }

    echo '<p style="font-size:14px;margin:16px 0">'
        . esc_html__( 'Click the button below to create sample news posts, pages, events, a navigation menu and all Customizer settings.', 'eyecare' )
        . '</p>';
    echo '<p><em>'
        . esc_html__( 'Existing content will not be removed.', 'eyecare' )
        . '</em></p>';

    echo '<form method="post">';
    wp_nonce_field( 'eyecare_demo_import_action', '_eyecare_nonce' );
    submit_button(
        $imported
            ? __( 'Re-import Demo Data', 'eyecare' )
            : __( 'Import Demo Data', 'eyecare' ),
        'primary large'
    );
    echo '</form>';

    // Process import on POST submission
    if (
        isset( $_POST['_eyecare_nonce'] )
        && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_eyecare_nonce'] ) ), 'eyecare_demo_import_action' )
        && current_user_can( 'manage_options' )
    ) {
        eyecare_run_demo_import();
        echo '<div class="notice notice-success inline" style="margin-top:16px"><p>';
        echo '<strong>' . esc_html__( '🎉 Demo data imported successfully!', 'eyecare' ) . '</strong>  ';
        echo '<a href="' . esc_url( home_url( '/' ) ) . '" target="_blank">'
            . esc_html__( 'View your site →', 'eyecare' ) . '</a>';
        echo '</p></div>';
    }

    echo '</div>';
}

// ─── Core importer ────────────────────────────────────────────────────────────
function eyecare_run_demo_import() {

    // ── 1. CATEGORIES ────────────────────────────────────────────────────────
    $cat_data = [
        [ 'name' => 'Royal Courts',   'slug' => 'royal-courts'   ],
        [ 'name' => 'Honour',         'slug' => 'honour'         ],
        [ 'name' => 'International',  'slug' => 'international'  ],
        [ 'name' => 'History',        'slug' => 'history'        ],
        [ 'name' => 'Culture',        'slug' => 'culture'        ],
        [ 'name' => 'Heritage',       'slug' => 'heritage'       ],
    ];

    $cat_ids = [];
    foreach ( $cat_data as $c ) {
        $existing = get_term_by( 'slug', $c['slug'], 'category' );
        if ( $existing ) {
            $cat_ids[ $c['name'] ] = (int) $existing->term_id;
        } else {
            $t = wp_insert_term( $c['name'], 'category', [ 'slug' => $c['slug'] ] );
            $cat_ids[ $c['name'] ] = is_wp_error( $t ) ? 1 : (int) $t['term_id'];
        }
    }

    // ── 2. NEWS POSTS ─────────────────────────────────────────────────────────
    $posts = [
        [
            'post_title'   => 'Tradition & Royal Courts of the Isaaq Kingdom',
            'post_name'    => 'tradition-royal-courts-isaaq-kingdom',
            'post_date'    => '2026-04-18 10:00:00',
            'cat_name'     => 'Royal Courts',
            'post_excerpt' => "Parallels with Zulu kingdom's legal recognition — oral tradition endures through the Guurti.",
            'post_content' => '<p>The Isaaq Kingdom\'s legal tradition is deeply rooted in <em>xeer</em>, a customary law system that governed disputes, property rights and social relationships for centuries. Like the Zulu Kingdom\'s recognition of oral legal tradition, the Tolje\'lo dynasty maintained a council of elders — the <strong>Guurti</strong> — who presided over all matters of justice and inter-clan relations.</p>

<p>The Guurti operated as an upper house of wisdom, drawing on precedents passed down through oral tradition across generations. Decisions were binding and widely respected, reflecting a sophisticated understanding of governance without the need for written codes.</p>

<h2>Key Principles of Xeer</h2>
<ul>
<li><strong>Collective responsibility:</strong> The clan shared responsibility for the actions of its members.</li>
<li><strong>Compensation over punishment:</strong> Disputes were resolved through negotiated settlements, not imprisonment.</li>
<li><strong>Oral precedent:</strong> Rulings were memorised by specialist elders and recited when relevant cases arose.</li>
</ul>

<p>Today, scholars compare this system favourably to indigenous legal systems worldwide, noting its ability to maintain social cohesion across vast territories without a standing army or centralised bureaucracy.</p>',
        ],
        [
            'post_title'   => 'King Dhuuh Baraar Honoured at Annual Ceremony',
            'post_name'    => 'king-dhuuh-baraar-honoured-annual-ceremony',
            'post_date'    => '2026-03-22 12:00:00',
            'cat_name'     => 'Honour',
            'post_excerpt' => "Somali & Nigerian Itsekiri representatives unite to honour the last Tolje'lo king.",
            'post_content' => '<p>A solemn gathering was held in Hargeisa to honour the memory of <strong>King Dhuuh Baraar</strong>, the last sovereign of the Tolje\'lo dynasty. Representatives from the Somali diaspora and scholars of Nigerian Itsekiri heritage joined elders and community leaders to reflect on a shared legacy of African kingship.</p>

<p>The ceremony included the recitation of traditional <em>gabay</em> poetry, a musical tribute performed by griots, and a panel discussion on the continued importance of pre-colonial African governance structures in shaping modern identity.</p>

<blockquote><p>"King Dhuuh Baraar represents more than the end of a dynasty. He is a symbol of continuity, of memory, of a people\'s refusal to let their history be erased."</p></blockquote>

<h2>About King Dhuuh Baraar</h2>
<p>King Dhuuh Baraar was the eighth and final ruler of the Tolje\'lo dynasty, reigning in the early 18th century. His reign marked the conclusion of roughly four centuries of Tolje\'lo kingship over the Isaaq clans, beginning with King Harun in the 1300s.</p>',
        ],
        [
            'post_title'   => 'Isaaq Kingdom Delegation Visits London',
            'post_name'    => 'isaaq-kingdom-delegation-visits-london',
            'post_date'    => '2026-02-10 09:30:00',
            'cat_name'     => 'International',
            'post_excerpt' => 'Talks for artefact return and shared history with Adal successors held in the UK capital.',
            'post_content' => '<p>A high-level delegation representing the cultural legacy of the Isaaq Kingdom met with British academics, museum curators and members of the Somali diaspora community in London to begin preliminary discussions on the repatriation of cultural artefacts held in private and public collections.</p>

<p>The visit centred on items believed to have been removed from the Maydh and Ogo regions during the colonial period. Among the items discussed were decorative weapons, manuscript fragments, and ceremonial objects associated with the Tolje\'lo court.</p>

<h2>International Precedents</h2>
<p>The delegation pointed to successful repatriation efforts in other African contexts as a model. "We are not asking for confrontation," said one delegate. "We are asking for recognition — for the acknowledgement that these objects have a home and a people."</p>

<p>A joint committee is expected to be established in the coming months to catalogue items and agree on a framework for return or shared stewardship.</p>',
        ],
        [
            'post_title'   => "The Eight Tolje'lo Kings: A Complete Chronicle",
            'post_name'    => 'eight-toljelo-kings-complete-chronicle',
            'post_date'    => '2026-01-15 08:00:00',
            'cat_name'     => 'History',
            'post_excerpt' => "From King Harun in the 1300s to King Dhuuh Baraar in the 1700s — a four-century chronicle.",
            'post_content' => '<p>The Tolje\'lo dynasty ruled the Isaaq Kingdom across eight successive monarchs, spanning from the 14th to the early 18th century. Each king contributed uniquely to the consolidation of Isaaq identity, territorial integrity and customary law.</p>

<h2>The Eight Kings</h2>
<ol>
<li><strong>King Harun</strong> (c. 1300s) — Founder of the Tolje\'lo lineage; established the first formal council of clan elders.</li>
<li><strong>King Hasan</strong> — Expanded the kingdom\'s territory into the Ogo highland plateau.</li>
<li><strong>King Ibrahim</strong> — Strengthened trade routes to the Gulf of Aden.</li>
<li><strong>King Mohamud</strong> — Known as a jurist-king; codified key xeer principles during his reign.</li>
<li><strong>King Idris</strong> — Oversaw a period of agricultural development and pastoral expansion.</li>
<li><strong>King Yuusuf</strong> — Maintained neutrality during inter-clan conflicts, preserving unity.</li>
<li><strong>King Cigaal</strong> — Initiated formal diplomatic contact with neighbouring sultanates.</li>
<li><strong>King Dhuuh Baraar</strong> (early 1700s) — Last sovereign; his reign concluded with the gradual dissolution of centralised Tolje\'lo authority.</li>
</ol>

<p>Each king\'s reign is preserved through oral tradition transmitted by specialist genealogists known as <em>Wadaad</em>, whose role was to memorise and recite royal history at ceremonies and gatherings.</p>',
        ],
        [
            'post_title'   => 'Guurti Council: Xeer Law and Its Modern Relevance',
            'post_name'    => 'guurti-council-xeer-law-modern-relevance',
            'post_date'    => '2025-12-05 11:00:00',
            'cat_name'     => 'Culture',
            'post_excerpt' => 'The ancient Guurti council and xeer customary law continue to shape Somali governance today.',
            'post_content' => "<p>Few indigenous governance systems have demonstrated the longevity and adaptability of <em>xeer</em>, the customary law tradition that flourished under the Tolje'lo dynasty. Today, the Guurti — a council of clan elders — remains an official part of Somaliland's bicameral legislature.</p>

<h2>Foundations of Xeer</h2>
<ul>
<li><strong>Heer:</strong> Agreed norms between clans regarding compensation, resource sharing and mutual defence.</li>
<li><strong>Diya:</strong> Blood money paid collectively by a clan to resolve killings or serious injury.</li>
<li><strong>Shir:</strong> Public assemblies at which disputes are heard and resolved by consensus.</li>
</ul>

<h2>The Guurti in Somaliland Today</h2>
<p>Somaliland's 1993 Borama Conference drew explicitly on xeer principles to draft a constitutional charter and establish a bicameral parliament. The upper house — the Guurti — is composed of 82 traditional elders and serves as the guardian of customary law and national reconciliation.</p>

<p>Scholars of comparative constitutional law have increasingly recognised Somaliland's hybrid governance model as a successful case study in post-conflict state-building that honours indigenous legal traditions.</p>",
        ],
        [
            'post_title'   => 'The Battle of Maydh: Commemorating a Turning Point',
            'post_name'    => 'battle-of-maydh-commemorating-turning-point',
            'post_date'    => '2025-11-01 14:00:00',
            'cat_name'     => 'Heritage',
            'post_excerpt' => 'Gabay poetry, oral history and military strategy converge at the annual Maydh commemoration.',
            'post_content' => '<p>The coastal town of <strong>Maydh</strong>, nestled on the Gulf of Aden in what is now Somaliland, holds deep historical significance for the Isaaq clans. It is the site of one of the most celebrated military encounters in the region\'s oral tradition — a confrontation that tested the resilience of the Tolje\'lo kingdom and the cohesion of the Isaaq confederacy.</p>

<p>Each year communities gather to commemorate these events through <em>gabay</em> (formal epic poetry), the retelling of oral chronicles by community historians, and analysis of the military tactics employed — all passed down without written documentation for over three centuries.</p>

<h2>Why Maydh Matters</h2>
<p>Maydh is more than a battle site. It is the place where, according to tradition, Sheikh Ishaaq — the founding ancestor of the Isaaq clans — first arrived on the Somali coast from Arabia in the 12th century. The combination of that founding narrative with later military history makes Maydh a layered place of memory and identity.</p>

<p>The commemoration reaffirms xeer obligations between the Isaaq sub-clans, updates oral records in the presence of community witnesses, and welcomes young people into the tradition of custodianship.</p>',
        ],
    ];

    foreach ( $posts as $p ) {
        if ( get_page_by_path( $p['post_name'], OBJECT, 'post' ) ) {
            continue;
        }
        $post_id = wp_insert_post( [
            'post_title'    => wp_strip_all_tags( $p['post_title'] ),
            'post_name'     => $p['post_name'],
            'post_content'  => $p['post_content'],
            'post_excerpt'  => $p['post_excerpt'],
            'post_status'   => 'publish',
            'post_type'     => 'post',
            'post_date'     => $p['post_date'],
            'post_date_gmt' => $p['post_date'],
        ] );
        if ( $post_id && ! is_wp_error( $post_id ) && isset( $cat_ids[ $p['cat_name'] ] ) ) {
            wp_set_post_categories( $post_id, [ $cat_ids[ $p['cat_name'] ] ] );
        }
    }

    // ── 3. PAGES ─────────────────────────────────────────────────────────────
    $pages = [
        [
            'post_title'   => 'Home',
            'post_name'    => 'sample-home',
            'post_content' => "<p>Welcome to the Isaaq Kingdom — preserving the royal heritage of the Tolje'lo dynasty since the 14th century.</p>",
        ],
        [
            'post_title'   => 'About the Isaaq Kingdom',
            'post_name'    => 'about-the-isaaq-kingdom',
            'post_content' => "<p>The Isaaq Kingdom, led by the Tolje'lo dynasty, was a sovereign polity that governed the Isaaq clans of the Horn of Africa from the 14th century until the early 18th century. Founded after the decline of the Adal Sultanate, the kingdom preserved Islamic scholarship, xeer customary law, and a rich tradition of oral governance.</p>

<h2>The Tolje'lo Dynasty</h2>
<p>Eight successive kings from the Tolje'lo lineage guided the Isaaq confederation across roughly four centuries. Their authority was both political and spiritual, drawing on the revered ancestry of Sheikh Ishaaq — a 12th-century Islamic scholar who arrived on the Somali coast from Arabia and whose eight sons became the progenitors of the eight Isaaq clans.</p>

<h2>Heritage &amp; Legacy</h2>
<p>Though the kingdom no longer exists as a political entity, its legacy is very much alive. The Guurti council that flourished under Tolje'lo rule remains an active institution in Somaliland's bicameral legislature. Xeer principles continue to govern inter-clan relations. The gabay tradition of oral epic poetry keeps royal history alive in communities from Maydh to Hargeisa.</p>",
        ],
        [
            'post_title'   => 'Contact',
            'post_name'    => 'contact',
            'post_content' => '<p>For inquiries about the Isaaq Kingdom heritage project, please use the details below.</p>

<h2>Get in Touch</h2>
<p>We welcome correspondence from researchers, diaspora community members, cultural institutions and media.</p>
<ul>
<li><strong>Email:</strong> info@example.com</li>
<li><strong>Location:</strong> Hargeisa, Somaliland</li>
</ul>',
        ],
    ];

    $page_ids = [];
    foreach ( $pages as $pg ) {
        $existing = get_page_by_path( $pg['post_name'], OBJECT, 'page' );
        if ( $existing ) {
            $page_ids[ $pg['post_name'] ] = (int) $existing->ID;
            continue;
        }
        $id = wp_insert_post( [
            'post_title'   => wp_strip_all_tags( $pg['post_title'] ),
            'post_name'    => $pg['post_name'],
            'post_content' => $pg['post_content'],
            'post_status'  => 'publish',
            'post_type'    => 'page',
        ] );
        if ( $id && ! is_wp_error( $id ) ) {
            $page_ids[ $pg['post_name'] ] = $id;
        }
    }

    // Set static front page
    if ( isset( $page_ids['sample-home'] ) ) {
        update_option( 'show_on_front', 'page' );
        update_option( 'page_on_front', $page_ids['sample-home'] );
    }

    // ── 4. EVENTS (CPT) ──────────────────────────────────────────────────────
    $events = [
        [
            'post_title'   => "Launch 'Booqor: Tolje'lo Legacy'",
            'post_name'    => 'booqor-toljelo-legacy-launch-2026',
            'year'         => '2026',
            'post_excerpt' => 'Hargeisa premiere of the landmark documentary series with royal elders and diaspora guests.',
            'post_content' => "<p>The highly anticipated documentary series <em>Booqor: Tolje'lo Legacy</em> premieres in Hargeisa with a special ceremony attended by royal elders, scholars and members of the Isaaq diaspora from across the world.</p>
<p>The series spans three episodes, covering the history of the Tolje'lo dynasty from its founding by King Harun in the 14th century to the final reign of King Dhuuh Baraar in the early 18th century.</p>",
        ],
        [
            'post_title'   => 'Battle of Maydh Commemoration',
            'post_name'    => 'battle-of-maydh-commemoration-event-2025',
            'year'         => '2025',
            'post_excerpt' => 'Gabay poetry and military strategy remembrance held at the historic coastal town of Maydh.',
            'post_content' => '<p>The annual Battle of Maydh Commemoration draws historians, poets and community elders to the historic coastal town on the Gulf of Aden. The daylong event features recitations of gabay (oral epic poetry), panel discussions on military tactics, and a communal feast.</p>',
        ],
        [
            'post_title'   => 'Isaaq Guurti Council Annual Gathering',
            'post_name'    => 'isaaq-guurti-council-gathering-2025',
            'year'         => '2025',
            'post_excerpt' => 'Annual festival and xeer reaffirmation — all eight Isaaq sub-clans converge for the elder council.',
            'post_content' => "<p>The annual Isaaq Guurti Council gathering brings together elders from all eight Isaaq sub-clans to reaffirm xeer agreements, resolve outstanding inter-clan disputes and celebrate shared heritage. The gathering is followed by a cultural festival featuring traditional music, poetry and dance.</p>",
        ],
        [
            'post_title'   => 'Royal Heritage Exhibition',
            'post_name'    => 'royal-heritage-exhibition-2024',
            'year'         => '2024',
            'post_excerpt' => 'A travelling exhibition of Isaaq Kingdom artefacts and manuscripts at the Hargeisa Cultural Centre.',
            'post_content' => "<p>The Royal Heritage Exhibition brings together a collection of artefacts, manuscripts and photographs documenting the material culture of the Isaaq Kingdom and the Tolje'lo dynasty. Items on display include reproductions of ceremonial objects, hand-copied genealogical manuscripts and early 20th-century photographs of Maydh.</p>",
        ],
        [
            'post_title'   => 'Sheikh Ishaaq Remembrance Day',
            'post_name'    => 'sheikh-ishaaq-remembrance-day-2024',
            'year'         => '2024',
            'post_excerpt' => "Annual commemoration of Sheikh Ishaaq's 12th-century arrival on the Somali coast from Arabia.",
            'post_content' => "<p>Sheikh Ishaaq Remembrance Day honours the memory of the founding ancestor of the Isaaq clans — a 12th-century Islamic scholar from Arabia whose arrival on the Somali coast initiated one of the most significant genealogical and cultural lineages in the Horn of Africa.</p>
<p>The day is marked by Quran recitations, communal gatherings, and the retelling of oral histories tracing the lineage from Sheikh Ishaaq through his eight sons to the eight Isaaq sub-clans of today.</p>",
        ],
    ];

    foreach ( $events as $ev ) {
        if ( get_page_by_path( $ev['post_name'], OBJECT, 'eyecare_event' ) ) {
            continue;
        }
        $ev_id = wp_insert_post( [
            'post_title'   => wp_strip_all_tags( $ev['post_title'] ),
            'post_name'    => $ev['post_name'],
            'post_content' => $ev['post_content'],
            'post_excerpt' => $ev['post_excerpt'],
            'post_status'  => 'publish',
            'post_type'    => 'eyecare_event',
        ] );
        if ( $ev_id && ! is_wp_error( $ev_id ) ) {
            update_post_meta( $ev_id, '_eyecare_event_year', sanitize_text_field( $ev['year'] ) );
        }
    }

    // ── 5. PRIMARY NAVIGATION MENU ───────────────────────────────────────────
    $menu_name     = __( 'Primary Menu', 'eyecare' );
    $existing_menu = wp_get_nav_menu_object( $menu_name );
    $menu_id       = $existing_menu ? (int) $existing_menu->term_id : wp_create_nav_menu( $menu_name );

    if ( $menu_id && ! is_wp_error( $menu_id ) ) {
        // Clear existing items so re-import doesn't duplicate
        $existing_items = wp_get_nav_menu_items( $menu_id );
        if ( $existing_items ) {
            foreach ( $existing_items as $item ) {
                wp_delete_post( $item->ID, true );
            }
        }

        // Home
        wp_update_nav_menu_item( $menu_id, 0, [
            'menu-item-title'  => __( 'Home', 'eyecare' ),
            'menu-item-url'    => home_url( '/' ),
            'menu-item-status' => 'publish',
            'menu-item-type'   => 'custom',
        ] );

        // Front-page section anchors
        $anchors = [
            '#king'     => __( 'His Majesty', 'eyecare' ),
            '#history'  => __( 'History', 'eyecare' ),
            '#heritage' => __( 'Heritage', 'eyecare' ),
            '#news'     => __( 'News', 'eyecare' ),
            '#events'   => __( 'Events', 'eyecare' ),
        ];
        foreach ( $anchors as $anchor => $label ) {
            wp_update_nav_menu_item( $menu_id, 0, [
                'menu-item-title'  => $label,
                'menu-item-url'    => home_url( '/' ) . $anchor,
                'menu-item-status' => 'publish',
                'menu-item-type'   => 'custom',
            ] );
        }

        // Static pages
        $page_links = [
            'about-the-isaaq-kingdom' => __( 'About', 'eyecare' ),
            'contact'                  => __( 'Contact', 'eyecare' ),
        ];
        foreach ( $page_links as $slug => $label ) {
            if ( isset( $page_ids[ $slug ] ) ) {
                wp_update_nav_menu_item( $menu_id, 0, [
                    'menu-item-title'     => $label,
                    'menu-item-object'    => 'page',
                    'menu-item-object-id' => $page_ids[ $slug ],
                    'menu-item-type'      => 'post_type',
                    'menu-item-status'    => 'publish',
                ] );
            }
        }

        // Assign to primary location
        $locations             = get_theme_mod( 'nav_menu_locations', [] );
        $locations['primary']  = $menu_id;
        set_theme_mod( 'nav_menu_locations', $locations );
    }

    // ── 6. CUSTOMIZER / THEME MODS ───────────────────────────────────────────
    $mods = [
        'slide_1_title'    => 'Isaaq Kingdom',
        'slide_1_tagline'  => 'Royal Heritage · Boqortooyada Isaaq',
        'slide_1_desc'     => "Tolje'lo dynasty · eight kings, one legacy since 14th century",
        'slide_1_icon'     => 'fas fa-crown',
        'slide_2_title'    => 'The Royal Chronicle',
        'slide_2_tagline'  => 'King Harun to King Dhuuh Baraar',
        'slide_2_desc'     => "From the first Tolje'lo ruler to the last sovereign — centuries of leadership",
        'slide_2_icon'     => 'fas fa-scroll',
        'slide_3_title'    => 'Land of Maydh & Ogo',
        'slide_3_tagline'  => 'Cradle of the Isaaq clans',
        'slide_3_desc'     => 'Where Sheikh Ishaaq settled and the eight sons established their heritage',
        'slide_3_icon'     => 'fas fa-mountain',
        'king_name'        => 'King Dhuuh Baraar',
        'king_badge'       => "Tolje'lo dynasty · last sovereign (early 1700s)",
        'king_desc'        => "King Dhuuh Baraar stands as the final monarch of the historic Isaaq Kingdom. As a ruler of the Tolje'lo dynasty, he embodied the legacy tracing back to Sheikh Isaaq Bin Ahmed. His reign marks the culmination of eight Tolje'lo kings who guided the Isaaq clans from the 13th century — shaping identity, justice, and resilience in the Horn of Africa.",
        'king_btn_text'    => "Watch elders' traditions",
        'king_btn_url'     => '#',
        'king_icon'        => 'fas fa-user-turban',
        'history_1_icon'   => 'fas fa-calendar-alt',
        'history_1_title'  => '14th Century',
        'history_1_desc'   => "Establishment after Adal Sultanate's fall — Tolje'lo dynasty takes lead.",
        'history_2_icon'   => 'fas fa-flag',
        'history_2_title'  => "8 Tolje'lo Kings",
        'history_2_desc'   => 'From King Harun (1300s) to King Dhuuh Baraar (1700s), centuries of rule.',
        'history_3_icon'   => 'fas fa-people-group',
        'history_3_title'  => '8 Isaaq Clans',
        'history_3_desc'   => "Descended from Sheikh Ishaaq's eight sons, uniting under Tolje'lo.",
        'history_fact'     => "⏳ The Guurti council & xeer customary law flourished under Tolje'lo.",
        'heritage_1_icon'  => 'fas fa-flag',
        'heritage_1_title' => 'Adal Banner',
        'heritage_1_desc'  => 'Used by Adal & Isaaq on shrines.',
        'heritage_2_icon'  => 'fas fa-book-quran',
        'heritage_2_title' => 'Sheikh Ishaaq',
        'heritage_2_desc'  => '12th c. arrival, 8 sons = 8 clans.',
        'heritage_3_icon'  => 'fas fa-tree',
        'heritage_3_title' => 'King Harun',
        'heritage_3_desc'  => "First Tolje'lo ruler (1300s).",
        'lineage_banner'   => 'Ibrahim · Isaag · Yaqut · King Mohammed · King of Isaag — preserved lineage',
        'news_count'       => 3,
        'news_category'    => 0,
        'footer_site_name' => 'Isaaq Kingdom',
        'footer_copyright' => "© [year] · Tolje'lo Heritage",
        'footer_tagline'   => 'Honouring eight kings, one legacy',
    ];

    foreach ( $mods as $key => $value ) {
        set_theme_mod( $key, $value );
    }

    // ── 7. FLUSH REWRITES & MARK DONE ────────────────────────────────────────
    flush_rewrite_rules();
    update_option( 'eyecare_demo_imported', true );
}
