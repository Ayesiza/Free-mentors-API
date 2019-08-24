import  { users } from '../data/userData'
class User {
    constructor( id, firstName, lastName, email, password, address, bio, occupation, expertise, admin, mentor){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.bio = bio;
        this.occupation = occupation;
        this.expertise = expertise;
        this.admin = admin;
        this. mentor = mentor; 
    }
    signUpUser(){
         users.push(this);
        return this
     }
    static getUserById (id){
        return users.find(user => user.id === parseInt(id))
    }
    static getUserByEmail(email){
        return users.find(user => user.email === email)
    }
    static getAllMentors(){
         return users.filter(user =>user.mentor === true )  
     }
     
    static changeUserToMentor(user){
      return user.mentor = true
     }
    }




 export default User;





