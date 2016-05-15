import React from 'react';

export default function FeatureList(props) {
  return (<div className="features">
    {props.features.map((feat, i) => (
      <div key={i} className="feature">
        <input
          type="checkbox"
          selected={feat.enabled}
          id={feat.func}
          onChange={props.onFeatureToggle.bind(null, feat)}
        />
        <label htmlFor={feat.func}>{feat.name}</label>
      </div>
    ))}
  </div>);
}
