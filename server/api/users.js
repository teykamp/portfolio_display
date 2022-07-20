const express = require('express');
const router = express.Router();

function apiTestUser(username) {
  switch (username) {
    case 'yona':
      return {

        header: {
          name: "Yona Voss-Andreae",
          headshotURL: "https://i1.sndcdn.com/avatars-000508491087-32hktm-t500x500.jpg",
          professionalTitle: "Student Developer at SNHU",
          links: [{
            type: 'github',
            URL: 'https://github.com/yonava'
          }, {
            type: 'linkedin',
            URL: 'https://www.linkedin.com/in/yona-voss-andreae-8b92a6173/'
          },
          {
            type: 'instagram',
            URL: 'https://www.instagram.com/yonavossandreae/'
          }],
          email: 'yonavossandreae@gmail.com',
          phone: '+19713527727'
        },
        
        education: {
          pageRank: -1,
          content: [{
            institution: 'Southern New Hampshire University',
            description: 'Currently doing my undergrad at SNHU!',
            degreeType: 'BS',
            degreeField: 'Computer Science',
            date: null,
          }]
        },

        projects: {
          pageRank: -10,
          content: [{
            name: "Math Race",
            technologies: [{
              name: "VueJS",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/440px-Vue.js_Logo_2.svg.png"
            }, {
              name: "NodeJS",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png"
            }],
            linkToDeploy: "https://math-race-game.herokuapp.com/",
            linkToRepo: "https://github.com/Yonava/MathRaceGame",
            description: `Compete with friends online in an engaging multiplayer format. 
            Math race auto generates math questions at various difficulty levels. Practice 
            your skills in single player. Create an account to save your 
            lastest game results and stats`,
            date: null
          }, {
            name: "Truth Tables",
            technologies: [{
              name: "Python",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png"
            }],
            linkToDeploy: null,
            linkToRepo: "https://github.com/Yonava/truthtable",
            description: "Automates truth table equations / mathematics for computing snhu",
            date: null
          }]
        },
    
        // Ordered from most to least important
        experiences: {
          pageRank: 2,
          content: [{
            title: "Certified Trainer",
            company: "Raising Canes",
            companyImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Raising_Cane%27s_Chicken_Fingers_logo.svg/1200px-Raising_Cane%27s_Chicken_Fingers_logo.svg.png",
            description: `My primary job responsibility included onboarding and training new hires,
            working in the front of the house on customer service and back of house in the kitchen`,
            date: null
          }, {
            title: "Starbucks Barista",
            company: "Starbucks",
            companyImg: "https://upload.wikimedia.org/wikipedia/de/thumb/8/8d/Starbucks_Logo_ab_2011.svg/1200px-Starbucks_Logo_ab_2011.svg.png",
            description: `I was responsibly for making peoples morning, 
            which included purposefully spelling peoples names wrong on cups`,
            date: null
          }]
        },
    
        // Ordered from most to least important
        accomplishments: {
          pageRank: 3,
          content: [{
            title: "SETA Cup Winner",
            organization: "SNHU Computer Science Department",
            description: "I got first place, just kidding, I was 2nd.",
            date: null
          }, {
            title: "Graduated High School",
            organization: "Cleveland High School",
            description: "Quite a miracle, honestly!",
            date: null
          }]
        },

        timeline: {
          pageRank: 4,
          content: [
            "experiences",
            "education"
          ]
        },
        
        // true for public ... false for private
        visibility: true
    }
    case 'thomas':
      return {

        header: {
          name: "Thomas Eykamp",
          headshotURL: "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg",
          professionalTitle: "Civil and Environmental Engineer"
        },

        // Ordered from most to least important
        projects: {
          pageRank: 3,
          content: [{
            name: "Visualizer",
            technologies: [{
              name: "VueJS",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/440px-Vue.js_Logo_2.svg.png"
            }],
            linkToDeploy: null,
            linkToRepo: "https://github.com/teykamp/visualizer",
            description: `Draw cool stuff... pathfinding... yay!`,
            date: null
          }, {
            name: "AQTutorial",
            technologies: [{
              name: "VueJS",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/440px-Vue.js_Logo_2.svg.png"
            }],
            linkToDeploy: null,
            linkToRepo: "https://github.com/teykamp/AQTutorial",
            description: "asking people stuff about air quality",
            date: null
          }]
        },
    
        // Ordered from most to least important
        experiences: {
          pageRank: 2,
          content: [{
            title: "PBS Engineering Intern",
            company: "PBS Engineering",
            companyImg: "https://www.pbsusa.com/wp-content/uploads/cropped-faviconpng-01.png",
            description: `I went to job sites to survey the environment`,
            date: null
          }]
        },
    
        // Ordered from most to least important
        accomplishments: {
          pageRank: 1,
          content: [{
            title: "Masters 2",
            organization: "Clash Royale",
            description: "i love clash royale more than anything",
            date: null
          }, {
            title: "Champion 1 in Ranked 3s",
            organization: "Rocket League",
            description: "Flip resets, air dribbles, musty flicks... all the norm",
            date: null
          }]
        },
        
        // true for public ... false for private
        visibility: true
    }
    case 'josh':
      return {

        header: {
          name: "Joshua Burdick",
          headshotURL: "https://previews.123rf.com/images/sebastiangauert/sebastiangauert1207/sebastiangauert120700008/14454092-bald-man-sign-perfect-and-smiling.jpg",
          professionalTitle: "Computer Scientist"
        },

        // Ordered from most to least important
        projects: {
          pageRank: 2,
          content: [{
            name: "Math Race",
            technologies: [{
              name: "VueJS",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/440px-Vue.js_Logo_2.svg.png"
            }, {
              name: "NodeJS",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png"
            }],
            linkToDeploy: "https://math-race-game.herokuapp.com/",
            linkToRepo: "https://github.com/Yonava/MathRaceGame",
            description: `Compete with friends online in an engaging multiplayer format. 
            Math race auto generates math questions at various difficulty levels. Practice 
            your skills in single player. Create an account to save your 
            lastest game results and stats`,
          }, {
            name: "CS-113 Projects",
            technologies: [{
              name: "C++",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png"
            }],
            linkToDeploy: null,
            linkToRepo: "https://github.com/Joshua-Burdick/CS113-Labs",
            description: "My .cpp files for CS113 Labs SNHU.",
          }]
        },
    
        // Ordered from most to least important
        // experiences: {
        //   pageRank: 3,
        //   content: []
        // },
    
        // Ordered from most to least important
        accomplishments: {
          pageRank: 1,
          content: [{
            title: "SETA Cup Winner",
            organization: "SNHU Computer Science Department",
            description: "Best preforming freshmen in history, besides yona",
            date: null
          }, {
            title: "Math Tryhard",
            organization: "SNHU",
            description: "Calc 1, Calc 2, Calc 3, Discrete, and Linear all done in freshmen year",
            date: null
          }]
        },
        
        // true for public ... false for private
        visibility: true
    }
    default:
      return {
        error: "user not found",
        internalErrorCode: 0
      }
  }
}

router.get('/', async (req, res) => {

  try {
    const users = {
      message: 'route to retrieve all users'
    };
    res.json(users); 
  } catch (error) {
    res.json({ message: error });
  };

});

router.get('/:username', async (req, res) => {

  try {
    // const getUser = await UserBase.findOne({ username: req.params.username });
    res.json(apiTestUser(req.params.username));
  } catch (error) {
    res.json({ message: error });
  };

})

module.exports = router;