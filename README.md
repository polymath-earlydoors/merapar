# merapar

Solution for Technical Test #157

run with `yarn start`
Solution looks for file with name of `merapar.csv` at root of project
with expected column structure of `Department Name`, `Date`, `Number of Sales`
parses the data into an array of objects
Sums the sales by department name
reducdes to an array of unique department names
and writes the output to a file `merapar-summary.csv`

Tests can be run with `yarn test`