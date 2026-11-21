/**
 * Earlier client and product work, newest first. Listed on /projects/ below
 * the full case studies. Source: the resume in /public. Clients are described
 * by region or sector rather than by name.
 */
import type { ProjectGroupId } from '@/data/projectGroups';

export interface ClientProject {
  period: string;
  name: string;
  role: string;
  client: string;
  teamSize: number;
  /** Filter group on /projects/. */
  group: ProjectGroupId;
  description: string;
  stack: string[];
}

export const clientWork: ClientProject[] = [
  {
    period: '05/2024 — 01/2025',
    name: 'HR Solutions',
    role: 'Developer',
    client: 'Client in Japan',
    teamSize: 14,
    group: 'platforms',
    description: 'Recruitment platform connecting employers with suitable candidates.',
    stack: ['Laravel', 'Elasticsearch', 'AWS EC2', 'AWS S3'],
  },
  {
    period: '02/2024 — 05/2024',
    name: 'Ebase',
    role: 'Developer',
    client: 'Client in Japan',
    teamSize: 12,
    group: 'platforms',
    description: 'Internal information management platform for the organisation.',
    stack: ['NestJS', 'React', 'Docker', 'AWS EC2', 'AWS ECS'],
  },
  {
    period: '10/2023 — 02/2024',
    name: 'Shipping it now',
    role: 'Developer',
    client: 'Client in the United States',
    teamSize: 30,
    group: 'commerce',
    description: 'Shipping management system for logistics companies to optimise delivery and order tracking.',
    stack: ['Laravel', 'Vue', 'React', 'Yii', 'Docker', 'AWS EC2', 'OpenAPI', 'Tailwind CSS'],
  },
  {
    period: '05/2023 — 09/2023',
    name: 'DotTrees',
    role: 'Project Leader',
    client: 'Education company',
    teamSize: 8,
    group: 'platforms',
    description: 'Online platform offering educational courses for children aged 6 to 18 through interactive lessons.',
    stack: ['Laravel', 'Inertia', 'Vue', 'Docker', 'AWS EC2', 'Stripe', 'Pusher', 'Linux'],
  },
  {
    period: '02/2023 — 06/2023',
    name: 'Clinic',
    role: 'Developer / Maintainer',
    client: 'Public sector, Vietnam',
    teamSize: 12,
    group: 'platforms',
    description:
      'Hospital management system covering patient management, appointment scheduling, medical records and healthcare operations.',
    stack: ['Laravel', 'jQuery', 'Docker', 'AWS EC2', 'Linux'],
  },
  {
    period: '05/2020 — 12/2022',
    name: 'BPM (Bio Purchase Manager)',
    role: 'Developer',
    client: 'Client in Japan',
    teamSize: 6,
    group: 'commerce',
    description:
      'Pharmacy management system for inventory, sales, prescriptions and stock control across pharmacies and healthcare facilities.',
    stack: ['CakePHP', 'Riot.js', 'PostgreSQL', 'Elasticsearch', 'AWS (ELB, EC2, EBS, S3, RDS)', 'Linux'],
  },
];
