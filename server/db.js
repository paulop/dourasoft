const Pool = require("pg").Pool;

// We could also use Heroku's Postgres service for minimum ping
// since we intend on deploying to Heroku.
// Repository and Credentials are public only for this challenge.
const pool = new Pool({
    user: "mgjjxcsj",
    password: "uRqrrkmkPiJcvwoKeX3Qvfe2ZKNoebDw",
    host: "babar.db.elephantsql.com",
    port: 5432,
    database: "mgjjxcsj" 
});

module.exports = pool;


// The following code is the Obfuscated version of the above code. It is commented (disabled) and is available only for showing that protection of ElephantSQL Credentials is possible

// const _0x3a205d=_0x364b;function _0x29b9(){const _0xabb11f=['Pool','19190628YIqEKQ','6881piBXXm','2vTpCPk','2161328DFdGCc','255716OiLWpz','11rfLqyG','1784QtpPuK','3005EVsWmS','2154hsGEDf','9GPPtEe','36740tWlxnI','mgjjxcsj','exports','babar.db.elephantsql.com','1248471klIDAI'];_0x29b9=function(){return _0xabb11f;};return _0x29b9();}(function(_0x54e337,_0x1e3342){const _0xa51156=_0x364b,_0x3b79d1=_0x54e337();while(!![]){try{const _0x5db583=parseInt(_0xa51156(0x15d))/0x1*(-parseInt(_0xa51156(0x15b))/0x2)+-parseInt(_0xa51156(0x157))/0x3+-parseInt(_0xa51156(0x15c))/0x4+-parseInt(_0xa51156(0x160))/0x5*(parseInt(_0xa51156(0x151))/0x6)+parseInt(_0xa51156(0x15a))/0x7*(parseInt(_0xa51156(0x15f))/0x8)+-parseInt(_0xa51156(0x152))/0x9*(parseInt(_0xa51156(0x153))/0xa)+parseInt(_0xa51156(0x15e))/0xb*(parseInt(_0xa51156(0x159))/0xc);if(_0x5db583===_0x1e3342)break;else _0x3b79d1['push'](_0x3b79d1['shift']());}catch(_0x27e1ac){_0x3b79d1['push'](_0x3b79d1['shift']());}}}(_0x29b9,0x5e6e6));const Pool=require('pg')[_0x3a205d(0x158)],pool=new Pool({'user':'mgjjxcsj','password':'uRqrrkmkPiJcvwoKeX3Qvfe2ZKNoebDw','host':_0x3a205d(0x156),'port':0x1538,'database':_0x3a205d(0x154)});function _0x364b(_0x4daaad,_0x5ca7a8){const _0x29b9cc=_0x29b9();return _0x364b=function(_0x364b69,_0x4cbd34){_0x364b69=_0x364b69-0x151;let _0x5b7b08=_0x29b9cc[_0x364b69];return _0x5b7b08;},_0x364b(_0x4daaad,_0x5ca7a8);}module[_0x3a205d(0x155)]=pool;