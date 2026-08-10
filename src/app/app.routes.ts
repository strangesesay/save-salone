import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Contact } from './pages/contact/contact';
import { Donate } from './pages/donate/donate';
import { Gallery } from './pages/gallery/gallery';
import { News } from './pages/news/news';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Programs } from './pages/programs/programs';
import { Projects } from './pages/projects/projects';
import { Dashboard } from './pages/dashboard/dashboard';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { NotFound } from './pages/not-found/not-found';
import { GetInvolved } from './pages/get-involved/get-involved';

export const routes: Routes = [

    {
        path:'',
        
        component:PublicLayout,
        
        children:[
        
        {
        path:'',
        component:Home
        },
        
        {
        path:'about',
        component:About
        },
        
        {
        path:'programs',
        component:Programs
        },
        
        {
        path:'projects',
        component:Projects
        },
        
        {
        path:'news',
        component:News
        },
        
        {
        path:'gallery',
        component:Gallery
        },
        
        {
        path:'get-involved',
        component:GetInvolved
        },
        
        {
        path:'donate',
        component:Donate
        },

           {
        path:'contact',
        component:Contact
        },
        
        
        {
        path:'login',
        component:Login
        }
        
        ]
        
        },
        
        {
        
        path:'admin',
        
        component:AdminLayout,
        
        children:[
        
        {
        
        path:'dashboard',
        
        component:Dashboard
        
        }
        
        ]
        
        },
        
        {
        
        path:'**',
        
        component:NotFound
        
        },

        {
  path: 'news',
  loadComponent: () =>
    import('./pages/news/news')
      .then(m => m.News)
},

{
  path: 'gallery',
  loadComponent: () =>
    import('./pages/gallery/gallery')
      .then(m => m.Gallery)
}
];
