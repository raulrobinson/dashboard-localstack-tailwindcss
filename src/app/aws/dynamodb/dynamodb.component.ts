import { Component, inject, signal } from '@angular/core';
import { DynamodbService } from "@shared/services/dynamodb.service";
import { JsonPipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';
import { ToastComponent } from "../../components/toast/toast.component";
import { CreateClientFormComponent } from "./create-table/create-client-form/create-client-form.component";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { LucideAngularModule, Trash } from 'lucide-angular';

@Component({
  selector: 'app-dynamodb',
  standalone: true,
  imports: [
    JsonPipe,
    ToastComponent,
    CreateClientFormComponent,
    ConfirmDialogComponent,
    LucideAngularModule,
  ],
  templateUrl: './dynamodb.component.html',
  styleUrl: './dynamodb.component.scss'
})
export class DynamodbComponent {
  tables = signal<string[]>([]);
  selectedTable = signal<string>('');
  items = signal<any[]>([]);
  loading = signal(false);
  readonly FileIcon = Trash;

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  toastVisible = false;

  public readonly dynamodb = inject(DynamodbService);
  public readonly toast = inject(ToastrService);

  constructor() {
    this.fetchTables();
  }

  reloadPage() {
    window.location.reload();
  }

  fetchTables() {
    this.loading.set(true);
    this.dynamodb.listTables().subscribe({
      next: (res) => this.tables.set(res.TableNames ?? []),
      error: () => this.toast.error('Error cargando tablas'),
      complete: () => this.loading.set(false),
    });
  }

  fetchItems(table: any) {
    this.dynamodb.listItems(table).subscribe({
      next: (res) => {
        this.items.set(res.Items ?? []);
        this.selectedTable.set(table);
      },
      error: () => this.toast.error('Error cargando items'),
    });
  }

  deleteTable(table: any) {

  }

  deleteItem(item: any) {

  }
}
