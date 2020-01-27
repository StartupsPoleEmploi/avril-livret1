export default ({ env }) => {
  if (process.client && env.clientToPhoenixUrl) {
    window.phoenixUrl = env.clientToPhoenixUrl;
  }
}

