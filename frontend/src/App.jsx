import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

const Signin = lazy(() => import("./pages/auth/Signin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Customer = lazy(() => import("./pages/customer/Customer"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const CreateCustomer = lazy(() => import("./pages/customer/CreateCustomer"));
const EditCustomer = lazy(() => import("./pages/customer/EditCustomer"));
const Supplier = lazy(() => import("./pages/supplier/Supplier"));
const CreateSupplier = lazy(() => import("./pages/supplier/CreateSupplier"));
const EditSupplier = lazy(() => import("./pages/supplier/EditSupplier"));
const Category = lazy(() => import("./pages/category/Category"));
const CreateCategory = lazy(() => import("./pages/category/CreateCategory"));
const EditCategory = lazy(() => import("./pages/category/EditCategory"));
const Product = lazy(() => import("./pages/product/Product"));
const CreateProduct = lazy(() => import("./pages/product/CreateProduct"));
const EditProduct = lazy(() => import("./pages/product/EditProduct"));
const Protected = lazy(() => import("./components/Protected"));
const AuthRedirect = lazy(() => import("./components/AuthRedirect"));
const Purchase = lazy(() => import("./pages/purchase/Purchase"));
const CreatePurchase = lazy(() => import("./pages/purchase/CreatePurchase"));
const ListSale = lazy(() => import("./pages/sale/ListSale"));
const Invoice = lazy(() => import("./pages/sale/Invoice"));
const POS = lazy(() => import("./pages/sale/POS"));
const User = lazy(() => import("./pages/user/User"));
const CreateUser = lazy(() => import("./pages/user/CreateUser"));
const EditUser = lazy(() => import("./pages/user/EditUser"));
const StockReport = lazy(() => import("./pages/report/StockReport"));
const SaleReport = lazy(() => import("./pages/report/SaleReport"));
const CashierLayout = lazy(() => import("./layouts/CashierLayout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Unauthorization = lazy(() => import("./pages/Unauthorization"));
function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                <Protected allowedRole={["super", "admin"]}>
                  <AdminLayout />
                </Protected>
              }
            >
              <Route path="/" element={<Dashboard />}></Route>

              <Route path="/customer" element={<Customer />}></Route>
              <Route path="/customer/create" element={<CreateCustomer />}></Route>
              <Route path="/customer/edit/:id" element={<EditCustomer />}></Route>

              <Route path="/supplier" element={<Supplier />}></Route>
              <Route path="/supplier/create" element={<CreateSupplier />}></Route>
              <Route path="/supplier/edit/:id" element={<EditSupplier />}></Route>

              <Route path="/category" element={<Category />}></Route>
              <Route path="/category/create" element={<CreateCategory />}></Route>
              <Route path="/category/edit/:id" element={<EditCategory />}></Route>

              <Route path="/product" element={<Product />}></Route>
              <Route path="/product/create" element={<CreateProduct />}></Route>
              <Route path="/product/edit/:id" element={<EditProduct />}></Route>

              <Route path="/purchase" element={<Purchase />}></Route>
              <Route path="/purchase/create" element={<CreatePurchase />}></Route>

              <Route path="/sale/list" element={<ListSale />}></Route>
              <Route path="/sale/pos" element={<POS />}></Route>
              <Route path="/user" element={<User />}></Route>
              <Route path="/user/create" element={<CreateUser />}></Route>
              <Route path="/user/edit/:id" element={<EditUser />}></Route>

              <Route path="/report/sale" element={<SaleReport />}></Route>
              <Route path="/report/stock" element={<StockReport />}></Route>
            </Route>

            <Route
              path="/sale/invoice/:id"
              element={
                <Protected allowedRole={["admin", "cashier", "super"]}>
                  <Invoice />
                </Protected>
              }
            ></Route>

            <Route
              path="/cashier/pos"
              element={
                <Protected allowedRole={["cashier"]}>
                  {" "}
                  <CashierLayout />{" "}
                </Protected>
              }
            >
              <Route index element={<POS />}></Route>
            </Route>

            <Route
              path="/signin"
              element={
                <AuthRedirect>
                  <Signin />
                </AuthRedirect>
              }
            ></Route>

            <Route path="/aunthorization" element={<Unauthorization />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
