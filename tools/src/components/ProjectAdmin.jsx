import { useState, useEffect } from 'react';

const API_BASE = '/api'; // Using proxy from Vite config

function ProjectAdmin() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tech: '',
    start_date: '',
    end_date: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (err) {
      setError('Error fetching projects: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const techArray = formData.tech.split(',').map(t => t.trim()).filter(t => t);
    
    try {
      if (editingProject) {
        // Update existing project
        const response = await fetch(`${API_BASE}/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            tech: techArray
          })
        });
        
        if (response.ok) {
          await fetchProjects();
          closeModal();
        } else {
          setError('Failed to update project');
        }
      } else {
        // Create new project
        const response = await fetch(`${API_BASE}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            tech: techArray
          })
        });
        
        if (response.ok) {
          await fetchProjects();
          closeModal();
        } else {
          setError('Failed to create project');
        }
      }
    } catch (err) {
      setError('Error saving project: ' + err.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech,
      start_date: project.start_date || '',
      end_date: project.end_date || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchProjects();
      } else {
        setError('Failed to delete project');
      }
    } catch (err) {
      setError('Error deleting project: ' + err.message);
    }
  };

  const openModal = () => {
    setEditingProject(null);
    setFormData({ title: '', description: '', image: '', tech: '', start_date: '', end_date: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({ title: '', description: '', image: '', tech: '', start_date: '', end_date: '' });
    setError('');
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Project Management</h1>
        <p>Manage your portfolio projects here. Add, edit, or delete projects as needed.</p>
        <button className="contrast" onClick={openModal}>
          + Add New Project
        </button>
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-item" style={{
            border: '1px solid var(--muted-border-color)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ flex: '1' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{project.title}</h3>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--muted-color)' }}>
                {project.description.substring(0, 100)}...
              </p>
              
              {/* Project dates */}
              {(project.start_date || project.end_date) && (
                <div style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '0.8rem', 
                  color: 'var(--muted-color)',
                  display: 'flex',
                  gap: '1rem'
                }}>
                  {project.start_date && (
                    <span>📅 Started: {new Date(project.start_date).toLocaleDateString()}</span>
                  )}
                  {project.end_date && (
                    <span>✅ Completed: {new Date(project.end_date).toLocaleDateString()}</span>
                  )}
                </div>
              )}
              
              <div>
                {Array.isArray(project.tech) ? project.tech.map((tech, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-block',
                      background: 'var(--primary)',
                      color: 'white',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      margin: '0.1rem'
                    }}
                  >
                    {tech}
                  </span>
                )) : null}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="outline" onClick={() => handleEdit(project)}>
                Edit
              </button>
              <button className="outline" onClick={() => handleDelete(project.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal" style={{
            background: 'var(--card-background-color)',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="title">Project Title *</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Enter project title"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Enter project description"
                  rows="4"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="image">Image URL *</label>
                <input
                  type="url"
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  placeholder="Enter image URL"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="tech">Technologies *</label>
                <input
                  type="text"
                  id="tech"
                  value={formData.tech}
                  onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                  required
                  placeholder="Enter technologies (comma-separated)"
                />
                <small>Separate multiple technologies with commas (e.g., React, Node.js, MongoDB)</small>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: '1' }}>
                  <label htmlFor="start_date">Start Date</label>
                  <input
                    type="date"
                    id="start_date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    placeholder="Start date"
                  />
                  <small>When the project started (optional)</small>
                </div>
                <div style={{ flex: '1' }}>
                  <label htmlFor="end_date">End Date</label>
                  <input
                    type="date"
                    id="end_date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    placeholder="End date"
                  />
                  <small>When the project was completed (optional)</small>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="outline" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="contrast">
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectAdmin;
