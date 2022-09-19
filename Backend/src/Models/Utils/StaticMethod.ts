export async function findOrCreate(this: any, condition: any, doc: any) {
    const newPromise: any = await new Promise( async (resolve, reject) => {
        try{
            const result: any = await this.findOne(condition)
            if (result) {
                return resolve(result);
            }else{
                try{
                    const  newDocument: any = await this.create(doc);
                    return resolve(newDocument);
                }catch(error: any){
                    return reject(error);
                }
                
            }
        }catch(error){
            return reject(error);
        }
    });
    return newPromise
}