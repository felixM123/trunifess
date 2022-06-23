import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [

  {
    path: 'inicio',
    loadChildren: './paginasPrincipales/inicio/inicio.module#InicioModule'
  },
  {
    path: 'recepcion',
    loadChildren: './paginasPrincipales/recepcion/recepcion.module#RecepcionModule'
  },
  {
    path: 'embarque',
    loadChildren: './paginasPrincipales/embarque/embarque.module#EmbarqueModule'
  },
  {
    path: 'desembarco',
    loadChildren: './paginasPrincipales/desembarco/desembarco.module#DesembarcoModule'
  },
  {
    path: 'entrega',
    loadChildren: './paginasPrincipales/entrega/entrega.module#EntregaModule'
  },
  {
    path: 'ingreso-dinero',
    loadChildren: './paginasPrincipales/ingreso-dinero/ingreso-dinero.module#IngresoDineroModule'
  },
  {
    path: 'egreso-dinero',
    loadChildren: './paginasPrincipales/egreso-dinero/egreso-dinero.module#EgresoDineroModule'
  },
  {
    path: 'perfil/editar/:id',
    loadChildren: './cruds/profile/profile.module#ProfileModule'
  },
  {
    path: 'editar/pass/:id',
    loadChildren: './cruds/edit-pass/edit-pass.module#EditPassModule'
  },
  {
    path:'vista-ie/:id',
    loadChildren:'./paginasPrincipales/vista-ie/vista-ie.module#VistaIEModule'
  },
  {
    path:'vista-ie1/:id',
    loadChildren:'./paginasPrincipales/vista-ie1/vista-ie1.module#VistaIE1Module'
  },
  {
    path:'reporte-transaccion',
    loadChildren:'./paginasPrincipales/REPORTES/reporte-transaccion/reporte-transaccion.module#ReporteTransaccionModule'
  },
  {
    path:'reporte-transaccion-agencia/:1',
    loadChildren:'./paginasPrincipales/REPORTES/reporte-transaccion/reporte-transaccion.module#ReporteTransaccionModule'
  },
  {
    path:'reporte-transaccion-entrega',
    loadChildren:'./paginasPrincipales/REPORTES/reporte-transaccion-entrega/reporte-transaccion-entrega.module#ReporteTransaccionEntregaModule'
  },
  {
    path:'reporte-recepcion-agencias',
    loadChildren:'./paginasPrincipales/REPORTES/reporte-recepcion-agencia/reporte-recepcion-agencia.module#ReporteRecepcionAgenciaModule'
  },
  {
    path:'reporte-total-agencia',
    loadChildren:'./paginasPrincipales/REPORTES/reporte-total-agencia/reporte-total-agencia.module#ReporteTotalAgenciaModule'
  },
  {
    path:'reporte-resumen-total',
    loadChildren:'./paginasPrincipales/REPORTES/reporte-resumen-total/reporte-resumen-total.module#ReporteResumenTotalModule'
  },
  {
    path:'reporte-resumen-detalle',
    loadChildren:'./paginasPrincipales/REPORTES/reporte-resumen-detalle/reporte-resumen-detalle.module#ReporteResumenDetalleModule'
  },
  {
    path:'imprecion-recepcion',
    loadChildren:'./paginasPrincipales/REIMPRECION/imprecion-recepcion/imprecion-recepcion.module#ImprecionRecepcionModule'
  },
  {
    path:'imprecion-embarque',
    loadChildren:'./paginasPrincipales/REIMPRECION/imprecion-embarque/imprecion-embarque.module#ImprecionEmbarqueModule'
  },
  {
    path:'imprecion-desembarco',
    loadChildren:'./paginasPrincipales/REIMPRECION/imprecion-desembarco/imprecion-desembarco.module#ImprecionDesembarcoModule'
  },
  {
    path:'imprecion-entrega',
    loadChildren:'./paginasPrincipales/REIMPRECION/imprecion-entrega/imprecion-entrega.module#ImprecionEntregaModule'
  },
  {
    path:'seguimiento-g',
    loadChildren:'./paginasPrincipales/ANULACIONSEGUIMIENTO/seguimiento-g/seguimiento-g.module#SeguimientoGModule'
  },
  {
    path:'anular-recepcion',
    loadChildren:'./paginasPrincipales/ANULACIONSEGUIMIENTO/anular-recepcion/anular-recepcion.module#AnularRecepcionModule'
  },
  {
    path:'anular-entrega',
    loadChildren:'./paginasPrincipales/ANULACIONSEGUIMIENTO/anular-entrega/anular-entrega.module#AnularEntregaModule'
  },
  {
    path:'anular-guia',
    loadChildren:'./paginasPrincipales/ANULACIONSEGUIMIENTO/anular-guia/anular-guia.module#AnularGuiaModule'
  },
  {
    path:'lista/usuarios',
    loadChildren:'./paginasPrincipales/CRUDS/lista-usuarios/lista-usuarios.module#ListaUsuariosModule'
  },
  {
    path:'usuarios/nuevo',
    loadChildren:'./paginasPrincipales/CRUDS/usuarios/usuarios.module#UsuariosModule'
  },
  {
    path:'usuarios/editar/:id',
    loadChildren:'./paginasPrincipales/CRUDS/usuarios/usuarios.module#UsuariosModule'
  },
  {
    path:'lista/choferes',
    loadChildren:'./paginasPrincipales/CRUDS/lista-choferes/lista-choferes.module#ListaChoferesModule'
  },
  {
    path:'chofer/nuevo',
    loadChildren:'./paginasPrincipales/CRUDS/choferes/choferes.module#ChoferesModule'
  },
  {
    path:'chofer/editar/:id',
    loadChildren:'./paginasPrincipales/CRUDS/choferes/choferes.module#ChoferesModule'
  },
  {
    path:'lista/camiones',
    loadChildren:'./paginasPrincipales/CRUDS/lista-camiones/lista-camiones.module#ListaCamionesModule'
  },
  {
    path:'camion/nuevo',
    loadChildren:'./paginasPrincipales/CRUDS/camiones/camiones.module#CamionesModule'
  },
  {
    path:'camion/editar/:id',
    loadChildren:'./paginasPrincipales/CRUDS/camiones/camiones.module#CamionesModule'
  },
  {
    path:'lista/clientes',
    loadChildren:'./paginasPrincipales/CRUDS/lista-cliente/lista-cliente.module#ListaClienteModule'
  },
  {
    path:'cliente/nuevo',
    loadChildren:'./paginasPrincipales/CRUDS/clientes/clientes.module#ClientesModule'
  },
  {
    path:'cliente/editar/:id',
    loadChildren:'./paginasPrincipales/CRUDS/clientes/clientes.module#ClientesModule'
  },
  {
    path:'lista/agencias',
    loadChildren:'./paginasPrincipales/CRUDS/lista-agencias/lista-agencias.module#ListaAgenciasModule'
  },
  {
    path:'agencia/nuevo',
    loadChildren:'./paginasPrincipales/CRUDS/agencias/agencias.module#AgenciasModule'
  },
  {
    path:'agencia/editar/:id',
    loadChildren:'./paginasPrincipales/CRUDS/agencias/agencias.module#AgenciasModule'
  },
];
