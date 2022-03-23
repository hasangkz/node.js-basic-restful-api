const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
var createError = require('http-errors');
router.get('/', async (req, res) => {
  const tumKullanicilar = await User.find({});

  res.json({ mesaj: 'tüm userlar listelendi!' });
});
//get isteklerinde kullanıcının bilgilerine erişmek için "req.params.x" kullanırız
router.get('/:id', (req, res) => {
  res.json({ mesaj: 'idsi :' + req.params.id + ' kullanıcı listelendi ' });
});
//post isteklerinde kullanıcının bilgilerine erişmek için "req.body.x" kullanırız
router.post('/', async (req, res) => {
  try {
    const eklenecekUser = new User(req.body);
    const sonuc = await eklenecekUser.save();
    res.json(sonuc);
  } catch (err) {
    console.log('user kaydedilemedi: ', err);
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const guncel = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true } //güncelleme işlemi yaparken var olan kurallara sadık kalmak istersek "runValidators:true" yazılmalı
    );
    if (guncel) {
      return res.json(guncel);
    } else {
      return res.status(404).json({
        message: 'kullanıcı guncellenemedi',
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/giris', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

// async - await kullanırken mutlaka try - catch kullanmaya özen göster
router.delete('/:id', async (req, res, next) => {
  try {
    const sonuc = await User.findByIdAndDelete({ _id: req.params.id });
    if (sonuc) {
      return res.json({
        message: 'kullanıcı silindi',
      });
    } else {
      throw createError(404, 'Kullanıcı bulunamadı');
    }
  } catch (error) {
    // -> console.log(err); artık biz hatalarımızı da bir middleware oluşturup kullanacağımız için next(err); yazıyoruz ki middlewareler arası geçiş sağlansın.
    // Artık userRouter.js'deki tüm fırlattığım hatalar buradaki catch'e girecek ve bu catch'de "next(err)" sayesinde middleware'e gidecek
    next(error);
  }
});
module.exports = router;
