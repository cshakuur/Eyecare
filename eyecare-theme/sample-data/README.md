# Eyecare Theme — Sample Data

This folder contains sample content to help you get started with the Eyecare theme.

---

## ✅ Method 1: One-Click Import (Recommended — no extra plugins needed)

1. Install and activate the **Eyecare** theme.
2. In the WordPress admin, go to **Appearance → Demo Import**.
3. Click **Import Demo Data**.
4. Done! The following content is created automatically:
   - 6 post categories (Royal Courts, Honour, International, History, Culture, Heritage)
   - 6 richly-written news posts
   - 3 pages (Home, About, Contact) — and the front page is set to "Home"
   - 5 events with Year metadata (displayed on the timeline)
   - A pre-built primary navigation menu
   - All Customizer settings (hero slides, featured person, history cards, heritage cards, footer)

> **Note:** Existing content is never deleted. The importer skips any item that already exists by slug.

---

## 🔄 Method 2: WordPress Importer (XML)

Use this if you prefer the standard WordPress content importer or need to import into a multisite.

### Steps

1. Go to **Tools → Import** and install/activate the **WordPress Importer** plugin if prompted.
2. Click **WordPress** and then **Upload file and import**.
3. Upload `sample-data/sample-data.xml`.
4. On the author mapping screen, assign all posts to your admin account.
5. Click **Submit**.

### What the XML imports

| Type          | Items |
|---------------|-------|
| Post categories | 6 |
| News posts    | 6     |
| Pages         | 3     |
| Events (CPT)  | 5     |

> **After XML import** you will still need to:
> - Go to **Settings → Reading** and set the front page to the "Home" page.
> - Go to **Appearance → Menus** and assign a menu to the Primary location.
> - Go to **Appearance → Customize** to configure the hero slides, featured person, and footer text.
>
> The one-click importer (Method 1) handles all of these steps automatically.

---

## Content included

### News Posts
| Title | Category | Date |
|-------|----------|------|
| Tradition & Royal Courts of the Isaaq Kingdom | Royal Courts | Apr 2026 |
| King Dhuuh Baraar Honoured at Annual Ceremony | Honour | Mar 2026 |
| Isaaq Kingdom Delegation Visits London | International | Feb 2026 |
| The Eight Tolje'lo Kings: A Complete Chronicle | History | Jan 2026 |
| Guurti Council: Xeer Law and Its Modern Relevance | Culture | Dec 2025 |
| The Battle of Maydh: Commemorating a Turning Point | Heritage | Nov 2025 |

### Pages
- **Home** — Static front page
- **About the Isaaq Kingdom** — Kingdom overview
- **Contact** — Contact details

### Events (eyecare_event CPT)
| Title | Year |
|-------|------|
| Launch 'Booqor: Tolje'lo Legacy' | 2026 |
| Battle of Maydh Commemoration | 2025 |
| Isaaq Guurti Council Annual Gathering | 2025 |
| Royal Heritage Exhibition | 2024 |
| Sheikh Ishaaq Remembrance Day | 2024 |

---

## Troubleshooting

**Events don't appear on the homepage timeline?**
Make sure the `eyecare_event` post type is registered (it is, automatically, when the Eyecare theme is active). After importing, visit **Settings → Permalinks** and click **Save Changes** to flush rewrite rules.

**Front page still shows the blog?**
Go to **Settings → Reading** and set "Your homepage displays" to "A static page", then select **Home** as the Homepage.

**Menu not assigned?**
Go to **Appearance → Menus**, find the "Primary Menu" menu, and assign it to the **Primary** menu location.
