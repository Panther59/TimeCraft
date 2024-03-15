import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routes";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DefaultComponent } from "./default/default.component";
import { LocalService } from "./_services/local.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DsuComponent } from "./dsu/dsu.component";

@NgModule({
    declarations: [
        AppComponent,
        DefaultComponent,
        DsuComponent
    ],
    imports: [
        BrowserModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [LocalService],
    bootstrap: [AppComponent]
})
export class AppModule { }