/* 
queremos definir un nuevo tipo de error 
Hasta ahora todos los errores solo son mensajes descriptivos del error

Server Error me va a permitir distinfuir el tipo de error mediante el status, cuando desarrollamos apis sabemos que tenemos distintos status de error

dentro de desarrollo de apis hay dos grandes grupos de errores, se puede extrapolar a otras areas de la programacion

1)Manejables, controlados o esperabes
2)Ineperados, Excepsionales e Inmanejables
*/

class ServerError extends Error{
    constructor(message,status){
        super(message)
        this.status = status
    }
}
export default ServerError
/* error es una clase naiva de js que se usa para definir rrores del programa, naturalmente los errores se definen con la clase Error 

Error es una clase que instancia objetos con la propiedad message la cuall seraun mensaje descriptivo del error ocurrido

Ej:
    function calcularIva (precio){
        if(isNaN(precio)){
            throw new Error('Error, precio debe ser un numero')
        }
        if(precio<= 0){
            throw new Error('Error, precio debe ser un numero positivo')
        }
    }

    try{
        calcularIva('pepe')
    }
    catch(error){
        console.log(error.message)
    }
*/