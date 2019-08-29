
import database from '../database/mysql';

import queries from '../migrations/queriesSql';

const{ listingAllItemsFromStore, getSingleItemFromStorePerId} = queries;

const { con } = database;





function listAllItems(){
  return new Promise((resolve, reject)=>{
    con.query(listingAllItemsFromStore, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
 }




 async function list (req, res, next) {
  try{
    const items: Array = await listAllItems();
    res.status(200).send({ success: true, message: "All items available", body: items});
  }  catch (error){
    res.status(500).send({ success: false, message: "Something went wrong, please try again"});
  }
  await next;
 }





 function getItem(id) {
  return new Promise((resolve, reject) => {
    con.query(getSingleItemFromStorePerId, [Number(id)], (err, results) => {
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
  const item: Object = await getItem(id);
  res.status(200).send({ success: true, message: `Item with id ${id}`, body: item} )
 } catch (error) {
  res.status(500).send({ success: false, message: `Something went wrong, please try again` });
 }
  await next;
 }
 


 
export default {

  list,
  get
 
 }