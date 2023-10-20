import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../common.service';
import { User } from '../models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  userForm !: FormGroup;
  users: User[] = [];
  // users :any[] =[];
  currentId: any;
  constructor(private fb : FormBuilder, private commonService: CommonService){}

  ngOnInit(): void {
  this.userForm = this.fb.group({
    name:[""],
    email:[""],
    mobile:[""],
    age:[""]   
  });
 //call GetAllUsers to display on the component
  this.GetAllUsers();
   }

  // Check for add/edit
   submitForm(){
    if(!this.currentId){
      this.commonService.AddUsers(this.userForm.value).subscribe(data =>{
        alert("added Data");        
      })
    }
    else {
     let updatedUser = this.userForm.value;
      this.commonService.UpdateUsers(this.currentId, updatedUser).subscribe(data =>{    
        console.log('User Details',data);
        alert("updated Data"); 
            
    })
    }   
    this.userForm.reset();
    this.GetAllUsers(); //call this method to Update new data and stop refresh the page
   }
 //Get User using Get Api 
   GetAllUsers(){
    this.commonService.GetAllUser().subscribe(data =>{
     console.log('users',data);
     this.users = data;
  })
 }
 //Delete User
  DeleteUsers(Id : any){
      this.commonService.DeleteUsers(Id).subscribe(data =>{
      alert("User is deleted");
      this.GetAllUsers(); // call this method to update data and stop refresh the page
  })
 }
 //Edit user with current Id
Edit(user : User){
  this.currentId = user.id;
  alert("Edit User successfully");
  this.userForm.patchValue({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    age: user.age
  })
}

}
