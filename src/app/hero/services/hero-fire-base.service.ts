import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HeroModel } from '../models/hero.models';

@Injectable({
  providedIn: 'root'
})
export class HeroFireBaseService {

  constructor(private firestore: Firestore) { }


  getHeroes(): Observable<HeroModel[]>{
    const heroRef = collection(this.firestore, 'heroes');
    return collectionData(heroRef, {idField: 'id'}) as Observable<HeroModel[]>
  }

  addNewHero(hero: any){
    const heroRef = collection(this.firestore, 'heroes');
    return addDoc(heroRef, hero)
  }

  deleteHero(id: number) {
   const placeDocRef = doc(this.firestore, `/heroes/${id}`)
   return deleteDoc(placeDocRef)
  }

  editHero(hero: any, id: number) {
    const placeDocRef = doc(this.firestore, `/heroes/${id}`)
    return updateDoc(placeDocRef, {...hero})
   }

}

