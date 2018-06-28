import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchNews } from '../../reducers/news';

class FeatureView extends Component {
  componentDidMount() {
    if (this.props.news.firstFetch) {
      this.props.fetchNews();
    }
  }

  render() {
    const { news } = this.props;
    return (
      <div>
        <h1>Feature view</h1>
        {news.loading ? <div>Loading from client...</div> : null}
        <ul>{news.data.map((n, i) => <li key={i}>{n}</li>)}</ul>
        <div>
          If you visit this route <strong>directly</strong>, then the list will
          be fetch from
          <strong> server-side (Good for SEO)</strong>. <br /> Otherwise (ex:
          visiting from Home), it'll be fetched from
          <strong> client-side</strong>.
        </div>
        <p>
          View page source, you'll see the list is already rendered on the
          server
        </p>
      </div>
    );
  }
}

FeatureView.loadData = ({ ctx, store }) => {
  return store.dispatch(fetchNews());
};

const mapState = state => ({ news: state.news });
const mapDispatch = { fetchNews };

export default connect(mapState, mapDispatch)(FeatureView);
