# Combining Adobe I/O Runtime Actions in a Sequence
It makes sense to combine both actions: create a contact in Hubspot CRM and then creating an associated profile in Adobe Campaign Standard.

## Objective
The objective of this exercise is to understand how Adobe I/O runtime can combine multiple actions in a sequence.

## How does it work?
For this exercise, we do not have to look at any code. We simply use the two previous actions and combine them in one new action using the sequence feature.
The only requirement in our case is that the output of the first action (adding a contact into Hubspot CRM) can be used as input for the second action (adding a profile in Adobe Campaign Standard). And luckily for you, when we crafted the code for our exercises, we took that into account... :smile:

## Try It!

### Delete your contact and profile
We have not made the lab fully bullet proof, so in case you create a contact and/or profile that already exists, things might fail to work. So to ensure we do not run into that scenario, either ensure you delete your previously created contact in Hubspot CRM and previously created profile in Adobe Campaign Standard or use a different email address than what you've used before in the previous exercises.

#### Delete Hubspot CRM Contact
Go to Hubspot, click on your contact to go into the contact details screen. Click on the **Actions** button and in the submenu click on **Delete**. Confirm by clicking the **Delete** button once more.

#### Delete Adobe Campaign Standard Profile
Go to Adobe Campaign Standard. Click on **Customer Profiles** tile. In the list, select your contact and click on **Delete Element**. Click on **Confirm** to confirm the deletion of the profile.

### Create a Sequence
To create a sequence in Adobe I/O Runtime is very straightforward. In our case, make sure you are in the *sequence* directory and then use the following command:
```
wsk action create seatXX/createcontactandprofile --sequence seatXX/createcontact,seatXX/createprofile
```
You should see the following output:
```
ok: created action seatXX/createcontactandprofile
```
If you see output like:
```
error: Unable to create action 'seatXX/createcontactandprofile': Sequence component does not exist. (code 1238995)
```
you might have mistyped one of your actions that define the sequence.


### Invoke Your Sequence
You invoke the sequence exactly the way you invoke an action. Actually, a sequence is nothing else than a new action composed of a sequence of two or more earlier defined actions. Once again, ensure you replace seat number (`XX`) and placeholder values (like `<firstname>` etc.) in the example below with your actual values.  We will use the command line to invoke our sequence/action:
```
wsk action invoke --result seatXX/createcontactandprofile --param email "<email>" --param firstname "<firstname>" --param lastname "<lastname>"
```
If all goes well, you will see output like below:
```
{
    "create": "{\"PKey\":\"@U1BVeelsQ8AHI7JmNukCAFz0yEe6SQQLBLjzPl1vg71coPJD2jlJXCdh-dYnfh5hHtJtxpPWPA41A01TXlraIgBCoOk\",\"acsId\":\"a89a117a-01e2-4983-bd1f-f29ecd219875\",\"age\":0,\"birthDate\":\"\",\"blackList\":false,\"blackListEmail\":false,\"blackListFax\":false,\"blackListMobile\":false,\"blackListPhone\":false,\"blackListPostalMail\":false,\"blackListPushnotification\":false,\"created\":\"2018-04-22 12:51:38.894Z\",\"cryptedId\":\"/AMzXTGeR4FPUYFNZBzP9B2nAteg1mh+UE6U4M5ydyPceA0b2tSrDW0z6bCvvF29pXkDEg==\",\"cusBusinessBookings\":0,\"cusCc1\":\"\",\"cusCompanyId\":\"\",\"cusCrmId\":\"551\",\"cusDomain\":\"\",\"cusDomainTV\":0,\"cusLastBookingMade\":\"\",\"cusLeisureBook\":\"\",\"cusStatus\":\"\",\"cusTopic\":\"\",\"domain\":\"me.com\",\"email\":\"ridmaur@me.com\",\"emailFormat\":\"unknown\",\"fax\":\"\",\"firstName\":\"Rob\",\"gender\":\"unknown\",\"href\":\"https://mc.adobe.io/rob-in-der-maur-141117.campaign-demo.adobe.com/campaign/profileAndServicesExt/profile/@U1BVeelsQ8AHI7JmNukCAFz0yEe6SQQLBLjzPl1vg71coPJD2jlJXCdh-dYnfh5hHtJtxpPWPA41A01TXlraIgBCoOk\",\"isExternal\":false,\"lastModified\":\"2018-04-22 12:51:38.894Z\",\"lastName\":\"In Der Maur\",\"location\":{\"address1\":\"\",\"address2\":\"\",\"address3\":\"\",\"address4\":\"\",\"city\":\"\",\"countryCode\":\"\",\"stateCode\":\"\",\"zipCode\":\"\"},\"middleName\":\"\",\"mobilePhone\":\"\",\"phone\":\"\",\"postalAddress\":{\"addrDefined\":false,\"addrErrorCount\":0,\"addrLastCheck\":\"\",\"addrQuality\":\"0\",\"line1\":\"Rob IN DER MAUR\",\"line2\":\"\",\"line3\":\"\",\"line4\":\"\",\"line5\":\"\",\"line6\":\"\",\"serialized\":\"Rob IN DER MAUR\\n\\n\\n\\n\\n\"},\"preferredLanguage\":\"none\",\"salutation\":\"\",\"subscriptions\":{\"href\":\"https://mc.adobe.io/rob-in-der-maur-141117.campaign-demo.adobe.com/campaign/profileAndServicesExt/profile/@U1BVeelsQ8AHI7JmNukCAFz0yEe6SQQLBLjzPl1vg72QA2y3jnIo-p957d6lwgFmqrV5uGBbMrkuZRyGWWyCBAM7IFU/subscriptions/\"},\"thumbnail\":\"/nl/img/thumbnails/defaultProfil.png\",\"timeZone\":\"none\",\"title\":\"Rob In Der Maur (ridmaur@me.com)\"}",
    "headers": {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    },
    "status": "success create",
    "statusCode": 200
}
```
which is the actual output of the second action in our sequence, namely creating a profile in Adobe Campaign Standard.

### Check Hubspot and ACS
Check both [Hubspot](https://app.hubspot.com) and [Adobe Campaign Standard](https://rob-in-der-maur-141117.campaign-demo.adobe.com). You should see your contact in Hubspot CRM and your profile in Adobe Campaign Standard. Also, you should see a CRM Id in Adobe Campaign Standard that has been automatically picked up from the output of the Hubspot action.

## What's Next?
* [Exercise 5: Invoke Adobe I/O Runtime Actions through Alexa Skills](../alexa/)

