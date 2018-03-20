"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const firebase = require("firebase");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express();
router.use(cors());
router.use(bodyParser.json());
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
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
var database = firebase.database();
router.get('/', (req, res, next) => {
    res.send({ ok: true, message: 'Welcome to API test2' });
});
router.get('/data', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let midtermselect = [];
    yield database.ref().once('value')
        .then(snapshot => {
        midtermselect = snapshot.val();
    })
        .catch(err => {
        res.send({ ok: false, message: 'database false' });
    });
    res.send({ ok: true, message: midtermselect });
}));
router.get('/search/:data', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let data = req.params.data;
    let midtermselect = [];
    yield database.ref().once('value')
        .then(snapshot => {
        midtermselect = snapshot.val();
    })
        .catch(err => {
        res.send({ ok: false, message: 'database false' });
    });
    res.send({ ok: true, row: midtermselect });
}));
exports.apiUrl = functions.https.onRequest(router);
//# sourceMappingURL=index.js.map