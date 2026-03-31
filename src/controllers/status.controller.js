class StatusController {
    get(request, response) {
        const {suerte,nro_random} = request
        console.log("suerte : ", suerte)
        console.log("numero random : ", nro_random)
        response.status(200).send(
            {
                ok: true,
                message: "Api corriendo",
                status: 200
            }
        )
    }
}

const statusController = new StatusController()
export default statusController