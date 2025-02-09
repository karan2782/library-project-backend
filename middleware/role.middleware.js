const { User } = require("../models/user.model")

const role = async(req, res, next)=>{
    const user = await User.findOne({_id:req.user})
    console.log("role is", user.role);
    console.log("req", req.path)
    if(req.path=="/users"){
        if(user.role=="Admin"){
            next()
        }else{
            return res.status(500).json({message:"Only Admin can see all users"})
        }
    }

    
}

module.exports = {role}
    