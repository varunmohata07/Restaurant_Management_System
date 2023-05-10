import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { RestaurantData } from './restaurant.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup

  restuarantModelObj: RestaurantData = new RestaurantData;
  allRestaurantData: any;
  constructor(private formBuilder : FormBuilder, private api:ApiService){ }

  ngOnInit(): void {
      this.formValue = this.formBuilder.group({
        name: [''],
        managername : [''],
        address : [''],
        contact : ['']
      })
      this.getAllData()
  }

  //Subsribe our Data -- Mapped via Services
  addResto(){
    this.restuarantModelObj.name = this.formValue.value.name;
    this.restuarantModelObj.managername = this.formValue.value.managername;
    this.restuarantModelObj.address = this.formValue.value.address;
    this.restuarantModelObj.contact = this.formValue.value.contact;

    this.api.postRestaurant(this.restuarantModelObj).subscribe(
      res=>{
      console.log(res);
      alert("Restaurant Added Successfully !!");

      //clear fill form data
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData();
    },
    err=>{
      alert("Something went Wrong !")
    })
  }

  //Get all Data
  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData = res;
    })
  }

  //DeleteRecords
  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Restuarant Deleted successfully")
      this.getAllData(); //
    })
  }

  // Edit
  editResto(data:any){
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['manegername'].setValue(data.name);
    this.formValue.controls['address'].setValue(data.name);
    this.formValue.controls['contact'].setValue(data.name);

  }

  // updateResto(){
  //   this.restuarantModelObj.name = this.formValue.value.name;
  //   this.restuarantModelObj.managername = this.formValue.value.managername;
  //   this.restuarantModelObj.address = this.formValue.value.address;
  //   this.restuarantModelObj.contact = this.formValue.value.contact;
  
  //   this.api.updateRestaurant(this.restuarantModelObj,this.restuarantModelObj.id).subscribe(res=>{
  //   alert("Updated Successfully")
  //   })
  // }
}
