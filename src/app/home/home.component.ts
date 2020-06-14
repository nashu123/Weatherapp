import { Component, OnInit, ViewChild, TemplateRef, ɵConsole } from '@angular/core';
import { WeatherService } from '../weather.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Validators, FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
city;
@ViewChild('weathermodal',{static:true})weathermodal:TemplateRef<any>
@ViewChild('weathereditmodal',{static:true})weathereditmodal:TemplateRef<any>
  st: any=[];
  storedresponse=[];
  edit: any;
  weatherform: any;
  weathereditform: FormGroup;
  x: any;
  fetchresp: any;
  names=[];
  index: number;
  showerr: boolean;
  showerrmsg: boolean;
  constructor(private data: WeatherService,private _snackBar: MatSnackBar,public dialog: MatDialog, private router:ActivatedRoute, private fb:FormBuilder) { }
fetchdetails:any=[];
  ngOnInit() {
 
    this.weathereditform = this.fb.group({
      cityname:['',[Validators.required]]
     })
    this.weatherform = this.fb.group({
      city:['',[Validators.required]]
     })

  
}


  

  show(){

   
    let dialogRef = this.dialog.open(this.weathermodal,{
      width: '300px'
    
    })
  
    dialogRef.afterClosed().subscribe(result => {
      this.weatherform.reset();
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === 'yes') {
          this.weatherform.reset();
          // TODO: Replace the following line with your code.
          console.log('User clicked yes.');
        } else if (result === 'no') {
          // TODO: Replace the following line with your code.
          console.log('User clicked no.');
        }
      }
    })
  }

  show1(i:any){
    this.fetchresp = this.names[i]
    console.log(this.x)
    let dialogRef = this.dialog.open(this.weathereditmodal,{
      width: '500px',
      height:'300px'
    
    })
    this.weathereditform.patchValue({
      cityname:this.names[i]
    })

    this.index =this.names.indexOf(this.weathereditform.value.cityname) 
   

    console.log("yyy",this.index)
  }
  getdata(weatherform:FormGroup){

    this.data.showweatherdata(weatherform.value.city).subscribe(res=>{
      this.showerrmsg =false;
      console.log(res)
      this.fetchdetails=res;
   this.storedresponse.push(this.fetchdetails.weather)
  //  this.storedresponse.push.apply(this.storedresponse,this.fetchdetails.name);
   console.log(this.storedresponse)
   this.names.push(this.fetchdetails.name)
   console.log("names",this.names)
       },err=>{
        this._snackBar.open('Enter valid city name','close' ,{
          duration: 2000,
        });
      })

  }


  getwedata(weathereditform){
    // this.index =this.storedresponse.indexOf(weathereditform.value.cityname)
    // console.log(this.index)
    this.data.showweatherdata(weathereditform.value.cityname).subscribe(res=>{
this.showerr =false;
      console.log(res)
      this.fetchdetails=res;
   this.storedresponse[this.index]=this.fetchdetails.weather
   this.names[this.index]=this.fetchdetails.name;
  //  this.storedresponse.push.apply(this.storedresponse,this.fetchdetails.name);
   console.log("index",this.index)
  //  this.names.push(this.fetchdetails.name)
       },err=>{
         this.showerr =true;
       })


  }
}
