import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ValluvarComponent } from './valluvar/valluvar.component';
import { TranslatorsComponent } from './translators/translators.component';
import { WhyComponent } from './why/why.component';
import { ContributeComponent } from './contribute/contribute.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "valluvar", component: ValluvarComponent},
  { path: "translators", component: TranslatorsComponent},
  { path: "why", component: WhyComponent},
  { path: "contribute", component: ContributeComponent},
  { path: "about", component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
