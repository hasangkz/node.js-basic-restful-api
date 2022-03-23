const express = require('express');
require('./db/dbConnect'); //bu hareket ile dbConnect'dek tüm kodları buraya kopyalamış oluyoruz
const app = express();
const errorMiddleware = require('./middleware/errorMiddleware');

// express.json() middleware => bizim post ile yolladığımız isteklerin body'sinin parse edilebilmesi için gerekli bir middleware
app.use(express.json());

//ROUTES
const router = require('./router/userRouter');
app.use('/api/users', router);
//kullanıcı /api/users -> ile başlayan sorgularda direkt router'e gidecek
//post,get,delete,patch yani tüm isteklerde buraya gitsin diye app.use olarak kullandık

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'hello',
  });
});

app.get('/:id', (req, res) => {
  res.status(200).json({ id: req.params.id });
});

app.post('/', (req, res) => {
  res.status(200).json(req.body);
});

//en son middlewaremiz hata middleware olması lazım.Çünkü herhangi bir reuter işlemi yok
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log('server başladı');
});
