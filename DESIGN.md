---
name: PHOTOBOX
description: A tactile, local-first digital photo booth.
colors:
  paper: "#f4f1ea"
  paper-deep: "#e2ded3"
  ink: "#171717"
  muted: "#706b61"
  line: "#c9c2b4"
  shutter: "#b45b42"
  shutter-deep: "#823a2b"
  print-white: "#fdfcf7"
  print-clean: "#ffffff"
  cream: "#fbf4df"
  soft-pink: "#f7dbe2"
  soft-blue: "#dceaf1"
typography:
  display:
    fontFamily: '"Trebuchet MS", "Gill Sans", "Avenir Next", sans-serif'
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "0"
  body:
    fontFamily: '"Trebuchet MS", "Gill Sans", "Avenir Next", sans-serif'
    letterSpacing: "0"
  label:
    fontFamily: '"Courier New", Courier, monospace'
rounded:
  none: "0px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "40px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  button-secondary:
    backgroundColor: "#fdfcf7"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
---

# Design System: PHOTOBOX

## Overview

**Creative North Star: "The Little Print Booth"**

PHOTOBOX should feel like a compact print kiosk and booth ritual: plain paper, dark camera chamber, tactile shutter, small lab-stamp metadata, and a strip that reads as a physical object. The interface is intentionally quiet around the camera and final paper strip.

It rejects SaaS dashboard chrome, purple-blue gradients, glass decoration, fake proof, and marketing copy. The product voice is short, lowercase, and direct.

**Key Characteristics:**
- Camera preview and photo strip are the primary visual objects.
- Controls are flat, bordered, and compact, with tactile depth only on meaningful actions.
- Paper texture is reserved for the strip and physical print surfaces.
- Metadata uses monospace only where it behaves like a date stamp or booth label.

## Colors

The palette is warm off-white paper, black ink, warm gray utility text, and one muted shutter accent.

### Primary
- **Ink Black** (#171717): primary text, booth brand, active filter chips, primary download/enter actions.
- **Shutter Clay** (#b45b42): shutter center and urgent feedback, used sparingly.

### Neutral
- **Photo Paper** (#f4f1ea): page background and calm booth environment.
- **Deep Paper** (#e2ded3): subtle surface contrast.
- **Muted Warm Gray** (#706b61): metadata, helper copy, and low-emphasis labels.
- **Paper Line** (#c9c2b4): form borders and quiet dividers.
- **Print White** (#fdfcf7): raised paper/control surfaces.
- **Clean Print White** (#ffffff): print media background only, so browser print output is free of page tint.

### Named Rules
**The One Accent Rule.** Shutter Clay is for capture and error-adjacent moments; do not spread it across generic decoration.

## Typography

**Display Font:** "Trebuchet MS" with "Gill Sans" / "Avenir Next" fallbacks  
**Body Font:** same as display  
**Label/Mono Font:** "Courier New"

**Character:** Rounded editorial sans for approachable booth copy, with monospace reserved for session numbers, dates, and tiny printed marks.

### Hierarchy
- **Display** (600, large responsive Tailwind sizes, 1.02 line-height): homepage statement only.
- **Headline** (600, 30-36px): empty states and result room headings.
- **Body** (regular, 14-16px): concise instructions and error copy.
- **Label** (monospace, 10-12px): PHOTOBOX mark, session/date metadata, footer.

## Layout

Landing is a minimal two-object composition: copy/action on the left and a rotated strip preview on the right. Booth layout centers the 4:3 camera preview, then stacks filter carousel, compact selects, shutter, and thumbnails. Result layout gives the strip the left visual column and keeps customization controls in a quieter right column.

Mobile keeps a single column with the camera first, an intentionally horizontal filter carousel, full-width select controls, and compact thumbnails.

## Elevation & Depth

Depth is reserved for physical objects and tactile actions. Photo strips use soft ambient shadow. Primary buttons and the shutter use a small vertical press shadow that collapses on active state.

### Shadow Vocabulary
- **Tactile Press** (`0 3px 0 #171717, 0 14px 28px rgba(23, 23, 23, 0.12)`): enter, download, open camera, and shutter.
- **Paper Object** (`0 24px 45px rgba(23,23,23,.2)`): photo strip preview/result only.

## Shapes

Most controls are square-cornered or lightly physical. The only strong circle is the shutter button. Do not turn the whole UI into rounded cards; repeated photo thumbnails and paper strips may be framed because they represent objects.

## Components

### Buttons
- **Shape:** square corners for text actions, full circle for shutter.
- **Primary:** black ink background with paper text and tactile press shadow.
- **Secondary:** print-white or paper background with ink text and 1px border.
- **State:** active state translates down 2px and reduces shadow; disabled state lowers opacity.

### Filter Chips
- **Style:** horizontal text chips with 1px border.
- **Selected:** black fill and paper text.
- **Unselected:** paper fill, line border, ink text.

### Forms
- **Style:** full-width, square-corner selects/inputs with line border and print-white fill.
- **Labels:** lowercase muted labels above controls.

### Photo Strip
- **Style:** paper-textured object with realistic spacing, cover-cropped photos, tiny printed metadata, and optional paper colors.
- **Rule:** the strip is not a card. It should look printable and downloadable.

## Do's and Don'ts

Do keep copy short: "ready?", "start session", "that's a wrap."  
Do use canvas for the final downloadable image.  
Do keep camera and strip larger than the editor controls.

Don't use gradients, glass panels, nested cards, fake stats, testimonials, emoji, or generic AI startup language.  
Don't add decorative icon sets unless they replace a real control affordance.  
Don't upload or imply uploading user photos.
