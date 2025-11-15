const createRoutes = () => {
  return {
    getAboutPage: () => "/about",
    getEstimatesPage: () => "/estimates/",
    getEstimatePage: (estimateId: string) => `/estimates/${estimateId}`,
    getMainPage: () => "/",
    getSignInPage: () => "/sign-in",
    getSignUpPage: () => "/sign-up",
    getTemplatesPage: () => "/templates",
  };
};

export const routes = createRoutes();
