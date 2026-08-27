# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

confirmed by brief: Next.js App Router, TypeScript, Tailwind CSS, browser camera APIs, Canvas API, no backend unless necessary.

## Users

Inferred from brief: people using a phone or laptop who want a playful digital photo booth session that feels closer to stepping into a real photobox than opening a plain webcam utility.

## Product Purpose

Photobox lets users open their camera, take a timed sequence of photos, preview them with filters, compose the results into a printable photo strip, then download or print the final image locally.

## Positioning

The product is a client-side photobooth experience centered on the ritual of entering a booth, counting down, capturing several shots, and leaving with a physical-feeling strip.

## Operating Context

The main workflow is: landing page, enter booth, choose capture count, timer, layout, filter, run countdown captures, arrive in the print room, customize paper, layout, date, caption, retake individual photos, download PNG, or open the browser print dialog.

## Capabilities and Constraints

All photo handling should remain on-device in the browser. Camera access uses `navigator.mediaDevices.getUserMedia()` with permission, unsupported browser, missing camera, camera switching, mirrored selfie preview, stream cleanup, repeated-click guarding, incomplete photo, canvas loading, and print edge cases handled with clear human copy.

## Brand Commitments

Name: PHOTOBOX. Voice: short, natural, playful, and not AI-sounding. Binding references from brief: Japanese/Korean photo booth, analog camera, disposable camera, film photography, old-school photobooth, editorial minimalism, slight retro 2000s, clean modern typography.

## Evidence on Hand

The full product brief lives in `instruction.plan.md`. No provided photography, logo, sound asset, testimonials, or commercial claims; future work should not fabricate proof.

## Product Principles

Make the camera preview the main object.
Keep the capture ritual legible and tactile.
Make the final strip feel physical, not like a dashboard card.
Keep privacy obvious without adding friction.
Prefer compact, human copy over marketing language.

## Accessibility & Inclusion

Inferred requirement: controls must be keyboard accessible, focus states visible, button labels semantic, errors recoverable, and mobile layouts free of accidental horizontal overflow.
