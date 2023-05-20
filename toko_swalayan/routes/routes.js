const express = require('express')
const stocksCtrl = require('../controller/func')
const karyawanCtrl = require('../controller/func')
const multer = require('multer');
const app = express.Router()
const path = require('path')

const upload = multer({
    dest: path.resolve('./tmp')
})


const auth = require('../../middleware/auth')


app.use(auth)

app.use(
    '/uploads',
    express.static(path.resolve(`gambar`))
)

// STOK DATA
app.post('/stok', (req, res) => {
    const filePath = './dataStocks/stocks.js';
    stocksCtrl.postStock(req, res, filePath);
});
app.get('/stok', (req, res) => {
    const filePath = './dataStocks/stocks.js';
    stocksCtrl.getStocks(req, res, "./dataStocks/stocks.js")
});
app.get('/stok/:id', (req, res) => {
    const filePath = './dataStocks/stocks.js';
    stocksCtrl.getStocksById(req, res, "./dataStocks/stocks.js")
});
app.put('/stok/:id', (req, res) => {
    const filePath = './dataStocks/stocks.js';
    stocksCtrl.updateStock(req, res, "./dataStocks/stocks.js")
});
app.delete('/stok/:id', (req, res) => {
    const filePath = './dataStocks/stocks.js';
    stocksCtrl.deleteOne(req, res, "./dataStocks/stocks.js"
    )
});
app.post('/upload-gambar', upload.single('image'), stocksCtrl.uploadGambar)

// Karyawan
app.post('/karyawan', (req, res) => {
    const filePath = './dataKaryawan/karyawan.json';
    karyawanCtrl.postStock(req, res, filePath);
  });
  
  app.get('/karyawan', (req, res) => {
    const filePath = './dataKaryawan/karyawan.json';
    karyawanCtrl.getStocks(req, res, filePath);
  });
  
  app.get('/karyawan/:id', (req, res) => {
    const filePath = './dataKaryawan/karyawan.json';
    karyawanCtrl.getStocksById(req, res, filePath);
  });
  
  app.put('/karyawan/:id', (req, res) => {
    const filePath = './dataKaryawan/karyawan.json';
    karyawanCtrl.updateStock(req, res, filePath);
  });
  
  app.delete('/karyawan/:id', (req, res) => {
    const filePath = './dataKaryawan/karyawan.json';
    karyawanCtrl.deleteOne(req, res, filePath);
  });
  
module.exports = app