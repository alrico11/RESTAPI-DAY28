const express = require('express')
const cors = require('cors')
const app = express();
const router = require("./toko_swalayan/routes/routes")
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin:'*'
}))
app.use("/api/", router)

const PORT = 3000
app.listen(PORT)
console.log("Application Running On Port", PORT);