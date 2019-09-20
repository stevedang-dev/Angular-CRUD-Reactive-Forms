# App

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.
- **.prettierrc**

```
{
    "tabWidth": 4,
    "useTabs": false,
    "singleQuote": true
}
```

---

# Angular Forms:

```
Template-driven                 |   Reactive Forms
- Easy to use                   |   - More flexible =>
- Similar to AngularJS          |   more complex scenarios
- Two-way data binding          |   - Immutable data model
Minimal component code          |   - Easier to perform an
- Automatically tracks form     |   action on a value change
and input element state         |   - Reactive transformations =>
                                |   debounceTime or distinctUntilChanged
                                |   - Easily add input elements dynamically
                                |   - Easier unit testing
                                |
```

- Directives

```
Template-driven                 |   Reactive Forms
- ngForm                        |   - formGroup
- ngModel                       |   - formControl
- ngModelGroup                  |   - formControlName
                                |   - formGroupname
                                |   - formArrayName

```

- Simple HTML Form:

![Image](./README-assets/simple-html-form.png)

- Template-driven Form:

![Image](./README-assets/template-driven.png)

- Reactive Form:

![Image](./README-assets/reactive-form.png)

---

# Reactive Forms:

- Add this to the app.module.ts

```
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
...
imports: [
    ...
    FormsModule,
    ReactiveFormsModule
]
```

## 1. Create a FormGroup:

![Image](./README-assets/create-rf-formgroup.png)

## 2. FormGroup & FormControl:

![Image](./README-assets/rf-formgroup.png)
![Image](./README-assets/rf-formcontrol.png)

## 3. Accessing The Form Control Properties:

![Image](./README-assets/rf-formmodel.png)

## 4. Set Value and Patch Value:

![Image](./README-assets/set-patch-values.png)

## 5. FormBuilder:

![Image](./README-assets/rf-formbuilder.png)
![Image](./README-assets/tf-fb-syntax.png)
![Image](./README-assets/tf-fb-syntax3.png)

## 6. Validation:

### a) Built-in Validation Rules:

![Image](./README-assets/rf-validations.png)
![Image](./README-assets/rf-adjust-validation-at-run-time.png)

### b) Custom Validation Rules:

![Image](./README-assets/rf-custom-validation.png)
![Image](./README-assets/rf-custom-validation1.png)

```
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
```

- Email confirmation:

![Image](./README-assets/rf-custom-validation-email.png)

```
<div formGroupName="emailGroup">
    <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label" for="emailId"
            >Email</label
        >
        <div class="col-md-8">
            <input
                class="form-control"
                id="emailId"
                type="email"
                placeholder="Email (required)"
                formControlName="email"
                [ngClass]="{
                    'is-invalid':
                        customerForm.get('emailGroup').errors ||
                        ((customerForm.get('emailGroup.email')
                            .touched ||
                            customerForm.get('emailGroup.email')
                                .dirty) &&
                            !customerForm.get('emailGroup.email')
                                .valid)
                }"
            />
            <span class="invalid-feedback">
                <span
                    *ngIf="
                        customerForm.get('emailGroup.email').errors
                            ?.required
                    "
                >
                    Please enter your email address.
                </span>
                <span
                    *ngIf="
                        customerForm.get('emailGroup.email').errors
                            ?.email
                    "
                >
                    Please enter a valid email address.
                </span>
            </span>
        </div>
    </div>
```

```
    <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label" for="confirmEmailId"
            >Confirm Email</label
        >
        <div class="col-md-8">
            <input
                class="form-control"
                id="confirmEmailId"
                type="email"
                placeholder="Confirm Email (required)"
                formControlName="confirmEmail"
                [ngClass]="{
                    'is-invalid':
                        customerForm.get('emailGroup').errors ||
                        ((customerForm.get(
                            'emailGroup.confirmEmail'
                        ).touched ||
                            customerForm.get(
                                'emailGroup.confirmEmail'
                            ).dirty) &&
                            !customerForm.get(
                                'emailGroup.confirmEmail'
                            ).valid)
                }"
            />
            <span class="invalid-feedback">
                <span
                    *ngIf="
                        customerForm.get('emailGroup.confirmEmail')
                            .errors?.required
                    "
                >
                    Please confirm your email address.
                </span>
                <span
                    *ngIf="
                        customerForm.get('emailGroup').errors?.match
                    "
                >
                    The confirmation does not match the email
                    address.
                </span>
            </span>
        </div>
    </div>
</div>
```
