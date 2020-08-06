## **FishFry Tours Website**

A Node.js application developed using Express Web Freamwork with React UI pattern. This application stores sport fishing boats information and display their state in a Trello like kanban board, which allow users to easily manage the boats state by dragging their information card and to add new boat information. Access to the application: https://murmuring-brushlands-11465.herokuapp.com/

### **Set up the Project Locally**

- [Install node.js environment](https://nodejs.org/en/download/package-manager/)
- In the project directory, install package dependencies
  ```
  $ npm install
  ```
- Run the backend server
  ```
  $ npm start
  ```
- Run the app
  ```
  $ npm run-script runlocal
  ```

#### Further Improvement

- Add test framework (Jest, Enzyme)
- Deploy stages
  1. commit local changes
  1. npm test (should define test script in package.json, currently unavaliable)
  1. npm audit
  1. git push heroku master

### **Reference Reading & Note**

- Check out heroku logs

```
 heroku logs --tail
```

- [Uikit documentation](https://getuikit.com/docs/introduction)
- [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
- [Why is Node.js app crashing with an R10 error](https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error)
- [Heroku deploy bug net::ERR_CONNECTION_REFUSED](https://stackoverflow.com/questions/47257143/node-js-project-works-on-local-machine-issues-when-deployed-on-heroku)
- [Using Create-React-App with Express](https://dev.to/loujaybee/using-create-react-app-with-express)
