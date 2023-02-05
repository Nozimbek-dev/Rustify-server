import { Router, Request, Response, NextFunction } from "express";
import numbers from "../numbers";
import { login } from "../middleware/login";
import { Group, validate } from "../models/Group";
import { WithUser } from "../middleware/login";
const router = Router()


// Get number for one user
router.get("/get-num/:id", (req, res) => {
  const id: number = +req.params.id
  res.json({ number: numbers[id] })
})

// Create group
router.post("/create-group", login, (req: WithUser, res) => {
  if (!req.body.name) return res.status(401).json({ error: "Enter a name for the group" })

  const { error } = validate(req.body)
  if (error) return res.status(401).json({ error: error.details[0].message })

  const group = new Group({
    
  })

  return res.json({ data: req.user })
})

export default router