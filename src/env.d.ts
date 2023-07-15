interface ImportMetaEnv {
  //   readonly VITE_COS_SECRETID: string;
  //   readonly VITE_COS_SECRETKEY: string;
  //   readonly VITE_COS_BUCKET: string;
  //   readonly VITE_COS_REGION: string;
  // more env variables...
  readonly VITE_GITHUB_CLIENTID: string;
  readonly VITE_GITHUB_SECRETKEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
