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

![Image](./README-assets/ratingRange.png)
![Image](./README-assets/emailMatcher.png)
![Image](./README-assets/ngOnInit.png)

- Email confirmation:

![Image](./README-assets/rf-custom-validation-email.png)

![Image](./README-assets/emailGroup.png)
![Image](./README-assets/email.png)
![Image](./README-assets/confirmation.png)
