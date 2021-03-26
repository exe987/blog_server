const { Post } = require("../models/");
const path = require("path");
const { order, where } = require("sequelize");
const { queryError, serverError, response } = require("../helpers/errors");
//CREATE A POST
const postController = {
  async create(req, res) {
    try {
      const { title, contain, category, image } = await req.body;
      if (!title || !contain || !category || !image) {
        queryError(res, "Fill in the fields with data required!!");
        return;
      }
      if (
        typeof title !== "string" ||
        typeof contain !== "string" ||
        typeof category !== "string" ||
        typeof image !== "string"
      ) {
        queryError(res, "Something is not string!!");
        return;
      }
      const extFile = path.extname(image);
      const valid_extensions = [".png", ".jpg", ".jpeg"];
      if (!valid_extensions.includes(extFile)) {
        queryError(res, "Format image is not valid!!");
        return;
      }
      const post = {
        title,
        contain,
        category,
        image,
      };
      Post.create(post).then(() => {
        response(res, { msg: "Post created!!!" });
      });
    } catch (error) {
      console.log(error);
      serverError(res, "Some error occurred while creating the post!!!");
    }
  },
  //GET POSTS
  async findAll(req, res) {
    try {
      await Post.findAll({
        order: [["createdAt", "DESC"]],
      }).then((data) => {
        if (data) {
          const resp = data.map((data) => {
            return {
              id: data.id,
              title: data.title,
              image: data.image,
              category: data.category,
              createdAt: data.createdAt,
            };
          });
          response(res, resp);
        } else {
          queryError(res, "An error ocurred");
        }
      });
    } catch (error) {
      console.log(error);
      serverError(res, "Some error occurred while getting posts!!");
    }
  },
  //GET POST BY ID
  async findOne(req, res) {
    try {
      const id = await req.params.id;
      Post.findByPk(id).then((data) => {
        if (data) {
          response(res, data);
        } else {
          queryError(res, "Post does not exist!!");
        }
      });
    } catch (error) {
      console.log(error);
      serverError(res, "Some error occurred while getting post!!");
    }
  },

  //UPDATE POST BY ID
  async update(req, res) {
    try {
      const id = req.params.id;
      const { title, contain, category, image } = await req.body;
      if (!title || !contain || !category || !image) {
        queryError(res, "Fill in the fields with data required!!");
        return;
      }
      if (
        typeof title !== "string" ||
        typeof contain !== "string" ||
        typeof category !== "string" ||
        typeof image !== "string"
      ) {
        queryError(res, "Something is not string!!");
        return;
      }
      const extFile = path.extname(image);
      const valid_extensions = [".png", ".jpg", ".jpeg"];
      if (!valid_extensions.includes(extFile)) {
        queryError(res, "Format image is not valid!!");
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
            response(res, { msg: "Post was updated successfully!!" });
          } else {
            queryError(
              res,
              `Cannot update post with id ${id}!!. Maybe post does not exist`
            );
          }
        });
      }
    } catch (error) {
      console.log(error);
      serverError(res, "Some error occurred while updating post!!");
    }
  },
  //DELETE POST
  async delete(req, res) {
    try {
      const id = req.params.id;
      await Post.destroy({
        where: { id: id },
      }).then((num) => {
        if (num == 1) {
          response(res, { msg: "Post was deleted successfully!!" });
        } else {
          queryError(
            res,
            `Cannot delete post with id ${id}!!. Maybe post does not exist`
          );
        }
      });
    } catch (error) {
      console.log(error);
      serverError(res, "Some error occurred while deleting post!!");
    }
  },
};

module.exports = postController;
