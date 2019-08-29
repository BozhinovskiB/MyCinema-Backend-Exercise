



const innerJoin = 'SELECT users.id, posts.id, text, likes, firstName, lastName FROM users AS Users INNER JOIN posts AS Posts ON Users.id = Posts.userId'

const userWithEmail = 'SELECT * FROM users WHERE email = ?';

const updateUserQuery = 'UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ?, password = ? WHERE id = ?';

const createMembers = 'INSERT INTO membersofstore (userId,storeId, membersUsername) VALUES (?, ?, ?)';
const getSingleMember = 'SELECT * FROM membersofstore WHERE userId = ? AND id = ?';
const listingAllMembers = 'SELECT * FROM membersofstore';


const insertIntoMovies = 'INSERT INTO movies (directorName,releaseDate, date) VALUES (?, ?, ?)';
const deleteMoviesById ='DELETE FROM movies WHERE id = ?';
const listingAllMovies = 'SELECT * FROM movies';
const getSingleMovie = 'SELECT * FROM movies WHERE  id = ?';

// SETANJE PO TABELI PO RED
// SELECT firstName, username, typeOfMovies, membersUsername FROM users JOIN membersofstore ON users.id = membersofstore.id JOIN store ON store.id = membersofstore.id;



const createPurchase = 'INSERT INTO purchase (movieId, storeId, date, typeofpayment, quantity) VALUES (?, ?, ?, ?, ?)';
const getSinglePurchase = 'SELECT * FROM purchase WHERE  id = ?';
const listingAllPurchases = 'SELECT * FROM purchase';
const deletePurchaseById = 'DELETE FROM purchase WHERE id = ?';

const rateCreate  = 'INSERT INTO ratemovies (userId, movieId, comments, rate) VALUES (?, ?, ?, ?)';
const getSingleRate ='SELECT * FROM ratemovies WHERE  id = ?';
const listingAllRates ='SELECT * FROM ratemovies';
const deleteRateById = 'DELETE FROM ratemovies WHERE id = ?';

const insertIntoUsers =  'INSERT INTO users (firstname, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)';
const loginUserQuery = `SELECT * FROM users WHERE email = ?`;
const getSingleUserPerId = 'SELECT * FROM users WHERE  id = ?';
const listUsers = 'SELECT * FROM users';
const deleteUserQuery = 'DELETE FROM users WHERE id = ?';


export default {
  listingAllMembers,
  getSingleMember,
  insertIntoMovies,
  deleteMoviesById,
  listingAllMovies,
  getSingleMovie,
  createPurchase,
  getSinglePurchase,
  deletePurchaseById,
  listingAllPurchases,
  rateCreate,
  getSingleRate,
  listingAllRates,
  deleteRateById,
  updateUserQuery,
  loginUserQuery,
  getSingleUserPerId,
  listUsers,
  deleteUserQuery,
  insertIntoUsers,
  createMembers
}
