import { db } from "../db.js";

export const getProductions = (req, res) => {
  const q = "SELECT * FROM uretim";
  db.query(q, (err, data) => {
    if (err) res.status(400).send(err);
    return res.status(200).json(data);
  });
};

export const getProduction = (req, res) => {
  const q = "SELECT * FROM uretim WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) res.status(400).send(err);
    return res.status(200).json(data);
  });
};

export const addProduction = (req, res) => {
  const values = [
    req.body.calisan_id, 
    req.body.hammade_id,
    req.body.urun_id,
    req.body.uretilen_miktar
  ];

  const q = "INSERT INTO uretim (calisan_id, hammade_id, urun_id, uretilen_miktar) VALUES (?, ?, ?, ?)";

  db.query(q, values, (err, data) => {
    if (!err) {
      return res.status(200).json(data);
    } else {
      //console.log('err:', err);
      return res.status(400).json(err);
    }
  });
};

export const deleteProduction = (req, res) => {
  const q = "Delete FROM uretim WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ Status: "Success" });
  });
};
