# Arbling UI/UX Skill

Framer Motion component library for Arbling products: SaaS dashboards, e-commerce/retail SaaS, AI infrastructure, agentic commerce, and jewelry commerce interfaces.

**179 production-ready components.** When building UI, pick the closest matching component from the categories below, read its file from `components/demos/`, and adapt to the project stack.

## Current Arbling design contract (2026-10-21): read first

These components are references to adapt. They never override an approved design.

- **Order of authority.** First the approved Figma frames and copy. Then the surface's own contract: Scoring `/app` has `DESIGN.md` and `AGENTS.md` section 7; arbling-site has its Figma frames and `src/styles`. This library comes last. When a component and a frame disagree, the frame wins.
- **One generation skill per task:** `design-taste-frontend` or `hallmark`, never both (the skill router enforces this). Audit with `impeccable` and `kill-ai-slop`, and polish motion with `emil-design-eng`.
- **Motion.** Compositor properties only (`transform`, `opacity`). Product micro-interactions take 150-220 ms. Every animation needs a `prefers-reduced-motion` branch that renders the final state. The product loads with no page-load choreography. Both repos import from `'framer-motion'`, never from `motion/react`; the demos here already do.
- **Visuals on Arbling surfaces.** One accent. No gradient text, no aurora, meteor or mesh backgrounds, no glow blobs, and no stacked effects. Use tokens only. Empty states are honest: never show fake numbers.
- **Fonts.** Each surface keeps its own pair. PP Fragment is licensed and must never be redistributed.
- **Cabinet copy.** Never write "недоступно", "скоро", "пока нет", "not yet", "not available" or "coming soon". An unfinished feature uses "Получить ранний доступ" / "Get early access".
- **React Bits.** Install only through the shadcn registry (`npx shadcn@latest add @react-bits/<Name>-TS-TW`), one component when a task needs it, then rewrite it to `framer-motion` and our tokens.
  - Plausible fits: CountUp (real numbers only), check or status micro-feedback, LogoLoop (landing, real logos), Stepper.
  - Never the components built on gsap, ogl or three.
  - The license is MIT plus Commons Clause, so keep them out of OJS, public repos and anything shipped to merchants (widget, SDK, theme).
- **GSAP.** Not used; the verdict is "skip by default".
- **Accessibility.** WCAG AA contrast, a visible focus state, 44 px targets and keyboard paths.

Sources: Brain `wiki/cto/design-tooling-audit-2026-10-21.md`; Scoring `DESIGN.md` and `AGENTS.md` section 7; `~/.claude/rules/web/design-quality.md`.

## How to use

1. User requests a UI element or page
2. Find the best match in the category map below
3. Read the component file: `components/demos/<ComponentName>.jsx`
4. Adapt it to the project stack (Next.js/React/Tailwind) and the contract above: a Figma frame always wins

---

## Category Map

### Landing Pages & Hero Sections
*Use for: SaaS landing, jewelry store front, AI product pages*

| Component | File | Best for |
|-----------|------|----------|
| Hero — centered, text focus | `HeroCenteredDemo.jsx` | SaaS generic landing |
| Hero — split layout | `HeroSplitDemo.jsx` | SaaS product + visual |
| Hero — with stats | `HeroStatsDemo.jsx` | SaaS with social proof numbers |
| Hero — with cards | `HeroCardsDemo.jsx` | Multi-product or feature showcase |
| Hero — gradient background | `HeroGradientDemo.jsx` | AI/tech products |
| Hero — interactive | `HeroInteractiveDemo.jsx` | Demo-first SaaS |
| Hero — product showcase | `HeroProductDemo.jsx` | E-commerce, jewelry product launch |
| Hero — marquee strip | `HeroMarqueeDemo.jsx` | Logo clouds, customer names |
| Hero — parallax | `HeroParallaxDemo.jsx` | Premium jewelry, retail SaaS |
| Hero — badge/chip | `HeroBadgeDemo.jsx` | "Now in beta", "AI-powered" label |
| CTA section | `CTADemo.jsx` | Any conversion section |
| Bento grid | `BentoDemo.jsx` | Feature showcase grid |
| Bento grid (advanced) | `BentoGridDemo.jsx` | SaaS feature matrix |
| Feature grid | `FeatureGridDemo.jsx` | 3-6 feature cards |
| Feature showcase | `FeatureShowcaseDemo.jsx` | Interactive feature walkthrough |
| Feature tabs | `FeatureTabsDemo.jsx` | Tabbed feature comparison |
| Logo cloud | `LogoCloudDemo.jsx` | Integrations / partner logos |
| Social proof | `SocialProofDemo.jsx` | Customer logos + stats |
| Testimonials | `TestimonialsDemo.jsx` | Customer quotes |
| Testimonial wall | `TestimonialWallDemo.jsx` | Masonry testimonial grid |
| Pricing table | `PricingDemo.jsx` | SaaS pricing tiers |
| Comparison table | `ComparisonTableDemo.jsx` | Plan comparison |
| FAQ | `FAQDemo.jsx` | Landing FAQ accordion |
| Newsletter signup | `NewsletterDemo.jsx` | Email capture |
| Footer | `FooterDemo.jsx` | Site footer |
| App store badges | `AppStoreDemo.jsx` | Mobile app CTAs |

