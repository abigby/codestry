import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactForm } from '../../components/contact-form/contact-form';
import { Aurora } from '../../components/aurora/aurora';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { CountUpDirective } from '../../shared/count-up.directive';

interface Service {
  icon: 'web' | 'ai' | 'assist' | 'a11y' | 'ux' | 'cloud';
  title: string;
  description: string;
  points: string[];
  wide?: boolean;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface StackGroup {
  label: string;
  items: string[];
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, ContactForm, Aurora, RevealDirective, SpotlightDirective, CountUpDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly stats: { count: number | null; display?: string; suffix?: string; label: string }[] = [
    { count: 12, suffix: '+', label: 'years of senior engineering' },
    { count: 6, label: 'industries delivered in' },
    { count: 508, label: 'accessibility as a baseline' },
    { count: null, display: 'AI', label: 'assisted delivery, human-reviewed' },
  ];

  protected readonly industries = [
    'Federal Government',
    'Healthcare',
    'Biotech',
    'Telecom',
    'Fintech',
    'E-commerce',
  ];

  protected readonly services: Service[] = [
    {
      icon: 'web',
      title: 'Web Application Development',
      description:
        'Enterprise-grade applications built with Angular, React, and Next.js — from greenfield builds to features inside large existing platforms.',
      points: ['Dashboards, portals & SPAs', 'Micro-frontends & module federation', 'Reusable component libraries'],
      wide: true,
    },
    {
      icon: 'ai',
      title: 'AI Service Tools',
      description:
        'Practical AI built into your product: assistants, smart search, and automation powered by Claude, GPT, and modern agent tooling.',
      points: ['Chat assistants & copilots', 'Smart search & autocomplete'],
    },
    {
      icon: 'assist',
      title: 'Technical Assistance',
      description:
        'Senior help exactly where your team is stuck — upgrades, performance, debugging, and long-term maintenance.',
      points: ['Framework migrations (Angular 14 → 22)', 'Performance tuning & code audits'],
    },
    {
      icon: 'a11y',
      title: 'Accessibility & Compliance',
      description:
        'Section 508, WCAG, and ARIA done properly — proven in federal and healthcare environments where compliance is not optional.',
      points: ['508 / WCAG audits & fixes', 'HIPAA-aware regulated builds'],
    },
    {
      icon: 'ux',
      title: 'UX/UI & Design Systems',
      description:
        'From Figma wireframes to production components — design and engineering under one roof, so nothing gets lost in translation.',
      points: ['Wireframes & hi-fi mockups', 'Design systems & style guides'],
    },
    {
      icon: 'cloud',
      title: 'APIs, Data & Cloud',
      description:
        'The services behind the screen: Node.js and NestJS APIs, data layers, and CI/CD pipelines that ship safely and often.',
      points: ['REST & GraphQL services', 'MongoDB, SQL & data modeling', 'CI/CD on GitHub Actions, Azure & AWS'],
      wide: true,
    },
  ];

  protected readonly aiHighlights = [
    {
      title: 'AI in your product',
      description:
        'Assistants, smart search, predictive autocomplete, and document automation that make your application feel effortless to use.',
    },
    {
      title: 'AI in the build process',
      description:
        'AI-assisted development, test generation, refactoring, and documentation — so features ship faster without cutting corners.',
    },
    {
      title: 'The right models, wired in right',
      description:
        'Integrations with Claude, GPT, and agent frameworks like MCP — matched to your data, your privacy constraints, and your budget.',
    },
    {
      title: 'Humans stay in the loop',
      description:
        'Every AI-assisted change is reviewed, tested, and held to the same engineering bar as hand-written code.',
    },
  ];

  protected readonly steps: Step[] = [
    {
      number: '01',
      title: 'Discover',
      description: 'We dig into your goals, users, and constraints — and agree on what success looks like.',
    },
    {
      number: '02',
      title: 'Design',
      description: 'Wireframes and prototypes in Figma turn ideas into something you can react to early.',
    },
    {
      number: '03',
      title: 'Build',
      description: 'Short, transparent iterations with working software you can click on from week one.',
    },
    {
      number: '04',
      title: 'Ship',
      description: 'Automated tests, accessibility checks, and CI/CD pipelines take it to production safely.',
    },
    {
      number: '05',
      title: 'Support',
      description: 'We stay on for upgrades, monitoring, and the next iteration — not just the launch.',
    },
  ];

  protected readonly stackGroups: StackGroup[] = [
    { label: 'Frontend', items: ['Angular', 'React', 'Next.js', 'TypeScript', 'RxJS', 'SCSS', 'Tailwind CSS'] },
    { label: 'Backend & Data', items: ['Node.js', 'NestJS', 'Spring Boot', 'REST', 'GraphQL', 'MongoDB', 'MySQL'] },
    { label: 'AI & Tooling', items: ['Claude', 'GPT', 'MCP', 'Cursor', 'Prompt-driven workflows'] },
    { label: 'Quality', items: ['Cypress', 'Jest', 'Vitest', 'TDD', 'WCAG / ARIA', 'Section 508'] },
    { label: 'Cloud & DevOps', items: ['AWS', 'Azure', 'GitHub Actions', 'Azure DevOps', 'CI/CD'] },
  ];

  protected readonly terminalLines = [
    { prompt: true, text: 'ng build --configuration production' },
    { prompt: false, text: '✔ bundle complete — 91.2 kB transfer' },
    { prompt: true, text: 'npm run test:e2e' },
    { prompt: false, text: '✔ 148 passing · 0 flaky · a11y clean' },
    { prompt: true, text: 'npm run deploy' },
    { prompt: false, text: '↗ codestry.app — live in 14s' },
  ];
}
