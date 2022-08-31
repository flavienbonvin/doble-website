export const markdown = `
# Technical Explanation of the Project
This project was done as a technical test for a position as a full-stack software engineer. The requirements were to build an application the retrieves everyday data from an API, store this data on a database and serve this data in a small front end and via an API.

On top of that, some ground rules were established as follows: 
* Do not spend more than 3-4 hours on the test
* It’s OK to cut corners and to use shortcuts if it makes sense
* Working code is better than half-finished features. 

> One quick note about the name. This project is named Doble after the Japanese name of the artist Pokémon. The English name si Smeargle and Queulorior in French. Besides the Pokémon doesn’t evolve and this project won’t see much update in the future. They are quite similar in the end!

## Stack used

The architecture used in based on some concepts of the JAM stack and heavily relies on online services. I’ll go through the major parts of the architecture and explain some of the technical choices made.

### NextJS

NextJS is a meta framework built on top of React that offers many features such as Server Side Rendering and Server Side Generation. 

Besides that, it’s possible to have a NodeJS API inside the same projects as the front end. 

This means that I didn’t have to build two separate projects to achieve what was required. I have my two front end pages and one API endpoint that serves the exhibitions. 

### Supabase

Supabase is a service that offers an SQL alternative to Firebase. I used it since it’s quick to add to a project and they have a simple SDK that can run on the server or on the client. 

On my project, and to make data safer all the requests are made on the server. This way no environment variable or connections string is on the client making the project safer. 

To ensure data freshness the pages are incrementally regenerated. This means that they are automatically rebuilt after a given time to ensure up-to-date data while keeping performance excellent. 

### Github Action

Vercel (where my project is hosted) is a server less environment. This means that I don’t have access to all the features a more « traditional » server offers. One of the missing features is CRON jobs.

To tackle this issue I decided to use GitHub actions. It’s possible to have automated jobs running on GitHub. This way I can trigger a daily update on the update-event endpoints I created for that occasion.

Having an open endpoint lying around on the internet isn’t really safe. This is why I added a secret as a bearer token to my requests. This token is safely saved as environment variable on Vercel and as secret on GitHub. If the request doesn’t have the appropriate token, it’s rejected.

### Use of OpenWeather API and Google Geocode

The requirement asked to only support exhibitions that are in the US since the proposed API only supported the USA. Looking at the data, I quickly realized that the venue’s data wasn’t very complete and that I wasn’t able to safely ensure that I was getting a US venue.

This I why I decided to go against the recommendation and use Google Geocode service to get GPS value from any address and OpenWeather API to get the weather forecast. 

I wanted to discuss this point since I didn’t completely follow the requirements but I think that the end result is better since it can support the whole world.


## Some shortcomings of the project
Since the time allocated to this project was quite limited, I had to take some shortcuts to ensure that I was able to deliver a project in time. More on the time budget later in this article. 

### Type Safety for Some Data

The Google Geocode library I used (the queries are quite a pain to write) and the request made to the OpenWeather API aren’t typed. This means that I don’t know for sure what I’ll be receiving from the servers. 

I would have loved to write some type or even write some Zod parser to ensure that the data was type safe. Sadly, I wasn’t able in the 3-4-hour time frame and this is something that could be improved in about 1-2 additional hours.


### Not Storing GPS Coordinates on the DB

As said before I decided to use OpenWeather API instead of the one proposed on the assignment. Using this API  requires having the GPS coordinates of the location, you want to query. Sadly, the Harvard API doesn’t return this kind of value.

I realized too late that the GPS coordinates should be stored in the database for each venue instead of requesting them when fetching the weather forecast. This would help to reduce the number of requests made to the Google service.

Hopefully, this isn’t a huge issue since we don’t have many exhibitions and have pages that regenerate once an hour. This is also a quick improvement that could be done in less than an hour.  



## Final Feedback 
I’m quite pleased with the end result. The project is small and uses only a small set of libraries. I was also able to work with technologies I liked and that allow a developer to create a website in only a few hours.

You can see in the following code snippet that I only used a handful of dependencies. This isn’t necessarily a good thing but having too many libraries (specially for a project if this size) isn’t safe and can lead to technological debt or heavy bundle. 

\`\`\`json
"dependencies": {
  "@supabase/supabase-js": "2.0.0-rc.6",
  "next": "12.2.5",
  "node-geocoder": "^4.2.0",
  "prismjs": "^1.29.0",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-markdown": "^8.0.3",
  "zod": "^3.18.0"
},
\`\`\`

Speaking of hours, I had to exceed the allowed time by about 1 hour. I’m not counting the writing of this article in the time since it’s outside of the scope of the exercise and is an excuse for me to try some markdown to React libraries. 

All in all I had to take about 5 hours to make this website with about 1 hours for this article. This is a bit more than what was asked but I think that the added complexity of the Google Geocode justify this time exceeds. 

It was a super fun project to build! 

---
You can see the architecture diagram of the project below
`
