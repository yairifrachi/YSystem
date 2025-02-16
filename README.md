# YSystem
Welcome to the photo upload system.

You can upload photos to the system and set how many days they will be deleted.

The photos are stored in S3 and are tagged with a tag indicating how many days they should be deleted.
In the cloud, there is a policy that looks at this tag and deletes according to the number of days the user requests.

When a photo is uploaded, the photo ID will be sent back to both the user and the phone the user enters. (Be sure to use an international prefix)

You can also see the photo when you enter the ID in the image search button.

To run the system, write in the main folder:
npm run start
This runs both the client and the server.

The system will not work without the tokens and scripts. They will be sent by email.