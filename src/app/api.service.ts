import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private API: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.API}`);
  }

  createPost(post: object): Observable<any> {
    return this.http.post(`${this.API}`, {
      ...post
    });
  }

  updatePost(id: string, fields: Object): Observable<any> {
    return this.http.put(`${this.API}/${id}`, {
      ...fields
    });
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
