const { Post } = require("../models/");
const path = require("path");
const { order, where } = require("sequelize");
//CREATE A POST
exports.create = async (req, res) => {
  try {
    const { title, contain, category, image } = await req.body;
    if (!title || !contain || !category || !image) {
      res.send("Fill in the fields with data required!!");
      return;
    }
    const extFile = path.extname(image);
    const valid_extensions = [".png", ".jpg", ".jpeg"];
    if (!valid_extensions.includes(extFile)) {
      res.send("Format image is not valid!!");
      return;
    }
    const post = {
      title,
      contain,
      category,
      image,
    };
    Post.create(post).then(() => {
      res.status(200).send("Post created!!!");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Some error occurred while creating the post.",
    });
  }
};
//GET POSTS
exports.findAll = async (req, res) => {
  try {
    await Post.findAll({
      order: [["createdAt", "DESC"]],
    }).then((data) => {
      if (data) {
        const response = data.map((data) => {
          return {
            id: data.id,
            title: data.title,
            image: data.image,
            category: data.category,
            createdAt: data.createdAt,
          };
        });
        res.status(200).send(response);
      } else {
        res.status(404).send({
          message: "An error ocurred!!",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Some error occurred while getting posts!!",
    });
  }
};
//GET POST BY ID
exports.findOne = async (req, res) => {
  try {
    const id = await req.params.id;
    Post.findByPk(id).then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: "Post does not exist!!",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Some error occurred while getting post!!",
    });
  }
};

//UPDATE POST BY ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, contain, category, image } = await req.body;
    if (!title || !contain || !category || !image) {
      res.send("Fill in the fields with data required!!!");
      return;
    }
    const extFile = path.extname(image);
    const valid_extensions = [".png", ".jpg", ".jpeg"];
    if (!valid_extensions.includes(extFile)) {
      res.send("Format image is not valid!!!");
      return;
    } else {
      const toUpdate = {
        title,
        contain,
        category,
        image,
      };
      Post.update(toUpdate, {
        where: { id: id },
      }).then((num) => {
        if (num == 1) {
          res.status(200).send({
            message: "Post was updated successfully!!",
          });
        } else {
          res.status(404).send({
            message: `Cannot update post with id ${id}!!. Maybe post does not exist`,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Some error occurred while updating post!!",
    });
  }
};
//DELETE POST
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.destroy({
      where: { id: id },
    }).then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Post was deleted successfully!!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete post with id ${id}. Maybe post was not found!!`,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Some error occurred while deleting post.",
    });
  }
};
