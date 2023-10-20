export interface ConductorBase {
    success: boolean
    data: Conductor[]
    msg: string
    log: number
  }
  
  export interface Conductor {
    codigo: number
    nombre1: string
    nombre2: string
    apellido1: string
    apellido2: string
    nombre_completo: string
    documento: string
    estado: Estado
    tipo_documento: TipoDocumento
    tipo_tercero: string[]
  }
  
  export interface Estado {
    codigo: number
    nombre: string
  }
  
  export interface TipoDocumento {
    codigo: number
    nombre: string
  }
  