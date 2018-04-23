import React from 'react'
import { connect } from 'react-redux'

import { fetchNews } from '../reducers/news'

const FeatureView = ({ news }) => (
  <div style={{
    width: '200px',
    margin: 'auto'
  }}>
    <h1>Feature view</h1>
    <ul>
    {
      news.data.map((n, i) => <li key={i}>{n}</li>)
    }
    </ul>
  </div>
)

FeatureView.getInitialProps = (ctx, store) => {
  return store.dispatch(fetchNews())
}

const mapState = state => ({ news: state.news })

export default connect(mapState)(FeatureView)
