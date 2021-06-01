import React from 'react';
import { Switch,Route } from "react-router-dom";
import { LoginPage , HomePage ,NotFoundPage, SemaforoPage,OngPage, CreateOngPage, EditOngPage, CreateSemaforoPage, EditSemaforoPage, 
  ViewOngPage, ViewSemaforoPage, ReportesPage, ReportesCantPage, ReportesDirPage, ReportesVinPage }  from '../pages';
import { PrivateRoute } from './privateRoute';

export default function AppRouter() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={LoginPage} /> 
        <PrivateRoute exact path="/home" component={HomePage} />
        <PrivateRoute exact path="/ong" component={OngPage} />
        <PrivateRoute exact path="/ong/new" component={CreateOngPage} />
        <PrivateRoute exact path="/ong/edit" component={EditOngPage} />
        <PrivateRoute exact path="/ong/view" component={ViewOngPage} />      
        <PrivateRoute exact path="/semaforo" component={SemaforoPage} />
        <PrivateRoute exact path="/semaforo/new" component={CreateSemaforoPage} />
        <PrivateRoute exact path="/semaforo/edit" component={EditSemaforoPage} />
        <PrivateRoute exact path="/semaforo/view" component={ViewSemaforoPage} />
        <PrivateRoute exact path="/reportes" component={ReportesPage} />
        <PrivateRoute exact path="/reportes/cant" component={ReportesCantPage} />
        <PrivateRoute exact path="/reportes/dir" component={ReportesDirPage} />
        <PrivateRoute exact path="/reportes/vin" component={ReportesVinPage} />
        <PrivateRoute exact path="/users" component={HomePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
};