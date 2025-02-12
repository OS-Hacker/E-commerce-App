import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Product from "./Pages/Product";
import Navbar from "./Pages/Navbar";
import Cart from "./Pages/Cart";
import Footer from "./Pages/Footer";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./style/Global_style";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "./redux-toolkit/Store";
import PageNotFound from "./Pages/PageNotFound";
import UserPrivetRoute from "./User/UserPrivetRoute";
import AdminPrivetRoute from "./Admin/AdminPrivetRoute";
import Create_Product from "./Admin/Create_Product";
import Create_Category from "./Admin/Create_Category";
import Admin_Deshbored from "./Admin/Admin_Dashboard";
import Profile from "./User/Profile";
import Show_Product from "./Admin/Show_Product";
import UpdateProductPage from "./Admin/UpdateProductPage";
import SingleProduct from "./Pages/SingleProduct";
import SearchContext from "./context/SearchContext";
import SearchPage from "./components/SearchPage";
import Contect from "./Pages/Contect";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";

function App() {
  const theme = {
    color: {
      main: "#833bda",
      bg: "#fadbfa",
      text: "#111",
      footer_bg: "#181d2c",
    },

    media: {
      mobile_screen: "768px",
      tab_screen: "998px",
    },
  };

  return (
    <>
      <SearchContext>
        <Provider store={Store}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <ToastContainer style={{ fontSize: "1.8rem" }} />
              <GlobalStyle />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contect" element={<Contect />} />
                <Route path="/Product" element={<Product />} />
                <Route path="/Cart" element={<Cart />} />
                <Route
                  path="/SingleProduct/:slug"
                  element={<SingleProduct />}
                />
                <Route path="/SearchPage" element={<SearchPage />} />

                {/* payment getway */}
                <Route path="/success" element={<PaymentSuccess />} />
                <Route path="/failed" element={<PaymentFailed />} />

                <Route path="*" element={<PageNotFound />} />

                {/* Privet Routes for User */}
                <Route path="/Deshbored" element={<UserPrivetRoute />}>
                  <Route path="user" element={<Profile />} />
                </Route>

                {/* Privet Routes for Admin */}
                <Route path="/Deshbored" element={<AdminPrivetRoute />}>
                  <Route path="admin" element={<Admin_Deshbored />} />
                  <Route
                    path="admin/Create_Category"
                    element={<Create_Category />}
                  />
                  <Route
                    path="admin/Create_Product"
                    element={<Create_Product />}
                  />
                  <Route path="admin/Show_Product" element={<Show_Product />} />
                  <Route
                    path="admin/UpdateProductPage/:slug"
                    element={<UpdateProductPage />}
                  />
                </Route>
              </Routes>
              <Footer />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </SearchContext>
    </>
  );
}

export default App;
