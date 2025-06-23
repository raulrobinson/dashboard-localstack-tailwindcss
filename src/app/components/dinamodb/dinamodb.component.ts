import { Component, inject, signal } from '@angular/core';
import { DynamodbService } from "@shared/services/dynamodb.service";
import { CreateTableButtonComponent } from "../../aws/dynamodb/create-table/create-table-button/create-table-button.component";
import { ConfirmDialogComponent } from "../../aws/dynamodb/confirm-dialog/confirm-dialog.component";
import { CreateClientFormComponent } from "../../aws/dynamodb/create-table/create-client-form/create-client-form.component";
import { JsonPipe, NgOptimizedImage } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dinamodb',
  standalone: true,
  imports: [
    CreateTableButtonComponent,
    ConfirmDialogComponent,
    CreateClientFormComponent,
    JsonPipe,
    NgOptimizedImage,
    LucideAngularModule
  ],
  templateUrl: './dinamodb.component.html',
  styleUrl: './dinamodb.component.scss'
})
export class DinamodbComponent {
  tables = signal<string[]>([]);
  selectedTable = signal<string | null>(null);
  items = signal<any[]>([]);
  loading = signal(false);

  public readonly toast = inject(ToastrService);
  public readonly db = inject(DynamodbService);

  constructor() {
    this.fetchTables();
  }

  fetchTables() {
    this.loading.set(true);
    this.db.listTables().subscribe({
      next: (res) => this.tables.set(res.TableNames ?? []),
      error: () => this.toast.error('Error cargando tablas'),
      complete: () => this.loading.set(false),
    });
  }

  fetchItems(table: string) {
    this.db.listItems(table).subscribe({
      next: (res) => {
        this.items.set(res.Items ?? []);
        this.selectedTable.set(table);
      },
      error: () => this.toast.error('Error cargando items'),
    });
  }

  deleteTable(table: string) {
    this.db.deleteTable(table).subscribe({
      next: () => {
        this.tables.update(t => t.filter(tn => tn !== table));
        if (this.selectedTable() === table) {
          this.selectedTable.set(null);
          this.items.set([]);
        }
        this.toast.success('Tabla eliminada');
      },
      error: () => this.toast.error('Error eliminando tabla'),
    });
  }

  deleteItem(item: any) {
    this.db.deleteItem(this.selectedTable()!, item).subscribe({
      next: () => {
        this.items.update(i => i.filter(existing => existing.id !== item.id));
        this.toast.success('Item eliminado');
      },
      error: () => this.toast.error('Error eliminando item'),
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
