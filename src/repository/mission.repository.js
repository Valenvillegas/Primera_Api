import Mission from "../models/missions.model.js";

/* Desarrollar los repositories:
    MissionRepository
        create(title, description, user_id)
        update(mission_id, title, description)
        updateStatus(mission_id, status: boolean) => Si finaliza colocar una finished_date como la fecha actual, si es false se deja en null
        deleteById(mission_id) 
        - getMissionsByUserId(user_id) => Devuelve todas las misiones asociadas al usuario
        */
class MissionRepository {
    async create(title,description, fk_owner_id) {
        await Mission.create(fk_owner_id,{title,description})
    }
    async updateById(mission_id, title, description){
        const updated_mission = await Mission.findByIdAndUpdate(
            mission_id,
            {title,description},
            {
                returnDocument: "after",
            }
        )
        return updated_mission
    }
    async updateStatus(mission_id, status){
        const finish_date = status ? new Date() : null
        const updated_status_mission = await Mission.findByIdAndUpdate(
            mission_id,
            {finish_date},
            {
                returnDocument: "after",
            }
        )
        return updated_status_mission
    }
    async updateFinishDate(mission_id, finish_date){
        const updated_finish_date_mission = await Mission.findByIdAndUpdate(
            mission_id,
            {finish_date},
            {
                returnDocument: "after",
            }
        )
        return updated_finish_date_mission
    }
    async deleteById(mission_id){
        await Mission.findByIdAndDelete(mission_id)
    }

    async getMissionsByUserId(user_id){
        const missions = await Mission.find({fk_owner_id: user_id})
        return missions
    }
}

const missionRepository = new MissionRepository()
export default missionRepository