import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers/customer';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-customers-reactive-form',
    templateUrl: './customers-reactive-form.component.html',
    styleUrls: ['./customers-reactive-form.component.scss']
})
export class CustomersReactiveFormComponent implements OnInit {
    customerForm: FormGroup;
    customer = new Customer();

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.customerForm = this.fb.group({
            firstName: 'Steve',
            lastName: { value: 'n/a', disabled: true },
            email: '',
            sendCatalog: true
        });
    }

    // Patch Value
    populateTestData(): void {
        this.customerForm.patchValue({
            firstName: 'Steve',
            lastName: 'Dang',
            sendCatalog: false
        });
    }

    save(): void {
        console.log(this.customerForm);
        console.log(this.customerForm.value);
    }
}
