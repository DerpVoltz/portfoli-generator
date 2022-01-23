const inquirer = require("inquirer");

// const fs = require('fs');

// const generatePage = require('./src/page-template');

// fs.writeFile('./index.html', generatePage(name, github), err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio conplete! Check out index.html to see the output!')
// });
const promptUser = () => {
  return inquirer
    .prompt([
      {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your Github Username (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your username!");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself'
    }
  ]);
}

const promptProject = portfolioData => {
  console.log('');
  if(!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'descrption',
      message: 'provide a description of the project (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log("Please enter a description!");
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all the apply)',
      choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the Github link to your project(Required)',
      validate: linkInput => {
        if(linkInput) {
          return true;
        } else {
          console.log("Please enter your link!");
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddPrject',
      message: 'Would you like to enter another project?',
      default: 'false'
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  })
}
  
promptUser()
  .then(answers => console.log(answers))
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData)
  });
