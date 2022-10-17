export interface Factura {
  fechafacturacion:           Date;
  version:                    string;
  factura_id:                 number;
  frontera:                   string;
  factura_dian:               string;
  cliente_nombre:             string;
  municipio_id:               string;
  municipio_nombre:           string;
  departamento_nombre:        string;
  operador_sigla:             string;
  nivel_tension:              number;
  q_activa:                   number;
  q_inductiva:                number;
  q_inductiva_pen:            number;
  q_capacitiva:               number;
  q_reactiva_pen:             number;
  gm_redo:                    number;
  rm_redo:                    number;
  cm_redo:                    number;
  dm_redo:                    number;
  om_redo:                    number;
  ppond_redo:                 number;
  tpond_redo:                 number;
  v_gm:                       number;
  v_rm:                       number;
  v_cm:                       number;
  v_dm:                       number;
  v_om:                       number;
  v_ppond:                    number;
  v_tpond:                    number;
  v_activa:                   number;
  v_reactiva_pen:             number;
  v_consumo_energia:          number;
  v_gm_ajuste:                number;
  v_rm_ajuste:                number;
  v_cm_ajuste:                number;
  v_dm_ajuste:                number;
  v_om_ajuste:                number;
  v_ppond_ajuste:             number;
  v_tpond_ajuste:             number;
  v_activa_ajuste:            number;
  v_reactiva_pen_ajuste:      number;
  v_consumo_energia_ajuste:   number;
  v_gm_ajustado:              number;
  v_rm_ajustado:              number;
  v_cm_ajustado:              number;
  v_dm_ajustado:              number;
  v_om_ajustado:              number;
  v_ppond_ajustado:           number;
  v_tpond_ajustado:           number;
  v_activa_ajustado:          number;
  v_reactiva_pen_ajustado:    number;
  v_consumo_energia_ajustado: number;
  v_contribucion:             number;
  v_sobretasa:                number;
  v_adcn:                     number;
  v_iapb:                     number;
  v_iap_ajuste:               number;
  v_rrnt:                     number;
  v_arnt:                     number;
  v_rfntica:                  number;
  v_afntica:                  number;
  v_rrntbmb:                  number;
  v_otros_total:              number;
  v_neto_factura:             number;
  v_compensacion:             number;
  v_arntbmb:                  number;
  tipo_factura:               string;
  v_sgcv:                     number;
  factor_m:                   number;
  v_asgcv:                    number;
  estado:                     number;
  mensaje?:                    string;
}





export enum TipoFactura {
  Factura = "Factura",
}

export interface DetalleFactura {
  totalInvoice: number;
  totalPayment: number;
  difference:   number;
  payments:     Payment[];
  invoices:     any[];
}

export interface Payment {
  consecutive:  string;
  code:         string;
  paymentValue: number;
  fechaRecaudo: Date;
}
