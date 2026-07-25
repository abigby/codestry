import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavLink {
  label: string;
  fragment: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class Header {
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly links: NavLink[] = [
    { label: 'Services', fragment: 'services' },
    { label: 'AI', fragment: 'ai' },
    { label: 'How we work', fragment: 'process' },
    { label: 'Stack', fragment: 'stack' },
    { label: 'About', fragment: 'about' },
  ];

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
