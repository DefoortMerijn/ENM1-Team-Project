# ENM1-Team-Project Backend

## API Routes

###### Main URL : https://enm1-flask.azurewebsites.net/api/v1

### Get Power Usage Duiktank

---

`/transfo/power/fields`

Get list of all available measurements and their respective fields from Transfo

`/transfo/power/usage/<measurement>/<time>`

Get power usage data

Route parameters:

- measurement: The measurement you want to filter on
- time:
  - `year`: Shows data up until 1 year ago, grouped per month
  - `month`: Shows data up until 31 days ago, grouped per day
  - `week`: Shows data up until 7 days ago, grouped per day
  - `day`: Shows data up until 24 hours ago, grouped per hour
  - `recent`: Shows data up until 1 hour ago, grouped per 5 min

Query parameters [optional]:

- `?fn`: how to group the returned data, defaults to `sum`

     Options:
  - `sum`: return the total sum of the values
  - `mean`: returns the mean of the values
  - `median`: returns the median of the values
  - `min`: returns the smallest value of the requested data
  - `max`: returns the largest value of the requested data

- `&calendarTime`: True/False, whether to return a calendar time period, defaults to False

   For example: When querying for a month, data returned will be only of current month if True, else it will return data from a full 31 days ago
   
- `&showPhases`: True/False, whether to show phase fields (L1, L2, L3), using this might increase load times, defaults to False
- `&field`: Filters on measurement field, only showing that single field, if left empty all available fields of the measurement will be queried, this can be slow!
