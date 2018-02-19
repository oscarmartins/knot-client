import { Router } from 'express'
import axios from 'axios'

const router = Router()

router.post('/auth', function (req, res, next) {
  const defpar = {
    grant_type: 'password',
    client_id: process.env.KNOT_CLIENT_ID,
    client_secret: process.env.KNOT_CLIENT_SECRET,
    username: req.body.email,
    password: req.body.password,
    scope: '*'
  }
  console.log(defpar)
  axios.post('http://localhost:8081/services', {REQ_CONTEX: 2000, REQ_ACTION: 2010, REQ_INPUTS: {email: req.body.email, password: req.body.password}}).then((response) => {
    console.log(response.data)
    res.send(response.data)
  }).catch((e) => {
    res.status(500).send({ error: 'Invalid credentials' })
  })
})

router.post('/location/current', function (req, res, next) {
  axios
    .get(`http://api.opencagedata.com/geocode/v1/json?q=${req.body.lat}+${req.body.long}&key=${process.env.OPENCAGE_API_KEY}`)
    .then((response) => {
      res.send(response.data)
    }).catch((e) => {
      console.log(JSON.stringify(e))
    })
})

router.post('/location/nearby', function (req, res, next) {
  axios
    .get(`https://api.foursquare.com/v2/venues/search?ll=${req.body.lat},${req.body.long}&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&v=20170521`)
    .then((response) => {
      res.send(response.data)
    }).catch((e) => {
      console.log(JSON.stringify(e))
    })
})

export default router
