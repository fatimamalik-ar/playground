# FE-03 Assignment Notes: Custom Implementation vs shadcn/ui

## Concrete Gaps Identified

1. **Focus Trapping Edge Cases & Portals**
   - *My Version:* Focus trapping uses a manual `querySelectorAll` utility loop. It can fail if focusable children dynamically change or contain hidden structures.
   - *shadcn/ui Version:* Uses Radix UI's Primitive FocusScope and Portal mechanisms, which guarantee that screen readers do not read content underneath the modal back-stack backdrop overlay.

2. **Keyboard Selection & State Configurations**
   - *My Version:* The navigation mechanism automatically activates tabs on arrow hover keys (Automatic Activation).
   - *shadcn/ui Version:* Supports dynamic customization configs allowing users to toggle between automatic and manual selection modes seamlessly via standard attributes.
