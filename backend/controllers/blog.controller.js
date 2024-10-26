import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";

const addBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.id;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", success: false });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // create a blog post

    const newBlog = await Blog.create({
      title,
      content,
      author: userId,
    });

    user.blogs.push(newBlog._id);

    await user.save();

    return res.status(200).json({
      message: "Blog created successfully",
      success: true,
      blog: newBlog,
    });
  } catch (error) {
    console.error(error);
  }
};

const editBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const userId = req.id;

    const { id: blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }

    if (blog.author.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to edit this blog",
        success: false,
      });
    }

    if (title) blog.title = title;
    if (content) blog.content = content;

    await blog.save();

    return res.status(200).json({
      message: "Blog updated successfully",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    if (blog.author.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this blog",
        success: false,
      });
    }

    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({
      message: "Blog deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "fullname email");

    if (!blogs || blogs.length == 0) {
      return res.status(404).json({
        message: "No blogs found",
        success: false,
      });
    }

    return res.status(200).json({
      blogs,
      message: "Blogs fethed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId).populate(
      "author",
      "fullname email"
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    return res.status(200).json({
      blog,
      message: "Blog fethed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserBlogs = async (req, res) => {

  try {

    const userId = req.id;

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const blogs = await Blog.find({author : userId})

    if (!blogs || blogs.length == 0) {
      return res.status(404).json({
        message: "No blogs found for this user",
        success: false,
      });
    }

    return res.status(200).json({
      blogs,
      message: "Blogs fetched successfully",
      success: true,
    });
    
  } catch (error) {
    console.log(error);
    
  }
  
}

export { addBlog, editBlog, deleteBlog, getAllBlogs, getBlogById, getUserBlogs };
