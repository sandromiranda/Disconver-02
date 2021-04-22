const Profile = require('../model/Profile')

module.exports = {
		async index(req, res) {
			return res.render("profile", { profile: await Profile.get() }) 
		},

		async update(req, res){
			//req.body to grab the data
			const data = req.body
			//define how many weeks in a year
			const weeksPerYear = 52 
			//remove vacation weeks from the year, to grap how many weeks there is in a month
			const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
			//total of working hours in a week
			const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
			//total of working hours in a month
			const monthlyTotalHours = weekTotalHours * weeksPerMonth
			//how much to charge for 1 hour
			const valueHour = data["monthly-budget"] / monthlyTotalHours

			const profile = await Profile.get()

      await Profile.update({
				...profile,
				...req.body,
				"value-hour": valueHour
			})

			return res.redirect('/profile')
		}
	}

