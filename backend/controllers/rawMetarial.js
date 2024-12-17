import { db } from "../db.js";

export const getRawMetarials = (req, res) => {
  const q = "SELECT * FROM hammadde";
  db.query(q, (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getRawMetarial = (req, res) => {
  const q = "SELECT * FROM hammadde WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const addRawMetarial = (req, res) => {
  const values = [
    req.body.adi
  ];

  const q =
    "INSERT INTO hammadde (adi) VALUES (?)";

  db.query(q, [values], (err, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json(err);
    }
  });
};

export const updateRawMetarial = (req, res) => {
  const q =
    "UPDATE hammadde SET `adi`= ? WHERE id = ?";

    const values = [
        req.body.adi
      ];

  db.query(q, [...values, req.params.id], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const deleteRawMetarial = (req, res) => {
  const q = "Delete FROM hammadde WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json({ Status: "Success" });
  });
};