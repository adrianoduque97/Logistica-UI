export interface ClienteBase {
    success: boolean
    data: Cliente[]
    msg: string
    log: number
  }
  
  export interface Cliente {
    cliente_documento: string
    cliente_nombre: string
    estado: Estado
  }
  
  export interface Estado {
    codigo: number
    nombre: string
  }
  