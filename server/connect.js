import fetch from 'node-fetch';

const QUERY_APP_HOST = 'http://172.18.0.3:4000';
const REDIRECT_APP_HOST = 'http://localhost:4000';

const redirectToApp = (req, res, next) => {
  res.redirect(REDIRECT_APP_HOST);
}

export default function (req, res, next) {
  fetch(`${QUERY_APP_HOST}/api/booklet?hash=${req.query.hash}`)
    .then(data => {
      if (data.ok) {
        next();
      } else {
        redirectToApp(req, res, next);
      }
    })
    .catch(error => redirectToApp(req, res, next));
}