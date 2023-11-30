var express = require('express');
var router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' }) 
const mergePDF=require('./merge');
const path = require('path');


/* GET home page.  */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/merge',upload.array('pdfs',2), async function(req, res, next) {
// console.log(req.files)
try{

  if (Array.isArray(req.files) && req.files.length >= 2) {
    let d = await mergePDF(path.join(req.files[0].path),
     path.join(req.files[1].path));
    
    res.redirect(`http://localhost:3000/${d}.pdf`);
    
  } else {
    // Handle error when files are not uploaded as expected
    res.status(400).send('Please upload at least two PDF files');
  }
}catch (error) {
  console.error('Error merging PDFs:', error);
  res.status(500).send('Internal Server Error');
}
});
 
module.exports = router;
