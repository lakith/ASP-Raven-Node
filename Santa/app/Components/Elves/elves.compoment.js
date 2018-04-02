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
var core_1 = require("@angular/core");
var elves_service_1 = require('../../Service/elves.service');
var forms_1 = require('@angular/forms');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var Operation_1 = require('../../Shared/Operation');
var global_1 = require('../../Shared/global');
var UrlProvider_1 = require('../../Shared/UrlProvider');
var ElvesComponent = (function () {
    function ElvesComponent(fb, _elvesService) {
        this.fb = fb;
        this._elvesService = _elvesService;
        this.indLoading = false;
    }
    ElvesComponent.prototype.ngOnInit = function () {
        this.elfFrm = this.fb.group({
            Id: [''],
            Name: ['', forms_1.Validators.required],
            Age: [''],
            Naughtiness: [''],
            Intelligence: [''],
            Specialty: ['']
        });
        this.LoadAllElves();
    };
    ElvesComponent.prototype.LoadAllElves = function () {
        var _this = this;
        this.indLoading = true;
        this._elvesService.GetAllElves(UrlProvider_1.ApiHelper.ElvesApis.GetAllElvesApiRoute)
            .subscribe(function (elves) { _this.elves = elves; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    ElvesComponent.prototype.AddElf = function () {
        this.ops = Operation_1.Operation.Create;
        this.SetControlsState(true);
        this.modalTitle = global_1.Global.ElfFormTitles.AddNewElf;
        this.modalBtnTitle = global_1.Global.ElfButtonTitles.AddNewElf;
        this.elfFrm.reset();
        var op = this.modal.open();
    };
    ElvesComponent.prototype.EditElf = function (id) {
        this.ops = Operation_1.Operation.Update;
        this.SetControlsState(true);
        this.modalTitle = global_1.Global.ElfFormTitles.EditElf;
        this.modalBtnTitle = global_1.Global.ElfButtonTitles.EditElf;
        this.elf = this.elves.filter(function (x) { return x.Id == id; })[0];
        this.elfFrm.setValue(this.elf);
        var op = this.modal.open();
    };
    ElvesComponent.prototype.DeleteElf = function (id) {
        this.ops = Operation_1.Operation.Delete;
        this.SetControlsState(true);
        this.modalTitle = global_1.Global.ElfFormTitles.DeleteElf;
        this.modalBtnTitle = global_1.Global.ElfButtonTitles.DeleteElf;
        this.elf = this.elves.filter(function (x) { return x.Id == id; })[0];
        this.elfFrm.setValue(this.elf);
        var op = this.modal.open();
    };
    ElvesComponent.prototype.SearchData = function (param) {
        var _this = this;
        var value = this.searchfilter.nativeElement.value;
        var url = UrlProvider_1.ApiHelper.ElvesApis.SearchFilterElfApiRoute + value;
        this.indLoading = true;
        this._elvesService.GetAllWithFilters(url)
            .subscribe(function (elves) { _this.elves = elves; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    ElvesComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.elfFrm.enable() : this.elfFrm.disable();
    };
    ElvesComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.ops) {
            case Operation_1.Operation.Create:
                this._elvesService.CreateElf(UrlProvider_1.ApiHelper.ElvesApis.CreteElfApiRoute, formData._value).subscribe(function (data) {
                    if (data == true) {
                        _this.msg = global_1.Global.Messages.CreateSuccess;
                        _this.LoadAllElves();
                    }
                    else {
                        _this.msg = global_1.Global.Messages.CreateInError;
                    }
                    var dismiss = _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case Operation_1.Operation.Update:
                this._elvesService.UpdateElf(UrlProvider_1.ApiHelper.ElvesApis.UpdateElfApiRoute, formData._value).subscribe(function (data) {
                    if (data == true) {
                        _this.msg = global_1.Global.Messages.UpdateSuccess;
                        _this.LoadAllElves();
                    }
                    else {
                        _this.msg = global_1.Global.Messages.UpdateInError;
                    }
                    var dismiss = _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case Operation_1.Operation.Delete:
                var url = UrlProvider_1.ApiHelper.ElvesApis.DeleteElfApiRoute + formData._value.Id;
                this._elvesService.DeleteElf(url).subscribe(function (data) {
                    if (data == true) {
                        _this.msg = global_1.Global.Messages.DeleteSuccess;
                        _this.LoadAllElves();
                    }
                    else {
                        _this.msg = global_1.Global.Messages.DeleteInError;
                    }
                    var dismiss = _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], ElvesComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('searchfilter'), 
        __metadata('design:type', core_1.ElementRef)
    ], ElvesComponent.prototype, "searchfilter", void 0);
    ElvesComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Components/Elves/elves.compoment.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, elves_service_1.ElfService])
    ], ElvesComponent);
    return ElvesComponent;
}());
exports.ElvesComponent = ElvesComponent;
//# sourceMappingURL=elves.compoment.js.map