const { User, Studio, StudioSeat, Schedule } = require('../models')
const hash = require('../helpers/encrypt')

class Controller {
  
  static loginShow(req, res) {
    res.render('login', {err: ''})
  }
  
  static login(req, res) {
    User.findOne(
      {where: {
          email: req.body.email,
          password: hash.hashPassword(req.body.password, req.body.email)
        }
      }
    ).then(data => {
      if (data) {
        req.session.user = {
          id: data.id,
          role: data.role
        }
        res.redirect('/')
      }else {
        throw new Error('Login gagal!')
      }
    }).catch(err => {
      console.log(err)
      res.render('login', {err: err.message})
    })
  }
  
  static registShow(req, res) {
    res.render('register', {err: ''})
  }
  
  static register(req, res) {
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
    ).then(() => {
      res.redirect('/')
    }).catch(err => {
      console.log(err)
      res.render('register', {err: err.message})
    })
  }
  
  static logout(req, res) {
    delete req.session.user
    res.redirect('/')
  }
  
  static movies(req, res) {
    Studio.findAll({
      include: [{ 
        all: true, 
        nested: true 
      }]
    })
    .then(data => {
      let hasil = []
      data.map(studio => {
        if(studio.movieId) {
          hasil.push(studio)
        }
      })
      res.render('movie', {data: hasil})
    })
    .catch(err => {
      res.send(err)
      console.log(err);
    })
  }
  
  static bookSeatShow(req ,res) {
    Studio.find({
      include: [{ 
        all: true, 
        nested: true 
      }],
      where: {id: req.params.idStudio}
    })
    .then(studio => {
      return Schedule.find({
        where: {
          studioId: req.params.idStudio,
          showTimeId: req.params.idJadwal
        }
      })
      .then(schedule => {
        return StudioSeat.findAll({
          include: [{ 
            all: true, 
            nested: true 
          }],
          where: {scheduleId: schedule.id}
        })
        .then(seats => {
          let jam = req.params.idJadwal
          return {studio, seats, jam}
        })
      })
    })
    .then(data => {
      res.render('bookSeat', {data, msg: ''})
    })
    .catch(err => {
      res.send(err)
      console.log(err);
    })
  }
  
  static bookSeat(req, res, next) {
    
    return new Promise((resolve, reject) => {
      req.body.seats.forEach((seat, index) => {
        StudioSeat.update(
          {
            avail: true,
            user: req.session.user.id
          },
          {
            where: {
              scheduleId: req.params.idSchedule,
              seatId: seat.seatId
            }
          }
        )
        .then(() => {
          console.log(index);
          if (index === seats.length - 1) {
            resolve()
          }
        })
        .catch(err => {
          console.log(err);
          res.send(err)
        })      
      })
    })
    .then(() => {
      Studio.find({
        include: [{ 
          all: true, 
          nested: true 
        }],
        where: {id: req.params.idStudio}
      })
      .then(studio => {
        return Schedule.find({
          where: {
            studioId: req.params.idStudio,
            showTimeId: req.params.idJadwal
          }
        })
        .then(schedule => {
          return StudioSeat.findAll({
            include: [{ 
              all: true, 
              nested: true 
            }],
            where: {scheduleId: schedule.id}
          })
          .then(seats => {
            return {studio, seats}
          })
        })
      })
    })
    .then(data => {
      res.render('bookSeat', {data, msg: 'Tiket berhasil dibook!'})
    })
    .catch(err => {
      console.log(err);
      res.send(err)
    })
  }
  
}

module.exports = Controller