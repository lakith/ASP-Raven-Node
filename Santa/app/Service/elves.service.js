"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var observable_1 = require('rxjs/observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var ElfService = (function () {
    function ElfService(_http) {
        this._http = _http;
    }
    //----------------------------------------------
    // Get all Elves From Raven Store
    //----------------------------------------------
    ElfService.prototype.GetAllElves = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); })
            .catch(ElfService.handleError);
    };
    //---------------------------------------------
    //Create Elf 
    //---------------------------------------------
    ElfService.prototype.CreateElf = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map(function (response) { return response.json(); })
            .catch(ElfService.handleError);
    };
    //---------------------------------------------
    // Update Elf Record
    //---------------------------------------------
    ElfService.prototype.UpdateElf = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url, body, options)
            .map(function (response) { return response.json(); })
            .catch(ElfService.handleError);
    };
    //--------------------------------------------
    // Delete Record By Document Id
    //--------------------------------------------
    ElfService.prototype.DeleteElf = function (url) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.delete(url, options)
            .map(function (response) { return response.json(); })
            .catch(ElfService.handleError);
    };
    //--------------------------------------------
    // Filter Records By filters
    //--------------------------------------------
    ElfService.prototype.GetAllWithFilters = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); })
            .catch(ElfService.handleError);
    };
    ElfService.handleError = function (error) {
        console.error(error);
        return observable_1.Observable.throw(error.json().error || 'Server error');
    };
    ElfService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ElfService);
    return ElfService;
}());
exports.ElfService = ElfService;
//# sourceMappingURL=elves.service.js.map