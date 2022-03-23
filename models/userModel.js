const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    isim: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    userName: {
      type: String,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 12,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    sifre: {
      type: String,
      required: true,
    },
  },
  { collation: 'kullanicilar', timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
