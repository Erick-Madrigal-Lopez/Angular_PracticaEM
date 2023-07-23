export interface loginResp{
    codigo:string
    mensaje:string
}

export interface Usuario{
    Nombre:string
    Login:string
    FechaAlta:string
    estatus?:string
    accion?:string
}

export interface userResp{
    usuarios:usuario[]
}

export interface usuario{
    login?:string
    password?:string
    nombre:string
    cliente?:string
    email?:string
    fechaAlta:string
    fechaBaja?:string
    status?:string
    intentos?:string
    fechaRevocado?:string
    fechaVigencia?:string
    noAcceso?:string
    apellidoPaterno:string
    apellidoMaterno:string
    area?:string
    fechaModificacion?:string
}

export interface registrarUsuario{
    login?:string //
    password?:string//
    nombre:string//
    cliente?:string
    email?:string
    fechaAlta:string//dummy
    fechaBaja?:string
    status?:string//dummy
    intentos?:string
    fechaRevocado?:string
    fechaVigencia?:string
    noAcceso?:string
    apellidoPaterno:string//
    apellidoMaterno:string//
    area?:string
    fechaModificacion?:string
}