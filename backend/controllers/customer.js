import { db } from "../db.js";

export const getCustomers = (req, res) => {
  const q = "SELECT * FROM musteri";
  db.query(q, (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getCustomer = (req, res) => {
  const q = "SELECT * FROM musteri WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const addCustomer = (req, res) => {
  const values = [
    req.body.adi,
    req.body.soyadi,
    req.body.firma_adi,
    req.body.firma_adres,
  ];

  const q =
    "INSERT INTO musteri (adi, soyadi, firma_adi, firma_adres) VALUES (?)";

  db.query(q, [values], (err, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json(err);
    }
  });
};

export const updateCustomer = (req, res) => {
  const q =
    "UPDATE musteri SET `adi`= ?, `soyadi`= ?, `firma_adi`= ?, `firma_adres`= ? WHERE id = ?";

  const values = [
    req.body.adi,
    req.body.soyadi,
    req.body.firma_adi,
    req.body.firma_adres,
  ];

  db.query(q, [...values, req.params.id], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const deleteCustomer = (req, res) => {
  const q = "Delete FROM musteri WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json({ Status: "Success" });
  });
};
