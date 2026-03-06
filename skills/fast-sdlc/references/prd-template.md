# PRD Template & Writing Guide

## Success Metrics (must be quantifiable)

**Bad**: "Users like this feature"
**Good**: "DAU reaches 500 within 30 days of launch, average session duration > 3 minutes"

Common metric templates:
- **User growth**: Registered users, MAU/DAU
- **Engagement**: Session duration, key feature usage rate
- **Conversion**: Registration → paid conversion rate, funnel completion rate
- **Performance**: Core page LCP < 2.5s, API P99 < 500ms
- **Quality**: Error rate < 0.1%, support ticket rate < 1%

---

## Competitive Analysis Guide

Analyze 2–4 direct or indirect competitors:

| Competitor | Product Positioning | Key Features | Strengths | Weaknesses | Our Differentiation |
|------------|---------------------|--------------|-----------|------------|---------------------|

Tips:
- Focus on **direct competitors** (same market) and **indirect competitors** (alternative solutions)
- Identify gaps in competitor offerings that your product can fill
- Be honest about where competitors are stronger — this informs risk assessment

---

## User Story Quality Standards (INVEST)

- **Independent**: Stories should be as independent as possible, deliverable on their own
- **Negotiable**: Describe "what", not "how"
- **Valuable**: Each story has clear value to the user
- **Estimable**: Specific enough to estimate effort
- **Small**: Completable within one sprint
- **Testable**: Has clear acceptance criteria

Format: `As a [persona], I want [feature], so that [value]. Acceptance criteria: [specific conditions]`

---

## Feature Priority Classification

Use priority labels to communicate importance:

| Priority | Meaning | Guideline |
|----------|---------|-----------|
| **P0** (Must-have) | Product is unusable without it | Core hypothesis validation, critical user path |
| **P1** (Should-have) | Important but product can launch without it | Significant UX improvement, secondary flows |
| **P2** (Nice-to-have) | Enhances experience, low urgency | Polish, optimization, convenience features |
| **V2** (Deferred) | Explicitly out of MVP scope | Future roadmap items |

---

## User Journey Map Guide

Create a Mermaid flowchart for each primary persona's end-to-end experience:

```
flowchart LR
    A[Landing Page] --> B{Has Account?}
    B -- Yes --> C[Login]
    B -- No --> D[Sign Up]
    C --> E[Dashboard]
    D --> E
    E --> F[Core Action]
    F --> G[Success State]
```

Identify at each step:
- **Touchpoint**: What the user sees / interacts with
- **Decision point**: Where the user makes a choice
- **Pain point**: Where friction or drop-off is likely
- **Opportunity**: Where the product can delight

---

## MVP Scope Guidelines

**Include in MVP**:
- Features essential to validate the core hypothesis
- Minimum path for users to complete the primary task flow
- Features without which the product is unusable

**Defer to V2**:
- Experience enhancements that don't affect core flow (notifications, recommendations)
- Admin features, advanced analytics
- Social/sharing features
- Mobile optimization (if primary platform is web)

---

## Risk Assessment Guide

Identify 3–5 key risks across these categories:

| Category | Example Risks |
|----------|---------------|
| **Technical** | Third-party API reliability, performance at scale, data migration complexity |
| **Product** | Low user adoption, feature misalignment with market, poor retention |
| **Resource** | Team availability, skill gaps, budget constraints |
| **Timeline** | Scope creep, dependency delays, underestimated complexity |
| **Compliance** | Data privacy (GDPR/CCPA), accessibility requirements, industry regulations |

Rate each risk:
- **Impact**: High / Medium / Low
- **Probability**: High / Medium / Low
- **Mitigation**: Concrete action to reduce the risk

---

## Milestone Template

| Milestone | Scope | Owner / Role | Estimated Duration |
|-----------|-------|--------------|--------------------|
| M0 — Infrastructure | Project setup, CI/CD, database schema | Tech Lead | Scale with complexity |
| M1 — Core Features | MVP main flow (P0 features) | Full Team | Scale with complexity |
| M2 — Polish & Testing | Error handling, testing, UI refinement, P1 features | Full Team | Scale with complexity |
| M3 — Launch | Deployment, monitoring, beta testing | DevOps + PM | Scale with complexity |

**Duration scaling guidance**:
- Solo dev / simple app: M0 (2–3 days), M1 (1–2 weeks), M2 (3–5 days), M3 (1–2 days)
- Small team (2–3) / medium app: M0 (1 week), M1 (2–3 weeks), M2 (1 week), M3 (3 days)
- Larger team (4+) / complex app: M0 (1–2 weeks), M1 (4–6 weeks), M2 (2 weeks), M3 (1 week)

---

## Business Model Section Guide (if applicable)

Consider including:
- **Revenue model**: Subscription (SaaS), freemium, one-time purchase, transaction fee, advertising
- **Pricing tiers**: Free / Pro / Enterprise with feature breakdown
- **Cost structure**: Infrastructure, third-party services, team costs
- **Unit economics**: CAC (customer acquisition cost), LTV (lifetime value), payback period
