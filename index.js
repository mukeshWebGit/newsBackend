const express = require('express'); 
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demoDB'); 
  console.log('Db Connected');
}
const userSchema = new mongoose.Schema({
   userName: String,
   Password: String
 });
 const User = mongoose.model('User', userSchema);
const app = express();
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
app.use(cors());
app.use(bodyParser.json());


app.post('/demo', async (req, res) => {
   let user = new User();
   user.userName = req.body.userName;
   user.Password = req.body.Password;
   const doc = await user.save();
   console.log(doc); 
    res.json(doc)
 })
 app.get('/demo', async (req, res) => {
   const docs = await User.find({})
   res.json(docs);
 })

 app.listen(8080, () => { 
    console.log('Server Start');
 })

