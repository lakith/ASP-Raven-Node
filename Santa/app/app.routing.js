"use strict";
var router_1 = require('@angular/router');
var elves_compoment_1 = require('./components/Elves/elves.compoment');
var home_component_1 = require('./components/Home/home.component');
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'elves', component: elves_compoment_1.ElvesComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map