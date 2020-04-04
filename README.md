# mojo_freelance

This repository is meant to serve as a base evaluation of backend technical skills.
The content of this repository is based on this [test](https://www.notion.so/Web-Backend-Async-Technical-Test-e7fc040642d04fd3b44a70410e89ccb0).

The test is deployed on a Google Cloud Function and return skill duration for provided freelancer id.

## Install & Run

`npm install && npm run build && npm start`

Note: This will not trigger the distant cloud function, but instead run the express server locally on your machine.

### Notes

- CI is made with Github Actions for each PR made against master
- CD is made for each push on master, and run the test procedure before deploying
- Currently, CD is done thanks to secret stored service account info saved in the Github Secret, and the currently tested code on the container is deployed. I've tried a bit with the Gcloud Source Repositories replication, but it was not detecting the index.js (obviously, because we do not push it to source control). I didn't take the time to configure a special build able to push Typescript from the source control to the deployed cloud function and decided to use the local compiled code instead.
- Code could be improved by adding more logging (with winston or other library), use a specific tag for manual deployment, provide staging environment, add further control on the data provided (and recover for non critical errors) and so on. Then again, it should cover the initial test and provide
- Every commit has been squashed before being merged to master, to provide better readability of the commit history.
