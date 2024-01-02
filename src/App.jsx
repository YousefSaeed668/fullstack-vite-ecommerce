import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./ui/AdminlSayout";
import Products from "./pages/admin/Products";
import Home from "./pages/client/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import ProductDetails from "./pages/client/ProductDetails";

import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Cart from "./pages/client/Cart";
import LoginFrom from "./features/authentication/LoginFrom";
import SignupForm from "./features/authentication/SignupForm";
import UpdateAccount from "./pages/client/UpdateAccount";
import ProtectedRoute from "./ui/ProtectedRoute";
import Checkout from "./pages/client/Checkout";
import ShippingAddress from "./pages/client/ShippingAddress";
import Orders from "./pages/client/Orders";
import AdminOrders from "./pages/admin/AdminOrders";
import OrderDetails from "./pages/client/OrderDetails";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import Dashboard from "./pages/admin/Dashboard";
import HomeStore from "./ui/HomeStore";
import Shop from "./pages/client/Shop";
import AboutUs from "./pages/client/AboutUs";
import Contact from "./pages/client/Contact";
import ForgetPassword from "./pages/client/ForgetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="home/Is_New" />} />
                <Route path="/" element={<AppLayout />}>
                  <Route path="/shop" element={<Shop />} />
                  <Route
                    path="orders"
                    element={
                      <ProtectedRoute>
                        <Orders />{" "}
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="product-details/:id"
                    element={<ProductDetails />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/forget-password" element={<ForgetPassword />} />
                  <Route
                    path="order-details/:orderID"
                    element={<OrderDetails />}
                  />
                  <Route path="home" element={<Home />}>
                    <Route path=":category" element={<HomeStore />} />
                  </Route>
                </Route>
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute type="admin">
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="dashboard" index element={<Dashboard />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route
                    path="order-details/:orderID"
                    element={<AdminOrderDetails />}
                  />
                  <Route path="products" element={<Products />} />
                  <Route path="settings" element={<div>Settings</div>} />
                </Route>
                <Route path="/login" element={<LoginFrom />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <UpdateAccount />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/final-check-out/:userID"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/check-out/:userID"
                  element={
                    <ProtectedRoute>
                      <ShippingAddress />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