---

### E-Commerce & Jewelry Commerce
*Use for: product pages, catalog, cart, checkout, jewelry browsing*

| Component | File | Best for |
|-----------|------|----------|
| Shopping cart | `ShoppingCartDemo.jsx` | Cart sidebar/modal |
| Checkout form | `CheckoutFormDemo.jsx` | Multi-step checkout |
| Order tracking | `OrderTrackingDemo.jsx` | Order status page |
| Product card 3D | `Card3DDemo.jsx` | Jewelry product card with depth |
| Flip card 3D | `FlipCard3DDemo.jsx` | Product front/back reveal |
| 3D carousel | `Carousel3DDemo.jsx` | Product gallery carousel |
| Tilt gallery 3D | `TiltGallery3DDemo.jsx` | Jewelry photo gallery with tilt |
| Photo gallery | `PhotoGalleryDemo.jsx` | Product image grid |
| Image grid | `ImageGridDemo.jsx` | Collection/catalog grid |
| Search bar | `SearchBarDemo.jsx` | Product search |
| Search + filter | `SearchFilterDemo.jsx` | Faceted search (style, metal, price) |
| Rating input | `RatingInputDemo.jsx` | Product review stars |
| Review card | `ReviewCardDemo.jsx` | Individual review display |
| Reorder (drag) | `ReorderDemo.jsx` | Wishlist reordering |
| Horizontal scroll | `HScrollDemo.jsx` | Product row scroll (mobile) |
| Layered stack 3D | `LayeredStack3DDemo.jsx` | Stacked product/collection reveal |
| Countdown | `CountdownDemo.jsx` | Sale timer, product launch |
| Book 3D | `Book3DDemo.jsx` | Lookbook / catalog flip |
| Holographic | `HolographicDemo.jsx` | Premium jewelry visual effect |
| Floating 3D | `Floating3DDemo.jsx` | Hero product floating animation |
| Share buttons | `ShareButtonsDemo.jsx` | Product sharing |

---

### Analytics & Dashboards
*Use for: SaaS dashboards, merchant analytics, agentic commerce metrics*

| Component | File | Best for |
|-----------|------|----------|
| Stats dashboard | `StatsDashboardDemo.jsx` | Main dashboard overview |
| Stats counter | `StatsCounterDemo.jsx` | Animated KPI numbers |
| Area chart | `AreaChartDemo.jsx` | Revenue over time |
| Bar chart | `BarChartDemo.jsx` | Comparison metrics |
| Line chart | `LineChartDemo.jsx` | Trend visualization |
| Multi-line chart | `MultiLineChartDemo.jsx` | Multiple metric trends |
| Donut chart | `DonutChartDemo.jsx` | Distribution breakdown |
| Radar chart | `RadarChartDemo.jsx` | Multi-dimension scoring |
| Scatter plot | `ScatterPlotDemo.jsx` | Correlation analysis |
| Histogram | `HistogramDemo.jsx` | Distribution chart |
| Progress chart | `ProgressChartDemo.jsx` | Goal progress |
| Progress bar | `ProgressDemo.jsx` | Single metric progress |
| Live gauge | `LiveGaugeDemo.jsx` | Real-time metric gauge |
| Portfolio pie | `PortfolioPieDemo.jsx` | Allocation breakdown |
| Gantt chart | `GanttChartDemo.jsx` | Timeline / sprint view |
| Data table | `DataTableDemo.jsx` | Tabular data with sort/filter |
| Kanban board | `KanbanBoardDemo.jsx` | Task/deal pipeline |

---

### AI Infrastructure & Agentic Commerce
*Use for: AI agent interfaces, workflow builders, MCP integrations, agent monitoring*

