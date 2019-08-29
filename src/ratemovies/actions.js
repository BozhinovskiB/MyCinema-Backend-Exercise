import database from '../database/mysql';

import queries from '../migrations/queriesSql';

const{  rateCreate, getSingleRate, listingAllRates, deleteRateById} = queries;

const { con } = database;





function createRate (userId, movieId, comments, rate){
  return new Promise ((resolve, reject)=>{
    con.query(rateCreate, [userId, movieId, comments, rate], (err, results)=>{
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
  userId, movieId, comments, rate
 }: {
  userId:number,
  movieId:number,
   email:string,
   comments:string,
   rate: number
 } = req.body;

 try{
  const creatingRate = await createRate(userId, movieId, comments, rate);
  res.status(201).send({success: true, message: 'The rate has been successfully created', body: {userId, movieId, comments, rate}});
 } catch (error){
  res.status(500).send({ success: false, message: "Error, please try again"});
 }
 await next;
 }
 
 
 
 function deleteRate(id){
  return new Promise((resolve, reject)=>{
    con.query(deleteRateById,[Number(id)], (err, results)=>{
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
  const user: Object = await deleteRate(id);
  res.status(200).send({ success: true, message: "The rate with id ${id} is deleted"});
 } catch (error){
  res.status(500).send({ success: false, message: "Something went wrong, please try again"});
 }
 await next;
 }
 
 
 
 function listAllRates(){
  return new Promise((resolve, reject)=>{
    con.query(listingAllRates, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
 }
 async function list (req, res, next) {
  try{
    const users: Array = await listAllRates();
    res.status(200).send({ success: true, message: "Rates registered on the website", body: users});
  }  catch (error){
    res.status(500).send({ success: false, message: "Something went wrong, please try again"});
  }
  await next;
 }




 function getRate(id) {
  return new Promise((resolve, reject) => {
    con.query(getSingleRate, [Number(id)], (err, results) => {
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
  const user: Object = await getRate(id);
  res.status(200).send({ success: true, message: "Rate with id ${id}", body: user});
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