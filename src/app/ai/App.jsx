import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [keywords, setKeywords] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/recommend-jobs', {
        keywords,
        skills,
        experience
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Gợi ý công việc</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="keywords">Từ khóa tìm kiếm:</label>
          <input type="text" id="keywords" value={keywords} onChange={e => setKeywords(e.target.value)} />
        </div>
        <div>
          <label htmlFor="skills">Kỹ năng:</label>
          <input type="text" id="skills" value={skills} onChange={e => setSkills(e.target.value)} />
        </div>
        <div>
          <label htmlFor="experience">Kinh nghiệm:</label>
          <input type="text" id="experience" value={experience} onChange={e => setExperience(e.target.value)} />
        </div>
        <button type="submit">Gợi ý</button>
      </form>
      <h2>Kết quả:</h2>
      <ul>
        {recommendations.map(job => (
          <li key={job._id}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;