var express = require('express');
var router = express.Router();

router.get("/:id", (req, res) => {
  var id = parseInt(req.params.id);
  if (id === 1)
    return res.status(302).send({id: req.params.id}); // exemple de user trouvé
  else
    return res.status(404).send(); // exemple si on a pas trouvé le user
});

router.get("/", (req, res) => {
  return res.send('respond with all users');
});

module.exports = router;
