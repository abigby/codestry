import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';


interface Blob {
  color: [number, number, number];
  alpha: number;
  radius: number; // fraction of max(w,h)
  px: number; py: number; // base position (fraction)
  ax: number; ay: number; // travel amplitude (fraction)
  fx: number; fy: number; // angular frequency (rad/ms)
  phase: number;
}

/**
 * Shimmering aurora background — animated radial gradients + a sweeping
 * light beam on a low-res canvas upscaled by CSS, so it stays cheap.
 * Renders a single static frame when the user prefers reduced motion.
 */
@Component({
  selector: 'app-aurora',
  template: '<canvas #cv aria-hidden="true"></canvas>',
  styles: `
    :host {
      position: absolute;
      inset: 0;
      display: block;
      overflow: hidden;
      pointer-events: none;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
})
export class Aurora {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('cv');
  private readonly destroyRef = inject(DestroyRef);

  private readonly blobs: Blob[] = [
    { color: [30, 91, 255], alpha: 0.5, radius: 0.62, px: 0.22, py: 0.4, ax: 0.16, ay: 0.12, fx: 0.00013, fy: 0.00011, phase: 0 },
    { color: [0, 212, 255], alpha: 0.34, radius: 0.5, px: 0.72, py: 0.3, ax: 0.18, ay: 0.14, fx: 0.0001, fy: 0.00014, phase: 2.1 },
    { color: [11, 60, 160], alpha: 0.55, radius: 0.68, px: 0.5, py: 0.78, ax: 0.2, ay: 0.1, fx: 0.00008, fy: 0.00012, phase: 4.2 },
    { color: [0, 160, 255], alpha: 0.22, radius: 0.4, px: 0.88, py: 0.66, ax: 0.12, ay: 0.16, fx: 0.00016, fy: 0.00009, phase: 1.2 },
  ];

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SCALE = 0.22; // low-res render, CSS upscales into softness
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = Math.max(1, Math.floor(canvas.clientWidth * SCALE));
      h = canvas.height = Math.max(1, Math.floor(canvas.clientHeight * SCALE));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      const size = Math.max(w, h);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (const b of this.blobs) {
        const x = (b.px + Math.sin(now * b.fx + b.phase) * b.ax) * w;
        const y = (b.py + Math.cos(now * b.fy + b.phase) * b.ay) * h;
        const r = b.radius * size;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${b.alpha})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Sweeping diagonal shimmer beam
      const beamSpan = w * 2.2;
      const bx = ((now * 0.028 * SCALE) % beamSpan) - w * 0.6;
      ctx.save();
      ctx.translate(bx, h * 0.5);
      ctx.rotate(-0.42);
      const beam = ctx.createLinearGradient(-w * 0.18, 0, w * 0.18, 0);
      beam.addColorStop(0, 'rgba(190,225,255,0)');
      beam.addColorStop(0.5, 'rgba(190,225,255,0.07)');
      beam.addColorStop(1, 'rgba(190,225,255,0)');
      ctx.fillStyle = beam;
      ctx.fillRect(-w * 0.18, -size * 1.6, w * 0.36, size * 3.2);
      ctx.restore();
    };

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(4000);
      this.destroyRef.onDestroy(() => ro.disconnect());
      return;
    }

    let raf = requestAnimationFrame(function loop(now) {
      draw(now);
      raf = requestAnimationFrame(loop);
    });
    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    });
  }
}
