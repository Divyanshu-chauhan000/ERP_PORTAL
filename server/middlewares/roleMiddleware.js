
const authorize = (allowedRole) =>{
 const   roleVerify = (req, res , next ) =>{
    const isRole = allowedRole.includes(req.user.role);

    if(!isRole){
      return res.status(403).json({message : "Access Denied "});
    }
    next();
  }
  return roleVerify
}

module.exports = authorize;

