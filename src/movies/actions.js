
import database from '../database/mysql';
import Bluebird from 'bluebird';

import queries from '../migrations/queriesSql';
// import { get } from 'https';
const{ insertIntoMovies, getSingleMovie, listingAllMovies, deleteMoviesById} = queries;

const { con } = database;



function createMovies (directorName, releaseDate, name){
 return new Promise ((resolve, reject)=>{
   con.query(insertIntoMovies, [directorName, releaseDate, name], (err, results)=>{
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
  directorName,
  releaseDate,
  name,

}: {
  directorName:string,
  releaseDate:number,
  email:string,

} = req.body;

try{
 const createMovie = await usersSignUp(directorName, releaseDate, name);
 res.status(201).send({success: true, message: 'The movie has been successfully registered', body: {directorName, releaseDate, name}});
} catch (error){
 res.status(500).send({ success: false, message: "Error, please try again"});
}
await next;
}



function deleteMovie(id){
 return new Promise((resolve, reject)=>{
   con.query(deleteMoviesById,[Number(id)], (err, results)=>{
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
 const deleted: Object = await deleteMovie(id);
 res.status(200).send({ success: true, message: "The movie with id ${id} is deleted"});
} catch (error){
 res.status(500).send({ success: false, message: "Something went wrong, please try again"});
}
await next;
}



function listAllMOvies(){
 return new Promise((resolve, reject)=>{
   con.query(listingAllMovies, (err, results)=>{
     if(err){
       reject(err);
     }
     resolve(results);
   });
 });
}
async function list (req, res, next) {
 try{
   const movies: Array = await listAllMOvies();
   res.status(200).send({ success: true, message: "MOvies registered on the website", body: movies});
 }  catch (error){
   res.status(500).send({ success: false, message: "Something went wrong, please try again"});
 }
 await next;
}



function getMovie(id) {
 return new Promise((resolve, reject) => {
   con.query(getSingleMovie, [Number(id)], (err, results) => {
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
 const movie: Object = await getMovie(id);
 res.status(200).send({ success: true, message: "movie with id ${id}", body: movies});
} catch (error) {
 res.status(500).send({ success: false, message: "Something went wrong, please try again" });
}
 await next;
}





export default {
 create,
 del,
 list,
 get

}