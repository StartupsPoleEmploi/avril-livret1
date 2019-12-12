export default ({ env }) => {
  if (process.client) {
    if (env.crispWebsiteId) {
      window.$crisp=[];
      window.CRISP_WEBSITE_ID=env.crispWebsiteId;
      (function(){
        d=document;s=d.createElement("script");
        s.src="https://client.crisp.chat/l.js";s.async=1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    } else {
      console.log('NUXT_CRISP_WEBSITE_ID not set : Crisp not loaded');
    }
  }
}

