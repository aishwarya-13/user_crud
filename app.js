const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const {ACTION_GETONE_USER,ACTION_SAVE_USER, ACTION_UPDATE_USER, ACTION_DELETE_USER, ACTION_GETALL_USER} = require('./util/const');
const {handleDbOp} = require('./util/handleRequest');
const {authenticateJWT} = require('./custom_middleware/verify_jwt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/build')));
//app.use(bodyParser.urlencoded({urlencoded: false}));

//app.set('view engine', 'ejs');

//if(process.env.NODE_ENV === `development`){
    app.use(cors());
//}


//Load login page
// app.get('/login', (req, res)=>{
//     res.status(200).render('login');
// });

// if(process.env.NODE_ENV === `production`){
//     app.get('/', (req, res)=>{
//         res.sendFile(path.join(__dirname, '/build/index.html'));
//     });    
// }

//Handle login
app.post('/login', async (req, res)=>{
    console.log('/login');
    console.log('req.body', req.body);
    let {fname, lname} = req.body, query;
    if(fname && lname){
        query = `SELECT * from users WHERE fname='${fname}' AND lname='${lname}'`;
        try{
            let result = await handleDbOp(query, ACTION_GETONE_USER);
            console.log('res', result);
            if(result){
                //Generate access token
                const jwtToken = jsonwebtoken.sign({
                    fname: result.fname,
                    lname: result.lname,
                    id: result.id,
                    role: result.role
                }, 
                process.env.JWT_SECRET_SIGNATURE,
                {
                    expiresIn: '15000s'
                }
                );//Fetching user after jwt is verified
                res.json({
                    jwtToken
                });
            }else{
                res.status(500).render('message', {pageTitle: 'Error', message: 'User credentials incorrect!'});
            }
            res.redirect('/');
        }catch(e){
            res.status(500).render('message', {pageTitle: 'Error', message: e});
        }
    }
});

app.use(authenticateJWT);

//Check if jwt is present
app.use((req, res, next)=>{
    //console.log('checking auth header', req.headers.authorization.includes('Bearer'))
    if(req.headers && req.headers.authorization &&req.headers.authorization.length > 7){
        next()
    }else{
        res.status(401).send('JWT missing');
    }
});

// //Load index page
// app.get('/', (req, res)=>{
//     res.status(200).render('create', {pageTitle: 'Create', isEdit: false}); 
// });

//Create user
app.post('/user', async (req, res)=>{
    let query = '', result, {fname, lname} = req.body;
    if(fname && lname){
        query = `INSERT INTO users (fname, lname) VALUES ('${fname}', '${lname}')`;
        try{
            result = await handleDbOp(query, ACTION_SAVE_USER);
            if(result){
                res.status(200).send('User created sucessfully!');
            }        
        }catch(e){
            res.status(500).send('Something went wrong');
        }
    }else{
        res.status(500).send('Something went wrong');
    }
});

// Get single user
app.get('/user/:id', async (req, res)=>{
    console.log('get user for update');
    let query = '', result, {id} = req.params;
    query = `SELECT * FROM users WHERE id=${id}`;
    if(id){
        try{
            result = await handleDbOp(query, ACTION_GETONE_USER);
            console.log(result);
            if(result){
                res.json(result);
                res.status(200);
            }else{
                res.status(500).send('User not found!'); 
            }
            
        }catch(e){
            res.status(500).render('message', {pageTitle: 'Error', message: e});
        }
    }
});

//Update user
app.put('/user', async (req, res)=>{
    console.log('/user/update');
    let {fname, lname, id} = req.body, userId = parseInt(id);
    if(userId){
        const query = `UPDATE users SET fname='${fname}', lname='${lname}' WHERE id=${userId}`;
        try{
            await handleDbOp(query, ACTION_UPDATE_USER);
            res.status(200).send('User updated successfully!');
        }catch(e){
            res.status(500).render('message', {pageTitle: 'Error', message: e});
        }
    }else{
        res.status(500).render('message', {pageTitle: 'Error', message: 'Something went wrong!'});
    } 
});

//Delete user
app.delete('/user/:id', async (req, res)=>{
    console.log('req', req.params);
    let query = '', {id} = req.params;
    if(id){
        query = `DELETE FROM users WHERE id=${id}`;
        try{
            await handleDbOp(query, ACTION_DELETE_USER);
            res.status(200).send('User deleted successfully!');
        }catch(e){
            res.status(500).render('message', {pageTitle: 'Error', message: e});
        }
    }
});

//Get all users
app.get('/list', async (req, res)=>{
    //console.log('req', req)
    if(req.user && req.user.role === 'admin'){
        let query = '', result;
        query = `SELECT * FROM users`;
        try{
            result = await handleDbOp(query, ACTION_GETALL_USER);
            res.json(result);
            if(result.length){
                res.status(200)//.render('list', {pageTitle: 'List', result});
            }else{
                res.status(500)//.render('message', {pageTitle: 'Error', message: 'Something went wrong!'});
            }
        }catch(e){
            res.status(500)//.render('message', {pageTitle: 'Error', message: e});
        }
    }else{
        res.status(500).send('Not authorized');
    }
    
});

//404
app.use((req,res)=>{
    res.status(404).render('404', {pageTitle: '404'});
});

http.createServer(app).listen(process.env.PORT);

console.log(`Server listening on ${process.env.PORT}`);