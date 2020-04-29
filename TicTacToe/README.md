# This project was created to practice concepts learnt in the course: The Complete Javascript Course by Jonas Schmedtmann  

Link: https://www.udemy.com/the-complete-javascript-course/learn/v4/t/lecture/5869156?start=0  

This is an implemention of Tic Tac Toe, coded in Javascript ES6 with webpack and babel. 

Why Webpack? Bundles multiple JS files into a single file (eg, index.js)

Setting up Webpack:

1. Install Node.JS. What is Node.JS? It is a JavaScript runtime built on Chrome's V8 JavaScript engine. Install here: https://nodejs.org/en/

2.	cd into project folder then run: npm init. This will create package.json file.

3.	Then run npm  install webpack --save -dev. Webpack is saved as development dependency. (Webpack is a development tool, not a library)

4.	(optional) npm install live-server –global (serve static pages), now we can run live-server on directory to see page

5.	Create webpack.config.js in project folder (webpack configuration).

Webpack have 4 key concepts: Entry, Output, Loaders, Plugins

•	An entry point indicates which module webpack should use to begin building out its internal dependency graph.

•	The output property tells webpack where to emit the bundles it creates and how to name these files.

•	Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.

•	While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

•	By setting the mode parameter to either development, production or none, you can enable webpack's built-in optimizations that correspond to each environment.

6.	Simple Configuration in webpack.config.js:

```
	module.exports = {

		entry: ‘./src/js/index.js,

		output: {

			path: path.resolve(__dirname, ‘dist’),

			filename: ‘bundle.js’

		},

		mode: ‘development’
	}
```


7.	Create a test file (test.js) in src/js to test webpack (export default a value for index.js to import)

8.	Add to package.json: 

```
	“scripts” : {
	
		“dev”:”webpack”
		
	}
```

9.	Run npm install webpack-cli to access webpack on command line interface.

10.	Run npm run dev followed by  start dist/index.html to view results on console. Correct result should be printed, showing webpack is working.

11.	It is not ideal to have “mode: ‘development’” in our webpack.config.js as we have to manually set it back to production later on. Move it out of config to the package.json, dev script.

12.	In package.json: change scripts to:

```
	“scripts”: {

		“dev”: “webpack –mode development”,
		
		“build”: “webpack –mode production”
	}
```


13.	Now we can run different npm commands for different environments. Now add automatic reloading feature. Start by running npm install webpack-dev-server –save-dev

14.	Add field to webpack.config.js:

```
	devServer: {
		
		contentBase: ‘./dist’
	
	}
```

15.	Add to npm scripts in package.json:

```
	Scripts:{
	
	…
	
	
	"start": "webpack-dev-server --mode development --open"
	
	}
```

16.	Making changes to test.js or index.js should trigger reload of page successfully now.

17.	Now we have a new objective. How do we copy the contents of html (including injection of js script into html) from the index.html in src to index.html in dist? Now we can use plug-ins to do this as it is complex processing

18.	Run npm install html-webpack-plugin –save-dev

19.	Add const HtmlWebpackPlugin = require(‘html-webpack-plugin’) in webpack.config.js;

20.	Add to module.exports:

```
	Plugins: [
	
		New HtmlWebpackPlugin({
		
			filename: ‘index.html’,
			
			template: ‘./src/index.html’
			
	})
	
	]
```

21.	We can now delete our dist/index.html file. Run npm start and we see that the src/index.html is successfully rendered.


Let’s set up babel to compile ES6 code to ES5:

Setting up Babel:

1)	Run npm install babel-core babel-preset-env babel-loader –save-dev

2)	Now, we need to add the babel loader into our webpack config

Add to module.exports:

```
	module: {
	
		rules: [
		
			{
			
			test: /\.js$/,
			
			exclude: /node_modules/,
			
			use: {
			
				loader: ‘babel-loader’
				
				} 
			}
			
			]
			
		}
```

3)	Now we create a config file for babel. “.babelrc”. Add to this file:

```
	{
		“presets”: [
		
			[“env”, {
			
				“targets”: {
				
					“browsers”: [
					
						“last 5 versions”
						
						]
						}

				}]
			]
	}
```

4)	There are things that are not present in ES5, present in ES6. Hence, we need to polyfill.

Run: npm install babel-polyfill --save.

5)	Now we need to add an entry point for our babel-polyfill in webpack config.

Edit entry in module.exports to:

```
Entry: [‘babel-polyfill’, ‘,/src/js/index.js’],
```

Now babel and webpack is all set-up!
