import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import "./style.scss"
interface Comment {
  post_id: number;
  user_id: number;
  content: string;
  timestamp: string;
  name: string
}


export function Chat() {

    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState('');
    const [user, setUser] = useState(null); // Zalogowany użytkownik
    const location = useLocation();
    const { data1, data2, data3 } = location.state || {};

    useEffect(() => {
        const fetchComments = async () => {
          try {
            const response = await axios.get('http://localhost:3000/chat');
            setComments(response.data);
            console.log(comments)
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
        };
        fetchComments();
      }, []);
    
      function handleAddComment() {
        if (!content.trim()) return;
        try{
          const Data = {
            email: data1, pass: data2, content : content
          }
          axios.post('http://localhost:3000/chat',Data).then(res=>{
            setContent('');
            window.location.reload(); 
          })
        }catch(e) {
          console.error('Error adding comment:', e);
        }

      }

    return (<div id="chat"style={{ padding: '20px' }}>
        <h1>Chat Comments</h1>
        {/* Wyświetlanie komentarzy */}
        <div style={{ marginBottom: '20px' }}>
          {comments.map((comment) => (
            <div key={comment.post_id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
              <strong>User {comment.name}:</strong> {comment.content}
              <br />
              <small>{new Date(comment.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
  
        {/* Panel dodawania komentarzy */}
        {data1 && data2 ? (
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment here..."
              style={{ width: '100%', height: '100px', marginBottom: '10px' }}
            />
            <button onClick={handleAddComment}>Send</button>
          </div>
        ) : (
          <Link to={'/login'}>Login</Link>
        )}
      </div>)
}