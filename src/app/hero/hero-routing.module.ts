import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterHeropageComponent } from './components/filterheropage.component';
import { HeropageComponent } from './components/heropage.component';


const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HeropageComponent,
  },
  {
    path: 'filterId',
    component: FilterHeropageComponent,
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class HeroRoutingModule { }
