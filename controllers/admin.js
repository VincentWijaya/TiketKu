const { User, Movie, Studio, Schedule, StudioSeat, ShowTime, Seats } = require('../models')

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
  
}

module.exports = Controller