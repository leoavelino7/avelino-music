declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_CLIENT_ID: string
      REACT_APP_CLIENT_SECRET: string
      REACT_APP_REDIRECT_URL: string
      REACT_APP_SCOPES: string
      REACT_APP_AUTH_STORAGE: string
    }
  }
}

export {}
