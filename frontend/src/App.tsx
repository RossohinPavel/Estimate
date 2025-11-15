import { Layout } from "./components/Layout";
import * as pages from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.scss";


const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={pages.routes.getMainPage()} element={<pages.MainPage />} />
            <Route path={pages.routes.getEstimatesPage()} element={<pages.EstimatesPage />} />
            <Route
              path={pages.routes.getEstimatePage(":estimateId")}
              element={<pages.EstimatePage />}
            />
            <Route path={pages.routes.getTemplatesPage()} element={<pages.TemplatesPage />} />
            <Route path={pages.routes.getAboutPage()} element={<pages.AboutPage />} />
            <Route path={pages.routes.getSignUpPage()} element={<pages.SignUpPage />} />
            <Route path={pages.routes.getSignInPage()} element={<pages.SignInPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
