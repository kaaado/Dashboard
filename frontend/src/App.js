import { Route, Routes } from 'react-router-dom';

import SignUp from './pages/website/Authenction/SignUp'
import SignIn from './pages/website/Authenction/SignIn';
import Home from './pages/website/Home';
import About from './pages/website/About';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/dashboard/user/Users';
import EditUser from './pages/dashboard/user/EditUser';
import CreateUser from './pages/dashboard/user/CreateUser';
import RequireAuth from './pages/website/Authenction/RequireAuth';
import PersistLogin from './pages/website/Authenction/PersistLogin';
import Products from './pages/dashboard/products/Products';
import CreateProduct from './pages/dashboard/products/CreateProduct';
import EditProduct from './pages/dashboard/products/EditProduct';

export default function App() {
    return (
        <div>
            <Routes>
                <Route path='/register' element={<SignUp />} />
                <Route path='/login' element={<SignIn />} />
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                {/* Protected Routes*/}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route path='/dashboard' element={<Dashboard />}>
                            <Route path='users' element={<Users />} />
                            <Route path='users/:id' element={<EditUser />} />
                            <Route path='user/create' element={<CreateUser />} />
                            <Route path='products' element={<Products />} />
                            <Route path='products/:id' element={<EditProduct />} />
                            <Route path='product/create' element={<CreateProduct />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}