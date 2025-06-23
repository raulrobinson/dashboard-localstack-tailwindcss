import { Injectable } from '@angular/core';
import {
  AttributeValue, CreateTableCommand,
  DeleteItemCommand, DeleteTableCommand,
  DynamoDBClient,
  ListTablesCommand,
  PutItemCommand,
  ScanCommand,
  CreateTableCommandInput
} from "@aws-sdk/client-dynamodb";
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamodbService {
  public readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: 'us-east-1',
      endpoint: 'http://localhost:4566',
      credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test',
      },
    });
  }

  // ✅ 1. Listar tablas
  listTables(): Observable<any> {
    return from(this.client.send(new ListTablesCommand({})));
  }

  // ✅ 2. Listar items en una tabla
  listItems(tableName: string): Observable<{ Items?: Record<string, AttributeValue>[] }> {
    return from(this.client.send(new ScanCommand({ TableName: tableName })));
  }

  // ✅ 3. Insertar o actualizar un item
  putItem(tableName: string, item: Record<string, AttributeValue>): Observable<any> {
    return from(this.client.send(new PutItemCommand({
      TableName: tableName,
      Item: item,
    })));
  }

  // ✅ 4. Eliminar un item por su clave
  deleteItem(tableName: string, key: Record<string, AttributeValue>): Observable<any> {
    return from(this.client.send(new DeleteItemCommand({
      TableName: tableName,
      Key: key,
    })));
  }

  // ✅ 5. Eliminar tabla completa
  deleteTable(tableName: string): Observable<any> {
    return from(this.client.send(new DeleteTableCommand({ TableName: tableName })));
  }

  // ✅ 6. Crear una tabla (ejemplo)
  async createTable(tableName: string, keyName: string = 'id'): Promise<void> {
    const params: CreateTableCommandInput = {
      TableName: tableName,
      AttributeDefinitions: [
        {
          AttributeName: keyName,
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: keyName,
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };

    await this.client.send(new CreateTableCommand(params));
  }
}
