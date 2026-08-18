import React from 'react';
import { Activity, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export default function ResultsDisplay({ score, formData, onReset }) {
  const strokeDasharray = 314; // approx PI * r (with r=100)
  const clamped = Math.max(0, Math.min(10, score));
  const strokeDashoffset = strokeDasharray * (1 - clamped / 10);

  const getBandInfo = (scoreVal) => {
    if (scoreVal < 4) {
      return {
        label: 'Signal: strained',
        className: 'badge-strained',
        context: 'Your responses suggest elevated strain right now. Small shifts in sleep, routine, or screen time can go a long way in restoring balance.',
      };
    }
    if (scoreVal < 7) {
      return {
        label: 'Signal: balanced',
        className: 'badge-balanced',
        context: 'Your rhythm looks fairly steady. Incorporating minor adjustments and taking regular breaks can help you reset and build further resilience.',
      };
    }
    return {
      label: 'Signal: strong',
      className: 'badge-strong',
      context: 'Your habits point to a well-supported, resilient baseline. Continuing these digital limits and self-care patterns will keep your wellness strong.',
    };
  };

  const { label, className, context } = getBandInfo(clamped);

  return (
    <div className="panel-card results-card">
      <div className="gauge-wrapper">
        <svg className="gauge-svg" viewBox="0 0 240 160">
          <path 
            className="gauge-bg-arc" 
            d="M 30 140 A 100 100 0 0 1 210 140" 
          />
          <path 
            className="gauge-fill-arc" 
            d="M 30 140 A 100 100 0 0 1 210 140" 
            style={{
              strokeDasharray: strokeDasharray,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="gauge-center-text">
          <span className="gauge-score">{clamped.toFixed(2)}</span>
          <span className="gauge-score-label">Wellness Index</span>
        </div>
      </div>

      <div className="results-content">
        <div className={`results-badge ${className}`}>
          {label}
        </div>
        
        <p className="results-summary-text">
          {context}
        </p>

        <div className="metrics-breakdown">
          <h3 className="breakdown-title">Core Parameters Recapped</h3>
          <div className="metrics-list">
            <div className="metric-row">
              <span className="metric-name">Avg. daily screen time</span>
              <span className="metric-value">{formData.avg_daily_usage_hours || 0} hrs</span>
            </div>
            <div className="metric-row">
              <span className="metric-name">Daily phone unlocks</span>
              <span className="metric-value">{formData.daily_unlocks || 0}</span>
            </div>
            <div className="metric-row">
              <span className="metric-name">Study hours per day</span>
              <span className="metric-value">{formData.study_hours || 0} hrs</span>
            </div>
            <div className="metric-row">
              <span className="metric-name">Sleep per night</span>
              <span className="metric-value">{formData.sleep_hours_per_night || 0} hrs</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '28px' }}>
          <button
            type="button"
            className="btn-btn btn-secondary"
            onClick={onReset}
            style={{ width: '100%' }}
          >
            <RefreshCw size={16} /> Run another read
          </button>
        </div>
      </div>
    </div>
  );
}
