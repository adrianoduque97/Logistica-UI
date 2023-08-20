export interface VehiculoBase {
    success: boolean
    data: Vehiculo[]
    msg: string
    log: number
  }
  
  export interface Vehiculo {
    vehiculo_pesobruto: string
    vehiculo_pesovacio: string
    vehiculo_capacidad: string
    clase_vehiculo: ClaseVehiculo
    vehiculo_alto: string
    vehiculo_largo: string
    vehiculo_ancho: string
    vigencia_seguro_obligatorio: string
    vigencia_seguro_obligatorio_2: any
    vigencia_certificado_habilitacion: string
    vigencia_revision_tecnomecanica_y_gases: string
    vigencia_poliza_andina: any
    vigencia_responsabilidad_civil: any
    vigencia_puerto: any
    vigencia_matricula: string
    vehiculo_ejes: string
    vehiculo_modelo: string
    vehiculo_codigo: string
    vehiculo_placa: string
    poseedor: Poseedor
    trailer: TrailerVehiculo
  }
  
  export interface ClaseVehiculo {
    codigo: string
    nombre: string
  }
  
  export interface Poseedor {
    codigo: string
    nombre: string
  }
  
  export interface TrailerVehiculo {
    codigo?: string
    placa?: string
  }
  