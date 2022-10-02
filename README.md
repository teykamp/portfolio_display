<br/>

***Current Version 0.9.1***

---

# Portfolio-Display

A full stack web-based application to dynamically display resumé material in a professional manner.

## View Live Production Build

[portfolio-display-app.herokuapp.com]https://portfolio-display-app.herokuapp.com/

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


#### Object Format Tree

```
{
    name: "Yona Voss-Andreae": String,
    headshotURL: "instapic.de/yona": String
    professionalTitle: "Student Developer at SNHU": String

    // Ordered from most to least important
    projects: [{
        name: "Math Race": String,
        technologies: [{
            name: "JavaScript": String,
            logo: "i-image.co.uk/jsx": String
        }, …]: Array <Technologies>,
        linkToDeploy: "math-race-game.com": String,
        linkToRepo: "github.com/mathrace": String,
        description: "this is a cool game that does stuff": String,
    }, …]: Array <Project>,

    // Ordered from most to least important
    experiences: [{
            title: "Certified Trainer": String,
            company: "Raising Canes": String,
            companyImg: "raising.canes/chickenfingers.webp": String,
            description: "I was training new hires": String,
            date (optional): null
        }, …],

    // Ordered from most to least important
    accomplishments: [{
                title: "SETA Cup Winner": String,
                organization: "SNHU": String,
                description: "I got first place": String,
                date (optional): null
            }, …],

    visibility: Public (true) || Private (false): Boolean
}
```

---

## Documentation

Please see the documentation section of the project under the [Documentation](https://github.com/teykamp/portfolio_display/tree/master/documentation) folder.

<!-- for when the readme gets too long -->
<p align="right"><a href="#top">Back to Top</a></p>

