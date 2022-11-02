<br/>

***Current Version 0.9.2***

---

# Popout Portfolio

A full stack web-based application to dynamically display resumé material in a professional manner.

## View Live Production Build

https://portfolio-display-app.herokuapp.com/

## Getting Started

The following dependencies and tools must be installed for the project to work properly.

### Prerequisites

The following are what you need before cloning the repository.

* [Vue](https://cli.vuejs.org/guide/installation.html)
```npm install -g @vue/cli```
* [Typescript](https://www.typescriptlang.org/id/download)
```npm install typescript --save-dev```
* [Vuetify](https://vuetifyjs.com/en/getting-started/installation/)
```npm i vuetify```
* [VueUse](https://vueuse.org/guide/)
```npm i @vueuse/core```

---


#### Portfolio Content: Object Format Tree

```json
{
   "header":{
      "name":"Yona Alexander Voss-Andreae",
      "headshotURL":"",
      "professionalTitle":"Software Engineer (In Training)",
      "links":[
         {
            "URL":"https://github.com/Yonava/",
            "type":"github"
         }
      ],
      "email":"yonavossandreae@gmail.com",
      "phone":"9713527727"
   },
   "accomplishments":{
      "pageRank":"2",
      "content":[
         {
            "description":"The SETA Cup, an annual event sponsored by several large tech and aerospace companies, including Oracle, is the largest competitive programming event hosted by SNHU. In the 3-hour head to head programming competition, teams are tasked to write algorithms to solve increasingly difficult problems. Our two-person freshman team placed 2nd out of 15 teams, defeating numerous upperclassmen teams and breaking a SETA Cup record by making our team the best freshmen team since its launch 6 years ago.",
            "date":"2022-03",
            "type":"accomplishment",
            "title":"2nd Place, SETA Challenge Cup",
            "organization":"SNHU CS, Oracle, Collins Aerospace and more"
         },
         {
            "description":"Red River AWS Jam is a competition comprised of 13 teams of students from SNHU and surrounding colleges to troubleshoot a series of simulated errors occurring on the AWS cloud platform including load balancer security groups blocking connections to an inbound request gateway, bugs causing lambda functions to return inaccurate data, and missing or outdated dependencies in a deployments dockerfile preventing an EC2 instance from serving an applications statics.",
            "date":"2022-10",
            "type":"accomplishment",
            "title":"1st Place Prize, Red River AWS Jam",
            "organization":"SNHU, Red River, Amazon"
         },
         {
            "description":"For my academic achievements, I have been awarded a spot on SNHUs presidents list every semester of my enrollment in the Computer Science program.",
            "date":"2022-04",
            "type":"accomplishment",
            "title":"4.0 GPA, 2x Presidents List, and 1x Honor Roll",
            "organization":"SNHU"
         }
      ]
   },
   "projects":{
      "pageRank":"3",
      "content":[
         {
            "description":"RhymeTime is a multiplayer mad-libs party style game. Write bars, vote for the best rhymes. Make a song!",
            "date":"2022-12",
            "type":"project",
            "name":"RhymeTime",
            "technologies":[
               {
                  "name":"Vue",
                  "logo":""
               },
               {
                  "name":"JavaScript",
                  "logo":""
               },
               {
                  "name":"MongoDB",
                  "logo":""
               },
               {
                  "name":"NodeJS",
                  "logo":""
               }
            ],
            "linkToDeploy":"https://its-rhyme-time.herokuapp.com/",
            "linkToRepo":"https://github.com/Yonava/RhymeTime"
         },
         {
            "description":"A full stack web based application to dynamically display resume material in a professional manner.",
            "date":"2022-07",
            "type":"project",
            "name":"Popout Portfolio",
            "technologies":[
               {
                  "name":"TypeScript",
                  "logo":""
               },
               {
                  "name":"Vue",
                  "logo":""
               },
               {
                  "name":"HTML",
                  "logo":""
               },
               {
                  "name":"CSS",
                  "logo":""
               },
               {
                  "name":"NodeJS",
                  "logo":""
               },
               {
                  "name":"MongoDB",
                  "logo":""
               }
            ],
            "linkToDeploy":"https://portfolio-display-app.herokuapp.com/",
            "linkToRepo":"https://github.com/teykamp/portfolio_display/"
         },
         {
            "description":"Compete with friends online in an engaging multiplayer format. Math race auto generates math questions at various difficulty levels. Practice your skills in single player. Create an account to save your latest game results and stats.",
            "date":"2022-02",
            "type":"project",
            "name":"Math Race",
            "technologies":[
               {
                  "name":"Vue",
                  "logo":""
               },
               {
                  "name":"NodeJS",
                  "logo":""
               },
               {
                  "name":"MongoDB",
                  "logo":""
               }
            ],
            "linkToDeploy":"https://math-race-game.herokuapp.com/",
            "linkToRepo":"https://github.com/Yonava/MathRaceGame"
         },
         {
            "description":"Full stack web based mobile application for the penmen press using vue, express, node and mongodb.",
            "date":"2021-11",
            "type":"project",
            "name":"Penmen Press Mobile",
            "technologies":[
               {
                  "name":"Vue",
                  "logo":""
               },
               {
                  "name":"NodeJS",
                  "logo":""
               },
               {
                  "name":"MongoDB",
                  "logo":""
               }
            ],
            "linkToDeploy":"http://press-app.herokuapp.com/",
            "linkToRepo":"https://github.com/Yonava/penmenpressmobile"
         }
      ]
   },
   "education":{
      "pageRank":"1",
      "content":[
         {
            "description":"I am currently enrolled in the Southern New Hampshire University on campus Computer Science program with a GPA of 4.0. Currently I am on an accelerated pace, and am on target to graduate one year ahead of my freshman class.",
            "date":"2021-08",
            "type":"education",
            "institution":"Computer Science Major, Southern New Hampshire University (4.0 GPA)",
            "degreeType":"BS",
            "degreeField":"Computer Science"
         },
         {
            "description":"I have been selected for, and am enrolled in, the SNHU Honors Program. I have completed several honors level coursework in various Computer Science subjects including Databases, Computer Architecture, Software Engineering and more.",
            "date":"2022-03",
            "type":"education",
            "institution":"Honors Program Member",
            "degreeType":"BS",
            "degreeField":"Computer Science"
         }
      ]
   },
   "experiences":{
      "pageRank":"0",
      "content":[
         {
            "description":"As treasurer of the official computer science club at SNHU, I am responsible for handling the finances of the club including writing budget proposals and procuring event sponsorships. As event organizer, my role has been to organize and host events with a focus on improving core CS skills in attendees and fostering a strong community of passionate and dedicated computer science students.",
            "date":"2022-04",
            "type":"experiences",
            "title":"Event Organizer and Treasurer",
            "company":"Computer Science Student Association",
            "companyImg":""
         },
         {
            "description":"As Staff Writer at The Penmen Press, I am tasked with turning the events of Campus into well written and timely articles for each new issue. The role requires attending weekly writers meetings and keeping an open line of communication with editors and the marketing team to ensure the reliable delivery of a quality product to readers.",
            "date":"2021-08",
            "type":"experiences",
            "title":"Staff Writer",
            "company":"The Penmen Press",
            "companyImg":""
         },
         {
            "description":"My responsibilities as Certified Trainer included welcoming and training new hires, in various positions at the restaurant, from handling customer interactions to fulfilling orders. My responsibilities also included preparing and sharing constructive feedback with new employees in order to foster a positive work environment, efficient teamwork and provide a positive customer service experience.",
            "date":"2021-04",
            "type":"experiences",
            "title":"Certified Trainer",
            "company":"Raising Cane's",
            "companyImg":""
         }
      ]
   },
   "timeline":{
      "pageRank":"4",
      "content":[
         "experiences",
         "accomplishments",
         "education",
         "projects"
      ]
   }
}
```

#### Portfolio Privacy: Object Format Tree

```json
{
   "visibility":false,
   "accesskey":"1613879"
}
```

---

## Documentation

Please see the documentation section of the project under the [Documentation](https://github.com/teykamp/portfolio_display/tree/master/documentation) folder.

<!-- for when the readme gets too long -->
<p align="right"><a href="#top">Back to Top</a></p>

