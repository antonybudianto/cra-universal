import React, { Component } from 'react';

import './LandingView.css';
import carbon from './carbon.png';

class LandingView extends Component {
  render() {
    return (
      <div className="LandingView">
        <h1>cra-universal</h1>
        <h2>Create React App companion for universal app</h2>
        <p>No eject, Zero config, SSR, Prefetching, HMR support, and more!</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15px'
          }}
        >
          <a
            className="github-button"
            href="https://github.com/antonybudianto/cra-universal"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star antonybudianto/cra-universal on GitHub"
          >
            Star
          </a>
          <a
            href="/demo"
            style={{
              marginLeft: '15px',
              color: 'white'
            }}
          >
            Try demo
          </a>
        </div>
        <img
          suppressHydrationWarning
          style={{
            width: '400px'
          }}
          src={carbon}
          alt="cra-universal command line usage"
        />
      </div>
    );
  }
}

export default LandingView;
