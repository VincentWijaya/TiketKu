const { User, Movie, Studio, Schedule, StudioSeat, ShowTime, Seats, Sequelize } = require('../models')
const Op = Sequelize.Op

class Controller {
  
  static addMovieShow(req, res) {
    Studio.findAll({
      where: {
        movieId: null
      }
    })
      .then(studios => {
        res.render('admin/addMovie', {studios, err: ''})
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }
  
  static addMovie(req, res) {
    Movie.create(
      {
        name: req.body.movieName,
        urlImg: req.body.urlImg
      }
    )
    .then(movie => {
      return Studio.update(
        {
          movieId: movie.id
        },
        {
          where: {
            id: req.body.studio
          }
        }
      )
        .then(() => {
          let allPromise = []
          return ShowTime.findAll()
            .then(data => {
              allPromise = data.map(show => {
                return Schedule.create({
                  studioId: req.body.studio,
                  showTimeId: show.id
                })
                
              })
              
              return Promise.all(allPromise)
              
            })
        })
        .then(schedules => {
          let allPromise =[]
          
          schedules.forEach(schedule => {
            Seats.findAll()
              .then(data => {
                allPromise = data.map(seat => {
                  return StudioSeat.create({
                    scheduleId: schedule.id,
                    seatId: seat.id
                  })
                })
              })
          })
          
          return Promise.all(allPromise)
            
        })
    })
    .then(() => {
      res.redirect('/user/movies')
    })
    .catch(err => {
      
      Studio.findAll({
        where: {
          movieId: null
        }
      })
      .then(studios => {
        res.render('admin/addMovie', {studios, err: err.message})
        console.log(err)
      })
    })
    
  }
  
  static showList(req, res) {
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
        res.render('admin/listMovie', {datas: hasil})
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }
  
  static showEdit(req, res) {
    Studio.find({
      include: [{ 
        all: true, 
        nested: true 
      }],
      where: {id: req.params.id}
    })
    .then(data => {
      res.render('admin/editMovie', {data, err: ''})
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
  }
  
  static edit(req, res) {
    Studio.find({
      include: [{ 
        all: true, 
        nested: true 
      }],
      where: {id: req.params.id}
    })
    .then(studio => {
      return Movie.update(
        {
          name: req.body.movieName,
          urlImg: req.body.urlImg
        },
        {where: {id: studio.Movie.id}}
      )
      .then(update => {
        return Studio.findAll({
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
            
            res.render('admin/listMovie', {datas: hasil})
          })
      })
    })
    .catch(err => {
      console.log(err)
      Studio.find({
        include: [{ 
          all: true, 
          nested: true 
        }],
        where: {id: req.params.id}
      })
      .then(data => {
        res.render('admin/editMovie', {data, err: err.message})
      })
    })
  }
  
  static remove(req, res) {
    Studio.update(
      {
        movieId: null
      },
      {
        where: {id: req.params.id},
        returning: true
      }
    )
    .then(studio => {
      let studioId = studio[1][0].id
      
      return Schedule.findAll({
        where: {studioId: studioId}
      })
        .then(schedules => { 
          let schedulesId = []
          
          schedules.forEach(schedule => {
            schedulesId.push(schedule.id)
          })
          
          return StudioSeat.destroy(
            {
              where: {scheduleId: {[Op.in]: schedulesId}}
            }
          )
          
        })  
    })
    .then(() => {
      res.redirect('/admin/listMovie')
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
  }
  
}

module.exports = Controller