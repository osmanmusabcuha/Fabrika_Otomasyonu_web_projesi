import { db } from "../db.js";

export const getEmployeer = (req, res) => {
  const q = "SELECT * FROM calisanlar";
  db.query(q, (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getEmployee = (req, res) => {
  const q = "SELECT * FROM calisanlar WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const addEmployee = (req, res) => {
  const values = [
    req.body.adi,
    req.body.soyadi,
    req.body.maas,
    req.body.medeni_durum,
    req.body.tel_no,
    req.body.adres,
  ];


  const q =
    "INSERT INTO calisanlar (adi, soyadi, maas, medeni_durum, tel_no, adres) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(q, values, (err, data) => {
    if (!err) {
      return res.status(200).json(data);
    } else {
      return res.status(400).json(err);
    }
  });
};

export const updateEmployee = (req, res) => {
  const q =
    "UPDATE calisanlar SET `adi`= ?, `soyadi`= ?, `maas`= ?, `medeni_durum`= ?,`tel_no`= ?,`adres`= ? WHERE id = ?";

  const values = [
    req.body.adi,
    req.body.soyadi,
    req.body.maas,
    req.body.medeni_durum,
    req.body.tel_no,
    req.body.adres,
  ];

  db.query(q, [...values, req.params.id], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const deleteEmployee = (req, res) => {
  const q = "Delete FROM calisanlar WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json({ Status: "Success" });
  });
};
