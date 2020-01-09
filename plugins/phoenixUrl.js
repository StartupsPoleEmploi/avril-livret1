export default ({ env }) => {
  if (process.client && env.phoenixUrl) {
    window.phoenixUrl = env.phoenixUrl;
  }
}

