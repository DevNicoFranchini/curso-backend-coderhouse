/* API: Es un conjunto de reglas y especificaciones que describen la manera en que un sistema puede comunicarse con otros. 
        Tiene que estar acompañada con la documentación detallada que describa su operación y el formato de interacción con la misma. */

// Rutas: /usuarios, /productos, /login usuario => / categorias
// Metodos:
    //GET: Obtener info
    //POST: Agregar info
    //PUT: Actualizar info
    //DELETE: Eliminar info
// Permisos: reglas de acceso según los usuarios
// Autenticación: rutas públicas, rutas privadas

/* REST: (REpresentational: porque se representa algo
          State: datos que contiene la representación
          Transfer: enviar los datos --> XML o JSON (los + usuales))
*/

/* API REST:
    - Arquitectura Cliente-Servidor sin estado: un cliente no necesita saber cómo está desarrollado el servidor y el servidor no le interesa cómo usarán los datos. Ninguno recuerda
                                                los estados solicitados anteriormente.
    - Cacheable: debe soportar una caché de varios niveles. Evita repetir varias conexiones --> + velocidad.
    - Operaciones comunes: Debe poder consumir los métodos con sus códigos de estado correspondiente.
    - Interfaz uniforme: Cada acción debe contar con una URI (Uniform Resource Identifier) --> Facilita acceso a la info
    - Utilización de hipermedios: La info devuelta por el servidor puede ser hipervinculos
*/

/* RESTful API
    - Requiere un enfoque de diseño distinto a la forma común de pensar en un sistema --> Lo contrario a RPC (Remote Procedure Calls) --> Basa su funcionamiento en las operaciones
                                                                                                                                          que puede realizar el sistema.
    - REST --> El énfasis se pone en los recursos

        RPC => createUser
        REST => POST /User => Crear un usuario

    - Cada funcionalidad tendría sus propios indentificadores y peticiones en HTTP.
*/