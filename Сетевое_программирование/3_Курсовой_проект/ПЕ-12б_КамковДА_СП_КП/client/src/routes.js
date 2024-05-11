import Admin from "./pages/Admin";
import GoodsPage from "./pages/GoodsPage";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Registration from "./pages/Registration";

import { ADMIN_ROUTE, BASKET_ROUTE, GOODS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts";
import Basket from "./pages/Basket";

export const authRoutes = [

    {
        path: ADMIN_ROUTE,
        element: <Admin/>
    },    
]

export const publicRoutes = [
    
    {
        path: LOGIN_ROUTE,
        element: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Registration/>
    },
    {
        path: GOODS_ROUTE + '/:id',
        element: <GoodsPage/>
    },
    {
        path: SHOP_ROUTE,
        element: <Shop/>
    },
    {
        path: BASKET_ROUTE,
        element: <Basket/>
    },
]