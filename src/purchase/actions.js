
import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';
// import { get } from 'https';
const{   createPurchase,
  getSinglePurchase,
  listingAllPurchases,
  deletePurchaseById, } = queries;

const { con } = database;


function PurschaseCreate (movieId, storeId, date, typeofpayment, quantity){
 return new Promise ((resolve, reject)=>{
   con.query(createPurchase, [movieId, storeId, date, typeofpayment, quantity], (err, results)=>{
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
  movieId, storeId, date, typeofpayment, quantity
}: {
  movieId:number,
  storeId:number,
  date:number,
  typeofpayment:string,
  quantity: number
} = req.body;

try{
 const createP = await PurschaseCreate(movieId, storeId, date, typeofpayment, quantity);
 res.status(201).send({success: true, message: 'The purchase has been successfully registered', body: {  movieId, storeId, date, typeofpayment, quantity}});
} catch (error){
 res.status(500).send({ success: false, message: "Error, please try again"});
}
await next;
}



function deletePurchase(id){
 return new Promise((resolve, reject)=>{
   con.query(deletePurchaseById,[Number(id)], (err, results)=>{
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
 const purchase: Object = await deletePurchase(id);
 res.status(200).send({ success: true, message: "The purchase with id ${id} is deleted"});
} catch (error){
 res.status(500).send({ success: false, message: "Something went wrong, please try again"});
}
await next;
}



function listAllPurchases(){
 return new Promise((resolve, reject)=>{
   con.query(listingAllPurchases, (err, results)=>{
     if(err){
       reject(err);
     }
     resolve(results);
   });
 });
}
async function list (req, res, next) {
 try{
   const purchase: Array = await listAllPurchases();
   res.status(200).send({ success: true, message: "purchases registered on the website", body: purchase});
 }  catch (error){
   res.status(500).send({ success: false, message: "Something went wrong, please try again"});
 }
 await next;
}
function getPurchase(id) {
 return new Promise((resolve, reject) => {
   con.query(getSinglePurchase, [Number(id)], (err, results) => {
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
 const purchase: Object = await getPurchase(id);
 res.status(200).send({ success: true, message: "Purchase with id ${id}, body: purchase"});
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