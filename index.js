const express = require('express')
const mongoose = require('mongoose')
const routerIndex = require('./src/routes/index.routes')
const dataConfig = require('./src/config/dataConfig')
const morgan = require('morgan')

const App = require('./src/config/init')

const app = new App(mongoose, express, dataConfig, routerIndex, morgan)

app.start();
