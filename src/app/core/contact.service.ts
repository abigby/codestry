import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  // FormSubmit relays submissions to the Codestry inbox so the address is never
  // rendered on the page. After the first live submission is verified, replace
  // the address below with the random alias FormSubmit issues so it is not
  // present in the shipped bundle either: https://formsubmit.co
  private readonly endpoint = 'https://formsubmit.co/ajax/codestry@outlook.com';

  send(payload: ContactPayload): Observable<unknown> {
    return this.http.post(this.endpoint, {
      ...payload,
      _subject: `Codestry inquiry — ${payload.topic} — ${payload.name}`,
      _template: 'table',
      _captcha: 'false',
    });
  }
}
