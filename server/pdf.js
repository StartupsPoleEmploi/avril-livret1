const pdf = require('html-pdf');
const fetch = require('node-fetch');
// const {uuid} = import '../utils/string';

module.exports = async (req, res) => {
  console.log(req.path)
  const query = await fetch(`http://localhost:3000${req.path.replace('.pdf', '')}`)
  const body = await query.text()
  pdf.create(body).toFile('./tmp/test.pdf', (err, pdfRes) => {
    res.sendFile(pdfRes.filename);
  });
}