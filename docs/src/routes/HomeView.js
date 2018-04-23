import React from 'react';
import { connect } from 'react-redux';

const HomeView = ({ news }) => (
  <div>
    <h1>Home view</h1>
    <div>Plain view without server fetch.</div>
  </div>
);

const mapStateToProps = state => ({
  news: state.app.news
});

export default connect(mapStateToProps)(HomeView);
