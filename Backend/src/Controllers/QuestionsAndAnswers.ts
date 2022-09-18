// import { Request , Response } from 'express';

// export const createQuestion = async ( req : Request, res : Response) => {}
// export const createAnswer = async ( req : Request, res : Response) => {}
// export const getQuestionsAndAnswersByProduct = async ( req : Request, res : Response) => {}

// export const updateQuestionById = async ( req : Request, res : Response) => {}
// export const updateAnswerById = async ( req : Request, res : Response) => {}

// export const deleteQuestionById = async ( req : Request, res : Response) => {}
// export const deleteAnswerById = async ( req : Request, res : Response) => {}

// const getInfo = async (req: any, res: any)=> {
//     const pais = req.query.name;
//     if(name){
//         const paisActual = await Clima.findOne({
//             where:{
//                 name: pais
//             }
//         })
//         if(paisActual){
//             if(paisActual.hora === horaActual){
//                 res.send(paisActual)

//             }else{
//                 const nuevaConsulta = await axios.get(`url${apikey}${pais}`);
//                 //tomar los datos nesesarios y guardarlos en el modelo clima
                    // responder con la nueva consulta
//             }
            
//         }
//         }
//     }else{
//         res.send('pais requerido')
//     }
// }