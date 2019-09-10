import client from '../services/database';


class User {
    constructor(first_name, last_name, email, password, address, bio, occupation, expertise, admin, mentor){
        this.first_name = first_name;
        this.last_name = last_name;
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
        const userQuery = 'INSERT INTO users(first_name, last_name, email, password, address, bio, occupation, expertise, admin, mentor) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *';
        const values = [this.first_name, this.last_name, this.email, this.password, this.address, this.bio, this.occupation, this.expertise, this.admin, this.mentor]
        return client.query(userQuery, values); 
    }
    static getUserByEmail(email) {
        const query = 'SELECT * FROM users WHERE email=$1';
        return client.query(query, [email]);
    }
    static getUserById (id){
        const user = `SELECT * FROM users WHERE id = $1`;
        return client.query(user,[id])
    }
    static changeUserToMentor(id){
        const user = `UPDATE users SET mentor='true' WHERE id= $1  RETURNING *`;
         return client.query(user,[id])
       
      }

 static getAllMentors(){
    const user = `SELECT * FROM users WHERE mentor= 'true'`;
        return client.query(user); 
   }
    
}


 export default User;





