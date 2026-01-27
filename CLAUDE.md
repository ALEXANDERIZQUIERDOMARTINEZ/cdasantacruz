# CLAUDE.md - CDA Santa Cruz

This document provides guidance for AI assistants working with this codebase.

## Project Overview

**CDA Santa Cruz** is a static website for an automotive diagnostic center (Centro de Diagnóstico Automotriz) located in Barrio Sevilla, Colombia. The site serves as a marketing and appointment booking platform for vehicle inspection services.

- **Business Type:** Automotive Diagnostic Center (ISO/IEC 17020:2012 certified)
- **Location:** Calle 78 #6-47, Barrio Sevilla, Colombia
- **Primary Contact:** WhatsApp +57 300 899 4671
- **Production URL:** https://cdasantacruz.com/

## Architecture

This is a **monolithic single-page application (SPA)** built with vanilla technologies:

```
/home/user/cdasantacruz/
├── index.html          # Main application file (3,306 lines)
├── logocda.png         # Company logo
├── about.jpg           # About section image
├── banner.jpg          # Hero section banner (desktop)
├── bannercel.jpg       # Hero section banner (mobile)
├── CLAUDE.md           # This file
└── .git/               # Version control
```

### Technology Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (es-ES locale) |
| Styling | Custom CSS + Tailwind CSS (CDN) |
| JavaScript | Vanilla ES6+ (no frameworks) |
| Icons | Font Awesome 6.4.0 (CDN) |
| Fonts | Google Fonts (Poppins, Inter) |
| Maps | Google Maps Embed API |

### External CDN Resources

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

## Code Structure (index.html)

The entire application is contained in a single HTML file organized as:

| Section | Lines | Description |
|---------|-------|-------------|
| Head & Meta | 1-41 | SEO, Open Graph, Twitter Cards, favicon |
| Custom CSS | 41-1128 | CSS variables, component styles, responsive design |
| JSON-LD Schema | 1132-1234 | Structured data for search engines |
| HTML Body | 1240-2498 | Navigation, sections, modals, footer |
| JavaScript | 2499-3306 | Event handlers, form processing, utilities |

### CSS Variables (Theming)

```css
:root {
    --red-primary: #dc2626;
    --red-secondary: #ef4444;
    --red-dark: #b91c1c;
    --black-primary: #1a1a1a;
    --white: #ffffff;
    --gray-50 through --gray-900;
}
```

### Main Page Sections

| ID | Section | Purpose |
|----|---------|---------|
| `#inicio` | Hero | Banner with appointment booking form |
| `#nosotros` | About | Mission, vision, certifications |
| `#servicios` | Services | RTM, SOAT, insurance, roadside assistance |
| `#financiacion` | Financing | Sistecredito, Addi, credit card options |
| `#contacto` | Contact | Form, map, business hours |

## JavaScript Functions Reference

### Form Handlers

| Function | Purpose |
|----------|---------|
| `handleFormSubmit(event)` | Main contact form → WhatsApp |
| `handleHeroFormSubmit(event)` | Hero booking form → WhatsApp |
| `handleQuotationSubmit(event)` | Quotation request → WhatsApp |

### Scheduling Functions

| Function | Purpose |
|----------|---------|
| `generateTimeSlots(selectedDate)` | Returns available times based on day |
| `updateTimeOptions(selectedDate)` | Updates hero form time picker |
| `updateContactTimeOptions(selectedDate)` | Updates contact form time picker |

**Business Hours:**
- Monday-Friday: 7:00 AM - 6:00 PM (30-min intervals)
- Saturday: 7:00 AM - 3:00 PM
- Sunday: 8:00 AM - 2:00 PM (by appointment only)

### Modal Functions

| Function | Purpose |
|----------|---------|
| `openModal(modalId)` | Opens specified modal |
| `closeModal(modalId)` | Closes specified modal |
| `showServiceDetails(serviceType)` | Shows service info popup |
| `closeServiceModal()` | Closes service detail popup |
| `showMissionDetails()` | Opens mission modal |
| `showVisionDetails()` | Opens vision modal |
| `showCertificationDetails()` | Opens certification modal |

### Service Types

Valid values for `showServiceDetails()`:
- `'tecnico-mecanica'` - RTM inspection
- `'soat'` - Mandatory insurance
- `'seguros'` - Comprehensive insurance
- `'gruas'` - Tow truck service
- `'tramites'` - Vehicle documentation

