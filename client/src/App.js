import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/Protection/ProtectedRoute';
import { Home } from './pages/home/Home';
import { About } from './pages/about/About';
import { Services } from './pages/services/Services';
import { Register } from './components/forms/register';
import { Login } from './components/forms/log-in';
import RecipeDetail from './components/recipes/detailrecipe/detailrecipe';
import { CalculatorIMC } from './components/utils/imcalculator/imcalculator';
import { CreateRecipe } from './components/recipes/createrecipe/createrecipe';
import { Payment } from './components/utils/Stripe/payment'
import { UserContextProvider } from './Context/UserContext';
import {UserTable} from './components/admin/UsersTable/UserTable';
import { Recovery } from './components/utils/forgot-password/recovery-password/recovery';
import { Change } from './components/utils/forgot-password/change-password/change';
import { ConfirmAccount } from './components/utils/confirmAccount/confirm';
import AdminProfil from './pages/admin/adminProfile';
import { RecipeTable } from './components/admin/RecipesTable/RecipeTable';
import UserProfile from './pages/userBoart.js/userProfile';
import NutriProfile from './pages/nutriProfile/NutriProfile';


function App() {
  let user = JSON.parse(sessionStorage.getItem('user'))
  return (
    <UserContextProvider>
    <div className="App">
     <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/home" element={<Home/>} />
      <Route exact path="/about" element={<About/>} />
      <Route exact path="/services" element={<Services/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route  element={<ProtectedRoute isAllowed={!!user} />}>
        <Route exact path='/me' element={<UserProfile />} />
        <Route exact path="/calculatorimc" element={<CalculatorIMC/>} />
        <Route exact path="/suscription" element={<Payment/>}/> 
        <Route exact path="/recovery-password" element={<Recovery/>}/>
        <Route exact path="/change-password/:token" element={<Change/>}/>
        <Route exact path="/confirm-account/:token" element={<ConfirmAccount/>}/>
      </Route>
      <Route exact path="/detail/:id" element={<RecipeDetail/>} />
      <Route exact path="/nutritionist/:id" element={<ProtectedRoute isAllowed={!!user && (!!user.premium ||!!user.nutricionist || !!user.admin) }>
          <NutriProfile />
        </ProtectedRoute>} />
      <Route exact path="/createrecipe" element={
        <ProtectedRoute isAllowed={!!user && (!!user.nutricionist || !!user.admin)}>
          <CreateRecipe/>
        </ProtectedRoute>
      } />
      <Route element={<ProtectedRoute isAllowed={!!user && !!user.admin} />} >
        <Route exact path="/admin/users" element={<UserTable/>}/> 
        <Route exact path="/admin" element={<AdminProfil/>}/> 
        <Route exact path="/admin/recipes" element={<RecipeTable />}/> 
      </Route>
    </Routes>
    </div>
    </UserContextProvider>
  );
}

export default App;
