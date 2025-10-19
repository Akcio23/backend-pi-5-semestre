import type { Request, Response } from "express";
import User from "../database/models/User.ts";

class CustomerController {
  async updateCustomer(req: Request, res: Response) {
    const { name, email } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (name === undefined && email === undefined) {
      return res.status(400).json({
        message: "At least one field (name or email) must be provided",
      });
    }

    const updateData: { name?: string; email?: string } = {};

    if (name !== undefined) {
      if (name.trim() === "") {
        return res.status(400).json({ message: "Name cannot be empty" });
      }
      updateData.name = name;
    }

    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const emailExists = await User.findOne({ email, _id: { $ne: userId } });

      if (emailExists) {
        return res.status(409).json({ message: "Email already in use" });
      }

      updateData.email = email;
    }

    const updateUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: "-password",
    });

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", user: updateUser });
  }
}

export default CustomerController;
