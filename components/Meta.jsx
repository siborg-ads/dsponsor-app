import Head from "next/head";


const Meta = ({ title, keyword, desc }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={desc} />
        <meta name="keyword" content={keyword} />
      </Head>
    </div>
  );
};

Meta.defaultProps = {
  title: "DSponsor | Unlock smarter monetization for your content.",
  keyword:
    "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
  desc: "Explore the future of media monetization. DSponsor’s decentralized platform offers tokenized advertising spaces for dynamic and sustainable media funding."
};

export default Meta;
