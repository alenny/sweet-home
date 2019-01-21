import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCharactersResponse } from '../protocols/get-characters.response';

const url = '/api/chinese';

@Injectable({
  providedIn: 'root'
})
export class ChineseService {

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<GetCharactersResponse> {
    let opts = this.getHttpOptions('');
    return this.http.get<GetCharactersResponse>(url, opts).pipe();
  }

  addCharacters(characters: string, password: string): Observable<any> {
    let opts = this.getHttpOptions(password);
    return this.http.post(url, { characters }, opts).pipe();
  }

  deleteCharacters(characters: string, password: string): Observable<any> {
    let opts = this.getHttpOptions(password);
    opts['body'] = { characters };
    return this.http.delete(url, opts).pipe();
  }

  private getHttpOptions(password: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${password}`
      })
    };
  }
}
