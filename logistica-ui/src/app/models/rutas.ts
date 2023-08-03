export interface RutasBase {
    success: boolean
    data: Rutas[]
    msg: string
    log: number
}

export interface Rutas {
    ruta_codigo: string
    ciudad_origen: CiudadOrigen
    ciudad_destino: CiudadDestino
    ruta_indicacion?: string
    estado: Estado
}

export interface CiudadOrigen {
    codigo: string
    nombre: string
}

export interface CiudadDestino {
    codigo: string
    nombre: string
}

export interface Estado {
    codigo: string
    nombre: string
}
