import * as functions from 'firebase-functions';
import * as firebase from "firebase";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const router = express();
router.use(cors());
router.use(bodyParser.json());
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers")
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST')
    next();
});

var config = {
    apiKey: "AIzaSyCGaQ0rg69mAXY0Oh6SRiwgPb-QRzaDZgg",
    authDomain: "androidexam-d1a9d.firebaseapp.com",
    databaseURL: "https://androidexam-d1a9d.firebaseio.com",
    projectId: "androidexam-d1a9d",
    storageBucket: "androidexam-d1a9d.appspot.com",
    messagingSenderId: "880384297636"
  };
  firebase.initializeApp(config);



var database = firebase.database()


router.get('/', (req, res, next) => {
    res.send({ ok: true, message: 'Welcome to API test2' });
});
router.get('/data', async (req, res, next) => {
    let midtermselect = []
    await database.ref().once('value')
    .then(snapshot => {
        midtermselect = snapshot.val()
    })
    .catch(err =>{
        res.send({ ok: false, message: 'database false' });
    })
    res.send({ ok: true, message: midtermselect });
});
router.get('/search/:data', async (req, res, next) => {
    let data = req.params.data
    let midtermselect = []
    await database.ref().once('value')
    .then(snapshot => {
        midtermselect = snapshot.val()
    })
    .catch(err =>{
        res.send({ ok: false, message: 'database false' });
    })
    res.send({ ok: true, row: midtermselect });
});

export const apiUrl = functions.https.onRequest(router);
