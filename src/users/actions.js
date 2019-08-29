
import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';
// import { get } from 'https';


const{ insertIntoUsers, updateUserQuery, getSingleUserPerId, listUsers, loginUserQuery } = queries; 

const { con } = database;


Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);

function usersSignUp (firstName, lastName, email, username, password){
 return new Promise ((resolve, reject)=>{
   con.query(insertIntoUsers, [firstName, lastName, email, username, password], (err, results)=>{
     console.log(err);
     if (err) {
       reject(err);
     }
     resolve(results);
   });
 });
};
async function create (req, res, next){
const {
  firstName,
  lastName,
  email,
  username,
  password
}: {
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string
} = req.body;
const salt = bcrypt.genSaltSync(10);
const getRounds = bcrypt.getRounds(salt);
const passHash = bcrypt.hashSync(password, getRounds);
try{
 const createUser = await usersSignUp(firstName, lastName, email, username, passHash);
 res.status(201).send({success: true, message: 'The user has been successfully registered', body: { firstName, lastName, email, username, password}});
} catch (error){
 res.status(500).send({ success: false, message: "Error, please try again"});
}
await next;
}
function deleteUser(id){
 return new Promise((resolve, reject)=>{
   con.query(delUser, parseInt(id), (err, results)=>{
     if (err){
       reject(err);
     }
     resolve(results);
   });
 });
}
async function del(req, res, next){
 const { id }: { id: string} = req.params;
try{
 const user: Object = await deleteUser(id);
 res.status(200).send({ success: true, message: `The user with id ${id} is deleted`});
} catch (error){
 res.status(500).send({ success: false, message: `Something went wrong, please try again`});
}
await next;
}
function listAllUsers(){
 return new Promise((resolve, reject)=>{
   con.query(listUsers, (err, results)=>{
     if(err){
       reject(err);
     }
     resolve(results);
   });
 });
}
async function list (req, res, next) {
 try{
   const users: Array = await listAllUsers();
   res.status(200).send({ success: true, message: "Users registered on the website", body: users});
 }  catch (error){
   res.status(500).send({ success: false, message: "Something went wrong, please try again"});
 }
 await next;
}
function getUser(id) {
 return new Promise((resolve, reject) => {
   con.query(getSingleUser, [Number(id)], (err, results) => {
     if (err) {
       reject(err);
     }
     resolve(results);
   });
 });
};
const get = async (req, res, next) => {
 const { id }: { id: string } = req.params;
try{
 const user: Object = await getUser(id);
 res.status(200).send({ success: true, message: `User with id ${id}`, body: user });
} catch (error) {
 res.status(500).send({ success: false, message: "Something went wrong, please try again" });
}
 await next;
}

// function updateUserProfileInfo(id) {
//   return new Promise(( resolve, reject ) => {
//     con.query(updateUserQuery, [Number(id)], (err, results) => {
//       if (err) {
//              reject(err);
//       } 
//       resolve(results);
//     });
//   });
// };


function updateUserProfileInfo(firstName, lastName, email, username, password, id) {
  return new Promise(( resolve, reject ) => {
    con.query(updateUserQuery,[firstName, lastName, email, username, password,Number(id)], (err, results) => {
      if (err) {
             reject(err);
      } 
      resolve(results);
    });
  });
};


const update = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  const {
    firstName,
  lastName,
  email,
  username,
  password
  }: {
    firstName: string,
    lastName: ?string,
    email: ?string,
    username: ?string,
    password: ?string
  } = Object.assign({}, req.body);
 

  try{
 
    const userId = req.body.id;
    if (userId) {
      res.status(403).send(`Id ${id} should not be overwritten`);
    } else {
      if (password && password.length) {
        const salt = bcrypt.genSaltSync(10);
        const getRounds = bcrypt.getRounds(salt);
        const passHash = bcrypt.hashSync(password, getRounds);
           const updateUser = await updateUserProfileInfo(firstName, lastName, email, username, passHash, id);
      res.status(201).send({success: true, message: `The user with ${id} has been successfull yupdated`});
     }}
   
   } catch (error){
    res.status(500).send({ success: false, message: error.message});
    
   }
   await next;
   }


   const login = async(req, res, next) => {
    const { email, password }: { email: string, password: string } = req.body;
    
    return con.query(loginUserQuery, email, (err, results) => {
      if (err) {
        console.error(err);
      }
      const user = results.find(emailObj => emailObj.email === email);
      if (results && results.length && user.email) {
        const matchPassword: boolean = bcrypt.compareSync(password, user.password);
        if (matchPassword) {
    
       
          // console.log('User', user);
          const userId = user.id;
          const token = jwt.sign({ user }, 'token', { expiresIn: '1h'});
          res.status(200).send({message: 'Logged in', token: token});
          
        } else {
          res.status(403).send('Password is not correct');
        }
      } else {
        res.status(404).send(`User with email ${email} not found!`);
      }
    });
    
    await next;
  }

export default {
 create,
 del,
 list,
 get,
 update,
 login
}