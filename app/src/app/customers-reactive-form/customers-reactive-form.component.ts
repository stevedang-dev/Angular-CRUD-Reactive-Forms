import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers/customer';
import {
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl,
    ValidatorFn
} from '@angular/forms';

function ratingRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (
            c.value !== null &&
            (isNaN(c.value) || c.value < min || c.value > max)
        ) {
            return { range: true };
        }
        return null;
    };
}
function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const emailControl = c.get('email');
    const confirmationControl = c.get('confirmEmail');
    if (emailControl.pristine || confirmationControl.pristine) {
        return null;
    }
    if (emailControl.value === confirmationControl.value) {
        return null;
    }
    return { match: true };
}

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
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            emailGroup: this.fb.group(
                {
                    email: ['', [Validators.required, Validators.email]],
                    confirmEmail: ['', Validators.required]
                },
                { validator: emailMatcher }
            ),
            phone: '',
            notification: 'email',
            rating: [null, ratingRange(1, 5)],
            sendCatalog: true
        });
    }

    setNotification(notifyVia: string): void {
        const phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
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
