import { useState } from "react";

const AddCommentForm = ({ productId, onCommentAdded }) => {
  const [star, setStar] = useState(5);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pid", productId);
    formData.append("star", star);
    formData.append("message", message);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      const response = await fetch(
        "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/comment",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add comment");
      }

      onCommentAdded(); // Refresh comments after adding a new one
      setStar(5);
      setMessage("");
      setImage(null);
      setVideo(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-comment-form">
      <h3>Add a Review</h3>
      {error && <p className="comment-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={star}
          onChange={(e) => setStar(e.target.value)}
          required
        />

        <label>Comment:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <label>Video:</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default AddCommentForm;
