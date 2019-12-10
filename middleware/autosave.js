import { storeToBackend } from "../mappers/toBackend";

export default async function({ store, req, env } = context) {
  if (process.client && store.state.hash) {
    const response = await fetch(
      `${env.apiUrl}/api/booklet?hash=${store.state.hash}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          certification_name: store.state.certificationLabel,
          certifier_name: store.state.certifierLabel,
          civility: storeToBackend.identity(store.state.identity),
          experiences: storeToBackend.experiences(store.state.experiences),
          education: storeToBackend.education(store.state.education)
        })
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(":) Saved", data);
    } else {
      console.log(":( Could not save");
    }
  } else {
    console.log(
      process.client
        ? "Not authenticated, no save"
        : "Server side, no need to save"
    );
  }
}
