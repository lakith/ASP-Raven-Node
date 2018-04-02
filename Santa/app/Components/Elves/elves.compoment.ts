import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { ElfService } from '../../Service/elves.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IElf } from '../../Models/IElf';
import { Operation } from '../../Shared/Operation';
import { Intelligence } from '../../Shared/IntelligenceEnum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../../Shared/global';
import { ApiHelper } from '../../Shared/UrlProvider'


@Component({
    templateUrl:'app/Components/Elves/elves.compoment.html'
})
export class ElvesComponent implements OnInit
{
    
    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('searchfilter') searchfilter: ElementRef;
    
    elves: IElf[];
    elf: IElf;
    msg: string;
    indLoading: boolean = false;
    elfFrm: FormGroup;
    ops: Operation;
    modalTitle: string;
    modalBtnTitle: string;
   

    constructor(private fb: FormBuilder, private _elvesService: ElfService) { }
    ngOnInit(): void 
    {
        this.elfFrm = this.fb.group({
            Id: [''],
            Name: ['', Validators.required],
            Age: [''],
            Naughtiness: [''],
            Intelligence: [''],
            Specialty: ['']
        });
        this.LoadAllElves();
    }
    LoadAllElves(): void {
        this.indLoading = true;
        this._elvesService.GetAllElves(ApiHelper.ElvesApis.GetAllElvesApiRoute)
            .subscribe(elves => { this.elves = elves; this.indLoading = false; },
                error => this.msg = <any>error);
    }
    AddElf()
    {
        this.ops = Operation.Create;
        this.SetControlsState(true);
        this.modalTitle =Global.ElfFormTitles.AddNewElf;
        this.modalBtnTitle =Global.ElfButtonTitles.AddNewElf;
        this.elfFrm.reset();
        let op= this.modal.open();
    }
    EditElf(id:string)
    {
        this.ops = Operation.Update;
        this.SetControlsState(true);
        this.modalTitle = Global.ElfFormTitles.EditElf;
        this.modalBtnTitle  =Global.ElfButtonTitles.EditElf;
        this.elf = this.elves.filter(x => x.Id == id)[0];
        this.elfFrm.setValue(this.elf);
        let op=this.modal.open();
    }
    DeleteElf(id:string)
    {
        this.ops = Operation.Delete;
        this.SetControlsState(true);
        this.modalTitle = Global.ElfFormTitles.DeleteElf;
        this.modalBtnTitle  =Global.ElfButtonTitles.DeleteElf;
        this.elf = this.elves.filter(x => x.Id == id)[0];
        this.elfFrm.setValue(this.elf);
        let op=this.modal.open();
    }
    SearchData(param:any)
    {
        let value= this.searchfilter.nativeElement.value;
        let url= ApiHelper.ElvesApis.SearchFilterElfApiRoute+value;       
        this.indLoading = true;
        this._elvesService.GetAllWithFilters(url)
            .subscribe(elves => { this.elves = elves; this.indLoading = false; },
                error => this.msg = <any>error);
       
       
    }
    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.elfFrm.enable() : this.elfFrm.disable();
    }
    onSubmit(formData: any) 
    {
        this.msg = "";
        switch (this.ops) {
            case Operation.Create:
                this._elvesService.CreateElf(ApiHelper.ElvesApis.CreteElfApiRoute, formData._value).subscribe(
                    data => {
                        if (data == true)
                        {
                            this.msg = Global.Messages.CreateSuccess;
                            this.LoadAllElves();
                        }
                        else
                        {
                            this.msg = Global.Messages.CreateInError
                        }
                        let dismiss=this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case Operation.Update:
                this._elvesService.UpdateElf(ApiHelper.ElvesApis.UpdateElfApiRoute, formData._value).subscribe(
                    data => {
                        if (data == true)
                        {
                            this.msg = Global.Messages.UpdateSuccess ;
                            this.LoadAllElves();
                        }
                        else
                        {
                            this.msg = Global.Messages.UpdateInError
                        }
                        let dismiss=this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case Operation.Delete:
               
                let url= ApiHelper.ElvesApis.DeleteElfApiRoute+formData._value.Id;
                this._elvesService.DeleteElf(url).subscribe(
                    data => {
                        if (data == true)
                        {
                            this.msg = Global.Messages.DeleteSuccess ;
                            this.LoadAllElves();
                        }
                        else
                        {
                            this.msg = Global.Messages.DeleteInError
                        }
                        let dismiss=this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
                
        }
    }
    
}