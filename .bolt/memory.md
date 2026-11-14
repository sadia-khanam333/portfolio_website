# Project memory

## Product intent & audience

- Personal portfolio site for Tahmina, centered on visual design, technology, and motion work.
- Audience likely includes prospective employers, clients, and collaborators evaluating creative/technical capabilities.
- A dedicated “Character Motion” section showcases 3D animation work as part of the portfolio.
- Current motion content is intended to communicate both personality (waving goodbye) and professional workflow (typing at a desk).

## Brand personality & voice

- Polished, modern, technically confident, and welcoming.
- Balances cinematic presentation with clear portfolio storytelling.
- Character moments should feel friendly and human without undermining the professional tone.
- Labels and supporting copy should remain concise and descriptive.

## Visual design & UX direction

- Existing portfolio direction is dark, motion-focused, and aligned with a modern tech aesthetic.
- Motion content is presented as a dedicated section with two scene/story beats:
  - Standing in a modern office and waving goodbye to camera.
  - Sitting at a desk and typing with a focused professional expression.
- Use a responsive video presentation with strong visual hierarchy, scene labels, and polished spacing.
- The supplied MP4 is used as an autoplaying, muted, looping preview with native playback controls and a portrait poster fallback.
- Motion should feel cinematic but remain usable: provide controls, avoid relying on audio, and ensure layouts work across desktop and mobile.
- Main navigation includes a “Motion” destination and has been checked for desktop/mobile reachability.
- Prefer subtle, integrated presentation over a visually isolated media embed.

## Decisions, constraints & rationale

- The character concept is based on the requested reference: 3D Pixar-style appearance, white hijab, navy blazer, dark red top, and black trousers.
- The supplied video URL (`https://i.imgur.com/pEpHzn7.mp4`) is currently embedded as the looping motion preview.
- The implementation is in the existing Vite/React portfolio and builds successfully.
- The current clip supports the motion section, but it does not yet provide a separate, distinct typing-animation video.
- A dedicated source for the typing scene is still required before it can be shown as its own independent clip.
- Preserve the existing portfolio’s dark visual language and responsive behavior when extending the motion section.
- Use existing project conventions and components rather than introducing unnecessary dependencies.

## Open questions & assumptions

- The supplied MP4’s exact scene coverage is assumed to support the waving/character preview; verify whether it contains both requested actions.
- Need a separate video URL or asset for the desk-typing animation if it must appear as a distinct playable scene.
- Confirm whether the reference image itself is available in the project for consistent character matching and poster usage.
- Confirm whether the character motion should loop continuously in the final presentation or also offer an explicit one-shot playback mode.
- Accessibility details for video labels, poster alt text, and reduced-motion behavior may need a final pass.
