/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('intro-getting-started.html', this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl('guide-deployment.html', this.props.language)}>
              Deployment Guide
            </a>
            <a href={this.docUrl('cra-universal-cli.html', this.props.language)}>
              API Reference
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              href="http://stackoverflow.com/questions/tagged/cra-universal"
              target="_blank"
              rel="noreferrer noopener">
              Stack Overflow
            </a>
            <a
              href="https://spectrum.chat/cra-universal"
              target="_blank"
              rel="noreferrer noopener">
              Spectrum
            </a>
            <a
              href="https://twitter.com/antonybudianto"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={this.props.config.baseUrl + 'blog'}>Blog</a>
            <a href="https://github.com/">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/antonybudianto/cra-universal/stargazers"
              data-show-count={true}
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>

        <a
          href="https://code.facebook.com/projects/"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource">
          <img
            src={this.props.config.baseUrl + 'img/oss_logo.png'}
            alt="Facebook Open Source"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
