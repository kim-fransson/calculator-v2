# Calculator

A [Frontend Mentor](https://www.frontendmentor.io) challenge built with Next.js 16 — featuring 3D buttons, cookie-persisted color themes, full keyboard support, and a focus on accessibility.

## About

This project is my implementation of the Frontend Mentor calculator app challenge. I used [Claude Code](https://claude.ai/claude-code) as a pair-programming partner throughout the build. My workflow was to copy the relevant CSS from Figma's "Copy as CSS" feature and feed it as context to Claude, then use plan mode to align on an approach before generating code. I generally had a good understanding of how to solve each problem, so Claude served more as a sounding board and accelerator than a black-box solution generator. Toward the end of the project I had Claude run an accessibility audit, which surfaced issues I had either forgotten or wasn't aware of.

The 3D buttons, press/hover animations, and transitions were all done by hand, drawing on techniques from [Josh Comeau's](https://www.joshwcomeau.com/) courses. Each button is composed of three layers — a blurred shadow, a colored edge, and a raised front face — that shift on hover and compress on press to create a tactile, physical feel.

The app ships with three color themes (Dark, Light, and Violet). The selected theme is persisted in a cookie so it survives page reloads and new sessions. On the server, `layout.tsx` reads the cookie and sets CSS custom properties on `<html>`, which means the correct theme renders on the very first frame with no flash of unstyled content.

## Calculator Logic

The calculator is powered by a `useReducer` state machine with a pure reducer function.

**State:**

| Field         | Purpose                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------- |
| `display`     | Raw number string shown on screen                                                         |
| `storedValue` | Left-hand operand stored when an operator is pressed                                      |
| `operator`    | The pending arithmetic operator                                                           |
| `isNewEntry`  | When `true`, the next digit replaces the display instead of appending                     |
| `lastOperand` | Right-hand operand from the last equals — enables repeated-equals (e.g. `5 + 3 = = → 11`) |
| `expression`  | Accumulated expression shown in the history row (e.g. `25 + 25 −`)                        |

**Actions:** `DIGIT`, `DECIMAL`, `OPERATOR`, `EQUALS`, `DELETE`, `RESET`

Notable behaviors:

- **Immediate evaluation** — pressing an operator while one is already pending computes the intermediate result first.
- **Repeated equals** — pressing `=` repeatedly reapplies the last operation with the previous right-hand operand.
- **Precision** — results pass through `toPrecision(12)` then `parseFloat` to eliminate floating-point noise.
- **Division by zero** — returns `"Error"` instead of `Infinity`.
- **Display formatting** — large numbers are formatted with comma separators while preserving decimals.

## Accessibility

Key accessibility features:

- **`<output>` element** on the display with a combined `aria-label` announcing both the expression history and current value to screen readers.
- **Descriptive `aria-label`** on every operator and action button (e.g. "Delete last digit", "Multiply", "Calculate result").
- **`role="radiogroup"`** with `aria-labelledby` on the theme switcher; each radio option carries an `aria-label` like "Theme 1 – Dark".
- **`role="group"`** with `aria-label="Calculator keypad"` on the keypad container.
- **`VisuallyHidden`** component for screen-reader-only content. In development, pressing `Alt` reveals hidden labels for debugging.
- **`RespectMotionPreferences`** wraps the app with Framer Motion's `reducedMotion: 'user'` config, honoring the `prefers-reduced-motion` system setting.
- **`:focus-visible`** used for keyboard-only focus rings — mouse clicks don't produce a focus outline.

> **Note:** The theme switcher radio inputs have tap areas smaller than the WCAG 2.5.5 recommended minimum of 44px. This is a known trade-off due to the compact three-position toggle design from the Figma spec.

### TapArea

`TapArea` is a utility component that wraps any element to enforce a minimum tap-target size (defaults to 44px per WCAG 2.5.5). It injects a `::after` pseudo-element as an enlarged hit area. In development, hold `Alt` to visualize tap areas — they are color-coded green (meets 48px target) through red (too small).

```tsx
<TapArea minSize={44}>
  <button>Click me</button>
</TapArea>
```

### Nudge

`Nudge` applies pixel-level CSS translations for optical alignment adjustments without affecting document flow.

```tsx
<Nudge y={-6}>THEME</Nudge>
```

This shifts the "THEME" label up 6 pixels to align visually with the radio controls in the theme switcher.

## Component Hierarchy

```
RootLayout
├── RespectMotionPreferences
└── Home
    └── MaxWidthWrapper
        ├── Header
        │   ├── Logo
        │   └── ThemeSwitcher
        │       ├── VisuallyHidden
        │       ├── Nudge
        │       └── TapArea
        └── Calculator
            ├── Display
            └── Keypad
                └── Button (x20, variants: type-1, type-2, type-3)
```

## Keyboard Shortcuts

| Key                    | Action                |
| ---------------------- | --------------------- |
| `0`–`9`                | Input digit           |
| `.`                    | Decimal point         |
| `+`                    | Add                   |
| `-`                    | Subtract              |
| `*`                    | Multiply              |
| `/`                    | Divide                |
| `Enter` / `=`          | Calculate result      |
| `Backspace` / `Delete` | Delete last character |
| `Escape`               | Reset calculator      |

Backspace and Delete support key-repeat (throttled at 100ms). All other keys block repeat to prevent accidental rapid input.

## Tech Stack

- **Next.js 16** — App Router, server components
- **React 19** — `useReducer`, `useId`
- **TypeScript 5** — strict mode
- **CSS Modules** — scoped styles, CSS custom properties for theming
- **Motion 12** (Framer Motion) — reduced motion support
- **js-cookie** — client-side theme persistence
- **clsx** — conditional class name joining
- **Vitest** — unit tests for calculator logic
- **Storybook 10** — component development and visual testing

## Getting Started

```bash
npm install
npm run dev        # development server
npm test           # run tests
npm run storybook  # component explorer
npm run build      # production build
```

## Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io) for the challenge design
- [Josh Comeau](https://www.joshwcomeau.com/) for the 3D button technique and CSS inspiration
- [Claude Code](https://claude.ai/claude-code) — AI pair-programming partner used throughout development
