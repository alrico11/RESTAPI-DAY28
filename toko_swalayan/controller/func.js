const fs = require('fs');
let stocks = [];
const path = require('path');

function cekData(path) {
    data = fs.readFileSync(path, 'utf8');
    stocks = JSON.parse(data);
    return stocks
}

function generateId(path) {
    cekData(path)
    let lastId;
    if (stocks.length > 0) {
        lastId = stocks[stocks.length - 1].id;
    } else {
        lastId = 0;
    }
    const newId = parseInt(lastId) + 1;
    return newId;
};

function changeId(data) {
    const id = data.id;
    const newData = {
        id,
        ...data
    };
    return newData
}

function saveData(stock,path) {
    console.log(stock)
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(stocks))
        return stock
    } else {
        fs.writeFileSync(path, JSON.stringify(stocks))
        return stock
    }
}

function postStock(req, res, path) {
    const stock = req.body;
    const filePath = path;
    const dataStocksPath2 = filePath.slice(0, filePath.lastIndexOf('/'));
    console.log(stock)
    if (!fs.existsSync(path)) {
      fs.mkdirSync(dataStocksPath2);
      stock.id = 1;
      stocks.push(changeId(stock));
      saveData(stocks, path);
      res.send(changeId(stock));
    } else {
      const data = fs.readFileSync(path, 'utf8');
      if (data.length === 0) {
        stock.id = 1;
        stocks.push(changeId(stock));
        saveData(stocks, path);
        res.send(changeId(stock));
      } else {
        cekData(path);
        stock.id = generateId(path);
        stocks.push(changeId(stock));
        saveData(stocks, path);
        res.send(changeId(stock));
      }
    }
  }

function getStocks(req, res,path) {
    res.send({
        data: cekData(path)
    })
}

function getStocksById(req, res,path) {
    stokId = req.params.id;
    stokId = parseInt(stokId)
    cekData(path);
    const stock = stocks.find((s) => s.id === stokId);
    if (stock) {
        res.send({
            data: stocks.find(item => item.id === stokId)
        })
        console.log(stocks.find(item => item.id === stokId))
    } else {
        res.send({
            message: 'Data stock tidak ditemukan'
        })
        console.log(stocks.find(item => item.id === stokId))
    }
}

function updateStock(req, res,path) {
    cekData(path)
    stokId = parseInt(req.params.id);
    const index = stocks.findIndex((s) => s.id === stokId);
    if (index !== -1) {
        const updatedStock = req.body;
        stocks[index] = {
            id: stokId,
            nama: updatedStock.nama,
            harga: updatedStock.harga,
            barcode: updatedStock.barcode
        };
        res.send({
            success: true,
            message: `Stock with id ${stokId} has been updated!`,
            data: stocks[index]
        });
        saveData(stocks[index])
    } else {
        res.send({
            success: false,
            message: `Stock with id ${stokId} not found!`,
            data: null
        });
        
    }
}
function deleteOne(req, res, path) {
    cekData(path);
    const stokId = parseInt(req.params.id);
    const index = stocks.findIndex((s) => s.id === stokId);
    
    if (index !== -1) {
      const deletedStock = stocks.splice(index, 1)[0];
      const data = JSON.stringify(stocks, null, 2);
      fs.writeFileSync(path, data);
      
      res.send({
        success: true,
        message: `Stock with id ${stokId} has been deleted!`,
        data: deletedStock
      });
    } else {
      res.send({
        message: "GAGAL HAPUS"
      });
    }
  }


function uploadGambar(req, res) {
    const metaData = req.file;
    console.log(metaData)
    const originalName = metaData.originalname;
    const oldPath = metaData.path;
   
    if (!fs.existsSync("gambar")) {
        fs.mkdirSync("gambar")
        fs.renameSync(oldPath, path.resolve(`gambar/${originalName}`))
        res.send({ message: 'ngiriim gambar' });
    } else {
        
        fs.renameSync(oldPath, path.resolve(`gambar/${originalName}`))
        res.send({ message: 'ngiriim gambar' });
    }
   
}

module.exports = {
    postStock,
    getStocks,
    getStocksById,
    updateStock,
    deleteOne,
    uploadGambar,
}