# CFA-Major-Project-3

[![Code Climate](https://codeclimate.com/github/arapl3y/CFA-Major-Project-3-Backend/badges/gpa.svg)](https://codeclimate.com/github/arapl3y/CFA-Major-Project-3-Backend)

## Virtual Gallery

A platform to display your artwork and photos in a VR environment.

Currently hosted at: https://mighty-thicket-40847.herokuapp.com/

----

### Project Brief

> You are to design, build, deploy and present an application built for a real world customer. Meet with the business owner or organisation manager to find out what challenges they face. Find a problem that you can solve with an application and present your ideas to the client.

### Problem

The problem my client, Peter Koch, faced was how best to construct a Virtual Reality Art Gallery platform to be used by school students. Peter is a very experienced Virtual Reality developer and business owner and was curious to know how plausible it would be to build out his idea with certain web-based technologies. During his time conducting Virtual Reality programs at schools around Sydney, Peter was regularly approached by teachers enthusiastic about the idea of Virtual Reality Galleries in which students could upload artwork and other students could enter the space in VR and look around. The major concern with an application for schools is accessibility, teachers don't want to have to install a native application on all the computers.

### Solution

This is where WebVR comes into the picture and the primary reason Peter gave me this project. Having dabbled with WebVR for a previous project, Peter knew I had some grasp of what was and wasn't possible with WebVR and more specifically the WebVR framework A-Frame. If the students were able to access a web app that allowed them to administrate their own galleries in the browser or even on their own mobile phones at home, this would negate a lot of the hurdles in terms of making the application readily accessible for all the students involved.

### Technology

Due to the brief of the project, JavaScript and any of its numerous frameworks or libraries had to be used. I decided to use: [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) for the server, and minimal front end templating with [handlebars.js](http://handlebarsjs.com/) combined with [React/A-Frame](https://github.com/aframevr/aframe-react) for the VR component. I used [ESLint](http://eslint.org/) for linting and plan to use [Mocha](https://mochajs.org/), and [Chai](http://chaijs.com/) for testing.

### Resources

* Wes Bos' Learn Node course found [here](http://wesbos.com/learn-node/)
* Gallery model found [here](https://sketchfab.com/juang3d) (I'm planning to build my own 3D model soon)
* aframe-react boilerplate found [here](https://github.com/ngokevin/aframe-react-boilerplate)
* README images hosted at [imgur](https://imgur.com)

### Useful links

* https://www.sitepoint.com/building-a-full-sphere-3d-image-gallery-with-react-vr/
* https://github.com/aframevr/awesome-aframe
* https://hashnode.com/post/how-to-make-react-vr-apps-cj2bivllj004r2d53m68z4p1z
* https://medium.com/immersion-for-the-win/hands-on-with-virtual-reality-using-a-frame-react-and-redux-bc66240834f7

---

### User Journeys

<img src="http://i.imgur.com/9EdqS4j.png" width="400" height="650" />

### Wireframes

<img src="http://i.imgur.com/jMYu4rs.png" width="550" height="600" />

### VR Concept Sketches

<img src="http://i.imgur.com/FKVsM2z.jpg" width="450" height="650" />

### User stories/Project plan

<img src="http://i.imgur.com/9Oe3T9J.png" width="650" height="400"/>

### Entity Relationship Diagaram 

<img src="http://i.imgur.com/rIMFQkX.png" width="600" height="600" />

---

### Challenges

I found this project very challenging overall. Some of the major obstacles I faced were around file uploading and user authentication in node and an ongoing issue potentially to do with caching and the aframe framework. Struggling through the issues and for the most part finding solutions has been a great learning experience.

---

Virtual Reality component repo found [here](https://github.com/arapl3y/CFA-Major-Project-3-ReactVR)



Thanks for reading 😄
