import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LearnChineseComponent } from './learn-chinese/learn-chinese.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'learn-chinese', component: LearnChineseComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
