export interface ContenedorBase {
    success: boolean
    data: Contenedor[]
    msg: string
    log: number
  }
  
  export interface Contenedor {
    contenedor_numero: string
    contenedor_pesomaximo?: string
    tipo_contenedor: TipoContenedor
  }
  
  export interface TipoContenedor {
    codigo: string
    nombre: string
  }