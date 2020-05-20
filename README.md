# community-planner

A Public Participation, Neighbourhood Planning Support System running on Node.js.

Developed using the KeystoneJS Content Management System and mongoDB document store.

The application provides the following capabilities:

- Publish Plans

	The system allows an administrator to publish neighbourhood plans. Plans can have geographic layers that can be rendered on a map to allow users get insights. Detailed plan descriptions can be read on screen and related documents can be downloaded.

- Comment

	Users of the system can comment on existing plans and read comments of other users. Comments can be geolocated on a map using points, lines or polygons.

- Make Proposals

	Users are allowed to make their own planning proposals that can be saved in the database. The proposals can then be mapped and accessed by the other users of the system as well as be commented.


## Demo website ##

A demo website can be accessed at the url:

[http://maps.humanities.manchester.ac.uk/community-planner/](http://maps.humanities.manchester.ac.uk/community-planner/)

The application can be used without login in, however, if you select to login you will be able to submit geolocated comments related to the published plans. You can login to the application by clicking on the link located at the top-right of the website. Please use the following credentials of the test user:

	Email: test@community-planner.org
	Password: test

Click on the 'Plans' located at the top menu of the website and you will be navigated to the page displaying the published plans. Click on the vertical menu bar located to the right of the 'Plans' web page to open the application interaction panel. The panel provides several panel pages.



- Planning Projects Information panel page.
	
	Use this panel page to create a new plan (if you are logged in to the system), to zoom to a plan, or open a plan. Once you open a plan more panel pages will be opened allowing you to obtain more information related to the published plan. The map would display layers related to the opene plan. You can interact with the map clicking on the opend plan layers to obtain information related to individual features of the plan layers.

- Map Legend panel page.
	
	The Map legend panel page provides an interactive legend displaying information related to the layers of the opened plan.

- Planning Projects Text / Detailed Plan Description
	
	It is the panel page providing a detailed description of the plan as well as any other rich text information related to the opened plan. This is the page from which a user could obtained insights related to the opened plan.

- Files panel page
	
	The files panel page provides files associated with the opened plan. A user could download these files from the panel page.

- Comments panel page
	
	The comments panel page displays comments that the other users have made regarding the opened plan. Comments have the option to be geolocated, which means that before submiting a comment, a user is presented with options to add a marker or digitize the area of interest in the form of a polyline or a polygon on the map. This is to allow the user provide the comment indicating the area about the comment was made.     


## Administration ##

An administrator has access to the capabilities of a content management system. Thus, an administrator can create new complex plans, upload geospatial layers to the system and create plan maps to allow the geospatial layers be rendered on the map. An administrator can upload files, provide plan texts and delete comments if necessary. 

## Installation ##

The application can be installed by downloading the zip file of the source code published in github or (if your system has git installed) by cloning the source code.

Your system needs to have node installed (version 13.3.0 has been tested) and npm installed (version 6.13.1 has been tested). Once these are installed you need to navigate to the installation folder and run in your terminal the following command:

	npm install

The command will run the web app installation script which is going to donwload all the necessary node modules to your system. The script will probably run for long, so be patient.

Once the script finish, you need to rename the sample.env file to .env, or create a new .env file and copy there the contents of the sample.env file. You need also to create an account to mailgun and copy your authorization token inside the .env file.

The web app uses the Mongo database. Therefore you need to install it if you don't have it already in your system. Once you install the MongoDB you can create a new database named 'community-planner' either using your terminal or a Mongo client like Robo 3T.

If you are using windows you can run from your terminal the batch file named import-database.bat located at the mongo-database subfolder of your installation. If you are using Linux modify the contents of the batch file appropriately or run the commands found there individually. Once the entire process is completed you should have the contents of your database loaded in Mongo.

Then all you need to do to run the application is to type the following command in your terminal:

	node community-planner.js

The command will start the server of the application. The server uses port 8084 of your system. You can change the port by editing the 'community-planner.js' initialization script. Once the server is started you can use your preferable web browser to navigate to the following url:

	http://localhost:8084

This will display the application to your browser.

You can login to the system using the following credentials:

	Email: admin@community-planner.org
	Password: admin

In case you need to install the app for public use you MUST change the COOKIE_SECRET in the .env file of the application. This is used to encode passwords in your Mongo database, so make sure you are using a clean database, otherwise old users or plans won't work.

The administration pages of the application can be accessed in the following url:

	http://localhost:8084/keystone/


