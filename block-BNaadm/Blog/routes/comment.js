var express = require('express');
 const { route } = require('.');
const Articel = require('../modals/Article');
var router = express.Router();

// var blog = require('../modals/Article')
var Comment = require('../modals/comment')


router.get('/:id/edit',(req,res,next)=>{
    var id= req.params.id;
    Comment.findById(id,(err,comments)=>{
        console.log(comments)
      if(err) return next(err);
      res.render('updatecomment',{comments:comments})
    })
  })
  
  router.post('/:id',(req,res,next)=>{
    var id= req.params.id;
    Comment.findByIdAndUpdate(id,req.body,(err,updatecomments)=>{
      if(err) return next(err);
      res.redirect('/users/'+ updatecomments.articleId)
    })
  })


router.get('/:id/delete',(req,res,next)=>{
    var id = req.params.id;
    Comment.findByIdAndRemove(id,(err,deletecomment)=>{
        if(err) return next(err);
        Comment.deleteMany({articleId:deletecomment.id},(err,info)=>{
            res.redirect('/users/'+ deletecomment.articleId) 
        })
      
    })
})

router.get('/:id/like',(req,res,next)=>{
    var id = req.params.id;
    Comment.findByIdAndUpdate(id,{$inc:{likes:1}},(err,like)=>{
      // if(err) return next(err);
      // res.redirect('/users/' + id)
      // if(blog.likes==0){
      //   likes +=1
      // }else{
      //   likes =0
      // }
      res.redirect('/users/' +like.articleId)
  
    })
  })
  router.get('/:id/dislike',(req,res,next)=>{
    var id = req.params.id;
    Comment.findByIdAndUpdate(id,{$inc:{likes:-1}},(err,like)=>{
      // if(err) return next(err);
      // res.redirect('/users/' + id)
      // if(blog.likes==0){
      //   likes +=1
      // }else{
      //   likes =0
      // }
      res.redirect('/users/' +like.articleId)
  
    })
  })

module.exports = router;