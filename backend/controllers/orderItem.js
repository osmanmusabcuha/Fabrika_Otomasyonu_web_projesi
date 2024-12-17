import { db } from "../db.js";

export const getOrderItems = (req, res) => {
  const q = "SELECT * FROM siparis_icerik";
  db.query(q, (err, data) => {
    if (err) res.status(400).send(err);
    return res.status(200).json(data);
  });
};

export const getOrderItem = (req, res) => {
  const q = "SELECT * FROM siparis_icerik WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const addOrderItem = (req, res) => {
  const values = [
    req.body.siparis_id, 
    req.body.urun_id, 
    req.body.siparis_miktar
  ];

  const q = "INSERT INTO siparis_icerik (siparis_id, urun_id, siparis_miktar) VALUES (?, ? ,? )";

  db.query(q, values, (err, data) => {
    if (!err) {
      return res.status(200).json(data);
    } else {
      return res.status(400).json(err);
    }
  });
};

export const updateOrderItem = (req, res) => {
  const q =
    "UPDATE siparis_icerik SET `siparis_id`= ?, `urun_id`= ?, `siparis_miktar`= ? WHERE id = ?";

  const values = [req.body.siparis_id, req.body.urun_id, req.body.siparis_miktar];

  db.query(q, [...values, req.params.id], (err, data) => {
    if (err) res.status(400).send(err);
    return res.status(200).json(data);
  });
};

export const deleteOrderItem = (req, res) => {
  const q = "Delete FROM siparis_icerik WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json({ Status: "Success" });
  });
};
