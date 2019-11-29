const pdf = require('html-pdf');
const fetch = require('node-fetch');
import {uuid} from '../utils/string';

module.exports = async (req, res) => {
  // console.log(req.path)
  // const query = await fetch(`http://localhost:3000${req.path.replace('.pdf', '')}`)
  // const body = await query.text()
  console.log(req.param('body'))
  pdf.create(req.param('body')).toFile(`./tmp/${uuid()}.pdf`, (err, pdfRes) => {
    res.sendFile(pdfRes.filename);
  });
}