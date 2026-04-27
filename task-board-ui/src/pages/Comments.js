import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Comments = ({ taskId }) => {
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    const API_URL = "http://localhost:5245/api/comments";

    const fetchComments = useCallback(async () => {
        if (!taskId) return;
        try {
            const res = await axios.get(`${API_URL}/task/${taskId}`);
            setComments(res.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    }, [taskId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleAddComment = async (e) => {
    e.preventDefault();
    if (!author.trim() || !body.trim()) return alert("Fill all fields");

    try {
        await axios.post(API_URL, {
            TaskId: parseInt(taskId), 
            Author: author,           
            Body: body                
        });
        setAuthor(""); 
        setBody("");   
        fetchComments(); 
    } catch (err) {
        console.error("Server says:", err.response?.data);
        console.error("Failed to add comment:", err);
    }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this comment?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchComments(); 
        } catch (err) {
            console.error("Failed to delete:", err);
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Comments ({comments.length})</h3>
            <div style={styles.list}>
                {comments.length === 0 ? <p>No comments yet.</p> : comments.map((c) => (
                    <div key={c.id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <strong>{c.author}</strong>
                            <button onClick={() => handleDelete(c.id)} style={styles.deleteBtn}>Delete</button>
                        </div>
                        <p>{c.body}</p>
                        <small style={{color: '#999'}}>{new Date(c.createdAt).toLocaleString()}</small>
                    </div>
                ))}
            </div>
            <form onSubmit={handleAddComment} style={styles.form}>
                <input placeholder="Name" value={author} onChange={(e) => setAuthor(e.target.value)} required style={styles.input} />
                <textarea placeholder="Comment..." value={body} onChange={(e) => setBody(e.target.value)} required style={styles.textarea} />
                <button type="submit" style={styles.submitBtn}>Post Comment</button>
            </form>
        </div>
    );
};

const styles = {
    container: { marginTop: "20px", borderTop: "1px solid #ddd", paddingTop: "10px" },
    card: { background: "#f4f4f4", padding: "10px", borderRadius: "5px", marginBottom: "10px" },
    cardHeader: { display: "flex", justifyContent: "space-between" },
    deleteBtn: { color: "red", border: "none", background: "none", cursor: "pointer" },
    form: { display: "flex", flexDirection: "column", gap: "10px" },
    input: { padding: "8px" },
    textarea: { padding: "8px", height: "60px" },
    submitBtn: { padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }
};

export default Comments;