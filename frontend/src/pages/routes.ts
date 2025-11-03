const createRoutes = () => {
    return {
        getMainPage: () => "/",
        getEstimatesPage: () => "/estimates/",
        getEstimatePage: (estimateId: string) => `/estimates/${estimateId}`,
        getTemplatesPage: () => '/templates',
        getAboutPage: () => '/about'
    };
}

export const routes = createRoutes();
