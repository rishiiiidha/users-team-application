function paginatedUsers(model){
    return async (req,res,next)=>{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit)|| 10;

        const startIndex = (page - 1)*limit;
        const endIndex = page * limit;

        const results ={}
        
        if(endIndex <model.length){
            results.next ={
                page: page + 1,
                limit: limit
            }
        }
        if(startIndex >0){
            results.next ={
                page: page - 1,
                limit: limit
            }
        }

        try{
        results.users = await model.find().limit(limit).skip(startIndex).exec();
        res.paginatedUsers = results;
        next()
        }
        catch(e){
            res.status(500).json({"message":e.message});
        }
    }
}

module.exports = paginatedUsers;