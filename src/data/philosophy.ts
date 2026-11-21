export const philosophy = {
  lead: 'Good software is rarely the product of a clever feature. It is the product of a system that keeps behaving well when the load, the team and the requirements change.',
  body: [
    'I care about the whole path a request takes — from the edge, through the gateway and the services behind it, down to the database and back — and about the people who have to run that path at three in the morning.',
    'That shapes how I work: start from the problem and its constraints, choose the simplest architecture that honestly meets them, and make the result observable, secure and easy to change.',
  ],
  principles: [
    {
      title: 'Think in systems, not isolated features',
      description:
        'Every feature lands inside an existing system. I design for the interactions — data flow, failure modes, ownership — not just the happy path of a single endpoint.',
    },
    {
      title: 'Build for reliability, security and maintainability',
      description:
        'These are properties you design in, not polish you add later. Clear boundaries, explicit contracts and boring defaults age better than heroics.',
    },
    {
      title: 'Understand infrastructure beyond application code',
      description:
        'Code only matters once it runs. Knowing the network, the runtime and the deployment pipeline is part of writing software that behaves in production.',
    },
    {
      title: 'Balance engineering excellence with business requirements',
      description:
        'Architecture is a means. The right answer depends on the deadline, the team and what the product actually needs to prove next.',
    },
    {
      title: 'Prefer pragmatic architecture over unnecessary complexity',
      description:
        'Complexity has to earn its place. I reach for distribution, abstraction and new tooling when the problem demands it — not before.',
    },
  ],
  /**
   * Technical interests, shown on the About page.
   * TODO: these are drawn from the project list; adjust to what you are actually exploring.
   */
  interests: [
    {
      title: 'Agent orchestration and tool access',
      description: 'How AI agents call tools safely: identity, authorization and execution across service boundaries.',
    },
    {
      title: 'Workload identity',
      description: 'Replacing network trust with verifiable identity — certificates, short-lived credentials and policy.',
    },
    {
      title: 'Time, scheduling and consistency',
      description: 'Systems where when something takes effect matters as much as what changes.',
    },
    {
      title: 'Infrastructure-aware application design',
      description: 'Writing services with the runtime, the network and the deployment pipeline in mind from the start.',
    },
  ],
  /** How I work with other people, shown on the About page. */
  collaboration: [
    {
      title: 'Write it down',
      description: 'Decisions, trade-offs and context belong in documents, not in memory. A written record lets a team disagree productively and revisit choices later.',
    },
    {
      title: 'Make the reasoning reviewable',
      description: 'A proposal should show the options that were rejected and why. People can only challenge reasoning they can see.',
    },
    {
      title: 'Raise the floor, not just the ceiling',
      description: 'Standards, templates and review habits that help every engineer ship well matter more than one impressive component.',
    },
    {
      title: 'Stay close to the code',
      description: 'Architecture that is not informed by implementation drifts. Staying hands-on keeps design decisions honest.',
    },
  ],
} as const;
