import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Atenciones as AtencionesView,
  Atencion as AtencionView,
  Dashboard as DashboardView,
  PacienteList as PacienteListView,
  Paciente as PacienteView,
  PreLiquidacion as PreLiquidacionView,
  Account as AccountView,
  NotFound as NotFoundView,
  Timeout as  TimeoutView,
  SignIn as SignInView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/atenciones"
      />
      <RouteWithLayout
        component={AtencionesView}
        exact
        layout={MainLayout}
        path="/atenciones"
      />
      <RouteWithLayout
        component={AtencionView}
        exact
        layout={MainLayout}
        path="/atenciones/view"
      />
      <RouteWithLayout
        component={PacienteListView}
        exact
        layout={MainLayout}
        path="/pacientes"
      />
      <RouteWithLayout
        component={PacienteView}
        exact
        layout={MainLayout}
        path="/pacientes/view"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={PreLiquidacionView}
        exact
        layout={MainLayout}
        path="/preliquidacion"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={TimeoutView}
        exact
        layout={MinimalLayout}
        path="/timeout"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
