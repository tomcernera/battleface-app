import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { QuotationService } from '../services/quotation/quotation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form = new FormGroup({
    age: new FormControl('', [Validators.required]),
    currency_id: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required])
  });
  quote: Observable<any>;
  
  constructor(
    private quotationService: QuotationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.quote = this.quotationService.quote(this.form.value);
  }
}
