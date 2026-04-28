import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ taskId }) => {
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = `http://localhost:5245/api/comments`;

    // Fetch comments for the specific task
    const fetchComments = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/task/${taskId}`);
            setComments(res.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
        } finally {
            setLoading(false);
        }
    };

    // Add a new comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        
        if (!author.trim() || !body.trim()) {
            return alert("Please fill in both Author and Comment fields.");
        }

        try {
            // Using lowercase keys to match default .NET camelCase serialization
            await axios.post(API_URL, {
                taskId: parseInt(taskId),
                author: author,
                body: body
            });

            // Clear inputs and refresh the list
            setAuthor("");
            setBody("");
            fetchComments();
        } catch (err) {
            console.error("Failed to add comment. Server response:", err.response?.data);
            alert("Failed to add comment. Check the console for details.");
        }
    };

    useEffect(() => {
        if (taskId) {
            fetchComments();
        }
    }, [taskId]);

    return (
        <div className="comments-section" style={{ marginTop: "20px" }}>
            <h3>Comments</h3>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <textarea
                    placeholder="Write a comment..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "60px" }}
                />
                <button 
                    type="submit" 
                    style={{ 
                        padding: "10px", 
                        backgroundColor: "#28a745", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px", 
                        cursor: "pointer" 
                    }}
                >
                    Post Comment
                </button>
            </form>

            {/* Comments List */}
            {loading ? (
                <p>Loading comments...</p>
            ) : (
                <div className="comments-list">
                    {comments.length === 0 ? (
                        <p style={{ color: "#888" }}>No comments yet. Be the first to comment!</p>
                    ) : (
                        comments.map((c) => (
                            <div key={c.id} style={{ 
                                padding: "10px", 
                                borderBottom: "1px solid #eee", 
                                marginBottom: "10px",
                                background: "#f9f9f9",
                                borderRadius: "4px"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                    <strong>{c.author}</strong>
                                    <small style={{ color: "#999" }}>
                                        {new Date(c.createdAt).toLocaleString()}
                                    </small>
                                </div>
                                <p style={{ margin: 0 }}>{c.body}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Comments;