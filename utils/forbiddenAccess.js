async function checkForbiddenAccess(id, req) {
  if (id.toString() !== req.user.id.toString()) {
    res.status(403).send("Forbiden access: You do not have access to operate on this resource");
  }
}

module.exports = {checkForbiddenAccess};