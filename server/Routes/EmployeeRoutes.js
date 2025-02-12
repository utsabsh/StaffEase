import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/employee_login", (req, res) => {
  const sql = "SELECT * from employee Where email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err)
          return res.json({ loginStatus: false, Error: "Wrong Password" });
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "employee", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true, id: result[0].id });
        } else {
          return res.json({ loginStatus: false, Error: "Invalid Credentials" });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "Invalid Credentials" });
    }
  });
});
router.get("/leave/:id", (req, res) => {
  let sql = "SELECT * FROM leave_records";
  const params = [];

  if (req.params.id) {
    sql += " WHERE employee_id = ?";
    params.push(req.params.id);
  }

  con.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error fetching leave records:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }
    res.json(result);
  });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as employeeRouter };
