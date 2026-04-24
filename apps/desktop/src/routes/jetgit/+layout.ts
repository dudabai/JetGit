// The /jetgit route does not require server-side data loading.
// It is a fully client-side route that runs standalone,
// so we disable SSR and prerendering here.
export const ssr = false;
export const prerender = false;
export const csr = true;
