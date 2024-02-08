import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
    {
    title: 'Power EVM',
    Svg: require('../../static/img/vm.svg').default,
    description: (
      <>
        Serverless backend for Dapps - censorship and downtime tolerance. Real
        dapps are executed in a decentralized power network and have no single
        point of failure.
      </>
    ),
  },
  {
    title: 'Power SDK',
    Svg: require('../../static/img/sdk.svg').default,
    description: (
      <>
        Frontend SDK for creating decentralized applications, smart contracts and decentralized backends.
      </>
    ),
  },
  {
    title: 'Power API',
    Svg: require('../../static/img/api.svg').default,
    description: (
      <>
        Decentralized RPC API for developers that do not require special
        skills allows integrating blockchain in the classic, generic
        applications and making them decentralized.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
