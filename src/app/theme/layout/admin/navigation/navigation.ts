import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  rol?:string[];
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'TRUNI',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'inicio',
        title: 'Inicio',
        type: 'item',
        url: '/inicio',
        classes: 'nav-item',
        icon: 'feather icon-home',
        rol:['SUPER','ADMINISTRADOR','ENCARGADO','AUXILIAR','ASISTENTE']

      },
      {
        id: 'recepcion',
        title: 'Recepcion',
        type: 'item',
        url: '/recepcion',
        classes: 'nav-item',
        icon: 'feather icon-box',
        rol:['SUPER','ADMINISTRADOR','ENCARGADO','AUXILIAR']
      },
      {
        id: 'embarque',
        title: 'Embarque',
        type: 'item',
        url: '/embarque',
        classes: 'nav-item',
        icon: 'feather icon-shopping-cart',
        rol:['SUPER','ADMINISTRADOR','ENCARGADO','AUXILIAR']
      },
      {
        id: 'desembarco',
        title: 'Desembarco',
        type: 'item',
        url: '/desembarco',
        classes: 'nav-item',
        icon: 'feather icon-briefcase',
        rol:['SUPER','ADMINISTRADOR','ENCARGADO','AUXILIAR']
      },
      {
        id: 'entrega',
        title: 'Entrega',
        type: 'item',
        url: '/entrega',
        classes: 'nav-item',
        icon: 'feather icon-check-square',
        rol:['SUPER','ADMINISTRADOR','ENCARGADO','AUXILIAR']
      },
      {
        id: 'ingreso-dinero',
        title: 'Ingreso Dinero',
        type: 'item',
        url: '/ingreso-dinero',
        classes: 'nav-item',
        icon: 'feather icon-zoom-in',
        rol:['SUPER','ADMINISTRADOR','ENCARGADO','AUXILIAR','ASISTENTE']
      },
      {
        id: 'egreso-dinero',
        title: 'Egreso Dinero',
        type: 'item',
        url: '/egreso-dinero',
        classes: 'nav-item',
        icon: 'feather icon-zoom-out',
        rol:['SUPER','ADMINISTRADOR','ENCARGADO','AUXILIAR','ASISTENTE']
      },
      {
        id: 'admin',
        title: 'Administracion',
        type: 'collapse',
        icon: 'feather icon-sliders',
        children: [
          {
            id: 'lista-usuarios',
            title: 'Usuarios',
            type: 'item',
            icon: 'feather icon-user',
            classes: 'nav-item',
            url: '/lista/usuarios',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'lista-choferes',
            title: 'Choferes',
            type: 'item',
            icon: 'feather icon-user-plus',
            classes: 'nav-item',
            url: '/lista/choferes',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'lista-camiones',
            title: 'Camiones',
            type: 'item',
            icon: 'feather icon-life-buoy',
            classes: 'nav-item',
            url: '/lista/camiones',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'lista-clientes',
            title: 'Clientes',
            type: 'item',
            icon: 'feather icon-users',
            classes: 'nav-item',
            url: '/lista/clientes',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'lista-agencias',
            title: 'Agencias',
            type: 'item',
            icon: 'feather icon-map-pin',
            classes: 'nav-item',
            url: '/lista/agencias',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
        ]
      },
      {
        id: 'reporte',
        title: 'Reportes',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'reporteT',
            title: 'Reporte Transaccion',
            type: 'item',
            icon: 'feather icon-file-plus',
            classes: 'nav-item',
            url: '/reporte-transaccion',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'reporteTE',
            title: 'Rep.Recepcion/Entrega',
            type: 'item',
            icon: 'feather icon-file-plus',
            classes: 'nav-item',
            url: '/reporte-transaccion-entrega',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'reporteRA',
            title: 'Rep.Recepcion Agencia',
            type: 'item',
            icon: 'feather icon-file-plus',
            classes: 'nav-item',
            url: '/reporte-recepcion-agencias',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'reporteTA',
            title: 'Reporte Transaccion Agencias',
            type: 'item',
            icon: 'feather icon-file-plus',
            classes: 'nav-item',
            url: '/reporte-transaccion-agencia/:1',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'reporte-total-agencia',
            title: 'Reporte Total Agencias',
            type: 'item',
            icon: 'feather icon-file-plus',
            classes: 'nav-item',
            url: '/reporte-total-agencia',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'reporte-resumen-total',
            title: 'Reporte Resumen Total',
            type: 'item',
            icon: 'feather icon-file-plus',
            classes: 'nav-item',
            url: '/reporte-resumen-total',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'reporte-resumen-detalle',
            title: 'Reporte Resumen Detalle',
            type: 'item',
            icon: 'feather icon-file-plus',
            classes: 'nav-item',
            url: '/reporte-resumen-detalle',
            rol:['SUPER','ADMINISTRADOR','ENCARGADO','ASISTENTE']
          },
        ]
      },
      {
        id: 're-imprecion',
        title: 'Re-Imprecion',
        type: 'collapse',
        icon: 'feather icon-printer',
        children: [
          {
            id: 'imprecion-recepcion',
            title: 'Imprecion Recepcion',
            type: 'item',
            icon: 'feather icon-printer',
            classes: 'nav-item',
            url: '/imprecion-recepcion',
            rol:['SUPER','ADMINISTRADOR','AUXILIAR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'imprecion-embarque',
            title: 'Imprecion Embarque',
            type: 'item',
            icon: 'feather icon-printer',
            classes: 'nav-item',
            url: '/imprecion-embarque',
            rol:['SUPER','ADMINISTRADOR','AUXILIAR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'imprecion-desembarco',
            title: 'Imprecion Desembarco',
            type: 'item',
            icon: 'feather icon-printer',
            classes: 'nav-item',
            url: '/imprecion-desembarco',
            rol:['SUPER','ADMINISTRADOR','AUXILIAR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'imprecion-entrega',
            title: 'Imprecion Entrega',
            type: 'item',
            icon: 'feather icon-printer',
            classes: 'nav-item',
            url: '/imprecion-entrega',
            rol:['SUPER','ADMINISTRADOR','AUXILIAR','ENCARGADO','ASISTENTE']
          },

        ]
      },
      {
        id: 'seguimiento-anulacion',
        title: 'Reporte S.A',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'seguimiento_g',
            title: 'Seguimiento de Guia',
            type: 'item',
            icon: 'feather icon-layers',
            classes: 'nav-item',
            url: '/seguimiento-g',
            rol:['SUPER','ADMINISTRADOR','AUXILIAR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'anular-recepcion',
            title: 'Anular Recepcion',
            type: 'item',
            icon: 'feather icon-minus-square',
            classes: 'nav-item',
            url: '/anular-recepcion',
            rol:['SUPER','ADMINISTRADOR','AUXILIAR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'anular-entrega',
            title: 'Anular Entrega',
            type: 'item',
            icon: 'feather icon-minus-square',
            classes: 'nav-item',
            url: '/anular-entrega',
            rol:['SUPER','ADMINISTRADOR','AUXILIAR','ENCARGADO','ASISTENTE']
          },
          {
            id: 'anular-guia',
            title: 'Anular Guia',
            type: 'item',
            icon: 'feather icon-minus-square',
            classes: 'nav-item',
            url: '/anular-guia',
            rol:['SUPER','ADMINISTRADOR','AUXILIAR','ENCARGADO','ASISTENTE']
          },

        ]
      }
    ]
  },

];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
