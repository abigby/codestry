import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** Adds .in-view when the element scrolls into the viewport (one-shot). */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective {
  /** Stagger delay in milliseconds. */
  readonly revealDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      if (this.revealDelay() > 0) {
        node.style.setProperty('--reveal-delay', `${this.revealDelay()}ms`);
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add('in-view');
              io.disconnect();
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      );
      io.observe(node);
      this.destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
