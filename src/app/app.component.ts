import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <div style="padding: 20px;">
      <h1>Task Manager</h1>
      <button mat-raised-button color="primary">Test Button</button>
      <mat-form-field appearance="outline" style="margin-left: 20px;">
        <mat-label>Test Input</mat-label>
        <input matInput placeholder="Type here">
      </mat-form-field>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Task Manager';
}