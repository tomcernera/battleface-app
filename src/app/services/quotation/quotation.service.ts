import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuoteForm } from '../../models/quoteForm';
import { AuthService } from '../auth/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private quotation_url = "http://localhost:3300/quotation";
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  quote(form: QuoteForm) {
    const auth_token = this.authService.user.token;
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${auth_token}`
      })
    };
    return this.http.post(this.quotation_url, form, headers)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(error => {
          return [error.error];
        })
      );
  }
}
