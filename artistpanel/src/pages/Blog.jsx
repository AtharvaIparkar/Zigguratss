import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UploadModal from '../components/UploadModal';
import Notifications from '../components/Notifications';
import { Plus, X, Image as ImageIcon, Edit2, Trash2 } from 'lucide-react';

export default function Blog() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isWritingBlog, setIsWritingBlog] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'The Journey of Contemporary Art in Modern Times',
      excerpt: 'Exploring how contemporary art has evolved in the digital age and its impact on society...',
      author: 'Zara Al-Mansouri',
      date: 'Mar 20, 2026',
      readTime: '8 min read',
      views: '2,450',
      image: null,
      content: 'Contemporary art continues to push boundaries and challenge our perceptions of creativity. In this blog, we explore the evolution of artistic expression through digital mediums and traditional techniques combined...',
    },
    {
      id: 2,
      title: 'Gold Leaf Techniques: Ancient Methods Meet Modern Art',
      excerpt: 'Discover the timeless techniques of gold leaf application and how they enhance artistic value...',
      author: 'Zara Al-Mansouri',
      date: 'Mar 15, 2026',
      readTime: '6 min read',
      views: '1,890',
      image: null,
      content: 'Gold leaf has been used in art for centuries. This blog post delves into the traditional techniques passed down through generations and how contemporary artists are reinventing this ancient craft...',
    },
    {
      id: 3,
      title: 'Understanding Color Theory in Abstract Compositions',
      excerpt: 'Master the art of color harmony and its psychological effects on viewers...',
      author: 'Zara Al-Mansouri',
      date: 'Mar 10, 2026',
      readTime: '7 min read',
      views: '3,120',
      image: null,
      content: 'Color theory is fundamental to creating impactful abstract compositions. Learn about complementary colors, warm and cool palettes, and how to use color psychology to evoke emotions in your audience...',
    },
  ]);

  const [newBlog, setNewBlog] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: null,
    imagePreview: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishBlog = () => {
    if (!newBlog.title.trim() || !newBlog.content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    if (editingBlogId) {
      // Update existing blog
      setBlogs(blogs.map(blog =>
        blog.id === editingBlogId
          ? {
              ...blog,
              title: newBlog.title,
              excerpt: newBlog.excerpt || newBlog.content.substring(0, 100) + '...',
              content: newBlog.content,
              image: newBlog.imagePreview || blog.image,
            }
          : blog
      ));
      alert('Blog updated successfully!');
    } else {
      // Create new blog
      const blog = {
        id: blogs.length + 1,
        title: newBlog.title,
        excerpt: newBlog.excerpt || newBlog.content.substring(0, 100) + '...',
        author: 'Zara Al-Mansouri',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        readTime: `${Math.ceil(newBlog.content.split(' ').length / 200)} min read`,
        views: '0',
        image: newBlog.imagePreview,
        content: newBlog.content,
      };
      setBlogs([blog, ...blogs]);
      alert('Blog published successfully!');
    }

    setNewBlog({ title: '', excerpt: '', content: '', image: null, imagePreview: null });
    setIsWritingBlog(false);
    setEditingBlogId(null);
  };

  const handleEditBlog = (blog) => {
    setNewBlog({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      imagePreview: blog.image,
    });
    setEditingBlogId(blog.id);
    setIsWritingBlog(true);
  };

  const handleDeleteBlog = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      alert('Blog deleted successfully!');
    }
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <Header
          onUploadClick={() => setIsUploadModalOpen(true)}
          onNotificationClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        />

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Blog & Stories</h1>
              <p className="text-gray-400 text-sm mt-2">Share your artistic journey and insights with the community.</p>
            </div>
            <button
              onClick={() => setIsWritingBlog(true)}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Write Blog</span>
            </button>
          </div>

          {!isWritingBlog ? (
            <>
              {/* Blog List */}
              <div className="space-y-6">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition group relative"
                  >
                    <div className="flex">
                      {blog.image && (
                        <div className="w-48 h-48 flex-shrink-0 bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1">
                        <h2 className="text-xl font-bold text-white hover:text-yellow-500 transition">{blog.title}</h2>
                        <p className="text-gray-400 text-sm mt-2">{blog.excerpt}</p>
                        <div className="flex items-center space-x-4 mt-4 text-xs text-gray-500">
                          <span>{blog.author}</span>
                          <span>•</span>
                          <span>{blog.date}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                          <span>•</span>
                          <span>{blog.views} views</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        title="Edit blog"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        title="Delete blog"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Write Blog Section */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingBlogId ? 'Edit Blog' : 'Write a New Blog'}
                  </h2>
                  <button
                    onClick={() => setIsWritingBlog(false)}
                    className="text-gray-400 hover:text-white transition"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Blog Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your blog title"
                      value={newBlog.title}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition"
                    />
                  </div>

                  {/* Blog Excerpt */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Brief Excerpt (Optional)
                    </label>
                    <textarea
                      placeholder="Write a short summary of your blog (optional)"
                      value={newBlog.excerpt}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, excerpt: e.target.value }))}
                      rows="2"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition resize-none"
                    />
                  </div>

                  {/* Blog Content */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Blog Content
                    </label>
                    <textarea
                      placeholder="Write your blog content here..."
                      value={newBlog.content}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, content: e.target.value }))}
                      rows="10"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition resize-none"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Add Featured Image
                    </label>
                    {!newBlog.imagePreview ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-yellow-500 hover:bg-gray-800 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon size={32} className="text-gray-500 mb-2" />
                          <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="relative">
                        <img
                          src={newBlog.imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setNewBlog(prev => ({ ...prev, image: null, imagePreview: null }))}
                          className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={handlePublishBlog}
                      className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition"
                    >
                      {editingBlogId ? 'Update Blog' : 'Publish Blog'}
                    </button>
                    <button
                      onClick={() => {
                        setIsWritingBlog(false);
                        setEditingBlogId(null);
                        setNewBlog({ title: '', excerpt: '', content: '', image: null, imagePreview: null });
                      }}
                      className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition border border-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <Notifications
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
