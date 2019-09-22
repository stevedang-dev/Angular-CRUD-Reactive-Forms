import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers/customer';
import {
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl,
    ValidatorFn,
    FormArray
} from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

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
    emailMessage: string;

    private validationMessages = {
        required: 'Please enter your email address.',
        email: 'Please enter a valid email address.'
    };

    // Define a property as a getter function
    get addresses(): FormArray {
        return this.customerForm.get('addresses') as FormArray;
    }

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.customerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            emailGroup: this.fb.group({
                email: ['', [Validators.required, Validators.email]],
                confirmEmail: ['', Validators.required],
            }, { validator: emailMatcher }),
            phone: '',
            notification: 'email',
            rating: [null, ratingRange(1, 5)],
            sendCatalog: true,
            addresses: this.fb.array([this.buildAddress()])
        });
        // Watching changes of the form control:
        this.customerForm.get('notification').valueChanges.subscribe(value => {
            console.log('Changed value: ', value);
            // Reacting to the changes
            this.setNotification(value);
        });

        // Watching changes of the form control:
        const emailControl = this.customerForm.get('emailGroup.email');
        emailControl.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
            // Reacting to the changes
            this.setMessage(emailControl);
        });
    }

    // Event binding from the view html.
    // Change the validations based on user selection.
    // ** USE WATCH INSTEAD **:
    // phoneControl.valueChanges.subscribe(data => console.log(data));
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

    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && (c.errors || !c.valid)) {
            this.emailMessage = Object.keys(c.errors)
                .map(key => this.validationMessages[key])
                .join(' ');
            console.log('Object.keys(c.errors):', Object.keys(c.errors));
            console.log('c.errors:', c.errors);
            console.log('emailMessage: ', this.emailMessage);
        }
    }

    addAddress(): void {
        this.addresses.push(this.buildAddress());
    }

    // Create an instance of the address formgroup
    buildAddress(): FormGroup {
        return this.fb.group({
            addressType: 'home',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: ''
        });
    }
}
