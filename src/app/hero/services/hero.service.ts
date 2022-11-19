import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroModel } from '../models/hero.models';


@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor( private http: HttpClient) 
  { }

  getHeroes(): Observable<HeroModel[]>{
    return this.http.get<HeroModel[]>('http://localhost:3000/marvel')
  }

  getHeroById(id: number): Observable<HeroModel>{
    return this.http.get<HeroModel>(`http://localhost:3000/marvel/${id}`)
  }

  addNewHero(hero: any): Observable<Partial<HeroModel>>{
    return this.http.post('http://localhost:3000/marvel', hero)
  }

  editHero(hero: any, id: any): Observable<Partial<HeroModel>>{
    return this.http.put(`http://localhost:3000/marvel/${id}`, hero )
  }

  deleteHero(id: number): Observable<any>{
    return this.http.delete(`http://localhost:3000/marvel/${id}`)
  }

}
