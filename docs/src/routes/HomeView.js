import React from 'react';
import { connect } from 'react-redux';

const HomeView = ({ news }) => (
  <div>
    <h1>Home view</h1>
    <div>
      Data from redux store: <br />
      {!news.length ? (
        <span>No data</span>
      ) : (
        <ul>{news.map(n => <li key={n}>{n}</li>)}</ul>
      )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  news: state.app.news
});

export default connect(mapStateToProps)(HomeView);
