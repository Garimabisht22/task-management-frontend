import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface TaskStats {
  stats: {
    total: number;
    pending: number;
    'in-progress': number;
    completed: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly API_URL = 'https://your-railway-url.up.railway.app/api'; // Update with your Railway URL

  constructor(private http: HttpClient) {}

  getTasks(filters?: {
    status?: string;
    priority?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
  }): Observable<TaskResponse> {
    let params = new HttpParams();
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof typeof filters]) {
          params = params.set(key, filters[key as keyof typeof filters]!.toString());
        }
      });
    }

    return this.http.get<TaskResponse>(`${this.API_URL}/tasks`, { params });
  }

  getTask(id: string): Observable<{ task: Task }> {
    return this.http.get<{ task: Task }>(`${this.API_URL}/tasks/${id}`);
  }

  createTask(task: Partial<Task>): Observable<{ message: string; task: Task }> {
    return this.http.post<{ message: string; task: Task }>(`${this.API_URL}/tasks`, task);
  }

  updateTask(id: string, task: Partial<Task>): Observable<{ message: string; task: Task }> {
    return this.http.put<{ message: string; task: Task }>(`${this.API_URL}/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/tasks/${id}`);
  }

  getTaskStats(): Observable<TaskStats> {
    return this.http.get<TaskStats>(`${this.API_URL}/tasks/stats/overview`);
  }
}