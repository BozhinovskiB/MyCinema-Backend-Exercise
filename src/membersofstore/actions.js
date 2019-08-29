
import database from '../database/mysql';
import Bluebird from 'bluebird';

import queries from '../migrations/queriesSql';

const { createMembers, getSingleMember, listingAllMembers } = queries;

const { con } = database;



function membersSignUp ( userId, storeId, membersUsername){
  return new Promise ((resolve, reject)=>{
    con.query(createMembers, [userId, storeId, membersUsername], (err, results)=>{
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
 userId,
  storeId,
  membersUsername
 }: {
  userId:number,
  storeId:number,
  membersUsername:string
 } = req.body;

 try{
  const createUser = await membersSignUp(userId, storeId, membersUsername);
  res.status(201).send({success: true, message: 'The member has been successfully registered', body:{userId, storeId, membersUsername}});
 } catch (error){
  res.status(500).send({ success: false, message: "Error, please try again"});
 }
 await next;
 }


function listAllMembers() {
  return new Promise((resolve, reject) => {
    con.query(listingAllMembers, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}
async function list(req, res, next) {
  try {
    const members: Array = await listAllMembers();
    res.status(200).send({ success: true, message: "members registered on the website", body: members });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong, please try again" });
  }
  await next;
}



function getMembers(id) {
  return new Promise((resolve, reject) => {
    con.query(getSingleMember, [Number(id)], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};
const get = async (req, res, next) => {
  const { id }: { id: string } = req.params;
  try {
    const members: Object = await getMembers(id);
    res.status(200).send({ success: true, message: `movie with id ${id}`, body: members });
  } catch (error) {
    res.status(500).send({ success: false, message: `Something went wrong, please try again` });
  }
  await next;
}





export default {
create,
  list,
  get

}