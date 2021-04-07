import React, { lazy } from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, useRouteMatch } from 'react-router-dom';

const Product = lazy(() => import('../../container/ecommerce/product/Products'));
const ProductAdd = lazy(() => import('../../container/ecommerce/product/AddProduct'));
const CategoryAdd = lazy(() => import('../../container/ecommerce/product/AddCategory'));
const UserAdd = lazy(() => import('../../container/ecommerce/product/AddUser'));
const ProductEdit = lazy(() => import('../../container/ecommerce/product/EditProduct'));
const EditCategory = lazy(() => import('../../container/ecommerce/product/EditCategory'));
const ProductDetails = lazy(() => import('../../container/ecommerce/product/ProductDetails'));
const Invoice = lazy(() => import('../../container/ecommerce/Invoice'));
const Orders = lazy(() => import('../../container/ecommerce/Orders'));
const Sellers = lazy(() => import('../../container/ecommerce/Sellers'));
const Cart = lazy(() => import('../../container/ecommerce/Cart'));
const Categories = lazy(() => import('../../container/ecommerce/Categories'));
const Rider = lazy(() => import('../../container/ecommerce/Rider'));
const TotalRider = lazy(() => import('../../container/ecommerce/TotalRider'));

const EcommerceRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/products`} component={Product} />
      <Route exact path={`${path}/add-product`} component={ProductAdd} />
      <Route exact path={`${path}/add-category`} component={CategoryAdd} />
      <Route exact path={`${path}/add-user`} component={UserAdd} />
      <Route exact path={`${path}/edit-product`} component={ProductEdit} />
      <Route exact path={`${path}/edit-category`} component={EditCategory} />
      <Route exact path={`${path}/productDetails/:id`} component={ProductDetails} />
      <Route exact path={`${path}/invoice`} component={Invoice} />
      <Route exact path={`${path}/orders`} component={Orders} />
      <Route exact path={`${path}/rider`} component={Rider} />
      <Route exact path={`${path}/total-rider`} component={TotalRider} />
      <Route exact path={`${path}/users`} component={Sellers} />
      <Route exact path={`${path}/categories`} component={Categories} />
      <Route path={`${path}/cart`} component={Cart} />
    </Switch>
  );
};

export default EcommerceRoute;
