export interface MantenimientoBase {
    success: boolean
    data: Mantenimiento[]
    msg: string
    log: number
  }
  
  export interface Mantenimiento {
    estado: Estado
    fecha_inicio: any
    fecha_compromiso: any
    observacion: any
  }
  
  export interface Estado {
    codigo: string
    nombre: string
  }
  