import React from 'react';
import { User, BookOpen, Clock, Heart, Award, ArrowRight, ArrowLeft } from 'lucide-react';

const TOP_COUNTRIES = ['India', 'USA', 'Canada', 'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France'];

const PLATFORMS = [
  'Instagram', 'Facebook', 'Snapchat', 'Twitter', 'YouTube', 
  'TikTok', 'LinkedIn', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp', 'WeChat'
];

const PURPOSES = ['Networking', 'Education', 'Entertainment', 'News'];

const STRESS_LEVELS = ['Low', 'Medium', 'High', 'Very High'];

export default function AssessmentForm({ formData, setFormData, onSubmit, isLoading }) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [errors, setErrors] = React.useState({});

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.age) {
        newErrors.age = "Age is required.";
      } else {
        const val = parseInt(formData.age, 10);
        if (isNaN(val) || val < 10 || val > 100) {
          newErrors.age = "Must be between 10 and 100.";
        }
      }
      if (!formData.gender) {
        newErrors.gender = "Gender is required.";
      }
      if (!formData.country || formData.country.trim() === "") {
        newErrors.country = "Country is required.";
      }
    }
    
    if (step === 2) {
      if (!formData.academic_level) {
        newErrors.academic_level = "Academic level is required.";
      }
    }
    
    if (step === 3) {
      if (!formData.most_used_platform) {
        newErrors.most_used_platform = "Most-used platform is required.";
      }
      if (!formData.purpose_of_use) {
        newErrors.purpose_of_use = "Primary purpose is required.";
      }
      if (formData.avg_daily_usage_hours === undefined || formData.avg_daily_usage_hours === '') {
        newErrors.avg_daily_usage_hours = "Screen time is required.";
      } else {
        const val = parseFloat(formData.avg_daily_usage_hours);
        if (isNaN(val) || val < 0 || val > 24) {
          newErrors.avg_daily_usage_hours = "Must be between 0 and 24.";
        }
      }
      if (formData.daily_unlocks === undefined || formData.daily_unlocks === '') {
        newErrors.daily_unlocks = "Phone unlocks is required.";
      } else {
        const val = parseInt(formData.daily_unlocks, 10);
        if (isNaN(val) || val < 0) {
          newErrors.daily_unlocks = "Must be 0 or more.";
        }
      }
    }
    
    if (step === 4) {
      if (formData.study_hours === undefined || formData.study_hours === '') {
        newErrors.study_hours = "Study hours is required.";
      } else {
        const val = parseFloat(formData.study_hours);
        if (isNaN(val) || val < 0 || val > 24) {
          newErrors.study_hours = "Must be between 0 and 24.";
        }
      }
      if (formData.physical_activity_hours === undefined || formData.physical_activity_hours === '') {
        newErrors.physical_activity_hours = "Physical activity is required.";
      } else {
        const val = parseFloat(formData.physical_activity_hours);
        if (isNaN(val) || val < 0 || val > 24) {
          newErrors.physical_activity_hours = "Must be between 0 and 24.";
        }
      }
      if (formData.sleep_hours_per_night === undefined || formData.sleep_hours_per_night === '') {
        newErrors.sleep_hours_per_night = "Sleep is required.";
      } else {
        const val = parseFloat(formData.sleep_hours_per_night);
        if (isNaN(val) || val < 0 || val > 24) {
          newErrors.sleep_hours_per_night = "Must be between 0 and 24.";
        }
      }
    }
    
    if (step === 5) {
      if (!formData.stress_level) {
        newErrors.stress_level = "Please select your perceived stress level.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(5, prev + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectStress = (val) => {
    setFormData(prev => ({
      ...prev,
      stress_level: val
    }));
    if (errors.stress_level) {
      setErrors(prev => ({ ...prev, stress_level: null }));
    }
  };

  const progressPct = ((currentStep - 1) / 4) * 100;

  return (
    <div className="panel-card">
      <div className="progress-tracker">
        <div className="progress-header">
          <span className="progress-step-text">Step {currentStep} of 5</span>
          <span className="progress-percentage">{Math.round(progressPct)}% Completed</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }}></div>
        </div>
      </div>

      <div className="step-container">
        {currentStep === 1 && (
          <div>
            <h2 className="step-title">
              <User size={20} className="brand-icon" /> Profile Information
            </h2>
            <p className="step-subtitle">Let's start with basic demographic details.</p>
            
            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label" htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleChange}
                  placeholder="e.g. 21"
                  className={`form-input ${errors.age ? 'form-input-error' : ''}`}
                />
                <span className="form-hint">10–100 years</span>
                {errors.age && <span className="form-error-msg">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleChange}
                  className={`form-select ${errors.gender ? 'form-input-error' : ''}`}
                >
                  <option value="" disabled hidden>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <span className="form-error-msg">{errors.gender}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  list="country-options"
                  value={formData.country || ''}
                  onChange={handleChange}
                  placeholder="e.g. India"
                  className={`form-input ${errors.country ? 'form-input-error' : ''}`}
                  autoComplete="off"
                />
                <datalist id="country-options">
                  {TOP_COUNTRIES.map(c => <option key={c} value={c} />)}
                </datalist>
                <span className="form-hint">Type or select from list</span>
                {errors.country && <span className="form-error-msg">{errors.country}</span>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="step-title">
              <BookOpen size={20} className="brand-icon" /> Academic Status
            </h2>
            <p className="step-subtitle">Your current education / study environment.</p>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="academic_level">Academic Level</label>
                <select
                  id="academic_level"
                  name="academic_level"
                  value={formData.academic_level || ''}
                  onChange={handleChange}
                  className={`form-select ${errors.academic_level ? 'form-input-error' : ''}`}
                >
                  <option value="" disabled hidden>Select level</option>
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                </select>
                {errors.academic_level && <span className="form-error-msg">{errors.academic_level}</span>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="step-title">
              <Clock size={20} className="brand-icon" /> Digital Habits
            </h2>
            <p className="step-subtitle">How do you interact with digital media daily?</p>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="most_used_platform">Most-used Platform</label>
                <select
                  id="most_used_platform"
                  name="most_used_platform"
                  value={formData.most_used_platform || ''}
                  onChange={handleChange}
                  className={`form-select ${errors.most_used_platform ? 'form-input-error' : ''}`}
                >
                  <option value="" disabled hidden>Select platform</option>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.most_used_platform && <span className="form-error-msg">{errors.most_used_platform}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="purpose_of_use">Primary Purpose of Use</label>
                <select
                  id="purpose_of_use"
                  name="purpose_of_use"
                  value={formData.purpose_of_use || ''}
                  onChange={handleChange}
                  className={`form-select ${errors.purpose_of_use ? 'form-input-error' : ''}`}
                >
                  <option value="" disabled hidden>Select purpose</option>
                  {PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.purpose_of_use && <span className="form-error-msg">{errors.purpose_of_use}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="avg_daily_usage_hours">Avg. Daily Screen Time</label>
                <div className="input-unit-wrapper">
                  <input
                    type="number"
                    step="0.1"
                    id="avg_daily_usage_hours"
                    name="avg_daily_usage_hours"
                    value={formData.avg_daily_usage_hours ?? ''}
                    onChange={handleChange}
                    placeholder="0.0"
                    className={`form-input ${errors.avg_daily_usage_hours ? 'form-input-error' : ''}`}
                  />
                  <span className="input-unit-addon">hours</span>
                </div>
                {errors.avg_daily_usage_hours && <span className="form-error-msg">{errors.avg_daily_usage_hours}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="daily_unlocks">Daily Phone Unlocks</label>
                <input
                  type="number"
                  id="daily_unlocks"
                  name="daily_unlocks"
                  value={formData.daily_unlocks ?? ''}
                  onChange={handleChange}
                  placeholder="e.g. 60"
                  className={`form-input ${errors.daily_unlocks ? 'form-input-error' : ''}`}
                />
                {errors.daily_unlocks && <span className="form-error-msg">{errors.daily_unlocks}</span>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="step-title">
              <Heart size={20} className="brand-icon" /> Lifestyle Parameters
            </h2>
            <p className="step-subtitle">Your physical wellness, sleep patterns, and study habits.</p>

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label" htmlFor="study_hours">Study Hours / Day</label>
                <div className="input-unit-wrapper">
                  <input
                    type="number"
                    step="0.1"
                    id="study_hours"
                    name="study_hours"
                    value={formData.study_hours ?? ''}
                    onChange={handleChange}
                    placeholder="0.0"
                    className={`form-input ${errors.study_hours ? 'form-input-error' : ''}`}
                  />
                  <span className="input-unit-addon">hrs</span>
                </div>
                {errors.study_hours && <span className="form-error-msg">{errors.study_hours}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="physical_activity_hours">Exercise / Day</label>
                <div className="input-unit-wrapper">
                  <input
                    type="number"
                    step="0.1"
                    id="physical_activity_hours"
                    name="physical_activity_hours"
                    value={formData.physical_activity_hours ?? ''}
                    onChange={handleChange}
                    placeholder="0.0"
                    className={`form-input ${errors.physical_activity_hours ? 'form-input-error' : ''}`}
                  />
                  <span className="input-unit-addon">hrs</span>
                </div>
                {errors.physical_activity_hours && <span className="form-error-msg">{errors.physical_activity_hours}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="sleep_hours_per_night">Sleep / Night</label>
                <div className="input-unit-wrapper">
                  <input
                    type="number"
                    step="0.1"
                    id="sleep_hours_per_night"
                    name="sleep_hours_per_night"
                    value={formData.sleep_hours_per_night ?? ''}
                    onChange={handleChange}
                    placeholder="0.0"
                    className={`form-input ${errors.sleep_hours_per_night ? 'form-input-error' : ''}`}
                  />
                  <span className="input-unit-addon">hrs</span>
                </div>
                {errors.sleep_hours_per_night && <span className="form-error-msg">{errors.sleep_hours_per_night}</span>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2 className="step-title">
              <Award size={20} className="brand-icon" /> Stress Baseline
            </h2>
            <p className="step-subtitle">How would you describe your overall daily stress level?</p>

            <div className="form-grid">
              <div className="form-group form-group-full">
                <label className="form-label">Perceived Stress Level</label>
                <div className="segmented-control">
                  {STRESS_LEVELS.map(level => (
                    <button
                      key={level}
                      type="button"
                      className={`segmented-btn ${formData.stress_level === level ? 'active' : ''}`}
                      onClick={() => handleSelectStress(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                {errors.stress_level && <span className="form-error-msg">{errors.stress_level}</span>}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="form-actions">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="btn-btn btn-secondary"
            disabled={isLoading}
          >
            <ArrowLeft size={16} /> Back
          </button>
        ) : (
          <div />
        )}

        {currentStep < 5 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn-btn btn-primary"
          >
            Next <ArrowRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => validateStep(5) && onSubmit()}
            className="btn-btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Generate Prediction'}
          </button>
        )}
      </div>
    </div>
  );
}