| Component | File | Best for |
|-----------|------|----------|
| Node canvas | `NodeCanvasDemo.jsx` | Visual workflow / agent graph |
| Node connections | `NodeConnectionsDemo.jsx` | Agent-to-agent connections |
| Node execution | `NodeExecutionDemo.jsx` | Live agent execution state |
| Node grouping | `NodeGroupingDemo.jsx` | Agent cluster grouping |
| Node inspector | `NodeInspectorDemo.jsx` | Node detail panel |
| Node minimap | `NodeMinimapDemo.jsx` | Workflow overview minimap |
| Node palette | `NodePaletteDemo.jsx` | Available node types sidebar |
| Node search | `NodeSearchDemo.jsx` | Search workflow nodes |
| Node templates | `NodeTemplatesDemo.jsx` | Workflow template picker |
| Node validation | `NodeValidationDemo.jsx` | Error state on nodes |
| Workflow builder | `WorkflowBuilderDemo.jsx` | Drag-and-drop workflow editor |
| Workflow debugger | `WorkflowDebuggerDemo.jsx` | Step-through debugging UI |
| Workflow metrics | `WorkflowMetricsDemo.jsx` | Workflow performance stats |
| Workflow scheduler | `WorkflowSchedulerDemo.jsx` | Cron / trigger scheduling |
| Workflow steps | `WorkflowStepsDemo.jsx` | Linear step-by-step flow |
| Workflow templates | `WorkflowTemplateDemo.jsx` | Template selection UI |
| Workflow timeline | `WorkflowTimelineDemo.jsx` | Execution history timeline |
| Workflow variables | `WorkflowVariablesDemo.jsx` | Variable editor/inspector |
| Workflow versions | `WorkflowVersionsDemo.jsx` | Version history |
| Automation trigger | `AutomationTriggerDemo.jsx` | Event trigger setup |
| Condition builder | `ConditionBuilderDemo.jsx` | If/then rule builder |
| Execution history | `ExecutionHistoryDemo.jsx` | Run history log |
| Action library | `ActionLibraryDemo.jsx` | Available action catalog |
| Data mapper | `DataMapperDemo.jsx` | Field mapping UI |
| Integration panel | `IntegrationPanelDemo.jsx` | Third-party integrations |
| Webhook tester | `WebhookTesterDemo.jsx` | Webhook debug/test UI |
| Feed stream | `FeedStreamDemo.jsx` | Real-time event stream |
| Log viewer | `LogViewerDemo.jsx` | Scrollable log output |
| Server status | `ServerStatusDemo.jsx` | Service health indicators |
| Terminal | `TerminalDemo.jsx` | CLI-style output panel |
| Code editor | `CodeEditorDemo.jsx` | Inline code editing |
| Code snippet | `CodeSnippetDemo.jsx` | Syntax-highlighted code display |
| API docs | `APIDocsDemo.jsx` | Endpoint documentation UI |
| Database view | `DatabaseViewDemo.jsx` | Table/schema browser |

---

### AI Chat & Voice Interfaces
*Use for: AI Sales Agent (WhatsApp/web), jewelry assistant, agentic chat UI*

| Component | File | Best for |
|-----------|------|----------|
| Chat interface | `ChatInterfaceDemo.jsx` | Full chat UI with history |
| Conversation history | `ConversationHistoryDemo.jsx` | Past conversations list |
| Voice chat widget | `VoiceChatWidgetDemo.jsx` | Voice-enabled AI chat |
| Voice orb | `VoiceOrbDemo.jsx` | Animated AI listening state |
| Voice orb nebula | `VoiceOrbNebulaDemo.jsx` | Premium animated voice UI |
| Voice activity | `VoiceActivityDemo.jsx` | Waveform / voice detection |
| Live transcription | `LiveTranscriptionDemo.jsx` | Real-time speech-to-text display |
| Call status | `CallStatusDemo.jsx` | Active/connecting/ended states |
| Typing cursor | `TypingCursorDemo.jsx` | AI typing indicator |
| Typewriter | `TypewriterDemo.jsx` | Streaming text reveal |
| Text generate | `TextGenerateDemo.jsx` | Word-by-word text animation |

---

### SaaS Navigation & Layout
*Use for: dashboards, admin panels, merchant portals*

