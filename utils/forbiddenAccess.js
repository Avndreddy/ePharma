function checkForbiddenAccess(id, req, Role) {
  // Check if the userId is persent or not
  if (!id) throw new Error("Forbidden: User ID is undefined.");

  //  // Check for Forbidden senarios for Only Super User if True then can perform any action without restriction.
  if (req.user.Role.toString() === "Super Admin") {
    return;
  }

  // Check for Forbidden senario using only UserID
  if (id.toString() !== req.user.id.toString()) {
    throw new Error(
      "Forbidden: You do not have permission to access this resource."
    );
  }

  // Check for Forbidden senarios for Multiple Role, excluding Super User
  if (Array.isArray(Role)) {
    if (!Role.includes(req.user.Role.toString())) {
      throw new Error(
        "Forbidden: You are not authorized to perform this action."
      );
    }
  }

  // Check for Forbidden senarios for Onlt Customer Role, excluding Super User
  else if (Role.toString() !== req.user.Role.toString()) {
    throw new Error(
      "Forbidden: You are not authorized to perform this action."
    );
  }
}

module.exports = { checkForbiddenAccess };
