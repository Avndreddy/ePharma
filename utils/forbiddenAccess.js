function checkForbiddenAccess(id, req) {
  if (id.toString() !== req.user.id.toString()) {
    throw new Error("Forbidden: You do not have access to this resource.");
  }
 
}

module.exports = {checkForbiddenAccess};