| Component | File | Best for |
|-----------|------|----------|
| Side menu | `SideMenuDemo.jsx` | Dashboard sidebar nav |
| Mega menu | `MegaMenuDemo.jsx` | Top nav with dropdowns |
| Dock (macOS style) | `DockDemo.jsx` | App icon dock navigation |
| Tab bar | `TabBarDemo.jsx` | Mobile-style tab navigation |
| Tabs | `TabsDemo.jsx` | Content tabs |
| Breadcrumb | `BreadcrumbNavDemo.jsx` | Page hierarchy trail |
| Pagination | `PaginationDemo.jsx` | Table/list pagination |
| Fab button | `FabDemo.jsx` | Floating action button |
| Accordion | `AccordionDemo.jsx` | Collapsible sections |
| Toggle group | `ToggleGroupDemo.jsx` | Multi-option toggle |
| Settings panel | `SettingsPanelDemo.jsx` | App settings UI |
| File manager | `FileManagerDemo.jsx` | Asset/file browser |
| Email client | `EmailClientDemo.jsx` | Inbox-style UI |

---

### SaaS Forms & User Management
*Use for: onboarding, user profiles, merchant setup*

| Component | File | Best for |
|-----------|------|----------|
| Form wizard | `FormWizardDemo.jsx` | Multi-step onboarding |
| Approval flow | `ApprovalFlowDemo.jsx` | Review/approve workflow |
| Upload zone | `UploadZoneDemo.jsx` | Drag-and-drop file upload |
| User card | `UserCardDemo.jsx` | Team member card |
| User profile | `UserProfileDemo.jsx` | Profile page |
| Team grid | `TeamGridDemo.jsx` | Team/member grid |
| Contacts list | `ContactsListDemo.jsx` | CRM contact list |
| Comment section | `CommentSectionDemo.jsx` | Threaded comments |
| Error handling | `ErrorHandlingDemo.jsx` | Form error states |
| Calendar widget | `CalendarWidgetDemo.jsx` | Date picker / mini calendar |
| Event calendar | `EventCalendarDemo.jsx` | Full event calendar |

---

### Notifications & Real-time
*Use for: live updates, alerts, activity feeds*

| Component | File | Best for |
|-----------|------|----------|
| Notification center | `NotificationCenterDemo.jsx` | Full notification inbox |
| Notification list | `NotificationListDemo.jsx` | Notification list panel |
| Notifications | `NotificationsDemo.jsx` | Toast/popup notifications |
| Badge grid | `BadgeGridDemo.jsx` | Status badge collection |
| Counter | `CounterDemo.jsx` | Animated number increment |

---

### Animation Primitives
*Use these directly on any element — core Framer Motion patterns*

| Component | File | What it demonstrates |
|-----------|------|---------------------|
| Blur fade | `BlurFadeDemo.jsx` | Fade in with blur (entrance) |
| Stagger | `StaggerDemo.jsx` | List items staggered entrance |
| Reveal | `RevealDemo.jsx` | Scroll-triggered reveal |
| Flip | `FlipDemo.jsx` | 180° flip transition |
| Parallax | `ParallaxDemo.jsx` | Scroll-linked parallax |
| Scroll progress | `ScrollProgressDemo.jsx` | Scroll progress indicator |
| Clip path | `ClipPathDemo.jsx` | Clip-path reveal animation |
| Stack | `StackDemo.jsx` | Cards stacking/unstacking |
| Unfold | `UnfoldDemo.jsx` | Accordion-style unfold |
| Path draw | `PathDrawDemo.jsx` | SVG path draw animation |
| Gesture | `Gesture2Demo.jsx` | Drag, swipe gesture patterns |
| Magnetic | `MagneticDemo.jsx` | Cursor-attracted magnetic effect |
| Cursor | `CursorDemo.jsx` | Custom cursor with trail |
| Ripple | `RippleDemo.jsx` | Click ripple effect |

---

### Visual Effects & Backgrounds
*Use for: landing page backgrounds, hero effects, premium feel*

| Component | File | Best for |
|-----------|------|----------|
| Aurora | `AuroraDemo.jsx` | Animated aurora background |
| Aurora borealis | `AuroraBorealisDemo.jsx` | Richer aurora effect |
| Particles | `ParticlesDemo.jsx` | Floating particle field |
| Meteors | `MeteorsDemo.jsx` | Shooting meteor effect |
| Star field | `StarFieldDemo.jsx` | Deep-space star background |
| Gradient follow | `GradientFollowDemo.jsx` | Cursor-following gradient |
| Glass | `GlassDemo.jsx` | Glassmorphism card/panel |
| Holographic | `HolographicDemo.jsx` | Iridescent holographic surface |
| Orbit | `OrbitDemo.jsx` | Orbiting elements (tech/AI visual) |
| Pulse rings | `PulseRingsDemo.jsx` | Pulsing ring effect (status, live) |
| Border beam | `BorderBeamDemo.jsx` | Animated border light sweep |
| Shimmer button | `ShimmerButtonDemo.jsx` | Shimmer CTA button |
| Spotlight card | `SpotlightCardDemo.jsx` | Mouse-spotlight card effect |
| Cube 3D | `Cube3DDemo.jsx` | Rotating 3D cube |
| Button 3D | `Button3DDemo.jsx` | 3D press button |

