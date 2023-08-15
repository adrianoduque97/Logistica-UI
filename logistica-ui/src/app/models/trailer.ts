export interface Trailer {
    trailer_placa: string
    marca_carroceria: MarcaCarroceria
    carroceria: Carroceria
    trailer_modelo: string
    configuracion_vehiculo: ConfiguracionVehiculo
    contenedor: Contenedor
    trailer_pesovacio: string
    tipo_trailer: TipoTrailer
    propietario: Propietario
    pais: Pais
    empresa: Empresa
    tipo_afiliado: TipoAfiliado
    registro_nacional: string
    fecha_expedicion_registro_nacional: string
    certificado_habilitacion: string
    vigencia_certificado_habilitacion: string
    tarjeta_de_pesas_y_medidas: string
    vigencia_de_tarjeta_de_pesas_y_medidas: string
    trailer_codigo_interno: string
    trailer_chasis: string
    trailer_matricula: string
    estado: Estado
    trailer_matriculavigencia: string
    tipo_equipo: TipoEquipo
    trailer_estado_mantenimiento: string
    trailer_tara: any
    trailer_cubicaje: any
    trailer_pesomaximo: any
}

export interface TrailerBase {
    success: boolean
    data: Trailer[]
    msg: string
    log: number
}

export interface MarcaCarroceria {
    codigo: string
    nombre: string
}

export interface Carroceria {
    codigo: string
    nombre: string
}

export interface ConfiguracionVehiculo {
    codigo: string
    nombre: string
}

export interface Contenedor {
    codigo: any
    nombre: any
}

export interface TipoTrailer {
    codigo: string
    nombre: string
}

export interface Propietario {
    codigo: string
    nombre: string
}

export interface Pais {
    codigo: string
    nombre: string
}

export interface Empresa {
    codigo: string
    nombre: string
}

export interface TipoAfiliado {
    codigo: string
    nombre: string
}

export interface Estado {
    codigo: string
    nombre: string
}

export interface TipoEquipo {
    codigo: string
    nombre: string
}

