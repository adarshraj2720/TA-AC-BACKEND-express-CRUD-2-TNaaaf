var express = require('express');
const { route } = require('.');
var router = express.Router();

var blog = require('../modals/Article')
var comment = require('../modals/comment')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/new',(req,res)=>{
  res.render('form');
})

//create

router.post('/',(req,res,next)=>{
  blog.create(req.body,(err,createarticel)=>{
    console.log(err,createarticel)
    if(err) return next(err);
    res.redirect('/users/new')
  })
})

//read

router.get('/',(req,res,next)=>{
  blog.find({},(err,articels)=>{
    console.log(err,articels);
    if(err) return next(err);
    res.render('singletitle',{articels:articels})
  })
})


router.get('/:id',(req,res,next)=>{
  var id = req.params.id;
  blog.findById(id,(err,userdata)=>{
    if(err) return next(err);
    comment.find({articleId:id},(err,comments)=>{
      res.render('details',{userdata,comments})
    })
    
  })
})


//update
router.get('/:id/edit',(req,res,next)=>{
  var id = req.params.id;
  blog.findById(id,(err,updatedata)=>{
    if(err) return next(err);
    res.render('updateform',{updatedata:updatedata})
  })
})


router.post('/:id',(req,res)=>{
  var id = req.params.id;
blog.findByIdAndUpdate(id,req.body,(err,update)=>{
  if(err) return next(err);
  res.redirect('/users/'+ id);
})
})

//Delete
router.get('/:id/delete',(req,res,next)=>{
  // var id = req.params.id;
  blog.findByIdAndDelete(req.params.id,(err,deleteuser)=>{
    if(err) return next(err);
    res.redirect('/users')
  })
})

router.get('/:id/like',(req,res,next)=>{
  var id = req.params.id;
  blog.findByIdAndUpdate(id,{$inc:{likes:1}},(err,like)=>{
    
    // if(err) return next(err);
    // res.redirect('/users/' + id)
    // if(blog.likes==0){
    //   likes +=1
    // }else{
    //   likes =0
    // }
    res.redirect('/users/' +id)

  })
})

router.get('/:id/dislike',(req,res,next)=>{
  var id = req.params.id;
  blog.findByIdAndUpdate(id,{$inc:{likes:-1}},(err,like)=>{
 
    // if(blog.likes>0){
    // blog.findByIdAndUpdate(id,{$inc:{likes:-1}},(err,like)=>{
    //   like -=1
      res.redirect('/users/'+id)
    // })
    // }
    
  })
})

// function like(){
//   let count=0;
//   return count++;
// }

//addComment
router.post('/:id/comment',(req,res,next)=>{
  var id = req.params.id;
  req.body.articleId= id;
  comment.create(req.body,(err,comment)=>{
    console.log(err,comment)
    if(err) return next(err)
    res.redirect('/users/'+id)

  })
})


// router.get('/:id/edit',(req,res,next)=>{
//   var id= req.params.id;
//   comment.findById(id,(err,comments)=>{
//     if(err) return next(err);
//     res.render('updatecomment',{comments})
//   })
// })

// router.post('/:id',(req,res,next)=>{
//   var id= req.params.id;
//   comment.findByIdAndUpdate(id,req.body,(err,updatecomments)=>{
//     if(err) return next(err);
//     res.redirect('/users',updatecomments.authorId)
//   })
// })


module.exports = router;
