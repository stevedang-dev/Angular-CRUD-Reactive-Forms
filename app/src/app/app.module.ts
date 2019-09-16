import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CustomersReactiveFormComponent } from './customers-reactive-form/customers-reactive-form.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'template-driven', component: CustomersComponent },
    { path: 'reactive-form', component: CustomersReactiveFormComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        CustomersComponent,
        HomepageComponent,
        CustomersReactiveFormComponent
    ],
    imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
