with open("docs/backlog.md", "r", encoding="utf-8") as f:
    text = f.read()

epic_str = """## EPIC 7: Vedic Labs UI/UX Evolution (Priority 2)
*Transform the Experimental Sanctum from a static grid into a fluid, dynamic, and curiosity-sparking interactive experience using modern front-end techniques.*

- [ ] `UX-009` **Bento-Grid Layout**: Replace the basic grid layout (`grid-cols-1 md:grid-cols-2`) with an asymmetric, fluid Bento Grid (using tools like Framer Motion). Different labs should take up different aspect ratios based on importance.
- [ ] `UX-010` **Cosmic Micro-Interactions**: Integrate hover-state WebGL/Three.js particle effects or Canvas animations that respond to cursor movement to reflect the "Experimental Sanctum" theme.
- [ ] `UX-011` **Progressive Disclosure & Onboarding**: Instead of showing the full interactive lab immediately inside the grid, show a "teaser" card with dynamic data (e.g., current cosmic time, spinning chakra, breathing circle). Clicking expands it into a modal or full-page immersive view.
- [ ] `UX-012` **Soundscapes & Haptics**: Integrate subtle spatial audio (Om resonances, wind, soft chimes) when interacting with labs (Pranayama, Meditation) and use the Web Vibration API for mobile devices.
- [ ] `UX-013` **Fluid Typography & Glassmorphism**: Upgrade the aesthetic with heavy Glassmorphism (background blurs, translucent borders) and dynamic fluid typography that scales seamlessly across device dimensions.

"""

text = text.replace("## EPIC 1: Security", epic_str + "## EPIC 1: Security")

with open("docs/backlog.md", "w", encoding="utf-8") as f:
    f.write(text)
