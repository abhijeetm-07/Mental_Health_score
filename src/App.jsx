import React, { useState } from 'react';
import { Activity, ShieldAlert, BookOpen, User } from 'lucide-react';
import './App.css';
import AssessmentForm from './components/AssessmentForm';
import ResultsDisplay from './components/ResultsDisplay';

const API_BASE = "http://127.0.0.1:8000";

function App() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    country: '',
    academic_level: '',
    most_used_platform: '',
    purpose_of_use: '',
    avg_daily_usage_hours: '',
    daily_unlocks: '',
    study_hours: '',
    physical_activity_hours: '',
    sleep_hours_per_night: '',
    stress_level: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [predictionScore, setPredictionScore] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handlePredict = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setPredictionScore(null);

    // Cast properties to match FastAPI/Pydantic expected types
    const payload = {
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      country: formData.country.trim(),
      academic_level: formData.academic_level,
      most_used_platform: formData.most_used_platform,
      purpose_of_use: formData.purpose_of_use,
      avg_daily_usage_hours: parseFloat(formData.avg_daily_usage_hours),
      daily_unlocks: parseInt(formData.daily_unlocks, 10),
      study_hours: parseFloat(formData.study_hours),
      physical_activity_hours: parseFloat(formData.physical_activity_hours),
      sleep_hours_per_night: parseFloat(formData.sleep_hours_per_night),
      stress_level: formData.stress_level
    };

    try {
      const response = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 422) {
        const body = await response.json().catch(() => null);
        let detailMsg = "The API rejected the submission. Please check all inputs.";
        if (body && body.detail && Array.isArray(body.detail)) {
          detailMsg = body.detail.map(d => `${d.loc.join('.')}: ${d.msg}`).join(', ');
        }
        setErrorMsg(detailMsg);
        return;
      }

      if (!response.ok) {
        let detailMsg = `The API responded with status ${response.status}.`;
        const body = await response.json().catch(() => null);
        if (body && typeof body.detail === 'string') detailMsg = body.detail;
        setErrorMsg(detailMsg);
        return;
      }

      const data = await response.json();
      if (typeof data.predicted_mental_health_score !== 'number') {
        setErrorMsg("The API responded, but the score was missing or malformed.");
        return;
      }

      setPredictionScore(data.predicted_mental_health_score);
    } catch (err) {
      setErrorMsg(`Couldn't connect to backend server at ${API_BASE}. Make sure FastAPI is running (python -m uvicorn main:app --reload) and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      age: '',
      gender: '',
      country: '',
      academic_level: '',
      most_used_platform: '',
      purpose_of_use: '',
      avg_daily_usage_hours: '',
      daily_unlocks: '',
      study_hours: '',
      physical_activity_hours: '',
      sleep_hours_per_night: '',
      stress_level: ''
    });
    setPredictionScore(null);
    setErrorMsg(null);
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Header */}
      <nav className="navbar">
        <div className="nav-brand">
          <Activity size={24} className="brand-icon" />
          <span className="brand-name">Mental Health Index</span>
        </div>
        <ul className="nav-links">
          <li className="nav-link active">Wellness Index</li>
          <li className="nav-link">Analytics</li>
          <li className="nav-link">Documentation</li>
        </ul>
        <div className="nav-profile">
          <div className="profile-avatar">S</div>
          <div className="profile-info">
            <span className="profile-name">Student User</span>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Mental Health Assessment</h1>
          <p className="dashboard-desc">
            A calm, clinical indicator mapping how your habits, study hours, and digital routine interact. Provide details in each step to read your signal.
          </p>
        </header>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Assessment Form Area */}
          <AssessmentForm 
            formData={formData}
            setFormData={setFormData}
            onSubmit={handlePredict}
            isLoading={isLoading}
          />

          {/* Results Area */}
          <div>
            {isLoading ? (
              <div className="panel-card results-card">
                <div className="loading-indicator">
                  <div className="spinner-circle"></div>
                  <h3 className="state-title-text">Reading the signal...</h3>
                  <p className="state-copy-text">Running your habits through the predictive model.</p>
                </div>
              </div>
            ) : predictionScore !== null ? (
              <ResultsDisplay 
                score={predictionScore}
                formData={formData}
                onReset={handleReset}
              />
            ) : (
              <div className="panel-card results-card">
                <div className="state-idle-graphic">
                  <Activity size={28} />
                </div>
                <h3 className="state-title-text">Your score will appear here</h3>
                <p className="state-copy-text">
                  Complete the 5-step assessment form on the left and submit to view your wellness score.
                </p>
              </div>
            )}

            {/* Error Message Panel */}
            {errorMsg && (
              <div className="error-panel">
                <ShieldAlert size={24} style={{ marginBottom: '8px' }} />
                <span className="error-title-text">Prediction Failed</span>
                <p className="error-desc-text">{errorMsg}</p>
                <button 
                  type="button" 
                  className="btn-btn btn-secondary" 
                  onClick={() => setErrorMsg(null)}
                  style={{ width: '100%' }}
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <p>Built for educational and informational purposes. This tool is not a medical diagnosis or clinical instrument. If you are experiencing stress or anxiety, please reach out to trusted professional resources.</p>
      </footer>
    </div>
  );
}

export default App;
