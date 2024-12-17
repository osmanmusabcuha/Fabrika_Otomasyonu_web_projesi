import { db } from "../db.js";

export const getProducts = (req, res) => {
  const q = "SELECT * FROM urun";
  db.query(q, (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getProduct = (req, res) => {
  const q = "SELECT * FROM urun WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const addProduct = (req, res) => {
  const values = [
    req.body.adi,
    req.body.fiyat,
    req.body.miktar,
  ];

  const q =
    "INSERT INTO urun (adi, fiyat, miktar) VALUES (?)";

  db.query(q, [values], (err, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json(err);
    }
  });
};

export const updateProduct = (req, res) => {
  const q =
    "UPDATE urun SET `adi`= ?, `fiyat`= ? `miktar` = ? WHERE id = ?";

    const values = [
        req.body.adi,
        req.body.fiyat,
        req.body.miktar,
    ];

  db.query(q, [...values, req.params.id], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const deleteProduct = (req, res) => {
  const q = "Delete FROM urun WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json({ Status: "Success" });
  });
};