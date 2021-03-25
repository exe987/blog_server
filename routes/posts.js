const postsController = require("../controllers/posts");
const router = require("express").Router();

//CREATE A POST
router.post("/api/posts", postsController.create);

//GET ALL POSTS
router.get("/api/posts", postsController.findAll);

//GET POST BY ID
router.get("/api/posts/:id", postsController.findOne);

//UPDATE POST BY ID
router.patch("/api/posts/:id", postsController.update);

//DELETE POST BY ID
router.delete("/api/posts/:id", postsController.delete);

module.exports = router;
