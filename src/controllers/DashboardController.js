const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {	
	async index(req, res) {	
		const jobs = await Job.get()
		const profile = await Profile.get()

      let statusCount = {
         progress: 0,
         done: 0,
         total: jobs.length
      }

      //total hours per day from each job in progress
      let jobTotalHours = 0


		const updatedJobs = jobs.map((job) => {
			const remaining = JobUtils.remainingDays(job)
			const status = remaining <= 0 ? 'done' : 'progress'
         
         //increasing the status count
         statusCount[status] += 1

         jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours
        
         //if(status === 'progress'){
           // jobTotalHours += Number(job['daily-hours'])
         //}

			return { //this is the sintax the whole job with their attributes + the remaining days
				...job,
				remaining,
				status,
				budget: JobUtils.calculateBudget(job, profile["value-hour"])
			}
		})
      
      const freeHours = profile["hours-per-day"] - jobTotalHours;

		return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
	}
}

