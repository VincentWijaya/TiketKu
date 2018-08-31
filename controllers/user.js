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
      res.redirect('/user/login')
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
      }],
      order: [
        ['id', 'ASC']
      ]
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
          where: {scheduleId: schedule.id},
          order: [['seatId', 'ASC']]
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
  
  static bookSeat(req, res) {
    
    return new Promise((resolve, reject) => {
      for (let i = 0; i < req.body.seats.length; i++) {
        StudioSeat.update(
          {
            avail: false,
            userId: req.session.user.id
          },
          {
            where: {
              scheduleId: req.params.idSchedule,
              seatId: req.body.seats[i]
            }
          }
        )
        .then(() => {
          if (i === req.body.seats.length - 1) {
            return resolve()
          }
        })
        .catch(err => {
          console.log(err)
          return res.send(err)
        }) 
      }
    })
    .then(update => {
      return StudioSeat.findAll({
        where: {userId: req.params.id},
        include: [{ 
          all: true, 
          nested: true 
        }],
      })
    })
    .then(data => {
      res.redirect(`/user/tickets/${req.session.user.id}`)
    })
    .catch(err => {
      console.log(err);
      res.send(err)
    })
  }
  
  static showTickets(req, res) {
    StudioSeat.findAll({
      include: [{ 
        all: true, 
        nested: true 
      }],
      where: {userId: req.params.id }
    })
    .then(data => {
      res.render('myTickets', {datas: data})
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
  }
  
}

module.exports = Controller