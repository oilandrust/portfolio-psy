import ProjectAdmin from '../components/ProjectAdmin';

function AdminPage() {
  return (
    <div className="App">
      <div className="hero" style={{ background: 'var(--primary)', color: 'white', padding: '2rem 0' }}>
        <div className="container">
          <h1>Portfolio Project Manager</h1>
          <p>Internal tool for managing portfolio projects</p>
        </div>
      </div>
      
      <ProjectAdmin />
    </div>
  );
}

export default AdminPage;
