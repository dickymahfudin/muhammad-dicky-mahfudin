import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailPage from "./pages/Detail";
import ProductPage from "./pages/ProductPage";
import Form from "./component/Form";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="/form/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
