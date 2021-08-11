<h1>How to run</h1>
You will first need to run npm install and then npm run app.  If you would like to run in development you will need to open to terminals.  npm run server will run nodemon on the express server.  Navigate into
the angular directory and run ng server. Typically this will run on port 4200.

<h1>Assumption</h1>
The documentation provided states "Some requirements were left open to interpretation to test your ability in making correct
assumptions."  The following assumptions have been made.

<ul>
  <li>The age input requires that the first age is over 18.  The load table does not provide any values for ages under 18 
or over 70. This also accounts for the requirement that age cannot be zero. Instead of assuming a value, the isValidAge 
validator function will return false.  The age load is a vitual part of the total calculation and needs a value.</li>
  <li>Fixed rate = 3 per day (EUR, GBP or USD – no need for currency conversion).  The isValidCurrency checks for any of 
the valid ISO 4217 currency codes.  For now, the fixed rate is set to 3 for any valid currency code that is provided.</li>
</ul>

<h1>Testing</h1>
There were tests written for the express server, but no tests were written for the frontend.  The decision was made to be
respectful of the time that was allocated for the project. The front end forms do use some validators.  The tests can be
run by executing npm test.
