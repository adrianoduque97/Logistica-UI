export interface MantenimientoBase {
    success: boolean
    data: Mantenimiento[]
    msg: string
    log: number
  }
  
  export interface Mantenimiento {
    codigo: string
    estado: Estado
    equipo: Equipo
    conductor: Conductor
    fecha_inicio: string
    fecha_compromiso: any
    observacion: any
  }
  
  export interface Estado {
    codigo: string
    nombre: string
  }

  export interface Equipo {
    codigo: string
    nombre: string
  }
  
  export interface Conductor {
    codigo: string
    nombrecompleto: string
  }
  