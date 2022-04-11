var express = require('express');
const { route } = require('.');
var router = express.Router();

var Book = require('../modals/book');
var Author = require('../modals/author');
var Category = require('../modals/category');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//create
router.get('/new',(req,res,next)=>{
  console.log(req.body)
  res.render('bookform')
  
})
router.post('/',(req,res,next)=>{
  var id = req.params.id
  Book.create(req.body,(err,createbook)=>{
    if(err) next (err)
    console.log(req.body);
    res.redirect('/users/new')
  })
})

//read
router.get('/',(req,res,next)=>{
  Book.find({},(err,book)=>{
    if(err) next(err);
    res.render('books',{book:book})
  })
})

// router.get('/:id',(req,res,next)=>{
//   var id = req.params.id;
//   Book.findById(id,(err,books)=>{
//     if(err) return next(err);
//     res.render('singlebook',{books:books})
//   })
// })


router.get('/:id',(req,res,next)=>{
  var id = req.params.id;
  Book.findById(id).populate("authorID").populate('categoryID').exec((err,books)=>{
    console.log(err,books)
    if(err) return next(err);
       res.render('singlebook',{books:books})
  })

  })
//edit

router.get('/:id/edit',(req,res,next)=>{
  var id= req.params.id;
  Book.findById(id,(err,updatebook)=>{
    if(err) return next(err);
    res.render('updatebookform',{updatebook:updatebook})
  })
})
router.post('/:id/',(req,res,next)=>{
  var id = req.params.id;
  Book.findByIdAndUpdate(id,req.body,(err,update)=>{
    if(err) return next(err);
    res.redirect('/users/'+id)
  })
})

//delete

router.get('/:id/delete',(req,res,next)=>{
  var id= req.params.id;
  Book.findByIdAndDelete(id,(err,updatebook)=>{
    if(err) return next(err);
    res.redirect('/users/')
  })
})


//author

router.post('/:id/author',(req,res,next)=>{
  var id = req.params.id;
  req.body.bookId= id;
  Author.create(req.body,(err,author)=>{
    console.log(err,author)
    if(err) return next(err)
    Book.findByIdAndUpdate(id,{$push:{authorID:author.id}},(err,authors)=>{
      console.log(authors)
      if(err) return next(err)
      res.redirect('/users/'+id)
    })
  })
})


router.post('/:id/category',(req,res,next)=>{
  var id = req.params.id;
  // req.body.bookId= id;
  Category.create(req.body,(err,category)=>{
    console.log(err,category)
    if(err) return next(err)
    Book.findByIdAndUpdate(id,{$push:{categoryID:category.id}},(err,categorys)=>{
      console.log(categorys)
      if(err) return next(err)
      res.redirect('/users/'+id)
    })
  })
})


module.exports = router;
