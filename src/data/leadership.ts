/**
 * Technical leadership areas.
 *
 * `approach` and `practices` describe how each area is handled. `record` lists
 * where it was actually done (from the resume). `evidence` links to artefacts
 * that prove it — a roadmap, a standard, an ADR, a write-up.
 * TODO: add evidence links as artefacts become publishable.
 */
export interface LeadershipArea {
  id: string;
  title: string;
  approach: string;
  practices: string[];
  /** Where this was done in practice. */
  record?: string[];
  /** Internal paths (ending in "/") or absolute URLs. */
  evidence?: { label: string; href: string }[];
}

export const leadership: LeadershipArea[] = [
  {
    id: 'roadmaps',
    title: 'Technical Roadmaps',
    approach:
      'A roadmap is a sequence of bets, each tied to a product or reliability outcome. It should say what will not be done as clearly as what will.',
    practices: [
      'Start from business outcomes and constraints, not from technologies.',
      'Sequence work so each step delivers value and reduces risk for the next.',
      'Revisit on a fixed cadence; a roadmap that never changes is not being used.',
    ],
    record: [
      'Drove technical planning and long-term architecture decisions across the product at tabtab.me.',
      'Evaluate emerging technologies and introduce them into engineering workflows at HQGroups.',
    ],
  },
  {
    id: 'governance',
    title: 'Architecture Governance',
    approach:
      'Governance exists to keep decisions consistent and reversible where possible — not to route every choice through one person.',
    practices: [
      'Record significant decisions as ADRs with the alternatives considered.',
      'Define a small set of non-negotiables; leave the rest to teams.',
      'Review designs early, when changing direction is still cheap.',
    ],
    record: [
      'Led technical architecture and system design at HQGroups and tabtab.me.',
      'Defined the system architecture and service structure for X-Purchase, PayIn and the tabtab.me platform.',
    ],
  },
  {
    id: 'standards',
    title: 'Engineering Standards',
    approach:
      'Standards are worth having when they remove a recurring decision. They should be enforced by tooling wherever possible, and explained wherever not.',
    practices: [
      'Automate formatting, linting and type checks so reviews can focus on design.',
      'Provide templates for services, pipelines and documents.',
      'Keep the standard short enough that people actually read it.',
    ],
    record: [
      'Established coding standards, architecture guidelines and engineering best practices across development teams at HQGroups and tabtab.me.',
    ],
  },
  {
    id: 'code-review',
    title: 'Code Review Practices',
    approach:
      'Review is where a team’s shared understanding is built. Its purpose is correctness, clarity and knowledge transfer — in that order.',
    practices: [
      'Review the design before the diff: small changes, clear intent.',
      'Distinguish blocking issues from preferences explicitly.',
      'Explain the why in comments, so the review teaches as well as corrects.',
    ],
    record: [
      'Established code review practices at HQGroups and tabtab.me.',
      'Led code review, deployment and production troubleshooting on X-Purchase and PayIn.',
    ],
  },
  {
    id: 'technical-debt',
    title: 'Technical Debt Management',
    approach:
      'Debt is a financing decision. It is acceptable when taken deliberately, recorded, and repaid before the interest exceeds the benefit.',
    practices: [
      'Keep a visible register of known debt with its cost and its trigger for repayment.',
      'Attach repayment to related feature work rather than deferring it to a rewrite.',
      'Measure the cost in incidents, lead time or onboarding effort — not in opinions.',
    ],
  },
  {
    id: 'mentoring',
    title: 'Mentoring',
    approach:
      'The goal is engineers who make good decisions without supervision. That comes from sharing reasoning, not from handing out answers.',
    practices: [
      'Pair on design, not only on debugging.',
      'Delegate ownership of real decisions, with a safety net.',
      'Give feedback that is specific, timely and about the work.',
    ],
    record: [
      'Mentored an 11-member cross-functional development team at tabtab.me.',
      'Taught PHP, object-oriented programming, MVC and Laravel at Techmaster from 2023 to 2025, designing the course materials and exercises.',
    ],
  },
  {
    id: 'collaboration',
    title: 'Cross-team Technical Collaboration',
    approach:
      'Most hard problems sit on the boundary between teams. Clear interfaces and written agreements matter more there than anywhere else.',
    practices: [
      'Agree contracts first: API, ownership, failure behaviour and on-call.',
      'Use shared documents for proposals so every team can comment asynchronously.',
      'Translate technical trade-offs into consequences other functions can weigh.',
    ],
    record: [
      'Worked closely with QA, project management and client-side teams on systems for clients in Japan and the United States at NTQ Solution.',
    ],
  },
];
