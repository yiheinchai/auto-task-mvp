import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <center>
          Hi!👋 I am a 3rd year iBSc Neuroscience student at UCL. Interested in brains and
          computers!
        </center>
      </section>
    </Layout>
  );
}
