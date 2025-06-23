import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ToastComponent } from "../../components/toast/toast.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ToastComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  toastVisible = false;

  public readonly router = inject(Router);
  public readonly toast = inject(ToastrService);

  login() {
    if (this.username === 'admin' && this.password === 'admin123') {
      localStorage.setItem('auth', 'true');
      this.toast.success('Inicio de sesión exitoso ✅');
      setTimeout(() => this.router.navigate(['/']), 1000);
    } else {
      this.toast.error('Credenciales inválidas ❌');
    }
  }
}
