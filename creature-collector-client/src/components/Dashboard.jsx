import React, { useState, useEffect } from "react";
import { apiRequest } from "../api/api";
import { FaTrash, FaSignOutAlt, FaSearch, FaPlus } from "react-icons/fa";

function Dashboard() {
  const [creatures, setCreatures] = useState([]);
  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    apiRequest("/creatures").then((data) => {
      if (Array.isArray(data)) setCreatures(data);
    });
  }, []);

  const addCreature = async (e) => {
    e.preventDefault();
    const newCreature = await apiRequest("/creatures", {
      method: "POST",
      body: JSON.stringify({ name, power, imageUrl }),
    });
    if (newCreature._id) {
      setCreatures([...creatures, newCreature]);
      setName(""); setPower(""); setImageUrl("");
    } else {
      alert(newCreature.error);
    }
  };

  const deleteCreature = async (id) => {
    if (!window.confirm("Release this creature?")) return;
    await apiRequest(`/creatures/${id}`, { method: "DELETE" });
    const updated = creatures.filter((c) => c._id !== id);
    setCreatures(updated);
    if (activeIndex >= updated.length) setActiveIndex(Math.max(0, updated.length - 1));
  };

  const filteredCreatures = creatures.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCreature = filteredCreatures[activeIndex] || null;

  const nextCreature = () => {
    if (filteredCreatures.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % filteredCreatures.length);
  };

  const prevCreature = () => {
    if (filteredCreatures.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + filteredCreatures.length) % filteredCreatures.length);
  };

  return (
    <div className="dashboard-root">
      
      <header className="dashboard-header">
        <div className="header-title-box">
          <img src="/ash.png" alt="Logo" className="header-logo" />
          <h1>My Dashboard</h1>
        </div>
        <button onClick={() => window.location.reload()} className="logout-btn">
          <FaSignOutAlt style={{ marginRight: '8px' }} /> LOGOUT
        </button>
      </header>

      <div className="search-and-add">
        <form className="creature-form" onSubmit={addCreature}>
          <input className="input-sm" value={name} onChange={(e) => setName(e.target.value)} placeholder="Entry Name" required />
          <input className="input-xs" value={power} onChange={(e) => setPower(e.target.value)} placeholder="Level" />
          <input className="input-lg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image Address" />
          <button type="submit">CATCH IT <FaPlus style={{ marginLeft: '5px' }} /></button>
        </form>
        
        <div className="search-container">
          <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.3)' }} />
          <input 
            type="text" 
            placeholder="Search collected pokedex..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setActiveIndex(0); }}
          />
        </div>
      </div>

      {filteredCreatures.length > 0 ? (
        <main className="dashboard-carousel">
          <aside className="carousel-sidebar">
            <span>NAME</span>
            <span>DATA</span>
            <span>STATS</span>
          </aside>

          <section className="carousel-content animate-v" key={activeCreature._id}>
            <h1>{activeCreature.name}</h1>
            
            <div className="feature-tag-list">
              <div className="feature-tag">Power: {activeCreature.power || 'Unknown'}</div>
              <div className="feature-tag">Entry: LVL {activeCreature.power || '??'}</div>
              <div className="feature-tag">Type: Captured</div>
            </div>
            
            <p className="creature-description">
              Training in progress for Level {activeCreature.power || '??'} entry.
            </p>

            <button className="delete-btn" onClick={() => deleteCreature(activeCreature._id)}>
              <FaTrash /> RELEASE FROM TEAM
            </button>
          </section>

          <section className="carousel-image-main">
            <img 
              key={activeCreature._id + '-img'}
              className="animate-v"
              src={activeCreature.imageUrl || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"} 
              alt={activeCreature.name} 
            />
          </section>

          <nav className="carousel-nav">
            <div className="nav-arrow" onClick={prevCreature}>▲</div>
            <div className="thumb-list">
              {filteredCreatures.map((c, i) => (
                <div 
                  key={c._id} 
                  className={`thumb-item ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                >
                  <img src={c.imageUrl || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"} alt={c.name} />
                </div>
              ))}
            </div>
            <div className="nav-arrow" onClick={nextCreature}>▼</div>
          </nav>
        </main>
      ) : (
        <div className="empty-state">
          <h2>Empty repository. Please catch some creatures!</h2>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
