// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import camera from './camera-minimalistic-svgrepo-com.png';
import newThread from './plus-circle.png';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, content: '', threads: [], images: [] },
  ]);
  const [allPosts, setAllPosts] = useState([]);

  // Function to handle content change in the main post
  const handleContentChange = (event, postId) => {
    const newPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, content: event.target.value };
      }
      return post;
    });
    setPosts(newPosts);
  };

  // Function to handle image uploads
  const handleFileUpload = (event, postId) => {
    const files = event.target.files;
    const newPosts = posts.map((post) => {
      if (post.id === postId) {
        const images = Array.from(files).map((file) => URL.createObjectURL(file));
        return { ...post, images };
      }
      return post;
    });
    setPosts(newPosts);
  };

 

  // Function to add a new thread to a post
  const addThread = (postId) => {
    const newPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, threads: [...post.threads, ''] };
      }
      return post;
    });
    setPosts(newPosts);
  };

  // Function to handle content change in a thread
  const handleThreadContentChange = (event, postId, index) => {
    const newPosts = posts.map((post) => {
      if (post.id === postId) {
        const newThreads = [...post.threads];
        newThreads[index] = event.target.value;
        return { ...post, threads: newThreads };
      }
      return post;
    });
    setPosts(newPosts);
  };

  // Function to handle post submission
  const handlePostSubmit = () => {
    setAllPosts([...allPosts, ...posts]);
    setPosts([{ id: posts.length + 1, content: '', threads: [], images: [] }]); // Reset posts
  };

  return (
    <>
    <div className="display-section">
        {allPosts.map((post, index) => (
          <div key={index} className="post-display">
            {post.images.map((image: string | undefined, imageIndex: React.Key | null | undefined) => (
              <img key={imageIndex} src={image} alt="posted content" />
            ))}
            <p>{post.content}</p>
            {post.threads.map((threadContent: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, threadIndex: any) => (
              <p key={`${index}-${threadIndex}`}>
                Thread: {threadContent}
              </p>
            ))}
          </div>
        ))}
      </div>
    <div className="app">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <textarea
            placeholder="What's happening?"
            className="post-content"
            value={post.content}
            onChange={(e) => handleContentChange(e, post.id)}
          />
          <label className='image-label' htmlFor='image-file'><img src={camera} alt="Upload" /></label>
          <input
            type="file"
            accept="image/*"
            multiple id='image-file'
            className="file-input"
            onChange={(e) => handleFileUpload(e, post.id)}
          />
          <div className="image-preview">
            {post.images.map((image, index) => (
              <img key={index} src={image} alt="preview" />
            ))}
          </div>
          <div className="threads">
            {post.threads.map((threadContent, index) => (
              <textarea
                key={`${post.id}-${index}`}
                placeholder="Add another tweet"
                className="thread-content"
                value={threadContent}
                onChange={(e) => handleThreadContentChange(e, post.id, index)}
              />
            ))}
          </div>
          <button className="add-thread-btn" onClick={() => addThread(post.id)}>
            <img src={newThread} alt="Add thread" />
          </button>
        </div>
      ))}
      <button className="post-button" onClick={handlePostSubmit}>
        Post
      </button>
    </div>
  </>
  );
}

export default App;
