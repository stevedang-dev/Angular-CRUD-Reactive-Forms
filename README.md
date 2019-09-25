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

# Key concepts:
-

- FormArray:
```
import { FormArray } from '@angular/forms';
```

- Directives:
```
1. formArrayName
2. formGroupName
3. formControlName
4.

```

#### 1. Build form by a form builder:

- Import, Inject, Initialize the form.

```
import { FormBuilder } from '@angular/forms';

customerForm: FormGroup;
constructor(private fb: FormBuilder) {}

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
```

#### 2. Get a form control:

```
const emailControl = this.customerForm.get('emailGroup.email');
```

#### 3. Custom validations:

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
```

#### 4. RxJS Operators:

```
import { debounceTime } from 'rxjs/operators';

const emailControl = this.customerForm.get('emailGroup.email');
emailControl.valueChanges.pipe(
        debounceTime(1000)
    )
    .subscribe(value => {
    // Reacting to the changes
    this.setMessage(emailControl);
});
```

#### 5. Benefits of FormGroup:

![Image](./README-assets/8-benefits-of-form-group.png)

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

# Reactive Forms Module:

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

---

## 2. FormGroup & FormControl:

![Image](./README-assets/rf-formgroup.png)
![Image](./README-assets/rf-formcontrol.png)

---

## 3. Accessing The Form Control Properties:

![Image](./README-assets/rf-formmodel.png)

---

## 4. Set Value and Patch Value:

![Image](./README-assets/set-patch-values.png)

---

## 5. FormBuilder:

![Image](./README-assets/rf-formbuilder.png)
![Image](./README-assets/tf-fb-syntax.png)
![Image](./README-assets/tf-fb-syntax3.png)

---

## 6. Validation:

### a) Built-in Validation Rules:

![Image](./README-assets/rf-validations.png)
![Image](./README-assets/rf-adjust-validation-at-run-time.png)

### b) Custom Validation Rules:

![Image](./README-assets/rf-custom-validation.png)
![Image](./README-assets/rf-custom-validation1.png)

![Image](./README-assets/ratingRange.png)
![Image](./README-assets/emailMatcher.png)
![Image](./README-assets/ngOnInit.png)

- Email confirmation:

![Image](./README-assets/rf-custom-validation-email.png)

![Image](./README-assets/emailGroup.png)
![Image](./README-assets/email.png)
![Image](./README-assets/confirmation.png)

---

## 7. Reacting to Changes:

### a) Watching:

![Image](./README-assets/7-waching.png)
![Image](./README-assets/7-waching1.png)

### b) Reacting: Adjusting Validation Rules

![Image](./README-assets/7-reacting.png)
![Image](./README-assets/7-reacting1.png)

### c) Reacting: Displaying Validation Messages

![Image](./README-assets/7-validationMessages.png)
![Image](./README-assets/7-emailMsg.png)
![Image](./README-assets/7-object-keys-array.png)
![Image](./README-assets/7-object-keys-array1.png)
![Image](./README-assets/7-object-keys-array2.png)

### d) Reacting to Changes: Reactive Transformations

![Image](./README-assets/7-debounce-time.png)
![Image](./README-assets/7-debounce-time1.png)

---

## 8. Dynamically Duplicate Input Elements:

- Add multiple address blocks.
- FormArray:
```
import { FormArray } from '@angular/forms';
```

### a) Steps:

![Image](./README-assets/8-steps.png)

### b) Define the Input Element(s) to Duplicate:

![Image](./README-assets/8-step1-define-input-element.png)


### c) Define a FormGroup:

![Image](./README-assets/8-step1-define-input-element.png)
![Image](./README-assets/8-form-group.png)


### d) Refactor:
- To make copies.

![Image](./README-assets/8-refactor.png)

### e) Create a FormArray:
- Form Array: group of form controls or form groups.
- Differences: access through index instead of name.

![Image](./README-assets/8-form-array.png)
![Image](./README-assets/8-form-array1.png)

### f) Loop Through the FormArray:

![Image](./README-assets/8-loop-through-the-form-array.png)
![Image](./README-assets/8-loop-screen-reader.png)

### g) Duplicate the Input Elements:

![Image](./README-assets/8-add-address.png)
![Image](./README-assets/8-add-address-btn.png)
![Image](./README-assets/8-done.png)

---

## 9. Reactive Forms in Context:

### a) Architecture:
- AppModule: Basic application and startup pieces.
- ProductModule: Product feature pieces.
- SharedModule: Sharable pieces across the app.

![Image](./README-assets/9-APM-architecture.png)
![Image](./README-assets/9-APM-architecture1.png)

### b) Routing:

![Image](./README-assets/9-APM-routing.png)
![Image](./README-assets/9-APM-routing-params.png)

### c) Setting a canDeactivate Guard:

![Image](./README-assets/9-APM-canDeactivate.png)
![Image](./README-assets/9-APM-routing-guard.png)
![Image](./README-assets/9-APM-routing-guards.png)


### d) Refactoring to a Custom Validation Class:

![Image](./README-assets/9-APM-num-validator.png)
![Image](./README-assets/9-APM-shared-validators.png)


---

## 10. Reactive Forms CRUD:



---

