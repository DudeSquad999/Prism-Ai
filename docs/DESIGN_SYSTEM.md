# Prism AI Design System

## Intent

The Prism AI interface uses a dark, focused workspace with restrained spectrum accents. The visual language supports comparison without making the interface feel noisy or overly decorative.

## Color roles

| Role | Suggested color | Use |
| --- | --- | --- |
| Background | Deep navy or charcoal | Page and sidebar foundation |
| Surface | Blue-black | Cards, composer, and panels |
| Violet | `#A78BFA` | Primary emphasis and selected states |
| Cyan | `#67E8F9` | Analytical and informational accents |
| Teal | `#5EEAD4` | Practical and confirmation accents |
| Amber | `#FBBF24` | Caution, uncertainty, and limited emphasis |
| Text | Near-white | Primary readable text |
| Muted text | Blue-gray | Supporting labels and explanations |

Use color as reinforcement, not as the only way to convey status or selection.

## Typography

- Use the system UI font stack for fast local loading and clear rendering.
- Keep body text comfortable to read, typically 16 pixels or larger.
- Use a clear hierarchy with one page title, section headings, card titles, and supporting labels.
- Avoid long blocks of text when a list, table, or short paragraph improves scanning.

## Layout

- Use a persistent sidebar on wide screens and a stacked header area on narrow screens.
- Keep main content within a readable maximum width.
- Use card grids that collapse to one column on smaller screens.
- Maintain generous spacing between sections and interactive controls.

## Components

### Sidebar

Contains the project name, prototype status, local-only reminder, and navigation links.

### Prompt composer

Contains a visible label, optional text area, example guidance, and a clear action button. It must explain that entered text remains local and does not call AI services.

### Perspective card

A selectable card with a title, a short purpose statement, and a visual selected state. It must be keyboard reachable and expose selection state programmatically.

### Response comparison card

Shows a perspective name, confidence or limitation label, response text, and a short note about what the response emphasizes.

### Synthesis panel

Separates common ground, differences, uncertainty, and a suggested next step. It should not present a conclusion as guaranteed truth.

## Accessibility requirements

- Use semantic landmarks, headings, buttons, labels, and lists.
- Provide visible keyboard focus indicators.
- Maintain readable text contrast against dark surfaces.
- Do not rely on color alone for status or selection.
- Respect reduced-motion preferences.
- Use responsive layouts that remain usable at high zoom and on small screens.

## Content voice

Use calm, direct, and transparent language. Clearly separate examples, interpretations, and unknowns. Avoid claims of certainty that the interface cannot support.