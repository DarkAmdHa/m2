const express = require('express')
const app = express()
const port = 5000

require('dotenv').config()

const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB('your-table-name')
process.env.CYCLIC_DB = 'bright-teal-frockCyclicDB'

const animals = db.collection('animals')

console.log(process.env.CYCLIC_DB)

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
/*var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false,
}
app.use(express.static('public', options))

// #############################################################################
// Catch all handler for all other request.
app.use('*', (req, res) => {
  res
    .json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params,
    })
    .end()
})*/

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/map', express.static(__dirname + 'public/css'))
app.use('/css', express.static(__dirname + 'public/custom-font'))
app.use('/eot', express.static(__dirname + 'public/custom-font'))
app.use('/svg', express.static(__dirname + 'public/custom-font'))
app.use('/ttf', express.static(__dirname + 'public/custom-font'))
app.use('/woff', express.static(__dirname + 'public/custom-font'))
app.use('/img', express.static(__dirname + 'public/fancy-img'))
app.use('/img', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/eot', express.static(__dirname + 'public/fonts'))
app.use('/svg', express.static(__dirname + 'public/fonts'))
app.use('/ttf', express.static(__dirname + 'public/fonts'))
app.use('/woff', express.static(__dirname + 'public/fonts'))
app.use('/woff2', express.static(__dirname + 'public/fonts'))
app.use('/otf', express.static(__dirname + 'public/fonts'))

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + 'public/index.html')
})

app.get('/about.html', (req, res) => {
  res.sendFile(__dirname + 'public/about.html')
})
app.post('/process.php', (req, res) => {
  res.sendFile(__dirname + 'public/process.php')
})
app.get('/contact.html', (req, res) => {
  res.sendFile(__dirname + 'public/contact.html')
})
app.get('/portfolio.html', (req, res) => {
  res.sendFile(__dirname + 'public/portfolio.html')
})
app.get('/services.html', (req, res) => {
  res.sendFile(__dirname + 'public/services.html')
})
app.get('/getaQuote.html', (req, res) => {
  res.sendFile(__dirname + 'public/getaQuote.html')
})

app.get('/getcomment', async (req, res) => {
  /*var conn = db.getconnection()
  conn.query(
    'SELECT * FROM comments.comments',
    function (error, results, fields) {
      if (error) throw error
      const comments = JSON.stringify(results)

      res.end(comments)
    }
  )
  conn.end()*/

  // create an item in collection with key "leo"
  let leo = await animals.set('leo', {
    type: 'cat',
    color: 'orange',
  })
  console.log(leo)
  console.log('-----------------------------------------------')

  // get an item at key "leo" from collection animals
  let item = await animals.get('leo')
  console.log(item)
})
/*
app.post('/insert', (req, res) => {
  req.on('data', function (data) {
    var content = ''
    content += data
    var conn = db.getconnection()
    var obj = JSON.parse(content)
    const commentClientId =  obj.clientID
    const comment =  obj.clientID

    const collected = []
    const commentClientsIds = []
    conn.query(
      'SELECT * FROM comments.comments',
      function (error, results, fields) {
        if (error) throw error
        const savevIds = JSON.stringify(results)
        const jsonIds = JSON.parse(savevIds)
        jsonIds.map((id) => {
          commentClientsIds.push(id.clientID)
        })
      }
    )
    conn.query(
      'SELECT * FROM comments.client_id',
      function (error, results, fields) {
        if (error) throw error

        let client_id = JSON.stringify(results)
        const IDarr = JSON.parse(client_id)
        // console.log(IDarr)
        IDarr.map((id) => {
          collected.push(id.clientID)
        })
        // console.log(collected)
        // console.log(obj)
        // console.log(collected.includes(obj.clientID))

        if (
          collected.includes(obj.clientID) &&
          commentClientsIds.includes(obj.clientID) != true
        ) {
          conn.query(
            'INSERT INTO comments.comments (comments.userName, comments.comment, comments.Rating, comments.clientID) VALUES(?,?,?,?)',
            [obj.name, obj.msg, obj.star, obj.clientID],
            function (error) {
              if (error) throw error
              // console.log('found')
            }
          )
        } else {
          // console.log('not found')
        }
        // console.log(collected)

        // res.end(client_id);
      }
    )

    res.end('working')
  })
  conn.end()
})
*/
app.listen(port, () => {
  console.log('ok ok ok')
})
