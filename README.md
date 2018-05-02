# Summit EMEA Lab TL13: Unlock IoT with Adobe I/O

## Introduction
Real-time is becoming an omnipresent force in modern experience tech stack. The smarter the devices become, the more data and context they need to make complex real-time decisions. This requires a flexible, open and cost-efficient platform. Adobe I/O is Adobe’s unique platform to integrate, extend or create apps and experience based on Adobe’s products and solutions in your digital ecosystem. Adobe I/O has all the resources you need to create next-generation experiences that connect to your customers.

In this lab, we are going to take you on a tour exploring how Adobe I/O functionalities (especially the runtime feature) allow you to develop serverless integration code that connects with Adobe solutions (like Campaign) and solutions outside of the Adobe platform (e.g. an external CRM solution like Hubspot).

Last but not least, we will take you through the required steps how to use Adobe I/O to deploy functions that on one hand integrate with aforementioned solutions and on the other hand can be called by IoT devices like Amazon Echo Spot.

## Objective
After attending this lab, you will have an understanding of Adobe I/O’s capabilities and how you can use it in your own development projects.


## What are we going to do
* In our first exercise we will get familiar with Adobe I/O runtime and explore a typical 'Hello World' example.
* Then we will use Adobe I/O to create a contact in a Hubspot CRM environment we have setup for this lab.
* After that we will use Adobe Campaign Standard to create a contact, using the CRM Id we got back from Hubspot CRM in the previous step.
* We will combine both steps in a so-called sequence to experience how Adobe I/O can connect multiple actions that integrate with various solutions.
* Finally, we will use Alexa skills that connect with Adobe I/O runtime to retrieve a contact from Adobe Campaign Standard using an Alexa Echo Show simulator. And finally, you can send yourself an SMS using that same simulator, again using the functionality of Adobe I/O runtime.


## Environment
For this lab, the following environments have been set up.\
**IMPORTANT!**: all lab participants share some of these environments. In our lab instructions we have meticulously taken care of that participants do not interfere with each others work but be aware that you take proper notion of the instructions, so you will work in the assigned directory, package, skill, etc.

### Adobe I/O runtime environment
Each of us will work in the **same** Adobe I/O environment. Details of this environment:
* Name: *summit-emea-lab-unlock-adobeio-namespace*
* Auth code: *b182d3d0-bc54-4bce-b64d-a8c1a6189a43:saGSKEX9GNlGl57mDYpPioe7T41ApMa7KphmmltVGKWfmkmFYNFZZTlYFHf0eR0R*

Each of this is defined in a *.wskprops* file in your user's home directory.

### Hubspot CRM
Each of us will work in the **same** Hubspot environment. Details of this environment:
* URL: https://www.hubspot.com and https://api.hubspot.com
* User name: *summit2018tl13@outlook.com*
* Password:  *Summ1t201@*
* API key: *cc20872a-3077-442f-94fb-f1f11bae2f89*


### ACS (Adobe Campaign Standard)
Each of us will work in the **same** ACS environment. Details of this environment:
* URL: https://rob-in-der-maur-141117.campaign-demo.adobe.com
* User name: *summit2018tl13@outlook.com*
* Password:  *Summ1t201@*
* Adobe I/O Integration: *https://console.adobe.io/integrations/18499/41176/overview*, named *Summit EMEA Adobe I/O Lab*


### Amazon Alexa
Each of you will work in the **same** Amazon developer account for building Alexa skills. Details of this environment:
* URL: https://developer.amazon.com
* User name: *summit2018tl13@outlook.com* 
* Password:  *Summ1t201@*

### Outlook Email
In case you need to recover passwords, they will be sent to Outlook Live inbox.
* URL: https://outlook.live.com
* User name: *summit2018tl13@outlook.com*
* Password: *Summ1t201@*

## Lab code
You need local access to your lab code. To do so, clone or download this repository at https://github.com/ridmaur/TL13.git. 

### Clone
* Clone the repository, using `git clone https://github.com/ridmaur/TL13.git`

### Download
* Download the repository by clicking on **Clone or Download** and then click **Download ZIP**. Unzip the ZIP to a location on your Mac.

## Editor
To edit code or configuration files, etc. you have access to **Adobe Brackets** (in your dock), but you can use any other editor available on your lab Mac (e.g. `vi`).

## Table of Content
* [Exercise 1: Getting Started with Adobe I/O Runtime](intro/)
* [Exercise 2: Using Hubspot with Adobe I/O Runtime](hubspot/)
* [Exercise 3: Using Adobe Campaign Standard with Adobe I/O Runtime](acs/)
* [Exercise 4: Combining Adobe I/O Runtime Actions in a Sequence](sequence/)
* [Exercise 5: Invoke Adobe I/O Runtime Actions through Alexa Skills](alexa/)

