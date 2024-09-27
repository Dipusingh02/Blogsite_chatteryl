const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const upload  =require("../middleware/fileUpload.js");
const Post =require("../models/post.js");
dotenv.config();
const { likePost } = require('../controllers/postcontroller.js');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Use environment variables for security
        pass: process.env.EMAIL_PASS,
    },
});


// Authentication middleware
// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) return res.sendStatus(401); // Unauthorized

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403); // Forbidden
//         req.user = user;
//         next();
//     });
// };
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
      req.user = user; // Assuming 'user' contains { userId: '...' }
      next();
  });
};

// Signup route
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const saltValue = 10;
        const hashedPassword = await bcrypt.hash(password, saltValue);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).send("Error, user not created");
    }
});



// Login route
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).send("Please fill all the fields");
//         }

//         const existingUser = await User.findOne({ email });
//         if (!existingUser) {
//             return res.status(400).send("User not found");
//         }

//         const matchPassword = await bcrypt.compare(password, existingUser.password);
//         if (!matchPassword) {
//             return res.status(400).json({ message: "Invalid Password" });
//         }

//         const userId = existingUser._id;
//         const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

//         res.status(200).json({
//             message: "User logged in successfully",
//             token: accessToken,
//             userId,
//             name: existingUser.name
//         });
//     } catch (error) {
//         res.status(403).json({ message: "Invalid email or password", error: error.message });
//     }
// });

// Login route
// Login route
// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Please fill all the fields");
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).send("User not found");
        }

        console.log("Existing User Password: ", existingUser.password);
        console.log("Input Password: ", password);

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        console.log("Match Password: ", matchPassword);

        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const userId = existingUser._id;
        const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: "User logged in successfully",
            token: accessToken,
            userId,
            name: existingUser.name
        });
    } catch (error) {
        res.status(403).json({ message: "Invalid email or password", error: error.message });
    }
});
// Forget Password route
router.post("/forget-password", async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const saltValue = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltValue);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to reset password", error: error.message });
    }
});

// Forgot Password - Send Reset Link
router.post("/forget-password-linkemail", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Receiver email not found" });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER, // Use environment variable for sender email
            to: email,
            subject: "Forgot Password",
            text: `Click on this link to reset your password: http://localhost:3000/reset-password/${user._id}`, 
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send email", error: error.message });
    }
});


// Upload blog post
// Upload blog post
// router.post("/upload-post", authenticateToken, upload.single("image"), async (req, res) => {
//     try {
//       const { title, description } = req.body;
//       if (!title || !description) {
//         return res.status(400).send("Please fill all the fields");
//       }
  
//       const post = new Post({
//         title,
//         description,
//         image: req.file.filename,
//         user: req.user.userId,
//       });
  
//       await post.save();
//       res.status(201).json({ message: "Post uploaded successfully" });
//     } catch (error) {
//       res.status(400).send("Error, post not uploaded");
//     }
//   });


// router.post("/upload-post", authenticateToken, upload.single("image"),  async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
//   try {
//     const post = new Post({
//       title: req.body.title,
//       description: req.body.description,
//       image: req.file.path,
//       liked: req.body.liked,
//       user: req.user,
//     });

//     const newPost = await post.save();
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });/


// router.post("/upload-post", authenticateToken, async (req, res) => {
//   try {
//     console.log("Title:", req.body.title);
//     console.log("Description:", req.body.description);
//     console.log("User:", req.user);
    
//     const post = new Post({
//       title: req.body.title,
//       description: req.body.description,
//       liked: req.body.liked || false,
//       user: req.user.userId,
//     });

//     const newPost = await post.save();
//     console.log("Post saved:", newPost);
//     res.status(201).json(newPost);
//   } catch (error) {
//     console.error("Error during post creation:", error.stack);
//     res.status(500).json({ message: "Failed to upload post", error: error.message });
//   }
// });


router.post("/upload-post", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    console.log("Title:", req.body.title);
    console.log("Description:", req.body.description);
    console.log("User:", req.user);
    console.log("Image:", req.file); // Log the uploaded image

    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename, // Save the image filename
      liked: req.body.liked || false,
      user: req.user.userId,
    });

    const newPost = await post.save();
    console.log("Post saved:", newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error during post creation:", error.stack);
    res.status(500).json({ message: "Failed to upload post", error: error.message });
  }
});
// router.post("/upload-post", authenticateToken, upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const post = new Post({
//       title: req.body.title,
//       description: req.body.description,
//       image: req.file.path, // Ensure that this path is correct and the file is being saved
//       user: req.user.userId,
//     });

//     const newPost = await post.save();
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to upload post", error: error.message });
//   }
// });

// router.post("/upload-post", async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     if (!title || !description) {
//       return res.status(400).send("Please fill all the fields");
//     }

//     const post = new Post({
//       title,
//       description,
//       image: req.file ? req.file.filename : null,
//       user: req.user.userId,
//     });

//     await post.save();
//     res.status(201).json({ message: "Post uploaded successfully" });
//   } catch (error) {
//     console.error("Error uploading post:", error.message);
//     res.status(400).send("Error, post not uploaded");
//   }
// });

// Like post
router.put("/like-post/:id", authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.liked = !post.liked;
    await post.save();
    res.status(200).json({ message: "Post liked/unliked successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to like/unlike post" });
  }
}); 





router.get("/blog-posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name");
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch blog posts" });
  }
});

// Comment on post
router.put("/comment-post/:id", authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const comment = {
      text: req.body.text,
      createdAt: Date.now(),
    };
    post.comments.push(comment);
    await post.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to add comment" });
  }
});

// Get user's blog posts
router.get("/my-blog-posts", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.userId });
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No blog posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error.message);
    res.status(500).json({ message: "Failed to fetch blog posts" });
  }
});


module.exports = router;