### Financing Functions

```javascript
contactForFinancing(financingType)
// financingType: 'Sistecredito' | 'Addi' | 'Tarjetas de Crédito'
```

### UI/UX Functions

| Function | Purpose |
|----------|---------|
| `toggleDarkMode()` | Toggles dark theme (persists to localStorage) |
| `initializeDarkMode()` | Restores dark mode preference on load |

## WhatsApp Integration

All forms redirect to WhatsApp with pre-formatted messages:

```javascript
const whatsappURL = `https://wa.me/573008994671?text=${encodedMessage}`;
window.open(whatsappURL, '_blank');
```

**Phone Number:** `573008994671` (hardcoded throughout)

## Development Workflow

### No Build Process Required

This is a static site with no compilation step:
- No package.json
- No npm/yarn dependencies
- No webpack/vite/rollup
- Direct deployment of HTML/CSS/JS

### Making Changes

1. Edit `index.html` directly
2. Test locally by opening in browser
3. Commit changes with descriptive message (Spanish preferred)
4. Create pull request

### Git Conventions

- **Language:** Commit messages in Spanish
- **Branch Strategy:** Feature branches via pull requests
- **Naming:** PRs focus on UI/UX improvements

Recent commit examples:
```
"Mover crédito de desarrollo a la parte inferior del footer"
"Ajustar layout del footer para diseño horizontal más compacto"
"Unificar diseño de servicios con estilo de sección Nosotros"
```

## Coding Conventions

### HTML
- Use semantic HTML5 elements
- Spanish language content (lang="es")
- Include proper alt text for images
- Use section IDs for navigation anchors

### CSS
- Use CSS variables for colors (maintain theme consistency)
- Follow BEM-like naming: `.service-card`, `.nav-link`, `.info-card`
- Mobile-first responsive design with Tailwind breakpoints
- Support dark mode via `.dark-mode` class

### JavaScript
- Vanilla ES6+ syntax (no frameworks)
- Functions exposed globally for onclick handlers
- Use template literals for WhatsApp message formatting
- Maintain consistent function naming patterns

## Common Tasks

### Adding a New Service

1. Add service card in `#servicios` section
2. Add service details object in `showServiceDetails()` function
3. Include pricing, description, and details array
4. Update JSON-LD schema if applicable

### Modifying Business Hours

Update the `generateTimeSlots()` function:
```javascript
if (selectedDay === 0) { // Sunday
    // Modify hours here
} else if (selectedDay === 6) { // Saturday
    // Modify hours here
} else { // Monday to Friday
    // Modify hours here
}
```

### Updating Contact Information

Search and replace these values throughout:
- WhatsApp: `573008994671`
- Email: `cdasantacruz.sas@gmail.com`
- Address: `Calle 78 #6-47`

### Adding New Modals

Follow existing pattern:
```javascript
function showNewModal() {
    const modalHTML = `
        <div id="newModal" class="fixed inset-0 bg-black bg-opacity-50 z-50...">
            // Modal content
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}
```

## SEO & Metadata

The site includes comprehensive SEO optimization:
- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data (LocalBusiness schema)
- Canonical URL declaration

When modifying content, update corresponding meta tags to maintain SEO consistency.

## Image Assets

| File | Size | Purpose |
|------|------|---------|
| logocda.png | 390 KB | Logo (favicon, headers) |
| banner.jpg | 6.2 MB | Desktop hero image |
| bannercel.jpg | 10 MB | Mobile hero image |
| about.jpg | 6.4 MB | About section background |

Note: Images are large and could benefit from optimization for faster loading.

## Testing

No automated tests exist. Manual testing checklist:
- [ ] Navigation links work (smooth scroll)
- [ ] All forms submit correctly to WhatsApp
- [ ] Modal open/close functionality
- [ ] Responsive design at various breakpoints
- [ ] Dark mode toggle works
- [ ] Time slot generation based on date selection
- [ ] Google Maps embed loads correctly

## Important Notes

1. **All content is in Spanish** - maintain language consistency
2. **WhatsApp is the primary contact method** - all forms redirect there
3. **No backend** - all data processing happens client-side
4. **Static hosting** - no server-side capabilities required
5. **Single file architecture** - avoid creating additional files unless necessary
