import React from 'react';
import { connect } from 'react-redux';

const HomeView = ({ news }) => (
  <div>
    <h1>Home view</h1>
    <div>Plain view without server fetch.
      <i className="fa fa-check fa-lg"></i>
    </div>
    <div>
      Go back to <a href="/">cra-universal.now.sh</a>
    </div>
  </div>
);

const mapStateToProps = state => ({
  news: state.app.news
});

export default connect(mapStateToProps)(HomeView);
