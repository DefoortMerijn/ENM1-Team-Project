# ENM1-Team-Project Backend

## API Routes

###### Main URL : https://enm1-flask.azurewebsites.net/api/v1

### Get Power Usage Duiktank

---

`/transfo/power/fields`

Get list of all usable duiktank fields

`/transfo/power/usage/{time}/{field}`

Get power usage data

Route parameters:

- field: The field you want to filter on, if left empty all fields will be given (This can be slow depending on the amount of data)
- time:
  - `year`: Shows data up until 1 year ago, grouped per month
  - `month`: Shows data up until 31 days ago, grouped per day
  - `week`: Shows data up until 7 days ago, grouped per day
  - `day`: Shows data up until 24 hours ago, grouped per hour
  - `recent`: Shows data up until 1 hour ago, grouped per 5 min

Query parameters [optional]:

- `?fn`: decides how to group the returned data
  Options:
  - `sum`: return the total sum of the values, this is default if nothing is given
  - `mean`: returns the mean of the values
  - `median`: returns the median of the values
  - `min`: gives the smallest value of the requested data
  - `max`: gives the largest value of the requested data

- `?calendarTime`: True/False, decides whether to return a calendar time period, defaults to False

   For example: When querying for a month, data returned will be only of current month if True, else it will return data from a full 31 days ago

## Duiktank Fields

### Bord_EB

- Bord_EB_Niveau1_L1
- Bord_EB_Niveau1_L2
- Bord_EB_Niveau1_L3
- Bord_EB_Niveau1_Totaal

### Bord_HVAC

- Bord_HVAC_L1
- Bord_HVAC_L2
- Bord_HVAC_L3
- Bord_HVAC_Totaal

### Bord_Waterbehandeling

- Bord_Waterbehandeling_L1
- Bord_Waterbehandeling_L2
- Bord_Waterbehandeling_L3
- Bord_Waterbehandeling_Totaal

### Buitenbar

- Buitenbar_L1
- Buitenbar_L2
- Buitenbar_L3
- Buitenbar_Totaal

### Compressor

- Compressor_L1
- Compressor_L2
- Compressor_L3
- Compressor_Totaal

### Net

- Net_L1
- Net_L2
- Net_L3
- TotaalNet

### Stopcontacten_Circuit_Niveau0_Cafetaria

- Stopcontacten_Circuit_Niveau0_Cafetaria_55Q1_L2
- Stopcontacten_Circuit_Niveau0_Cafetaria_55Q3_L3
- Stopcontacten_Circuit_Niveau0_Cafetaria_55Q5_L1
- Stopcontacten_Circuit_Niveau0_Cafetaria_55Q7_L2
- Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal

### Datarack

- Voeding_Datarack_L3
