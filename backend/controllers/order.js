import { db } from "../db.js";

export const getOrders = (req, res) => {
  const q = "SELECT * FROM siparis";
  db.query(q, (err, data) => {
    if (err) res.status(400).send(err);
    return res.status(200).json(data);
  });
};

export const getOrder = (req, res) => {
  const q = "SELECT * FROM siparis WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const addOrder = (req, res) => {
  const values = [
    req.body.calisanlar_id,
    req.body.musteri_id,
  ];


  const q =
    "INSERT INTO siparis (calisanlar_id, musteri_id) VALUES (?, ?)";

  db.query(q, values, (err, data) => {
    if (!err) {
      return res.status(200).json(data);
    } else {
      return res.status(400).json(err);
    }
  });
};

export const updateOrder = (req, res) => {
  const q =
    "UPDATE siparis SET `calisanlar_id`= ?, `musteri_id`= ? WHERE id = ?";

  const values = [
    req.body.calisanlar_id,
    req.body.musteri_id
  ];

  db.query(q, [...values, req.params.id], (err, data) => {
    if (err) res.status(400).send(err);
    return res.status(200).json(data);
  });
};

export const deleteOrder = (req, res) => {
  const q = "Delete FROM siparis WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json({ Status: "Success" });
  });
};