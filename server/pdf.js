import pdf from 'html-pdf';
import fetch from 'node-fetch';
import {generateUuid} from 'avril/js/utils/string';

export default async (req, res) => {
  if (req.body.body) {
    pdf.create(req.body.body, {
      format: 'A4',
      header: {
        height: '1cm',
        // contents: phantom.callback(function(pageNum, numPages) {
        //   return "<h1>Header <span style='float:right'>" + pageNum + " / " + numPages + "</span></h1>";
        // })
      },
      footer: {
        height: '1cm',
      }
    }).toFile(`./tmp/${generateUuid()}.pdf`, (err, pdfRes) => {
      if (err) {
        console.error(err);
      } else {
        res.sendFile(pdfRes.filename);
      }
    });
  } else {
    res.send('Impossible de télécharger le document. Body Manquant.')
  }
}