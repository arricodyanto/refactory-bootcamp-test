## Skill Test for Bootcamp Refactory #2

Please read.me!

There are 3 folders :

1. /logic-test (palindrome, leap year, reverse word, nearest fibonacci, and the last fizzbuzz)
2. /json-manipulation

- calling items by placement (1) → Find items in the Meeting Room
- calling items by types (2) → Find all electronic devices, Find all the furniture
- calling items by dates (1) → Find all items were purchased on 16 Januari 2020
- calling items by color (1) → Find all items with brown color

3. /fullstack-js

→ A simple Google OAuth login web application using MongoDB as it&#39;s database.

- To run this app, make sure that your NodeJS and your MongoDB service has been installed on your device.
- Open the folder (fullstack-js) and type this command on your terminal.

```sh
npm start
```

- Then, after the local server has started you can open the url which appeared on your terminal to open the app from web, or you can manually open your browser and input this url --\&gt;

```sh
[http://localhost:3000](http://localhost:3000/)
```

  1.
## App Flow Explanation

1. On the default routes (&#39;/&#39;), the app will show the login page. There, you can input your email and password if you have already registered. If not, you can registered your account with Google Account below.
2. As said in the first step, you can login with 2 method. From the login form, or with the Google Account. If your account never registered in the database, then the program will add your user info to the database with endpoint &#39;/checkuser&#39;
3. Before adding to your database, you will be redirected first to the page to input your password account. When it&#39;s done, the program will add your user account directly in the database. After that you&#39;ll be redirected on the dashboard with endpoint &#39;/dashboard&#39;
4. In the dashboard menu, you&#39;ll see the list of account that have been registered in the database with endpont &#39;/dashboard&#39;
5. Or, if you want to check it with postman, you can type

```sh
[http://localhost:3000/getusers](http://localhost:3000/getusers)
```

with &#39;get&#39; method. The program will show the list into a json form.

1. At last, if you want to logout from your account, you can user endpoint &#39;/logout&#39; to automatically end your session in the app.
