# ENM1-Team-Project Backend

## API Routes

###### Main URL : https://enm1-flask.azurewebsites.net/api/v1

### Get Power Usage Duiktank

---

`/transfo/power/fields` Get list of all available measurements and their respective fields from Transfo

`/transfo/power/usage/<measurement>/<time>` Get power usage data

**Route parameters:**

- measurement: The measurement you want to filter on

- time:
  - `yearly`: Show yearly data, until 2020
  - `monthly`: Show monthly data, up until 1 year ago
  - `weekly`: Show weekly data, up until 1 month ago
  - `daily`: Show daily data, up until 1 month ago
  - `hourly`: Show hourly data, up until 1 day ago
  - `recent`: Show 5 minute data, up until 1 hour ago

**Query parameters [optional]:**

- `?fn`: how to group the returned data, defaults to `sum`

     Options:
  - `sum`: return the total sum of the values
  - `mean`: returns the mean of the values
  - `median`: returns the median of the values
  - `min`: returns the smallest value of the requested data
  - `max`: returns the largest value of the requested data
   
- `&showRecent`: True/False, whether to include the most recent recorded value, defaults to False
- `&showPhases`: True/False, whether to show phase fields (L1, L2, L3), using this might increase load times, defaults to False
- `&field`: Filters on measurement field, only showing that single field, if left empty all available fields of the measurement will be queried, this can increase load times.
- `&calendarTime`: True/False, whether to treat time ranges literally or according to calendar, defaults to False

   For example: When querying for a data from a month ago, data returned will be only of current month if True, else it will return data from a full 31 days ago
   
   For example: Given the date 20 April: with calendarTime False, the time range will be April 20 - March 20, withe calendarTime True, the time range will be April 20 - April 01

