import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElvesComponent } from './components/Elves/elves.compoment';
import { HomeComponent } from './components/Home/home.component';

const appRoutes:Routes=[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'elves', component: ElvesComponent }
    ];
export const routing: ModuleWithProviders =    RouterModule.forRoot(appRoutes);