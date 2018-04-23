import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchNews } from '../reducers/news';

class FeatureView extends Component {
  componentDidMount() {
    if (this.props.news.firstFetch) {
      this.props.fetchNews();
    }
  }

  render() {
    const { news } = this.props;
    return (
      <div
        style={{
          width: '200px',
          margin: 'auto',
        }}
      >
        <h1>Feature view</h1>
        {news.loading ? <div>Loading from client...</div> : null}
        <ul>{news.data.map((n, i) => <li key={i}>{n}</li>)}</ul>
      </div>
    );
  }
}

FeatureView.getInitialProps = (ctx, store) => {
  return store.dispatch(fetchNews());
};

const mapState = state => ({ news: state.news });
const mapDispatch = { fetchNews };

export default connect(mapState, mapDispatch)(FeatureView);
