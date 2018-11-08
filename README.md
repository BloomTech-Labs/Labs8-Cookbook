# Labs8-Cookbook

Deploying GraphQL to Heroku:

1. Heroku Login with Heroku credentials.
2. Run this command in terminal: 'heroku apps:create lambda-cookbook'. This generates an app on the Heroku server, and provides us with a Heroku github link.
3. Run this command in terminal: git remote add heroku-backend https://git.heroku.com/lambda-cookbook.git. This deploys the server to a heroku live server.
4. Run this command in terminal: git subtree push --prefix Backend heroku-backend master (after every redploy). This will update the server every time a change is made locally; it is required in order for changes to be updated.
5. set the heroku variables: Heroku Settings > Config Variables
6. Launch