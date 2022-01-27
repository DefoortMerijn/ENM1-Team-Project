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

    Measurement is made out of 1 or more fields

    - `Duiktank`
      **fields:** 
      - `Bord_EB_Niveau1_L1`
      - `Bord_EB_Niveau1_L2`
      - `Bord_EB_Niveau1_L3`
      - `Bord_EB_Niveau1_Totaal`
      - `Bord_HVAC_L1`
      - `Bord_HVAC_L2`
      - `Bord_HVAC_L3`
      - `Bord_HVAC_Totaal`
      - `Bord_Waterbehandeling_L1`
      - `Bord_Waterbehandeling_L2`
      - `Bord_Waterbehandeling_L3`
      - `Bord_Waterbehandeling_Totaal`
      - `Buitenbar_L1`
      - `Buitenbar_L2`
      - `Buitenbar_L3`
      - `Buitenbar_Totaal`
      - `Compressor_L1`
      - `Compressor_L2`
      - `Compressor_L3`
      - `Compressor_Totaal`
      - `Net_L1`
      - `Net_L2`
      - `Net_L3`
      - `Stopcontacten_Circuit_Niveau0_Cafetaria_55Q1_L2`
      - `Stopcontacten_Circuit_Niveau0_Cafetaria_55Q3_L3`
      - `Stopcontacten_Circuit_Niveau0_Cafetaria_55Q5_L1`
      - `Stopcontacten_Circuit_Niveau0_Cafetaria_55Q7_L2`
      - `Stopcontacten_Circuit_Niveau0_Cafetaria_Totaal`
      - `TotaalNet`
      - `Voeding_Datarack_L3`
      - `Voeding_Datarack_Totaal`
    - `Fuifzaal`
    **field:** 
      - `Aansluiting_Fuifzaal_EB1_I`
    - `Conciergewoning`
    **field:**
      - `Aansluiting_Conciergewoning_EB2`
    - `Directeurswoning`
    **field:**
      - `Aansluiting_Directeurswoning_EB2`
    - `Kantoren_Verdiep_4`
    **field:**
      - `Aansluiting_kantoren_Verdiep_4_EB3_B`
    - `Kantoren_Verdiep_5`
    **field:**
      - `Aansluiting_kantoren_Verdiep_5_EB3_D`
    - `Machinezaal`
    **field:**
      - `Aansluiting_Machinezaal_EB3_A`
    - `Mechaniekersgebouw`
    **field:**
      - `Aansluiting_Mechaniekersgebouw_EB2`
    - `Oenanthe`
    **field:**
      - `Aansluiting_Oenanthe_EB3_C`
    - `Reserve_Loods`
    **field:**
      - `Aansluiting_Reserve_Loods_EB3_H`
    - `Opzichterswoning_En_Kantoorgebouwen`
    **field:**
      - `Aansluiting_Opzichterswoning_En_Kantoorgebouwen_EB2`
    - `Silo`
    **field:**
      - `Aansluiting_Silo`
    - `Stopcontacten_Random`
    **fields:**
      - `Stopcontact16A_EB1_D`
      - `Stopcontact32A_EB2_C`
      - `Stopcontact63A_EB2_A`
      - `Stopcontact63A_EB2_B`
      - `Stopcontact63A_Fuifzaal_EB1_E`
      - `Stopcontact_125A_EB1_A`
      - `Stopcontact_32A_EB1_C`
      - `Stopcontact_63A_EB1_B`
      - `Stopcontact_Fuifzaal_Opbouw`
    - `Totaal_Deel1`
    **field:**
      - `Totaal`
    - `Totaal_Deel2`
    **fields:**
      - `Totaal`
      - `Totaal_EB2`
    - `Waterkot`
    **field:**
      - `Aansluiting_Waterkot_EB3_I`
    - `Werkhuis_Elektriciens`
    **field:**
      - `Aansluiting_Elektriciens_EB2`

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
