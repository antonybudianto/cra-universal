/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <Logo img_src={imgUrl('universal.png')} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href="https://github.com/antonybudianto/cra-universal/">Github</Button>
            <Button href="https://cra-universal.now.sh/">Demo</Button>
            {/* <Button href={docUrl('doc1.html', language)}>Example Link</Button> */}
            {/* <Button href={docUrl('doc2.html', language)}>Example Link 2</Button> */}
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="fourColumn">
    {[
      {
        content: 'No need to eject your precious create-react-app!',
        image: imgUrl('universal.png'),
        imageAlign: 'top',
        title: 'No eject',
      },
      {
        content: 'No configuration needed by default, with customization support',
        image: imgUrl('universal.png'),
        imageAlign: 'top',
        title: 'Zero config',
      },
      {
        content: 'Supports code splitting, both lazy and eager',
        image: imgUrl('universal.png'),
        imageAlign: 'top',
        title: 'Code-splitting',
      },
      {
        content: 'Both client and server hot module reloading',
        image: imgUrl('universal.png'),
        imageAlign: 'top',
        title: 'Full HMR',
      },
      {
        content: 'Works as companion, not as "react-scripts" replacement',
        image: imgUrl('universal.png'),
        imageAlign: 'top',
        title: 'Real companion',
      },
    ]}
  </Block>
);

const FeatureCallout = props => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{textAlign: 'center'}}>
    <h2>Universal create-react-app made easy</h2>
    <MarkdownBlock>Server-side Rendering, Code-splitting, Data Prefetching, Full HMR</MarkdownBlock>
    <MarkdownBlock>**All-in-one** CLI</MarkdownBlock>
  </div>
);

const LearnHow = props => (
  <Block background="light">
    {[
      {
        content: 'Make your create-react-app goes universal with these simple steps!',
        image: 'https://user-images.githubusercontent.com/7658554/42420108-261a1c5a-82eb-11e8-8ac0-ce2e0245e0ff.png',
        imageAlign: 'right',
        title: 'Getting started',
      },
    ]}
  </Block>
);

const TryOut = props => (
  <Block id="try">
    {[
      {
        content: 'Simple steps to get your create-react-app goes universal!',
        image: 'https://user-images.githubusercontent.com/7658554/42420108-261a1c5a-82eb-11e8-8ac0-ce2e0245e0ff.png',
        imageAlign: 'left',
        title: 'Getting started',
      },
    ]}
  </Block>
);

const Description = props => (
  <Block background="dark">
    {[
      {
        content: 'This is another description of how this project is useful',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'right',
        title: 'Description',
      },
    ]}
  </Block>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} alt={user.caption} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"Who's Using This?"}</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <LearnHow />
          <FeatureCallout />
          {/* <TryOut /> */}
          {/* <Description /> */}
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
