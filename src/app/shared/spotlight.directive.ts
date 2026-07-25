import { Directive, ElementRef, inject } from '@angular/core';

/** Tracks the cursor and exposes --mx/--my for the .spot hover glow. */
@Directive({
  selector: '[appSpotlight]',
  host: {
    class: 'spot',
    '(mousemove)': 'onMove($event)',
  },
})
export class SpotlightDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  protected onMove(event: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.el.nativeElement.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    this.el.nativeElement.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
