const postController = require("../controllers/posts");
const router = require("express").Router();

//CREATE A POST
router.post("/api/posts", postController.create);

//GET ALL POSTS
router.get("/api/posts", postController.findAll);

//GET POST BY ID
router.get("/api/posts/:id", postController.findOne);

//UPDATE POST BY ID
router.patch("/api/posts/:id", postController.update);

//DELETE POST BY ID
router.delete("/api/posts/:id", postController.delete);


module.exports = router;
