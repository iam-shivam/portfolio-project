import  { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, LogOut, Mail, Briefcase, Code, BookOpen, User, BarChart } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
});

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      localStorage.setItem('admin_token', data.access_token);
      setIsLoggedIn(true);
    } catch (err) {
      alert('❌ Login failed. Check your credentials.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-purple-500/10 rounded-full mb-4">
              <User className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Admin Panel</h2>
            <p className="text-gray-400">Sign in to manage your portfolio</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({ blogs: 0, projects: 0, skills: 0, contacts: 0 });

  useEffect(() => {
    if (activeTab !== 'stats') fetchData();
    else fetchStats();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const [blogsRes, projectsRes, skillsRes, contactsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/blogs`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/projects`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/skills`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/contact`, { headers: getAuthHeaders() }),
      ]);

      const [blogsData, projectsData, skillsData, contactsData] = await Promise.all([
        blogsRes.json(),
        projectsRes.json(),
        skillsRes.json(),
        contactsRes.json(),
      ]);

      setStats({
        blogs: blogsData.length,
        projects: projectsData.length,
        skills: Array.isArray(skillsData) ? skillsData.length : Object.values(skillsData).flat().length,
        contacts: contactsData.length,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoints = {
        blogs: '/blogs',
        projects: '/projects',
        skills: '/skills',
        contacts: '/contact',
      } as const;

      const res = await fetch(`${API_BASE_URL}${endpoints[activeTab as keyof typeof endpoints]}`, {
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        window.location.reload();
        return;
      }

      const data = await res.json();
      
      if (activeTab === 'blogs') setBlogs(data);
      else if (activeTab === 'projects') setProjects(data);
      else if (activeTab === 'skills') {
        const allSkills = Array.isArray(data) ? data : [...(data.backend || []), ...(data.database || []), ...(data.frontend || []), ...(data.other || [])];
        setSkills(allSkills);
      }
      else if (activeTab === 'contacts') setContacts(data);
    } catch (err) {
      console.error('Error:', err);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;

    const endpoints = {
      blogs: `/blogs/${id}`,
      projects: `/projects/${id}`,
      skills: `/skills/${id}`,
      contacts: `/contact/${id}`,
    } as const;

    try {
      await fetch(`${API_BASE_URL}${endpoints[activeTab as keyof typeof endpoints]}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      fetchData();
      alert('✅ Deleted!');
    } catch (err) {
      alert('❌ Failed to delete');
    }
  };

  const handleSave = async (formData: any) => {
    const endpoints = {
      blogs: '/blogs',
      projects: '/projects',
      skills: '/skills',
    } as const;

    try {
      const method = editingItem ? 'PATCH' : 'POST';
      const url = editingItem 
        ? `${API_BASE_URL}${endpoints[activeTab as keyof typeof endpoints]}/${editingItem?.id}`
        : `${API_BASE_URL}${endpoints[activeTab as keyof typeof endpoints]}`;

      await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      fetchData();
      setShowForm(false);
      setEditingItem(null);
      alert('✅ Saved!');
    } catch (err) {
      alert('❌ Failed to save');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-purple-400">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Manage your portfolio content</p>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'stats', label: 'Dashboard', icon: BarChart },
              { id: 'blogs', label: 'Blogs', icon: BookOpen },
              { id: 'projects', label: 'Projects', icon: Code },
              { id: 'skills', label: 'Skills', icon: Briefcase },
              { id: 'contacts', label: 'Messages', icon: Mail },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowForm(false);
                  setEditingItem(null);
                }}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'stats' ? (
          <StatsView stats={stats} />
        ) : (
          <>
            {activeTab !== 'contacts' && !showForm && (
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingItem(null);
                }}
                className="mb-6 flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Add New</span>
              </button>
            )}

            {showForm && activeTab === 'blogs' && <BlogForm onSave={handleSave} onCancel={() => setShowForm(false)} initialData={editingItem} />}
            {showForm && activeTab === 'projects' && <ProjectForm onSave={handleSave} onCancel={() => setShowForm(false)} initialData={editingItem} />}
            {showForm && activeTab === 'skills' && <SkillForm onSave={handleSave} onCancel={() => setShowForm(false)} initialData={editingItem} />}

            {!showForm && loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            )}

            {!showForm && !loading && (
              <>
                {activeTab === 'blogs' && <BlogList blogs={blogs} onEdit={(item) => { setEditingItem(item); setShowForm(true); }} onDelete={handleDelete} />}
                {activeTab === 'projects' && <ProjectList projects={projects} onEdit={(item) => { setEditingItem(item); setShowForm(true); }} onDelete={handleDelete} />}
                {activeTab === 'skills' && <SkillList skills={skills} onEdit={(item) => { setEditingItem(item); setShowForm(true); }} onDelete={handleDelete} />}
                {activeTab === 'contacts' && <ContactList contacts={contacts} onDelete={handleDelete} />}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatsView({ stats }: { stats: { blogs: number; projects: number; skills: number; contacts: number } }) {
  const cards = [
    { label: 'Total Blogs', value: stats.blogs, icon: BookOpen, color: 'purple' },
    { label: 'Projects', value: stats.projects, icon: Code, color: 'blue' },
    { label: 'Skills', value: stats.skills, icon: Briefcase, color: 'green' },
    { label: 'Messages', value: stats.contacts, icon: Mail, color: 'pink' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${card.color}-500/10`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <span className="text-3xl font-bold">{card.value}</span>
            </div>
            <p className="text-gray-400">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogForm({ onSave, onCancel, initialData }: { onSave: (data: any) => void; onCancel: () => void; initialData?: any }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    author: 'Shivam Makwana',
    publishedAt: new Date().toISOString().split('T')[0],
    readTime: 5,
    published: true,
  });

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
      <h3 className="text-2xl font-bold mb-6">{initialData ? 'Edit Blog' : 'Create Blog'}</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
        />
        <textarea
          placeholder="Excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg h-24 border border-gray-600 text-white"
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg h-48 border border-gray-600 text-white"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={formData.tags?.join(', ') || ''}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={formData.publishedAt}
            onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
            className="px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          />
          <input
            type="number"
            placeholder="Read Time"
            value={formData.readTime}
            onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
            className="px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          />
        </div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="w-5 h-5"
          />
          <span>Published</span>
        </label>
        <div className="flex space-x-4">
            <button onClick={() => onSave({ ...formData, tags: formData.tags.filter((t: string) => t) })} className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg">
            <Save className="w-4 h-4" />
            <span>Save</span>
            </button>
          <button onClick={onCancel} className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg">
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectForm({ onSave, onCancel, initialData }: { onSave: (data: any) => void; onCancel: () => void; initialData?: any }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    contributions: '',
    stack: [],
    challenges: '',
    achievements: '',
    link: '',
    featured: true,
  });

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
      <h3 className="text-2xl font-bold mb-6">{initialData ? 'Edit Project' : 'Create Project'}</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg h-24 border border-gray-600 text-white"
        />
        <input
          type="text"
          placeholder="Tech Stack (comma separated)"
          value={formData.stack?.join(', ') || ''}
          onChange={(e) => setFormData({ ...formData, stack: e.target.value.split(',').map(t => t.trim()) })}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
        />
        <input
          type="url"
          placeholder="Project Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-5 h-5"
          />
          <span>Featured</span>
        </label>
        <div className="flex space-x-4">
            <button onClick={() => onSave({ ...formData, stack: formData.stack.filter((s: string) => s) })} className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg">
            <Save className="w-4 h-4" />
            <span>Save</span>
            </button>
          <button onClick={onCancel} className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg">
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function SkillForm({ onSave, onCancel, initialData }: { onSave: (data: any) => void; onCancel: () => void; initialData?: any }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    category: 'backend',
    level: 50,
    order: 0,
  });

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-6 max-w-2xl border border-gray-700">
      <h3 className="text-2xl font-bold mb-6">{initialData ? 'Edit Skill' : 'Create Skill'}</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Skill Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
        >
          <option value="backend">Backend</option>
          <option value="database">Database</option>
          <option value="frontend">Frontend</option>
          <option value="other">Other</option>
        </select>
        <div>
          <label className="block mb-2">Level: {formData.level}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>
        <div className="flex space-x-4">
          <button onClick={() => onSave(formData)} className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg">
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button onClick={onCancel} className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg">
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function BlogList({ blogs, onEdit, onDelete }: { blogs: any[]; onEdit: (blog: any) => void; onDelete: (id: any) => void }) {
  if (blogs.length === 0) return <div className="text-center py-12 text-gray-400">No blogs yet</div>;
  return (
    <div className="grid gap-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{blog.excerpt}</p>
              <div className="flex gap-2">
                {blog.tags?.map((tag: string) => (
                  <span key={tag} className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button onClick={() => onEdit(blog)} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => onDelete(blog.id)} className="p-2 bg-red-600 hover:bg-red-700 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectList({ projects, onEdit, onDelete }: { projects: any[]; onEdit: (project: any) => void; onDelete: (id: any) => void }) {
  if (projects.length === 0) return <div className="text-center py-12 text-gray-400">No projects yet</div>;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">{project.name}</h3>
            <div className="flex space-x-2">
              <button onClick={() => onEdit(project)} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => onDelete(project.id)} className="p-2 bg-red-600 hover:bg-red-700 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-gray-400 text-sm">{project.description}</p>
        </div>
      ))}
    </div>
  );
}

function SkillList({ skills, onEdit, onDelete }: { skills: any[]; onEdit: (skill: any) => void; onDelete: (id: any) => void }) {
  if (skills.length === 0) return <div className="text-center py-12 text-gray-400">No skills yet</div>;
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <div key={skill.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold">{skill.name}</h3>
              <p className="text-sm text-gray-400 capitalize">{skill.category}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => onEdit(skill)} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                <Edit className="w-3 h-3" />
              </button>
              <button onClick={() => onDelete(skill.id)} className="p-2 bg-red-600 hover:bg-red-700 rounded-lg">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
          </div>
          <p className="text-right text-sm mt-2">{skill.level}%</p>
        </div>
      ))}
    </div>
  );
}

function ContactList({ contacts, onDelete }: { contacts: any[]; onDelete: (id: any) => void }) {
  if (contacts.length === 0) return <div className="text-center py-12 text-gray-400">No messages yet</div>;
  return (
    <div className="grid gap-6">
      {contacts.map((contact) => (
        <div key={contact.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold">{contact.name}</h3>
              <a href={`mailto:${contact.email}`} className="text-purple-400 hover:underline">{contact.email}</a>
            </div>
            <button onClick={() => onDelete(contact.id)} className="p-2 bg-red-600 hover:bg-red-700 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-300 mb-4">{contact.message}</p>
          <div className="text-sm text-gray-500">
            {new Date(contact.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}