import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Invalid Credentials" });
    }
  });
});
router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});
router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});
// image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
// end imag eupload
router.post("/add_employee", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: false, error: "No file uploaded" });
  }
  console.log(req.body.phone);

  const sql = `INSERT INTO employee 
  (name, email, password, address, phone, salary, bonus, overtime, image, category_id) 
  VALUES (?)`;

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err)
      return res
        .status(500)
        .json({ status: false, error: "Password hashing error" });

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.phone,
      req.body.salary,
      req.body.bonus,
      req.body.overtime,
      req.file.filename,
      req.body.category_id,
    ];
    console.log(values);

    con.query(sql, [values], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ status: false, error: "Database error", details: err });
      return res.json({ status: true });
    });
  });
});
router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});
router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const deleteAttendanceRecordsSql =
    "delete from attendence_records where employee_id = ?";
  const deleteEmployeeSql = "delete from employee where id = ?";

  con.query(deleteAttendanceRecordsSql, [id], (err, result) => {
    if (err) {
      return res.json({
        Status: false,
        Error: "Error deleting attendance records: " + err,
      });
    }

    con.query(deleteEmployeeSql, [id], (err, result) => {
      if (err) {
        return res.json({
          Status: false,
          Error: "Error deleting employee: " + err,
        });
      }

      return res.json({ Status: true, Result: result });
    });
  });
});
router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});
router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, password=?, phone = ?,  category_id = ? 
        Where id = ?`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err)
      return res
        .status(500)
        .json({ status: false, error: "Password hashing error" });

    const values = [
      req.body.name,
      req.body.email,
      req.body.salary,
      req.body.address,
      hash,
      req.body.phone,
      req.body.category_id,
    ];

    con.query(sql, [...values, id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" + err });
      return res.json({ Status: true, Result: result });
    });
  });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };
