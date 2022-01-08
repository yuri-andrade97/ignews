import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna e Yarn Workspaces </strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sapiente veritatis alias architecto ullam fugiat velit eos amet nulla temporibus. At assumenda consectetur molestiae fuga voluptatum dolore odit voluptates quae?</p>
          </a>

          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna e Yarn Workspaces </strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sapiente veritatis alias architecto ullam fugiat velit eos amet nulla temporibus. At assumenda consectetur molestiae fuga voluptatum dolore odit voluptates quae?</p>
          </a>

          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna e Yarn Workspaces </strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sapiente veritatis alias architecto ullam fugiat velit eos amet nulla temporibus. At assumenda consectetur molestiae fuga voluptatum dolore odit voluptates quae?</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query<any>([
    Prismic.predicates.at('document.type', 'post')
  ], {
    fetch: ['post.type', 'post.content'],
    pageSize: 100,
  }) 

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
    };
  });

  return {
    props: {
     
    }
  }
}