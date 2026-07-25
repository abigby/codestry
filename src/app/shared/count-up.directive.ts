import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Counts the element's number up from 0 when it scrolls into view.
 * Renders `prefix + value + suffix` (e.g. 508, 12+). Jumps straight to the
 * final value when the user prefers reduced motion.
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective {
  readonly appCountUp = input.required<number>();
  readonly countSuffix = input('');
  readonly countPrefix = input('');
  readonly countDuration = input(1600);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      const target = this.appCountUp();
      const render = (value: number) => {
        node.textContent = `${this.countPrefix()}${value}${this.countSuffix()}`;
      };
      render(0);

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        render(target);
        return;
      }

      let raf = 0;
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          io.disconnect();

          const duration = this.countDuration();
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
            render(Math.round(target * eased));
            if (progress < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        },
        { threshold: 0.4 },
      );
      io.observe(node);
      this.destroyRef.onDestroy(() => {
        io.disconnect();
        cancelAnimationFrame(raf);
      });
    });
  }
}