---

### Text Animations
*Use for: hero headlines, section titles, AI typing effects*

| Component | File | Effect |
|-----------|------|--------|
| Gradient text | `GradientTextDemo.jsx` | Animated gradient on text |
| Split text | `SplitTextDemo.jsx` | Letter-by-letter split entrance |
| Wavy text | `WavyTextDemo.jsx` | Wave motion on characters |
| Scramble | `ScrambleDemo.jsx` | Matrix scramble → reveal |
| Word pull up | `WordPullUpDemo.jsx` | Words pull up into view |
| Velocity scroll | `VelocityScrollDemo.jsx` | Scroll-velocity text marquee |
| Marquee | `MarqueeDemo.jsx` | Infinite horizontal scroll text |

---

### Skeleton & Loading States
| Component | File | Best for |
|-----------|------|----------|
| Skeleton | `SkeletonDemo.jsx` | Content placeholder loading |

---

## Usage by Arbling Product

### Visual Search & Product Discovery (jewelry)
Primary: `SearchBarDemo`, `SearchFilterDemo`, `TiltGallery3DDemo`, `PhotoGalleryDemo`, `ImageGridDemo`, `Card3DDemo`, `Carousel3DDemo`, `HeroProductDemo`
Supporting: `SkeletonDemo`, `ReorderDemo`, `HScrollDemo`, `BlurFadeDemo`, `StaggerDemo`

### AI Sales Agent (chat UI)
Primary: `ChatInterfaceDemo`, `VoiceChatWidgetDemo`, `VoiceOrbDemo`, `ConversationHistoryDemo`, `TypewriterDemo`, `TypingCursorDemo`
Supporting: `TextGenerateDemo`, `LiveTranscriptionDemo`, `VoiceActivityDemo`, `NotificationsDemo`

### Data Enrichment Dashboard
Primary: `StatsDashboardDemo`, `DataTableDemo`, `ProgressDemo`, `StatsCounterDemo`, `SearchFilterDemo`
Supporting: `BarChartDemo`, `LineChartDemo`, `SkeletonDemo`, `BadgeGridDemo`, `ServerStatusDemo`

### Agentic Commerce / MCP Layer
Primary: `NodeCanvasDemo`, `WorkflowBuilderDemo`, `FeedStreamDemo`, `AutomationTriggerDemo`, `ConditionBuilderDemo`
Supporting: `ExecutionHistoryDemo`, `WorkflowMetricsDemo`, `LogViewerDemo`, `ServerStatusDemo`, `IntegrationPanelDemo`

### Arbling Landing Page / Marketing Site
arbling-site follows its Figma frames, section by section. Use a component here only for an interaction the frame does not define:
Allowed: `FAQDemo` (accordion), `PricingDemo` / `ComparisonTableDemo` (plan tables), `LogoCloudDemo` (real logos only), `StatsCounterDemo` (real numbers only), `CTADemo`
Never on arbling-site: `HeroGradientDemo`, `AuroraDemo`, `AuroraBorealisDemo`, `MeteorsDemo`, `GradientTextDemo`

### Merchant Onboarding (Shopify SaaS)
Primary: `FormWizardDemo`, `WorkflowStepsDemo`, `IntegrationPanelDemo`, `TimelineDemo`
Supporting: `ProgressDemo`, `CheckoutFormDemo`, `UploadZoneDemo`, `NotificationsDemo`

---

## Anti-Patterns (never use for Arbling)

- No `BreathingDemo` (wellness only)
- No `PomodoroDemo` (productivity timer)
- No `WeatherWidgetDemo` (consumer widget)
- No `Cube3DDemo` as main feature — only as subtle background element
- Avoid heavy 3D on mobile-first jewelry flows (use `Card3DDemo` with reduced motion fallback)
- No matrix/glitch effects (`ScrambleDemo` is ok for AI typing; `MatrixRain` was removed)
- Don't stack more than 2 visual effects on same section (e.g., Aurora + Meteors = too much)
- No gradient text, aurora/meteor/mesh backgrounds or glow blobs on any Arbling surface (see the contract at the top)
- No component that needs gsap, three or ogl: our motion library is `framer-motion`
