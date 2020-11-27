const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;


router.get('/', (req, res)=>{
  const rand = Math.floor(Math.random() * cards.length);
  res.redirect(`/cards/${rand}`);
});

router.get('/:id', (req, res)=>{
  const {side} = req.query;
  const {id} = req.params;

  if(!side || (side !== 'question' && side !=='answer')){
    return res.redirect(`/cards/${id}?side=question`);
  }
  const name = req.cookies.username;

  const text = cards[id][side];
  const {hint} = cards[id];

  const templateData = {id, text, name};

  if(side === 'question'){
    templateData.hint = hint
    templateData.side = 'answer';
  }
  else{
    templateData.side = 'question';
  }


  res.render('card', templateData);
});

module.exports = router;
