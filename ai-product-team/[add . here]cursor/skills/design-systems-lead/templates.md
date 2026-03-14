# Design Systems Lead — Output Templates

Use these structures for deliverables under `docs/design/design-system/`.

## Design Tokens

```markdown
---
title: Design Tokens
author-agent: design-systems-lead
date: YYYY-MM-DD
status: draft
---

# Design Tokens

## Colour
| Token | Value | Usage |
|-------|--------|-------|
| color.primary | #xxxxxx | Primary actions, links |
| color.surface | #xxxxxx | Backgrounds |
| color.text.primary | #xxxxxx | Body text |

## Typography
| Token | Value | Usage |
|-------|--------|-------|
| font.family.sans | [Family] | Body, UI |
| font.size.sm / md / lg | [Sizes] | [Usage] |
| font.weight.regular / medium / bold | [Weights] | [Usage] |

## Spacing
| Token | Value | Usage |
|-------|--------|-------|
| space.xs / sm / md / lg | [Values] | [Usage] |

## Motion (optional)
| Token | Value | Usage |
|-------|--------|-------|
| motion.duration.fast / normal / slow | [Values] | [Usage] |
| motion.easing.default | [Value] | [Usage] |

## Border radius, shadow, etc.
[Same table structure as above.]
```

## Component Architecture

```markdown
---
title: Component Architecture
author-agent: design-systems-lead
date: YYYY-MM-DD
status: draft
---

# Component Architecture

## Principles
- [e.g. Composition over configuration]
- [e.g. Tokens for all visual properties]

## Hierarchy
- **Primitives**: [Button, Input, Icon, …]
- **Composed**: [Card, FormField, …]
- **Patterns**: [Header, SearchBar, …]

## Theming
- [How themes (light/dark, brand) map to tokens]

## Variants & Props
- Naming: [e.g. size="sm|md|lg", variant="primary|secondary"]
- State: [e.g. disabled, loading, error]
```

## Component Specification

```markdown
---
title: Component — [ComponentName]
author-agent: design-systems-lead
date: YYYY-MM-DD
status: draft
---

# [ComponentName]

## Purpose
[One sentence.]

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | primary \| secondary | primary | Visual variant |
| size | sm \| md \| lg | md | Size scale |

## Variants
- [Variant 1]: [When to use]
- [Variant 2]: [When to use]

## States
- Default, Hover, Focus, Active, Disabled, Loading, Error (as applicable)

## Tokens Used
- [Token 1], [Token 2], …

## Accessibility
- [Focus order, ARIA, keyboard, screen reader requirements — from Accessibility Lead or standards]

## Usage Notes
- [Do / don't; composition examples]
```
