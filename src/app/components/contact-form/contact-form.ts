import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService, ContactPayload } from '../../core/contact.service';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private readonly fb = inject(FormBuilder);
  private readonly contact = inject(ContactService);

  protected readonly status = signal<FormStatus>('idle');

  protected readonly topics = [
    'New application build',
    'AI service tools',
    'Technical assistance / support',
    'Accessibility & compliance',
    'Something else',
  ];

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    topic: ['New application build', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
    // Honeypot — real users never fill this hidden field.
    website: [''],
  });

  protected submit(): void {
    if (this.form.controls.website.value) {
      // Bot filled the honeypot; pretend success.
      this.status.set('sent');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { website, ...payload } = this.form.getRawValue();
    this.status.set('sending');

    this.contact.send(payload as ContactPayload).subscribe({
      next: () => {
        this.status.set('sent');
        this.form.reset();
      },
      error: () => this.status.set('error'),
    });
  }

  protected invalid(controlName: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }
}
