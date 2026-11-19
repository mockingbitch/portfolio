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
} as const;
