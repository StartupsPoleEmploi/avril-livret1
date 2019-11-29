import pdf from 'html-pdf';
import fetch from 'node-fetch';
import {uuid} from '../utils/string';

module.exports = async (req, res) => {
  if (req.body.body) {
    pdf.create(req.body.body).toFile(`./tmp/${uuid()}.pdf`, (err, pdfRes) => {
      res.sendFile(pdfRes.filename);
    });
  } else {
    res.send('Impossible de télécharger le document. Body Manquant.')
  }
}