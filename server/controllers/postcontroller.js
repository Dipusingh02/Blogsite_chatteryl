const likePost = async (req, res) => {
    try {
      const { id } = req.params; // Post ID from request parameters
      const userId = req.userId; // User ID from authenticated token
  
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Check if the user has already liked the post
      // Since `liked` is now a boolean, we just toggle it
      if (post.liked) {
        post.liked = false; // If already liked, set it to false
      } else {
        post.liked = true; // If not liked, set it to true
      }
  
      // Save the post with updated liked status
      await post.save();
  
      // Return the updated liked status
      res.status(200).json({ liked: post.liked });
    } catch (error) {
      console.error("Error liking the post:", error);
      res.status(500).json({ message: "Error liking the post", error: error.message });
    }
  };
  module.exports = { likePost };