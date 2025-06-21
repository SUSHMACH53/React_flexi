import React, { useState } from 'react';
import BlogPostList from './components/BlogPostList';
import BlogPostDetail from './components/BlogPostDetail';
import BlogPostForm from './components/BlogPostForm';
import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import './App.css';

const initialPosts = [
	{
		id: '1',
		title: 'Getting Started with React',
		summary: 'Learn the basics of React and build your first application.',
		content: `
      <p>React is a popular JavaScript library for building user interfaces. It encourages the creation of reusable UI components that present data as it changes over time.</p>
      <h2>Why Use React?</h2>
      <ul>
        <li>Component-based structure</li>
        <li>Declarative syntax</li>
        <li>Fast rendering with Virtual DOM</li>
      </ul>
      <p>To get started, check out the <a href="https://reactjs.org/docs/getting-started.html" target="_blank">official documentation</a>.</p>
    `,
		author: 'Jane Doe',
		date: '2023-01-01',
		url: '/posts/1',
	},
	{
		id: '2',
		title: 'CSS Grid vs. Flexbox',
		summary: 'A comparison of two powerful layout systems in CSS.',
		content: `Add commentMore actions
      <p>CSS Grid and Flexbox are two layout models that provide flexibility and control over your website’s structure.</p>
      <h2>CSS Grid</h2>
      <p>Best for two-dimensional layouts (rows and columns).</p>
      <h2>Flexbox</h2>
      <p>Best for one-dimensional layouts (rows or columns).</p>
      <p>Here’s a quick comparison:</p>
      <table border="1" cellpadding="8">
        <thead><tr><th>Feature</th><th>Grid</th><th>Flexbox</th></tr></thead>
        <tbody>
          <tr><td>Direction</td><td>2D</td><td>1D</td></tr>
          <tr><td>Use Case</td><td>Page layout</td><td>Navbars, cards</td></tr>
        </tbody>
      </table>
    `,
		author: 'John Smith',
		date: '2023-02-15',
		url: '/posts/2',
	},
	{
		id: '3',
		title: 'Accessibility in Web Development',
		summary: 'Tips for making your web applications more accessible.',
		content: `Add commentMore actions
      <p>Web accessibility ensures that websites are usable by people with disabilities. This includes users who rely on screen readers, keyboard navigation, or voice commands.</p>
      <h2>Best Practices</h2>
      <ol>
        <li>Use semantic HTML (e.g., <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>).</li>
        <li>Ensure good color contrast for readability.</li>
        <li>Add alt text to all images.</li>
        <li>Make forms accessible with labels.</li>
      </ol>
      <p>Learn more at <a href="https://www.w3.org/WAI/" target="_blank">W3C Web Accessibility Initiative</a>.</p>
    `,
		author: 'Alice Johnson',
		date: '2023-03-10',
		url: '/posts/3',
	},
];

function BlogPostDetailWrapper({ posts, setPosts }) {
	const { id } = useParams();
	const post = posts.find((p) => p.id === id);
	const handleDelete = (deleteId) => {
		setPosts(posts.filter((p) => p.id !== deleteId));
	};
	return (
		<BlogPostDetail
			title={post?.title}
			content={post?.content}
			author={post?.author}
			date={post?.date}
			onDelete={handleDelete}
		/>
	);
}

function BlogPostFormWrapper({ posts, setPosts, isEdit }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const post = isEdit ? posts.find((p) => p.id === id) : undefined;

	const handleSubmit = (formData) => {
		if (isEdit) {
			setPosts(posts.map((p) => (p.id === id ? { ...p, ...formData } : p)));
			navigate(`/posts/${id}`);
		} else {
			const newId = (Math.max(0, ...posts.map((p) => Number(p.id))) + 1).toString();
			setPosts([
				...posts,
				{
					...formData,
					id: newId,
					summary: formData.content.substring(0, 60) + '...',
					url: `/posts/${newId}`,
				},
			]);
			navigate('/');
		}
	};

	return <BlogPostForm post={post} onSubmit={handleSubmit} />;
}

const App = () => {
	const [posts, setPosts] = useState(initialPosts);
	const handleDelete = (deleteId) => {
		setPosts(posts.filter((p) => p.id !== deleteId));
	};
	return (
		<>
			<header style={{ textAlign: 'center', fontSize: 32, fontWeight: 'bold', margin: '32px 0 0 0', letterSpacing: 1, color: '#333', fontFamily: 'Arial, Roboto, sans-serif' }}>
				My Blog
			</header>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<div style={{ textAlign: 'right', maxWidth: 1200, margin: '0 auto' }}>
								<Link to="/create" style={{ background: '#007BFF', color: '#fff', padding: '10px 20px', borderRadius: 4, textDecoration: 'none', fontWeight: 'bold', margin: '24px 0', display: 'inline-block' }}>Create Post</Link>
							</div>
							<BlogPostList
								posts={posts.map((p) => ({
									...p,
									url: `/posts/${p.id}`,
								}))}
								onDelete={handleDelete}
							/>
						</>
					}
				/>
				<Route path="/posts/:id" element={<BlogPostDetailWrapper posts={posts} setPosts={setPosts} />} />
				<Route path="/create" element={<BlogPostFormWrapper posts={posts} setPosts={setPosts} isEdit={false} />} />
				<Route path="/edit/:id" element={<BlogPostFormWrapper posts={posts} setPosts={setPosts} isEdit={true} />} />
			</Routes>
		</>
	);
};

export default App;

