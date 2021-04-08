const {pool} = require('./database');
const {ACTION_GETONE_USER,ACTION_SAVE_USER, ACTION_UPDATE_USER, ACTION_GETALL_USER} = require('./const');

exports.handleDbOp = (query, action)=>{
    let res;
    return new Promise((resolve, reject)=>{
        pool.query(query, (err, result, fields)=>{
            if(err){
                console.log('handleDbOp',err);
                return reject(err);
            }
            if(action === ACTION_SAVE_USER || action === ACTION_UPDATE_USER){
                res = true;
            }else if(action === ACTION_GETONE_USER){
                res = result[0]
            }else if(action === ACTION_GETALL_USER){
                res = result
            }
            resolve(res);
        })
    });
};

// exports.handleUserRequest = async (action, data)=>{
//     let query = '', result;
//     if(action === ACTION_SAVE_USER && data && data.fname && data.lname){
//         query = `INSERT INTO users (fname, lname) VALUES ('${data.fname}', '${data.lname}')`;   
//     }
//     if(action === ACTION_GETONE_USER && data){
//         query = `SELECT * FROM users WHERE id=${data}`;
//     }
//     try{
//         result = await handleDbOp(query);
//         console.log('res', result);
//         return result; 
//     }catch(e){
//         console.log('e', e)
//     }
    
// };