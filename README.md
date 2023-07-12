# To-Do Application

This is a project that uses React and the Tailwind CSS(mixed with CSS also) library and Ant Design for UI frameworks to create a web application.

<h1>Installation</h1>

-To install the necessary node modules, run the following command in the terminal:
<i>npm i</i>
This will install all the dependencies listed in the package.json file.

-To install the Tailwind library run the following commands: 
1) <i>npm install tailwindcss</i>
2) <i>npx tailwindcss init</i>
3) import these lines into a new file(styles.css)
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
4) create a new filw called postcss.config.js and and add the following content:
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
5) finally this command npx tailwindcss build styles.css -o output.css will run the generate a compiled CSS file that includes all the styles from Tailwind CSS.

To use AntDesign for UI frameworks run the following commands:
1) npm install antd
then import the icons from 'antd'


Usage
To start the project, run the following command in the terminal:
npm start 

This will start the server and launch the web application on your local machine. You can access the application by navigating to http://localhost:3000 in your web browser.




